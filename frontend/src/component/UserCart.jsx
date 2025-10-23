

import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { updateFeed } from "../utils/feedSlice";

const UserCart = ({ user }) => {
  const dispatch = useDispatch();

  const { firstName, lastName, photoUrl, age, about, _id } = user;

  const onInterested = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/interested/${_id}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(updateFeed(user._id));
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const onIgnored = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/ignored/${_id}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(updateFeed(user._id));
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="card bg-base-100  shadow-md rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl  transition-transform transform hover:scale-[1.02] hover:shadow-lg">
        <figure className="h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-t-2xl">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}'s profile`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              No Image
            </div>
          )}
        </figure>

        <div className="card-body p-4 sm:p-6 lg:p-8">
          <h2 className="card-title text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
            {firstName} {lastName}, {age}
          </h2>

          <p className="text-sm text-white sm:text-base md:text-lg text-gray-600 line-clamp-3">
            {about || "No description available."}
          </p>

          <div className="card-actions flex flex-col sm:flex-row justify-around gap-3 mt-6">
            <button
              onClick={onInterested}
              className="btn bg-secondary text-white w-full sm:w-auto hover:opacity-90"
            >
              Interested
            </button>
            <button
              onClick={onIgnored}
              className="btn bg-primary text-white w-full sm:w-auto hover:opacity-90"
            >
              Ignored
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCart;














// import axios from "axios";
// import React from "react";
// import { BASE_URL } from "../utils/constant";
// import { useDispatch } from "react-redux";
// import { updateFeed } from "../utils/feedSlice";

// const UserCart = ({ user }) => {
//   const dispatch = useDispatch();

//   const { firstName, lastName, photoUrl, age, about, _id } = user;

//   const onInterested = async () => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/request/send/interested/${_id}`,
//         {},
//         { withCredentials: true }
//       );
//       if (res.status === 200) {
//         dispatch(updateFeed(user._id));
//       }
//     } catch (error) {
//       console.log("error:", error);
//     }
//   };

//   const onIgnored = async () => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/request/send/ignored/${_id}`,
//         {},
//         { withCredentials: true }
//       );
//       if (res.status === 200) {
//         dispatch(updateFeed(user._id));
//       }
//     } catch (error) {
//       console.log("error:", error);
//     }
//   };

//   return (
//     <div className="flex justify-center p-4">
//       <div className="card bg-base-100 shadow-md rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg transition-transform transform hover:scale-[1.02] hover:shadow-lg">
//         <figure className="h-64 sm:h-72 md:h-80 overflow-hidden rounded-t-2xl">
//           {photoUrl ? (
//             <img
//               src={photoUrl}
//               alt={`${firstName} ${lastName}'s profile`}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
//               No Image
//             </div>
//           )}
//         </figure>

//         <div className="card-body p-4 sm:p-6">
//           <h2 className="card-title text-lg text-white sm:text-xl md:text-2xl font-semibold text-gray-800">
//             {firstName} {lastName}, {age}
//           </h2>

//           <p className="text-sm sm:text-base text-whute text-gray-600 line-clamp-3">
//             {about || "No description available."}
//           </p>

//           <div className="card-actions flex flex-col sm:flex-row justify-around gap-3 mt-6">
//             <button
//               onClick={onInterested}
//               className="btn bg-secondary text-white w-full sm:w-auto hover:opacity-90"
//             >
//               Interested
//             </button>
//             <button
//               onClick={onIgnored}
//               className="btn bg-primary text-white w-full sm:w-auto hover:opacity-90"
//             >
//               Ignored
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCart;







// import axios from 'axios';
// import React from 'react'
// import { BASE_URL } from '../utils/constant';
// import { useDispatch } from 'react-redux';
// import { updateFeed } from '../utils/feedSlice';

// const UserCart = ({ user }) => {
//   const dispatch = useDispatch();


//   const { firstName, lastName, photoUrl, age, about, _id } = user;

//   const onInterested = async () => {

//     try {
//       const res = await axios.post(
//         `${BASE_URL}/request/send/interested/${_id}`,
//         {},
//         { withCredentials: true }
//       );
//       console.log(res.status)
//       if (res.status === 200) {
//          dispatch(updateFeed(user._id));
//       }


//       console.log(res);
//     } catch (error) {
//       console.log("error : ", error);
//     }

//   }

//   const onIgnored = async () => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/request/send/ignored/${_id}`,
//         {},
//         { withCredentials: true }
//       );

//        if (res.status === 200) {
//          dispatch(updateFeed(user._id));
//       }
//     } catch (error) {
//          console.log("error : " + error)
//     }
//   }


//   return (
//     <div>
//       <div className="card bg-base-100 h-[560px] w-96 shadow-sm">
//         <figure>
//           {photoUrl && <img src={photoUrl} alt="Profile" />}

//         </figure>
//         <div className="card-body">
//           <h2 className="card-title">{firstName + "  " + lastName + "  " + age}</h2>
//           <p>{about}</p>
//           <div className="card-actions justify-around mt-4">
//             <button onClick={onInterested} className="btn bg-secondary">Interested</button>
//             <button onClick={onIgnored} className="btn bg-primary">Ignored</button>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserCart
