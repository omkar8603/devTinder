import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constant';

const UserCart = ({ user }) => {


  const { firstName, lastName, photoUrl, age, about, _id } = user;

  const onInterested = async () => {

    try {
      console.log()
      const res = await axios.post(
        `${BASE_URL}/request/send/interested/${_id}`,
        {},
        { withCredentials: true }
      );



      console.log(res);
    } catch (error) {
      console.log("error : ", error);
    }


  }

  const onIgnored = () => {

  }


  return (
    <div>
      <div className="card bg-base-100 h-[560px] w-96 shadow-sm">
        <figure>
          {photoUrl && <img src={photoUrl} alt="Profile" />}

        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + "  " + lastName + "  " + age}</h2>
          <p>{about}</p>
          <div className="card-actions justify-around mt-4">
            <button onClick={onInterested} className="btn bg-secondary">Interested</button>
            <button onClick={onIgnored} className="btn bg-primary">Ignored</button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCart
