import styles from './AssetSelector.module.scss'
import {FC} from "react";
import AssetSelectorDropdown from "../../UI/AssetSelectorDropdown/AssetSelectorDropdown.tsx";
import {TransferDirection} from "../../models/TransferDirection.ts";
import {Asset} from "../../models/Asset.ts";
import {useAssetsStore} from "../../store/assetsStore.ts";
import AssetInput from "../AssetInput/AssetInput.tsx";

type Props = {
  headingText: string
}

const renderAssetInputOrDropdown = (direction: TransferDirection, fromToken: Asset | null, toToken: Asset | null) => {
  if (direction === 'from') {
    return fromToken
      ? <AssetInput direction={direction} selectedAsset={fromToken}/>
      : <AssetSelectorDropdown direction={direction}/>
  }
  if (direction === 'to') {
    return toToken
      ? <AssetInput direction={direction} selectedAsset={toToken}/>
      : <AssetSelectorDropdown direction={direction}/>
  }
}

const AssetSelector: FC<Props> = ({headingText}) => {
  const {fromSelectedAsset, toSelectedAsset } = useAssetsStore()

  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>{headingText}</h2>
      {renderAssetInputOrDropdown(headingText.toLowerCase() as TransferDirection, fromSelectedAsset, toSelectedAsset)}
    </div>
  );
};

export default AssetSelector;