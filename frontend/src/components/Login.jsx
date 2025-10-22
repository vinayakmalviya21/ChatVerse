import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      navigate("/");
      dispatch(setAuthUser(res.data));
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error);
    }
    setUser({ username: "", password: "" });
  }

  return (
    <div className="flex justify-center items-center min-h-screen text-black">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white/70 backdrop-blur-sm border border-gray-200">
        <h1 className='text-4xl font-extrabold text-center mb-6 text-purple-700'>Login</h1>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className='block text-gray-700 mb-1'>Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition duration-200'
              type="text"
              placeholder='Enter your username'
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-1'>Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition duration-200'
              type="password"
              placeholder='Enter your password'
              required
            />
          </div>

          <p className='text-center text-sm text-gray-600'>
            Don't have an account? <Link className='text-purple-600 font-medium' to="/signup">Signup</Link>
          </p>

          <button
            type="submit"
            className='w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition duration-200'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
