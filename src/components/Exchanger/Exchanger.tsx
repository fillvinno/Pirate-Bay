import styles from './Exchanger.module.scss'
import AssetSelector from "../AssetSelector/AssetSelector.tsx";
import {useAssetsStore} from "../../store/assetsStore.ts";
import {useEffect, useMemo, useState} from "react";
import TransactionStatusModal from "../TransactionStatusModal/TransactionStatusModal.tsx";
import {useAccount, usePublicClient, useWalletClient} from "wagmi";
import {Address} from "viem";
import {toWei} from "../../utils/toWei.ts";
import {useExecuteSwap} from "../../hooks/useExecuteSwap.ts";
import {useApprove} from "../../hooks/useApprove.ts";
import {useAllowance} from "../../hooks/useAllowance.ts";
import {useTransactionStore} from "../../store/transactionStore.ts";
import {TransactionInfo} from "../../models/Transactions.ts";
import {OnChainExecutionData} from "@0xsquid/squid-types";


const Exchanger = () => {
  const [needsApproval, setNeedsApproval] = useState<boolean>(true)
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)

  const { setTransaction } = useTransactionStore()
  const {
    fromSelectedAsset,
    assetError,
    transferedAsset,
    assetQuote,
    setAssetError,
    isQuoteLoading,
    toSelectedAsset
  } = useAssetsStore()

  const { isConnected, address } = useAccount()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  function closeModal() {
    setIsOpen(false)
  }

  const spenderAddress = useMemo(() => {
    const transactionRequest = assetQuote?.route?.transactionRequest;
    if (transactionRequest && 'target' in transactionRequest) {
      return (transactionRequest as OnChainExecutionData).target || null;
    }
    return null;
  }, [assetQuote]);

  const isNativeToken = fromSelectedAsset?.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

  const { data: allowance, refetch: refetchAllowance } = useAllowance(
    !isNativeToken && fromSelectedAsset?.address && spenderAddress
      ? fromSelectedAsset.address as Address
      : undefined,
    address as Address | undefined,
    spenderAddress as Address || undefined,
    !!assetQuote && !isNativeToken && !!spenderAddress
  )
  console.log('allowance ===>', allowance)
  const approveMutation = useApprove()
  const swapMutation = useExecuteSwap()

  useEffect(() => {
    if (!fromSelectedAsset || !transferedAsset || isNativeToken) {
      setNeedsApproval(false)
      return
    }

    const amount = BigInt(toWei(transferedAsset, fromSelectedAsset.decimals))
    setNeedsApproval(!allowance || allowance < amount)
  }, [allowance, fromSelectedAsset, transferedAsset, isNativeToken])

  // Обработчик для approve
  const handleApprove = async () => {
    console.log('inside approve handle ---- ')
    if (!fromSelectedAsset || !spenderAddress || !transferedAsset) return

    try {
      const amount = BigInt(toWei(transferedAsset, fromSelectedAsset.decimals))
      await approveMutation.mutateAsync({
        tokenAddress: fromSelectedAsset.address as Address,
        spenderAddress: spenderAddress as Address,
        amount
      });

      // После успешного approve обновляем allowance
      await refetchAllowance()
    } catch (error) {
      console.error('Approve error:', error)
      setAssetError(error instanceof Error ? error.message : 'Approve failed')
    }
  };

  // Обработчик для swap
  const handleSwap = async () => {
    const transactionRequest = assetQuote?.route?.transactionRequest
    if (
      !transactionRequest ||
      !('target' in transactionRequest) ||
      !transactionRequest.target
    ) {
      setAssetError('Contract address is missing')
      return;
    }

    if (!walletClient) {
      setAssetError('Wallet not connected')
      return;
    }

    try {
      await swapMutation.mutateAsync({
        route: assetQuote.route,
        walletClient: walletClient!,
        publicClient: publicClient!,
      })

      setTransaction({
        isSuccess: true,
        info: {
          transferredAmmount: transferedAsset,
          asset: toSelectedAsset!
        }
      })
      setIsOpen(true)
    } catch (error) {
      console.error('Swap error:', error);
      setAssetError(
        error instanceof Error
          ? error.message.replace(/Error: /, '')
          : 'Transaction failed'
      )
      setTransaction({
        isSuccess: false,
        info: {} as TransactionInfo,
        errorMessage: error instanceof Error
          ? error.message.replace(/Error: /, '')
          : 'Transaction failed'
      })
      setIsOpen(true)
    }
  };

  const isLoading = approveMutation.isPending || swapMutation.isPending || isQuoteLoading
  const isDisabled = !isConnected || !assetQuote || isLoading || transferedAsset === '0' || !!assetError

  return (
    <div className={styles.wrap}>
      <div className={styles.fromAsset}>
        <AssetSelector headingText='From'/>
        {assetError && <span className={styles.error}>{assetError}</span>}
      </div>
      <AssetSelector headingText='To'/>
      {needsApproval ? (
        <button
          className={styles.approveBtn}
          onClick={handleApprove}
          disabled={isDisabled || approveMutation.isPending}
        >
          {approveMutation.isPending ? 'Approving...' : 'Approve'}
        </button>
      ) : (
        <button
          className={styles.swapBtn}
          onClick={handleSwap}
          disabled={isDisabled || swapMutation.isPending}
        >
          {swapMutation.isPending ? 'Swapping...' : 'Swap'}
        </button>
      )}
      <TransactionStatusModal modalIsOpen={modalIsOpen} closeModal={closeModal}/>
    </div>
  );
};

export default Exchanger;