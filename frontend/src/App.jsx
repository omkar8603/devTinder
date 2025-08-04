import Body from "./Body"
import Login from "./Login"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from "./Profile"
import LandingPage from "./LandingPage"


function App() {

  return (
    <>
       <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/' element={<Body/>} > 
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
          </ Route>
   

        </Routes>
      
       </BrowserRouter>
      
   </>
  )
}

export default App
