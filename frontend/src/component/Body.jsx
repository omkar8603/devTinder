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
  const naviagte = useNavigate();
  const userData = useSelector(store => store?.user)

  const fetchUser = async () => {
    if (userData) return;
    try {
      
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials : true,
      });
      dispatch(addUser(res?.data))
      console.log("res : ", res); 
    } catch (error) {
      console.log(error.status)
      if (error?.status === 401){
         naviagte('/login')
      }
   
      console.log(error)
    }
  }

  useEffect(() => {
        fetchUser();
    
  },[])
    return (
    <div>  
    <NavBar />
      <Outlet />
    <Footer />
    </div>
  )
}

export default Body
