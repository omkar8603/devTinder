import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // typo fixed here
  const userData = useSelector(store => store?.user)

  const fetchUser = async () => {
    if (!userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data))
      } catch (error) {
      if (error?.status === 401) {
        navigate('/login')
      }
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div className="min-h-screen w-screen flex flex-col">
      <NavBar />
      
      {/* Main content grows to fill available space */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Body
