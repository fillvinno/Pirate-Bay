import styles from './MainPage.module.scss'
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";
import Exchanger from "../components/Exchanger/Exchanger.tsx";

const MainPage = () => {
  return (
    <div className={styles.wrap}>
      <Header/>
      <main className={styles.content}>
        <Exchanger/>
      </main>
      <Footer/>
    </div>
  );
};

export default MainPage;