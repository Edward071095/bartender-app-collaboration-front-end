import { Link } from "react-router";
import { useEffect, useState, useContext } from "react";
import userService from "../../services/userService";
import { UserContext } from '../../contexts/UserContext';
import styles from "../../css-styling/MyProfile.module.css";

import defaultPicture from "../../assets/images/extra.jpg"

const MyProfile = () => {
    const { user } = useContext(UserContext);
    const initialState = {username: '', bio: '', profileImage: '' };

    const [userData, setUserData] = useState(initialState);


    useEffect(() => {
        const fetchUserProfile = async () => {
            const userProfile = await userService.getProfile(user._id);
            setUserData(userProfile);
        };

        fetchUserProfile();
    }, []);


    if (!user) 
        return <p>Loading profile...</p>;


    return (
        <main className={styles.profileContainer}>
        <div className={styles.formContainer}>
            
        <h1 className={styles.profileHeader}>My Profile</h1>
            <div className={styles.profileImageContainer}>
              <img
               className={styles.myProfileImage} 
               src={userData.profileImage || defaultPicture} 
               alt={userData.username} 
               />
            </div>
        <p className={styles.myProfileName}>Name: {userData.username}</p>
        <p className={styles.myProfileBio}>Bio: {userData.bio}</p>
            <button className={styles.editProfileButton}><Link to={`/profiles/${user._id}/edit`}>Edit Profile</Link></button>
        </div>
       </main>
    );
};

export default MyProfile