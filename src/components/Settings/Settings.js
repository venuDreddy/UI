import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth'; // Adjust the base URL

// Function to fetch user profile data
export const fetchUserData = async (navigate) => {
  try {
    const token = localStorage.getItem('Rstoken');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    navigate('/login'); // Redirect on error
    throw error;
  }
};

// Function to update user profile
export const updateUserProfile = async (userData, navigate) => {
  try {
    const token = localStorage.getItem('Rstoken');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    const response = await axios.put(`${API_BASE_URL}/user/update`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Function to delete user account
export const deleteUserAccount = async (navigate) => {
  try {
    const token = localStorage.getItem('Rstoken');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    await axios.delete(`${API_BASE_URL}/user/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.removeItem('Rstoken'); // Clear token on deletion
    navigate('/login'); // Redirect to login after deletion
    return true;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};