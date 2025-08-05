
import React ,{  useState}from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [emailId, setEmailId] = useState("omkar@gmail.com");
  const [password, setPassword] = useState("Pass@123");
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailId || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError(""); // Clear any previous error

    try {
      const res = await axios.post("http://localhost:7777/login", {
        emailId : emailId,
        password : password
      }, {withCredentials : true})

      console.log("login : ", res)
      navigate('/feed  ');

    } catch (error) {
       console.log("error : ", error);
    }
     
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-100 to-indigo-200 px-4 font-sans">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-sm w-full transition-all duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to <span className="text-pink-600">DevTinder</span>
        </h2>

        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={emailId}
              onChange={(e) =>  setEmailId(e.target.value)}
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-pink-600 hover:underline font-medium">
              Register here
            </a>
          </p>
          <p className="mt-2">
            Forgot your password?{" "}
            <a href="/reset-password" className="text-purple-600 hover:underline font-medium">
              Reset it here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
