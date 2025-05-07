import styles from './AssetInput.module.scss'
import AssetInputSelector from "./AssetInputSelector/AssetInputSelector.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {TransferDirection} from "../../models/TransferDirection.ts";
import {Asset} from "../../models/Asset.ts";
import {FC, useEffect, useMemo} from "react";
import {useAssetsStore} from "../../store/assetsStore.ts";
import {useSwapQuote} from "../../hooks/useSwapQuote.ts";
import {useAccount} from "wagmi";
import {toWei} from "../../utils/toWei.ts";
import {useDebounce} from "use-debounce";
import {formatNumber} from "../../utils/formatNumber.ts";

type Props = {
  selectedAsset: Asset
  direction: TransferDirection
}

type Input = {
  assetAmount: string
}

const AssetInput: FC<Props> = ({selectedAsset, direction}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { touchedFields }
  } = useForm<Input>()

  const {
    fromSelectedAsset,
    toSelectedAsset,
    transferedAsset,
    setTransferredAsset,
    setAssetQuote,
    setAssetError,
    setIsQuoteLoading,
    assetError
  } = useAssetsStore()

  const assetValue = watch('assetAmount') || ''
  const [debouncedAmount] = useDebounce(assetValue, 1000, { maxWait: 3000 })

  const {address, isConnected} = useAccount()

  const onSubmit: SubmitHandler<Input> = (data) => console.log(data)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    // 1. Удаляем всё, кроме цифр и точек
    let filteredValue = newValue.replace(/[^0-9.]/g, "");

    // 2. Проверяем, чтобы точка была только одна
    const dotCount = filteredValue.split(".").length - 1;
    if (dotCount > 1) return

    // 3. Запрещаем точку в начале (например, ".123" → "0.123")
    if (filteredValue.startsWith(".")) {
      filteredValue = "0" + filteredValue
    }

    // 4. Удаляем лишние нули перед точкой
    if (filteredValue.includes(".")) {
      // Заменяем "000.123" → "0.123"
      filteredValue = filteredValue.replace(/^0+(?=\.)/, "0")
    } else {
      // Заменяем "0000" → "0"
      filteredValue = filteredValue.replace(/^0+$/, "0")
    }

    setValue("assetAmount", filteredValue);

    if (filteredValue === "0" || filteredValue === "") {
      setTransferredAsset("0");
    }
  }

  const shouldFetchQuote = debouncedAmount && fromSelectedAsset &&  toSelectedAsset && address
  const isErrorStyles = touchedFields.assetAmount && assetError && direction === 'from'

  const quoteParams = useMemo(() => {
    console.log('shouldFetchQuote',shouldFetchQuote)
    if (!shouldFetchQuote) return null

    return {
      fromChain: '42161',
      fromToken: fromSelectedAsset.address,
      fromAmount: toWei(debouncedAmount, fromSelectedAsset.decimals),
      toChain: '42161',
      toToken: toSelectedAsset.address,
      fromAddress: address,
      toAddress: address,
      slippage: 1.0,
      enableForecall: true
    }
  }, [debouncedAmount, fromSelectedAsset, toSelectedAsset, address, shouldFetchQuote])

  const { data: quote, isLoading, error } = useSwapQuote(quoteParams)
  console.log('quote, isLoading, error ===>', quote, isLoading, error)

  useEffect(() => {
    if (isLoading) setIsQuoteLoading(true)
      else setIsQuoteLoading(false)
  }, [isLoading, setIsQuoteLoading])

  useEffect(() => {
    if (quote) {
      if (!quote.route || !quote.route.transactionRequest || !('target' in quote.route.transactionRequest)) {
        console.error('Invalid quote structure:', quote)
        setAssetError('Failed to get valid exchange data')
        return
      }

      const countReadableAmount = quote.route.estimate.toToken.decimals
        ? Number(quote.route.estimate.toAmountMin) / Math.pow(10, quote.route.estimate.toToken.decimals)
        : 0

      console.log('quote === >', quote)

      setTransferredAsset(countReadableAmount.toString())
      setAssetQuote(quote)
      setAssetError('')
    }
  }, [quote, setAssetError, setAssetQuote, setTransferredAsset])


  return (
    <div className={styles.wrap} style={isErrorStyles ? {backgroundColor: '#FED2CD'} : {}}>
      <form onSubmit={handleSubmit(onSubmit)} >
        <input
          type='text'
          inputMode="decimal"
          className={styles.input}
          {...register('assetAmount', {required: true})}
          readOnly={direction === 'to'}
          disabled={direction === 'to' || !isConnected}
          onChange={handleChange}
          value={direction === 'to' ? formatNumber(+transferedAsset) : assetValue}
          autoComplete='off'
          style={isErrorStyles ? {color: '#C00000'} : {}}
        />
        <AssetInputSelector asset={selectedAsset} direction={direction}/>
      </form>
    </div>
  );
};

export default AssetInput;