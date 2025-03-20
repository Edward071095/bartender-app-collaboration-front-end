import { useEffect, useState } from "react";
import userService from "..services/userService";
import EditProfile from "./EditProfile"

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userData = await userService.getUserProfile();
            setUser(userData);
        };

        fetchUserProfile
    }, []);

    const handleSave = (updatedUser) => {
        setUser(updatedUser);
        setIsEditing(false);
    };

    if (!user) 
        return <p>Loading profile...</p>;

    return (
        <main>
        <h1>My Profile</h1>
        {isEditing ? (
           <EditProfile user={user} onSave={handleSave} />
        ) : (
            user.profileImage ? (
              <img src={user.profileImage} alt={user.username} />
            ) : (
                <img src="/images/default-profileImg.jpg" alt="default-profile-picture"  />
            ) 
        )}
        </main>
    );
};

export default MyProfile