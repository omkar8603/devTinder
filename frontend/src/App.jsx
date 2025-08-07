import Body from "./component/Body"
import Login from "./component/Login"
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Profile from "./component/Profile"
import LandingPage from "./component/LandingPage"
import Feed from './component/Feed'
import { Provider } from 'react-redux';
import appStore from "./utils/appStore"

function App() {

  return (
    <>
    <Provider store={appStore}>
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

       </Provider>
      
   </>
  )
}

export default App
