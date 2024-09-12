import React, { useState, useEffect } from 'react';
import axiosInstance from '../components/axios/axiosInstance';
import Navbar from '../components/navBar/Navbar';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    user: { first_name: '', last_name: '', email: '' },
    image: null,
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('profile/my-profile/');
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setMessage('Failed to fetch profile data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: files ? files[0] : value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const { first_name, last_name, email } = profileData.user;
    const formData = {
      user: {
        first_name,
        last_name,
        email,
      },
    };

    if (profileData.image instanceof File) {
      const imageFormData = new FormData();
      imageFormData.append('image', profileData.image);
      // Upload the image separately if needed
      await axiosInstance.patch('profile/my-profile/', imageFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    try {
      const { data } = await axiosInstance.patch('profile/my-profile/', formData);
      setProfileData(data);
      setMessage('Profile updated successfully!');
      // Re-fetch the profile data to ensure frontend reflects the changes
      await fetchProfileData();
    } catch (error) {
      console.error('Error updating profile data:', error.response?.data || error.message);
      setMessage(handleErrorMessages(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrorMessages = (error) => {
    if (error.response?.data?.user && error.response?.data?.user[0] === "This field is required.") {
      return "Please fill in all required fields.";
    } else if (error.response?.data?.image && error.response.data.image[0] === "The submitted data was not a file. Check the encoding type on the form.") {
      return "Please upload a valid image file.";
    } else {
      return 'Failed to update profile. Please try again.';
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile Page</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
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
          <div>
            <label className="block text-gray-700 font-bold mb-2">Profile Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
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
          <button
            type="submit"
            disabled={isLoading}
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
