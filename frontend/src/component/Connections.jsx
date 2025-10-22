import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store?.connection || []);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res?.data?.connections));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);


  if (!connections || connections.length === 0 || connections[0]?._id == null) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100">
        <h1 className="font-bold text-pink-600 text-2xl mb-2">
          No Connections Found 😕
        </h1>
        <p className="text-gray-500">Try connecting with other developers!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
        Your Connections 🤝
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {connections.map((user) => (
          <div
            key={user?._id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex flex-col items-center">
              <img
                src={user?.photoUrl  || "/default-avatar.png"}
                alt={user?.firstName}
                className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-pink-300"
              />
              <h2 className="text-lg font-semibold text-gray-800">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500 text-sm">{user?.role || "Developer"}</p>

              <div className="flex flex-wrap gap-2 my-3 justify-center">
                {user?.techStack?.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
                  Message
                </button>
                <button className="px-4 py-2 border border-pink-400 text-pink-500 rounded-full hover:bg-pink-50 transition">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;

















// import React, { useEffect } from 'react'
// import { BASE_URL } from '../utils/constant'
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux'
// import { addConnection } from '../utils/connectionSlice'

 
// const Connections = () => {

//         const dispatch = useDispatch();
//         const connections = useSelector((store) => store?.connection);

//         const fetchConnections = async () => {
//           try {
            
//             const res = await axios.get(BASE_URL + "/user/connections", {
//               withCredentials : true
//             })
//              dispatch(addConnection(res?.data?.connections)); 
//           } catch (error) {
//             console.error("Error fetching connections:", error);
//             // Handle error appropriately, e.g., show a notification or log it
//           }       
//           }

//           useEffect(() => {
//             fetchConnections();
//           }, []);
         
//           console.log("connections : ", connections);

//           if (!connections || connections.length === 0) {
//             return (
//               <div className='h-screen w-screen flex  justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 animate-gradient'>
//               <h1 className='font-bold my-10  text-pink-600 text-2xl'>No Connections Found</h1>
//               </div>
//             )
//           }

//   return (
//     <div className='h-screen w-screen flex  justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 animate-gradient'>
//       <h1 className='font-bold my-10  text-pink-600 text-2xl'>Connections</h1>
//     </div>
//   )
// }

// export default Connections
