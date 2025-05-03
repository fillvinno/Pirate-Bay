import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <div className={styles.wrap}>
      <img src='/logo.png' alt='logo'/>
      <span>Pirate Bay</span>
    </div>
  );
};

export default Logo;