import {Asset} from "./Asset.ts";

export type TransactionInfo = {
  transferredAmmount: string
  asset: Asset
}

export type Transaction = {
  isSuccess: boolean,
  info: TransactionInfo
  errorMessage?: string
}