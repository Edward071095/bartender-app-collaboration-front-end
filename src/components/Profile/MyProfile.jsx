import { Link, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import userService from "../../services/userService";
import { UserContext } from '../../contexts/UserContext';

import EditProfile from "./EditProfile"

const MyProfile = () => {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();


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
        <main>
        <h1>My Profile</h1>
        {isEditing ? (
           <EditProfile user={userData} onSave={handleSave} />
        ) : (
            user.profileImage ? (
              <img src={user.profileImage} alt={user.username} />
            ) : (
                <img src="/images/default-profileImg.jpg" alt="default-profile-picture"  />
            ) 
        )}
        <p>{user.username}</p>
        <p>{user.bio}</p>
              <button onClick={() => navigate('/cocktails/new')}>Edit Profile</button>
       </main>
    );
};

export default MyProfile