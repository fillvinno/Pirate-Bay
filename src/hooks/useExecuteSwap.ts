import { getSDK } from '../services/squid';
import { useMutation } from "@tanstack/react-query";
import { PublicClient, WalletClient } from 'viem';

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

      const signer = {
        getAddress: async () => params.walletClient.account?.address,
        sendTransaction: async (tx: any) => {
          const hash = await params.walletClient.sendTransaction({
            account: params.walletClient.account?.address,
            ...tx,
          });
          return { hash }
        },
        call: async (tx: any) => {
          const result = await params.publicClient.call({
            to: tx.to,
            data: tx.data,
          });

          // Возвращаем сырые байты (hex строку) вместо объекта
          return result.data || "0x" // Если data нет, возвращаем "0x"
        },
      };

      return squid.executeRoute({
        signer,
        route: params.route,
      });
    },
  });
};