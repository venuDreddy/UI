import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserData, updateUserProfile, deleteUserAccount } from './Settings.js';
import './Settings.css';

export function Settings({ token,API_URL }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Fetch user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      try {
        const userData = await fetchUserData(token,API_URL);
        setName(userData.name || '');
        setEmail(userData.email || '');
      } catch (error) {
        setError('Failed to load user data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadUserData();
    }
  }, [token]);

  // Handle profile update
  const handleUpdate = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      await updateUserProfile(token, { name, currentPassword, newPassword },API_URL);
      alert('Profile updated successfully!');
    } catch (error) {
      setError('Error updating profile!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle account deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      setLoading(true);
      try {
        await deleteUserAccount(token,API_URL);
        alert('Account deleted successfully!');
        navigate('/login'); // Redirect after deletion
      } catch (error) {
        setError('Error deleting account!');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="profile-settings shadow-xl rounded-2xl">
      <h1 className="text">Profile Settings</h1>
      {error && <p className="error">{error}</p>}

      <div>
        <input
          id="Name"
          name="Name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="email-display">
      <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          readOnly // Make the email field non-editable
          className="read-only-email"
        />
      </div>

      <div>
        <input
          id="current-password"
          name="current-password"
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <div>
        <input
          id="new-password"
          name="new-password"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <div>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="button-container flex">
        <button className="button save" onClick={handleUpdate} disabled={loading}>
          <span className="text-xl">{loading ? 'Updating...' : 'Update Your Account'}</span>
        </button>
        <button className="button delete" onClick={handleDelete} disabled={loading}>
          <span className="text-xl">{loading ? 'Deleting...' : 'Delete Your Account'}</span>
        </button>
      </div>
    </div>
  );
}