import { getSDK } from '../services/squid';
import { useMutation } from "@tanstack/react-query";
import {Hex, PublicClient, TransactionRequestEIP1559, WalletClient} from 'viem';
import {Signer} from "viem/_types/experimental/erc7715/types/signer";

export const useExecuteSwap = () => {
  return useMutation({
    mutationFn: async (params: {
      route: any;
      walletClient: WalletClient
      publicClient: PublicClient
    }) => {
      const squid = await getSDK()

      if (!params.route?.transactionRequest?.target) {
        throw new Error('Invalid route data: missing target address')
      }

      const signer: Signer = {
        getAddress: async (): Promise<Hex> => {
          if (!params.walletClient.account?.address) {
            throw new Error('Wallet account not available');
          }
          return params.walletClient.account.address;
        },

        sendTransaction: async (tx: TransactionRequestEIP1559) => {
          if (!params.walletClient.chain) {
            throw new Error('Chain not defined');
          }

          if (!params.walletClient?.account?.address) {
            throw new Error('Wallet account not connected');
          }

          return params.walletClient.sendTransaction({
            account: params.walletClient.account.address,
            chain: params.walletClient.chain,
            type: 'eip1559',
            maxFeePerGas: tx.maxFeePerGas,
            maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
            to: tx.to,
            data: tx.data,
            value: tx.value
          });
        },

        call: async (tx: TransactionRequestEIP1559) => {
          const result = await params.publicClient.call({
            to: tx.to,
            data: tx.data,
          });
          return result.data || "0x";
        },

        signMessage: async (message: string | { raw: Hex }) => {
          if (!params.walletClient?.account?.address) {
            throw new Error('Wallet account not connected');
          }

          return params.walletClient.signMessage({
            account: params.walletClient.account.address,
            message: typeof message === 'string'
              ? { raw: message as Hex }
              : message
          });
        },

        connect: () => signer,
        disconnect: () => {},
        encrypt: async () => '',
        encryptSync: () => '',
      } as unknown as Signer;

      return squid.executeRoute({
        signer,
        route: params.route,
      })
    },
  })
}