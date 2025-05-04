import styles from './AssetInputSelector.module.scss'
import {Asset} from "../../../models/Asset.ts";
import {FC, useState} from "react";
import SelectAssetModal from "../../../components/SelectAssetModal/SelectAssetModal.tsx";
import Arrow from '../../../assets/arrow-down.svg?react';
import {TransferDirection} from "../../../models/TransferDirection.ts";
import {useTransferDirectionStore} from "../../../store/transferDirectionStore.ts";

type Props = {
  asset: Asset
  direction: TransferDirection
}

const AssetInputSelector: FC<Props> = ({asset, direction}) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)
  const {setTransferDirection} = useTransferDirectionStore()

  function openModal() {
    setTransferDirection(direction)
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div className={styles.wrap} onClick={openModal}>
      <span className={styles.symbol}>{asset.symbol}</span>
      <div className={styles.assetIcon}>{asset.icon}</div>
      <div className={styles.arrow}>
        <Arrow width='12px'/>
      </div>
      <SelectAssetModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      />
    </div>
  );
};

export default AssetInputSelector;