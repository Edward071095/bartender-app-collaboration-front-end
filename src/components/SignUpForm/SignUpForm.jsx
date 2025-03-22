import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signUp } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

import styles from '../../css-styling/sign-up.module.css'

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className={styles.signupPage}>
    <div className={styles.scrollableWrapper}>
      <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Sign Up</h1>
      <p className={styles.formTitle}>{message}</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='username'>Username:</label>
          <input
            className={styles.input} 
            type='text'
            id='name'
            value={username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='password'>Password:</label>
          <input
            className={styles.input} 
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='confirm'>Confirm Password:</label>
          <input
            className={styles.input}
            type='password'
            id='confirm'
            value={passwordConf}
            name='passwordConf'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button className={styles.signupButton} disabled={isFormInvalid()}>Sign Up</button>
          <button className={styles.submitButton} onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
    </div>
    </main>
  );
};

export default SignUpForm;
