import { update } from "./cocktailService";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/profiles`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const getProfile = async (user) => {
  try {
    const res = await fetch(`${BASE_URL}/${user}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
    });

    if (!res.ok) throw new Error("Failed to fetch user data");

    return res.json()
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (userId, userProfileFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userProfileFormData),
    });
    if (!res.ok) {
      throw new Error('Failed to update profile');
    }  

    return res.json();
  } catch (error) {
    console.log('Error updating profile:', error)
  }
};

export default {
  index,
  getProfile,
  updateProfile
};

