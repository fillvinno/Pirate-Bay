import styles from './Footer.module.scss'
import Arbitrum from '../../assets/arbitrum.svg?react'

const Footer = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.arbitrum}>
        <Arbitrum/>
      </div>
    </div>
  );
};

export default Footer;