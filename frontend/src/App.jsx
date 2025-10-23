import Body from "./component/Body"
import Login from "./component/Login"
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'
import Profile from "./component/Profile"
import LandingPage from "./component/LandingPage"
import Feed from './component/Feed'
import { Provider, useDispatch, useSelector } from 'react-redux';
import appStore from "./utils/appStore"
import Connections from "./component/Connections"
import Requests from "./component/Requests"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "./utils/constant"
import { addUser } from "./utils/userSlice"

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true, // important to send cookie!
        });
        if (res?.data) {
          dispatch(addUser(res.data));
        }
      } catch (err) {
        console.log("Not logged in:", err);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, [dispatch]);


  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <>

      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<LandingPage />} />

          <Route path='/login' element={<Login />} />
          <Route path='/' element={user ? <Body /> : <Navigate to="/login" />} >
            <Route path='/profile' element={<Profile />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/connections' element={<Connections />} />
            <Route path='/requests' element={<Requests />} />
          </ Route>


        </Routes>

      </BrowserRouter>

      <ToastContainer />
    </>
  )
}

export default App
