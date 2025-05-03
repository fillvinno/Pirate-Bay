import styles from './Header.module.scss'
import Logo from "../../UI/Logo/Logo.tsx";
import ConnectWalletBtn from "../../UI/ConnectWalletBtn/ConnectWalletBtn.tsx";

const Header = () => {
  return (
    <div className={styles.wrap}>
      <Logo/>
      <ConnectWalletBtn/>
    </div>
  );
};

export default Header;