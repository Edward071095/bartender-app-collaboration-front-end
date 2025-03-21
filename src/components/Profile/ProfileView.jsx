import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import userService from "../../services/userService";
import { UserContext } from "../../contexts/UserContext";

const ProfileView = () => {
    const { user } = useContext(UserContext);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {

            const usersList = await userService.getAllUsers(); 
            setAllUsers(usersList);  
        };

        fetchAllUsers();
    }, []);

    const otherUsers = allUsers.filter(profile => profile._id !== user._id);

    return (
        <main>
            <h1>All Profiles</h1>
            {otherUsers.length > 0 ? (
                <ul>
                    {otherUsers.map((profile) => (
                        <li key={profile._id}>
                            <Link to={`/profile/${profile._id}`}>
                                <img src={profile.profileImage || "/images/default-profileImg.jpg"} alt={profile.username} />
                                {profile.username}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading profiles...</p>
            )}
        </main>
    );
};

export default ProfileView;