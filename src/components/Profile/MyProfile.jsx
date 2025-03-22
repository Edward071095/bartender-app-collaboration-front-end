import { Link } from "react-router";
import { useEffect, useState, useContext } from "react";
import userService from "../../services/userService";
import { UserContext } from '../../contexts/UserContext';
import styles from "../../css-styling/MyProfile.module.css";

import EditProfile from "./EditProfile"

const MyProfile = () => {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        const fetchUserProfile = async () => {
            const userProfile = await userService.getProfile(user._id);
            setUserData(userProfile);
        };

        fetchUserProfile();
    }, []);

    const handleSave = (updatedUser) => {
        setUserData(updatedUser);
        setIsEditing(false);
    };

    if (!user) 
        return <p>Loading profile...</p>;

    return (
        <main className={styles.profileContainer}>
        <h1 className={styles.profileHeader}>My Profile</h1>
        {isEditing ? (
           <EditProfile user={userData} onSave={handleSave} />
        ) : (
            user.profileImage ? (
              <img className={styles.myProfileImage} src={user.profileImage} alt={user.username} />
            ) : (
                <img className={styles.myProfileImage} src="/images/default-profileImg.jpg" alt="default-profile-picture"  />
            ) 
        )}
        <p>{user.username}</p>
        <p>{user.bio}</p>
            <button><Link to={`/profiles/${user._id}/edit`}>Edit Profile</Link></button>
       </main>
    );
};

export default MyProfile