import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import UserCart from './UserCart';
import { addUser } from '../utils/userSlice';

const EditProfile = ({data}) => {

  const dispatch = useDispatch();   
  const user = data?.user;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('')
  const [age, setAge] = useState('');
  const [about, setAbout] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);


  console.log("first Name ", firstName);
  // Pre-fill user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setAge(user.age || '');
      setAbout(user.about || '');
      setGender(user.gender || '');
      setPhotoUrl(user?.photoUrl || '')
    }
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsSaving(true);

    if (!firstName || !lastName || !photoUrl || !age || !gender || !about) {
      setError('All fields are required.');
      setIsSaving(false);
      return;
    }

    if (isNaN(age) || age <= 0) {
      setError('Please enter a valid age.');
      setIsSaving(false);
      return;
    }

    try {
      const res = await axios.put(BASE_URL + '/profile/edit',
        {
          firstName,
          lastName,
          photoUrl,
          age,
          about,
          gender,
        },
        {
          withCredentials: true,
        }
      );
      
      dispatch(addUser(res?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      setSuccessMsg('Profile updated successfully!');
    } catch (err) {
      console.log(err)
      setError(err?.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsSaving(false);
      
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-100 to-indigo-200 px-4 py-6 font-sans">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row  justify-center gap-6 items-stretch min-h-[580px]">

      {/* Edit Profile Form */}
      <div className="bg-white shadow-md rounded-xl p-4 w-full md:w-[40%]">
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Edit <span className="text-pink-600">Your Profile</span>
        </h2>

        <form className="space-y-3" onSubmit={handleSaveProfile}>
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Photo URL</label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Error/Success */}
          {error && <p className="text-sm font-medium text-red-500">{error}</p>}
          {successMsg && <p className="text-sm font-medium text-green-600">{successMsg}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSaving}
            className={`w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md text-sm font-semibold shadow hover:from-pink-600 hover:to-purple-700 ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>

      {/* UserCart Card */}
      <div className="bg-white shadow-md rounded-xl p-3 w-full  md:w-[40%]">
        <UserCart user={{ firstName, lastName, photoUrl, age, about }} />
      </div>

      {/* show Toast */}
     { showToast && 
      <div className="toast toast-top toast-center">
  <div className="alert alert-success mt-13">
    <span>Profile Update successfully.</span>
  </div>
  </div>
  }

    </div>
  </div>
);




};

export default EditProfile;
