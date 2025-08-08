import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, selectUser } from '../utils/constant';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';


const NavBar = () => {

const user = useSelector(selectUser);
const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = async (e) => {
  e.preventDefault();
  try {
     await axios.post(BASE_URL + "/logout", null ,  {
      withCredentials : true
    })
    dispatch(removeUser())
    return  navigate('/')

    console.log("logout successfully")
    
  } catch (error) {
    // Error logic may redirect to error page
    console.log(error)
  }
}
  

  return (
  <div className="navbar bg-white shadow-md px-4 py-2 sticky top-0 z-50">
    <div className="flex-1">
      <Link to='/feed' className="btn btn-ghost normal-case text-2xl font-bold text-pink-600 hover:bg-transparent">
        🧑‍💻 DevTinder
      </Link>
    </div>

    <div className="flex items-center gap-4">
      {user && (
        <>
          {/* Welcome Text Outside Dropdown */}
          <p className="px-2 font-bold text-pink-600 hover:bg-transparent">
            Welcome {user?.user?.firstName}
          </p>

          {/* Dropdown Starts Here */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-gray-100 transition"
            >
              <div className="w-10 rounded-full ring-2 ring-pink-500 ring-offset-2">
                <img
                  alt="User avatar"
                  src={user?.user?.photoUrl}
                />
              </div>
            </div>

            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 
               shadow-xl bg-white border border-gray-200 rounded-xl w-52 text-gray-800">
  <li>
    <Link to="/profile" className="justify-between hover:bg-pink-50 rounded-md text-sm text-gray-800">
      Profile
      <span className="badge badge-primary text-white">New</span>
    </Link>
  </li>
  <li>
    <Link to="/settings" className="hover:bg-pink-50 rounded-md text-sm text-gray-800">
      Settings
    </Link>
  </li>
  <li>
    <button
      onClick={handleLogout}
      className="hover:bg-pink-50 rounded-md text-sm text-red-500 font-medium w-full text-left"
    >
      Logout
    </button>
  </li>
</ul>

          </div>
        </>
      )}
    </div>
  </div>
);

};


export default NavBar
