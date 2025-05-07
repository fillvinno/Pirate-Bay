import {getSwapQuote} from "../services/squid.ts";
import {TGetSwapQuote} from "../models/GetSwapQuote.ts";
import {useQuery} from "@tanstack/react-query";

export const useSwapQuote = (params: TGetSwapQuote | null) => {
  return useQuery({
    queryKey: ['swapQuote', params?.fromAmount, params?.fromToken, params?.toToken],
    queryFn: async () => {
      if (!params) return null

      return await getSwapQuote(params)
    },
    enabled: !!params,
    staleTime: 30000,
    retry: 4,
    retryDelay: 1500,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
};