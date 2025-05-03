import styles from './AssetSelector.module.scss'
import {FC} from "react";
import AssetSelectorDropdown from "../../UI/AssetSelectorDropdown/AssetSelectorDropdown.tsx";
import {TransferDirection} from "../../models/TransferDirection.ts";
import AssetInput from "../../UI/AssetInput/AssetInput.tsx";
import {Asset} from "../../models/Asset.ts";
import {useAssetsStore} from "../../store/assetsStore.ts";
import {RouteResponse} from "@0xsquid/squid-types";

type Props = {
  headingText: string
}

const renderAssetInputOrDropdown = (direction: TransferDirection, fromToken: Asset | null, toToken: Asset | null, quote: RouteResponse) => {
  if (direction === 'from') {
    return fromToken
      ? <AssetInput direction={direction} selectedAsset={fromToken} quote={quote}/>
      : <AssetSelectorDropdown direction={direction}/>
  }
  if (direction === 'to') {
    return toToken
      ? <AssetInput direction={direction} selectedAsset={toToken} quote={quote}/>
      : <AssetSelectorDropdown direction={direction}/>
  }
}

const AssetSelector: FC<Props> = ({headingText}) => {
  const {fromSelectedAsset, toSelectedAsset, assetQuote } = useAssetsStore()

  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>{headingText}</h2>
      {renderAssetInputOrDropdown(headingText.toLowerCase() as TransferDirection, fromSelectedAsset, toSelectedAsset, assetQuote)}
    </div>
  );
};

export default AssetSelector;