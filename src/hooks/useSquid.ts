import {getSwapQuote} from "../services/squid.ts";
import {TGetSwapQuote} from "../models/GetSwapQuote.ts";
import {useQuery} from "@tanstack/react-query";

export const useSwapQuote = (params: TGetSwapQuote | null) => {
  return useQuery({
    queryKey: ['swapQuote', params?.fromAmount, params?.fromToken, params?.toToken],
    queryFn: async () => {
      if (!params) throw new Error("Missing params")

      return await getSwapQuote(params)
    },
    enabled: !!params,
    staleTime: 30000,
    retry: 2,
    retryDelay: 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
};