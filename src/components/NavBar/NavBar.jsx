import { useContext } from 'react';
import { Link } from 'react-router';

import styles from './NavBar.module.css';

import { UserContext } from '../../contexts/UserContext';

import cocktailLogo from '../../assets/images/cocktail-logo.png';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className={styles.leftNav}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to='/' className={styles.logo}>
            <img src={cocktailLogo} alt='Logo'></img>
            <span>BarFly</span>
          </Link>
        </div>
        
        <div className={styles.rightNav}>
          {user ? (
            <ul>
              <li><Link to='/cocktails'>All Cocktails</Link></li>
              <li><Link to='/cocktails/new'>Add Cocktail</Link></li>
              <li><Link to={`/profiles/${user._id}`}>My Profile</Link></li>
              <li><Link to='/' onClick={handleSignOut} className={styles.signOutBtn}>Sign Out</Link></li>
            </ul>
          ) : (
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/cocktails/search'>Search</Link></li>
              <li><Link to='/sign-in' className={styles.signInBtn}>Sign In</Link></li>
              <li><Link to='/sign-up' className={styles.signUpBtn}>Sign Up</Link></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
