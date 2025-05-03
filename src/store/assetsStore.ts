import { create } from 'zustand';
import {Asset} from "../models/Asset.ts";
import {DEFAULT_ASSETS} from "../utils/consts.tsx";
import {RouteResponse} from "@0xsquid/squid-types";


type AssetsStore = {
  assets: Asset[]
  fromSelectedAsset: Asset | null
  toSelectedAsset: Asset | null
  transferedAsset: string
  assetError: string
  assetQuote: RouteResponse
  isQuoteLoading: boolean
  setIsQuoteLoading: (isQuoteLoading: boolean) => void
  setAssetQuote: (assetQuote: RouteResponse) => void
  setAssetError: (error: string) => void
  setTransferredAsset: (asset: string) => void
  setAssets: (assets: Asset[]) => void
  setFromSelectedAsset: (asset: Asset) => void
  setToSelectedAsset: (asset: Asset) => void
};

export const useAssetsStore = create<AssetsStore>((set) => ({
  assets: DEFAULT_ASSETS,
  fromSelectedAsset: null,
  toSelectedAsset: null,
  transferedAsset: '',
  assetError: '',
  assetQuote: {} as RouteResponse,
  isQuoteLoading: false,
  setIsQuoteLoading: (isQuoteLoading) => set({ isQuoteLoading }),
  setAssetQuote: (assetQuote) => set({ assetQuote: assetQuote }),
  setAssetError: (error) => set({ assetError: error }),
  setTransferredAsset: (asset) => set({ transferedAsset: asset }),
  setAssets: (assets) => set({ assets }),
  setFromSelectedAsset: (asset) => set({ fromSelectedAsset: asset }),
  setToSelectedAsset: (asset) => set({ toSelectedAsset: asset }),
}));