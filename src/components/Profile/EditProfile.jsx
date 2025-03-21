import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { useNavigate } from 'react-router';
import styles from "../../css-styling/EditProfile.module.css";

const EditProfile = ({ user, onSave }) => {
    const navigate = useNavigate();
    const initialState = {
      username: user.username || '',
      bio: user.bio || '',
      profileImage: user.profileImage || ''
    };
  
    const [formData, setFormData] = useState(initialState);
  
    useEffect(() => {
      setFormData({
        username: user.username || '',
        bio: user.bio || '',
        profileImage: user.profileImage || ''
      });
    }, [user]);
  
    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };
  
    const handleSubmit = async (evt) => {
      evt.preventDefault();
      const updatedUser = { ...user, ...formData };
      await userService.updateProfile(updatedUser);
      onSave(updatedUser); 
      navigate('/profile');
    };
  
    return (
      <div className={styles.scrollableWrapper}>
        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>Edit Profile</h1>
  
          <form onSubmit={handleSubmit}>
    
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="username-input">Username</label>
              <input
                className={styles.input}
                required
                type="text"
                name="username"
                id="username-input"
                value={formData.username}
                onChange={handleChange}
                maxLength={100}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="bio-input">Bio</label>
              <textarea
                className={styles.textarea}
                name="bio"
                id="bio-input"
                value={formData.bio}
                onChange={handleChange}
                maxLength={500}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="profileImage-input">Profile Image URL</label>
              <input
                className={styles.input}
                type="text"
                name="profileImage"
                id="profileImage-input"
                value={formData.profileImage}
                onChange={handleChange}
              />
            </div>
  
            <button type="submit" className={styles.submitButton}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default EditProfile;