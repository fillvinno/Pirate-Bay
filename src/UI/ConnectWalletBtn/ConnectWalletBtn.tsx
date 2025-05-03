import styles from './ConnectWalletBtn.module.scss';
import { ConnectButton, useAccountModal } from '@rainbow-me/rainbowkit';
import ArrowBtn from '../../assets/arrow-down-btn.svg?react';
import DefaultWalletIcon from '../../assets/default-wallet-icon.svg?react';


const ConnectWalletBtn = () => {
  const { openAccountModal } = useAccountModal()

  return (
    <ConnectButton.Custom>
      {({ account, openConnectModal }) => {
        return (
          <div className={styles.container}>
            <button
              onClick={account ? openAccountModal : openConnectModal}
              className={`${styles.wrap} ${account ? styles.connected : ''}`}
              type="button"
            >
              {account ? (
                <div className={styles.accountInfo}>
                  <div className={styles.avatar}>
                    {account.ensAvatar || <DefaultWalletIcon />}
                  </div>
                  <span className={styles.address}>
                    {account.displayName}
                  </span>
                  <div className={styles.arrowIcon}>
                    <ArrowBtn height='16px'/>
                  </div>
                </div>
              ) : (
                'Connect Wallet'
              )}
            </button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWalletBtn;

