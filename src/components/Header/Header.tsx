import styles from './Header.module.scss'
import Logo from "../../UI/Logo/Logo.tsx";
import ConnectWalletBtn from "../../UI/ConnectWalletBtn/ConnectWalletBtn.tsx";

const Header = () => {
  return (
    <header className={styles.wrap}>
      <Logo/>
      <ConnectWalletBtn/>
    </header>
  );
};

export default Header;