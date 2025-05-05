import styles from './TransactionStatusModal.module.scss'
import Modal, {Styles} from "react-modal";
import {FC} from "react";
import {customStyles} from "../../utils/ReactModalStyles.ts";
import successImg from '../../assets/success-icon.png';
import failedImg from '../../assets/failed-icon.png';
import {useTransactionStore} from "../../store/transactionStore.ts";

type Props = {
  modalIsOpen: boolean
  closeModal: () => void
}

Modal.setAppElement('#root');

const TransactionStatusModal: FC<Props> = ({closeModal, modalIsOpen}) => {
  const {transaction} = useTransactionStore()

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles as Styles}
      overlayClassName={styles.transactionModalOverlay}
    >
      <div className={styles.wrap} style={transaction?.isSuccess ? {} : {backgroundColor: '#FED2CD'}}>
        <h2 className={styles.heading}>{transaction?.isSuccess ? 'Success!' : 'Failed!'}</h2>
        <img
          className={styles.statusInfoImg}
          src={transaction?.isSuccess ? successImg : failedImg}
          alt={transaction?.isSuccess ? 'success' : 'failed'}
        />
        {
          transaction?.isSuccess
            ?
              <div className={styles.info}>
                <span>You received</span>
                <div className={styles.ammount}>{transaction?.info.transferredAmmount} {transaction?.info.asset.icon}</div>
              </div>
            :
              <div className={styles.error}>Reason: {transaction?.errorMessage}</div>
        }
        <button
          className={styles.closeBtn}
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default TransactionStatusModal;