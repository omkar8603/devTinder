import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constant";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests || []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

       dispatch(addRequests(res.data.receivedRequests));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleAccept = async (id) => {
     try {
        const res = await axios.post(BASE_URL + "/request/review/accepted/" + id, {},
          {
            withCredentials : true
          }
        )

        dispatch(removeRequest(id));
     } catch (error) {
        console.log(error);
     }
  };

  const handleReject = async (id) => {
    try {
       const res = await axios.post(BASE_URL + "/request/review/rejected/" + id, {},
          {
            withCredentials : true
          }
        )
        dispatch(removeRequest(id));

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests.length  || !requests[0]?.fromUserId?.firstName) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100">
        <h1 className="text-pink-600 font-bold text-2xl mb-2">No Requests Received 😅</h1>
        <p className="text-gray-500">You’ll see requests here when other developers show interest.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">Connection Requests 💌</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {requests.map((req) => (
          <div key={req._id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300">
            <img
              src={req?.fromUserId?.photoUrl || "/default-avatar.png"}
              alt={req.fromUserId.firstName}
              className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-pink-300"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {req.fromUserId.firstName} {req.fromUserId.lastName}
            </h2>
            <p className="text-gray-500 text-sm">{req.fromUserId.role || "Developer"}</p>
            <p className="text-gray-400 text-xs mt-1">{req.fromUserId.location || "Unknown"}</p>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => handleAccept(req._id)}
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(req._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
