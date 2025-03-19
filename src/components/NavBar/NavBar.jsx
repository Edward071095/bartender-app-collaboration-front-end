import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>
          <li><Link to='/'>Bartender</Link></li>
          <li><Link to='/cocktails/new'>Add Cocktail</Link></li>
          <li><Link to='/cocktails/search'>Search</Link></li>
          <li><Link to='/my-cocktails'>Manage</Link></li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/cocktails/search'>Search</Link></li>
          <li><Link to='/auth/sign-in'>Sign In</Link></li>
          <li><Link to='/auth/sign-up'>Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
