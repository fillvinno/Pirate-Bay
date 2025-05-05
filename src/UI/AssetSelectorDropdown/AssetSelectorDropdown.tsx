import styles from './AssetSelectorDropdown.module.scss'
import Arrow from '../../assets/arrow-down.svg?react'
import {FC, useCallback, useState} from "react";
import SelectAssetModal from "../../components/SelectAssetModal/SelectAssetModal.tsx";
import {TransferDirection} from "../../models/TransferDirection.ts";
import {useTransferDirectionStore} from "../../store/transferDirectionStore.ts";


type Props = {
  direction: TransferDirection
}

const AssetSelectorDropdown: FC<Props> = ({direction}) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)
  const {setTransferDirection} = useTransferDirectionStore()

  const openModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setTransferDirection(direction)
    setIsOpen(true)
  }, [direction, setTransferDirection])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <div className={styles.wrap} onClick={openModal}>
      <span>Select asset</span>
      <Arrow width='28' height='28'/>
      <SelectAssetModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default AssetSelectorDropdown;