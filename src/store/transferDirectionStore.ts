import { create } from 'zustand';
import {TransferDirection} from "../models/TransferDirection.ts";


type TransferDirectionStore = {
  transferDirection: TransferDirection
  setTransferDirection: (transferDirection: TransferDirection) => void
};

export const useTransferDirectionStore = create<TransferDirectionStore>((set) => ({
  transferDirection: null,
  setTransferDirection: (transferDirection) => set({ transferDirection: transferDirection })
}));