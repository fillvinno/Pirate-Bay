import styles from './SelectAssetModal.module.scss';
import Modal from "react-modal";
import {FC} from "react";
import {useAssetsStore} from "../../store/assetsStore.ts";
import AssetModalItem from "../../UI/AssetModalItem/AssetModalItem.tsx";
import {customStyles} from "../../utils/ReactModalStyles.ts";


type Props = {
  modalIsOpen: boolean
  closeModal: () => void
}

Modal.setAppElement('#root');

const SelectAssetModal: FC<Props> = ({closeModal, modalIsOpen}) => {
  const {assets} = useAssetsStore()

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      overlayClassName={styles.overlay}
    >
      <div className={styles.wrap} onClick={(e) => e.stopPropagation()}>
        <div className={styles.assets}>
          {assets.map((asset) => <AssetModalItem asset={asset} key={asset.address} closeModal={closeModal}/>) }
        </div>
        <button
          className={styles.closeBtn}
          onClick={(e) => {
            e.stopPropagation()
            closeModal()
          }}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SelectAssetModal;