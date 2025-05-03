import { getSDK } from '../services/squid';
import {useMutation} from "@tanstack/react-query";

export const useExecuteSwap = () => {
  return useMutation({
    mutationFn: async (params: {
      route: any;
      signer: any;
    }) => {
      const squid = await getSDK();

      if (!params.route?.transactionRequest?.target) {
        throw new Error('Invalid route data: missing target address');
      }

      return squid.executeRoute({
        signer: params.signer,
        route: params.route,
      });
    },
  });
};