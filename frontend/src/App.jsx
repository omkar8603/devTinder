import Body from "./Body"
import Login from "./Login"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from "./Profile"
import LandingPage from "./LandingPage"
import Feed from './Feed'


function App() {

  return (
    <>
       <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<LandingPage/>}  />
          <Route path='/' element={<Body/>} > 
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/feed' element={<Feed />} />
          </ Route>
   

        </Routes>
      
       </BrowserRouter>
      
   </>
  )
}

export default App
