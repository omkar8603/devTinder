import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux'

const Feed = () => {

  const data = useSelector((store) => store);
  console.log(data);

  const getUserFeed = async () =>{
          
    try {
        // const feed = await axios.get('http://localhost:7777/user/feed')
        console.log("feed ", feed);

    } catch (error) {
      console.log(error)
    }
  }

  // getUserFeed();
  return (
    <div>
      Feed Page
    </div>
  )
}

export default Feed
