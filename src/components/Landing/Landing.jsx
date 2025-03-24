import { useNavigate } from "react-router";


import styles from '../../css-styling/Landing-page.module.css';

import cocktailLogo from '../../assets/images/cocktail-logo.png';

const Landing = () => {
  const navigate = useNavigate();

  
  return (
    <main className={styles.container}>
      <img src={cocktailLogo} alt='Logo'></img>
      <h1 className={styles.title}>Welcome to BarFly</h1>
      <p className={styles.description}>Sign up or sign in to see your own Cocktail Bar</p>
      <div className={styles.buttonGroup}>
        <button className={`${styles.button} ${styles.primary}`} onClick={() => navigate('/sign-up')}>
          Sign Up
        </button>
        <button className={`${styles.button} ${styles.secondary}`} onClick={() => navigate('/sign-in')}>
          Sign In
        </button>
      </div>
    </main>
  );
};

export default Landing;
