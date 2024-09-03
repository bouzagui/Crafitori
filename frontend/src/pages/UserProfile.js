import React, { useState, useEffect } from 'react';
import axiosInstance from '../components/axios/axiosInstance'; // Adjust the path accordingly
import Navbar from '../components/navBar/Navbar';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    user: {first_name: '', last_name: '', email: ''}
    // Add other fields as needed
  });
  const [message, setMessage] = useState('');

  // Fetch the current profile data when the component mounts
  useEffect(() => {
    axiosInstance.get('/auth/my-profile/')
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.put('/auth/my-profile/', profileData)
      .then(response => {
        setMessage('Profile updated successfully!');
        setProfileData(response.data); // Update the state with the new data
      })
      .catch(error => {
        console.error('Error updating profile data:', error);
        setMessage('Failed to update profile.');
      });
  };

return (

    
    <div>
        <Navbar />
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Profile Page</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700 font-bold mb-2">First Name:</label>
                <input
                type="text"
                name="first_name"
                value={profileData.user.first_name}
                onChange={handleChange}
                className="
                    w-full
                    px-3
                    py-2
                    border
                    border-gray-300
                    rounded-md
                    bg-white
                    text-black
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                "
                />
            </div>
            <div>
                <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
                <input
                type="text"
                name="last_name"
                value={profileData.user.last_name}
                onChange={handleChange}
                className="
                    w-full
                    px-3
                    py-2
                    border
                    border-gray-300
                    rounded-md
                    bg-white
                    text-black
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                "
                />
            </div>
            <div>
                <label className="block text-gray-700 font-bold mb-2">Email:</label>
                <input
                type="email"
                name="email"
                value={profileData.user.email}
                onChange={handleChange}
                className="
                    w-full
                    px-3
                    py-2
                    border
                    border-gray-300
                    rounded-md
                    bg-white
                    text-black
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                "
                />
            </div>
            {/* Add more fields as needed */}
            <button
                type="submit"
                className="
                w-full
                px-4
                py-2
                bg-blue-500
                text-white
                font-bold
                rounded-md
                hover:bg-blue-600
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-opacity-50
                "
            >
                Update Profile
            </button>
            </form>
            {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </div>
    </div>
    );
};
    

export default ProfilePage;
