import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { addFeed } from '../utils/feedSlice';
import UserCart from './UserCart';

const Feed = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const feed = useSelector((state) => state?.feed);

    
   useEffect(() => {
    if (user === null) {
      // navigate("/login");
    }
    getUserFeed();
  }, [user, navigate]);


  const getUserFeed = async () =>{

    if (feed) return;
          
    try {
        const res = await axios.get('http://localhost:7777/user/feed', {
          withCredentials : true
        })
        dispatch(addFeed(res?.data?.users));

    } catch (error) {
      // Handle Error 
      console.log(error)
    }
  }

  // getUserFeed();
  return feed && (
    <div className='h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 animate-gradient'>
      <div >
        <UserCart feed={feed}/>
      </div>
    </div>
  )
}

export default Feed
