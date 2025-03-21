import { useContext } from 'react';
import { Link } from 'react-router';

import styles from './NavBar.module.css';

import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className={styles.nav}>
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Link to='/' className={styles.brand}>
          <img src='../asssets/images/cocktail-logo.png' alt='Logo'></img>
          <span>Cocktails</span>
        </Link>
      </div>
      
      <div className={styles.right}>
        {user ? (
          <ul>
            <li><Link to='/'>Bartender</Link></li>
            <li><Link to='/cocktails'>All Cocktails</Link></li>
            <li><Link to='/cocktails/new'>Add Cocktail</Link></li>
            <li><Link to={`/profiles/${user._id}`}>My Profile</Link></li>
            <li><Link to='/' onClick={handleSignOut} className={styles.btn}>Sign Out</Link></li>
          </ul>
        ) : (
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/cocktails/search'>Search</Link></li>
            <li><Link to='/sign-in' className={styles.btnOutline}>Sign In</Link></li>
            <li><Link to='/sign-up' className={styles.btn}>Sign Up</Link></li>
          </ul>
        )}
      </div>
    </div>
  </nav>
);
};

export default NavBar;
