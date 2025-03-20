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
    <nav className={styles.container}>
      {user ? (
        <ul>
          <li><Link to='/'>Bartender</Link></li>
          <li><Link to='/cocktails'>All Cocktails</Link></li>
          <li><Link to='/cocktails/new'>Add Cocktail</Link></li>
          {/* <li><Link to='/cocktails/search'>Search</Link></li>
          <li><Link to='/my-cocktails'>My Cocktails</Link></li> */}
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/cocktails/search'>Search</Link></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
