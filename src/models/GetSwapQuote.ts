export type TGetSwapQuote = {
  fromChain: string;
  fromToken: string;
  fromAmount: string;
  toChain: string;
  toToken: string;
  fromAddress: string;
  toAddress: string;
  slippage: number;
};