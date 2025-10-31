import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: "",
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen text-black">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white/20 backdrop-blur-md border border-white/30">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-purple-700">
          Login
        </h1>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-black font-bold mb-1">Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full p-3 mt-1 rounded-lg 
             bg-gray-100 text-gray-900 
             border border-gray-300 
             placeholder-gray-500
             focus:ring-2 focus:ring-purple-400 outline-none"
              type="text"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-black font-bold mb-1">Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-3 mt-1 rounded-lg 
             bg-gray-100 text-gray-900 
             border border-gray-300 
             placeholder-gray-500
             focus:ring-2 focus:ring-purple-400 outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 cursor-pointer text-gray-500 select-none"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link className="text-purple-600 font-bold" to="/signup">
              Signup
            </Link>
          </p>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
