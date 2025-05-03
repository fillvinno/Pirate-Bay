import {getSwapQuote} from "../services/squid.ts";
import {TGetSwapQuote} from "../models/GetSwapQuote.ts";
import {useQuery} from "@tanstack/react-query";

export const useSwapQuote = (params: TGetSwapQuote | null) => {
  return useQuery({
    queryKey: ['swapQuote', params?.fromToken, params?.toToken, params?.fromAmount],
    queryFn: async () => {
      if (!params) throw new Error("Missing params");
      return getSwapQuote(params);
    },
    enabled: !!params,
    staleTime: 30000,
    retry: 1,
    retryDelay: 2000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  });
};