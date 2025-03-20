import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router";

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

import styles from '../../css-styling/Dashboard.module.css';

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Welcome, {user?.username}</h1>
      <p className={styles.description}>
        This is the dashboard page where you can see a list of all the users.
      </p>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
      <div className={styles.buttonGroup}>
        <button 
          className={`${styles.button} ${styles.secondary}`} onClick={() => {
            handleSignOut();
            navigate('/');
        }}
      >
          Sign Out
        </button>
      </div>
    </main>
  );
};

export default Dashboard;
