import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
    setUser({ fullName: "", username: "", password: "", confirmPassword: "", gender: "" });
  }

  return (
    <div className="flex justify-center items-center min-h-screen text-black">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white/70 backdrop-blur-sm border border-gray-200">
        <h1 className='text-4xl font-extrabold text-center mb-6 text-purple-700'>Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className='block text-gray-700 mb-1'>Full Name</label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400'
              type="text"
              placeholder='Enter your full name'
              required
            />
          </div>
          <div className="mb-4">
            <label className='block text-gray-700 mb-1'>Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400'
              type="text"
              placeholder='Enter your username'
              required
            />
          </div>
          <div className="mb-4">
            <label className='block text-gray-700 mb-1'>Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400'
              type="password"
              placeholder='Enter password'
              required
            />
          </div>
          <div className="mb-4">
            <label className='block text-gray-700 mb-1'>Confirm Password</label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400'
              type="password"
              placeholder='Confirm password'
              required
            />
          </div>

          {/* Gender as radio buttons */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Gender</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  className="accent-purple-500"
                  required
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  className="accent-pink-500"
                  required
                />
                Female
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={user.gender === "other"}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  className="accent-green-500"
                  required
                />
                Other
              </label>
            </div>
          </div>

          <p className='text-center text-sm text-gray-600 mb-4'>
            Already have an account? <Link className='text-purple-600 font-medium' to="/login">Login</Link>
          </p>

          <button
            type='submit'
            className='w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition duration-200'
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
