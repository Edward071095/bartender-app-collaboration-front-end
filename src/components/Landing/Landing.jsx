import { useNavigate, Link } from "react-router";


import styles from '../../css-styling/Landing-page.module.css';

const Landing = () => {
  const navigate = useNavigate();

  
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Hello, you are on the landing page for visitors.</h1>
      <p className={styles.description}>Sign up now, or sign in to see your super secret dashboard!</p>
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
