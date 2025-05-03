import styles from './AssetModalItem.module.scss'
import {FC} from "react";
import {useAssetsStore} from "../../store/assetsStore.ts";
import {Asset} from "../../models/Asset.ts";
import {useTransferDirectionStore} from "../../store/transferDirectionStore.ts";
import {DEFAULT_ASSETS} from "../../utils/consts.tsx";


type Props = {
  asset: Asset
  closeModal: () => void
}

const AssetModalItem: FC<Props> = ({asset, closeModal}) => {
  const {setToSelectedAsset, setFromSelectedAsset, setAssets, toSelectedAsset, fromSelectedAsset} = useAssetsStore()
  const {transferDirection} = useTransferDirectionStore()

  const selectAsset = () => {
    if (transferDirection === 'from') {
      console.log(asset)
      setFromSelectedAsset(asset)
      setAssets([...DEFAULT_ASSETS.filter(el => asset.symbol !== el.symbol && toSelectedAsset?.symbol !== el.symbol)])
      closeModal()
    }
    if (transferDirection === 'to') {
      console.log(asset)
      setToSelectedAsset(asset)
      setAssets([...DEFAULT_ASSETS.filter(el => asset.symbol !== el.symbol && fromSelectedAsset?.symbol !== el.symbol)])
      closeModal()
    }
  }

  return (
    <div
      className={styles.wrap}
      onClick={selectAsset}
    >
      <span className={styles.symbol}>{asset.symbol}</span>
      {asset.icon}
    </div>
  );
};

export default AssetModalItem;