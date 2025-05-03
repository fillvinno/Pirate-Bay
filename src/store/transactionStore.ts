import {create} from "zustand/index";
import {Transaction} from "../models/Transactions.ts";


type TransactionStore = {
  transaction: Transaction | null
  setTransaction: (successTransaction: Transaction) => void
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transaction: null,
  setTransaction: (successTransaction) => set({ transaction: successTransaction }),
}))