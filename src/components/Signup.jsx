import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/20 backdrop-blur-md border border-white/30">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-purple-700">
          Signup
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="font-bold text-black">Full Name</label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              type="text"
              placeholder="Full Name"
              className="w-full p-3 mt-1 rounded-lg 
             bg-gray-100 text-gray-900 
             border border-gray-300 
             placeholder-gray-500
             focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-bold text-black">Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Username"
              className="w-full p-3 mt-1 rounded-lg 
             bg-gray-100 text-gray-900 
             border border-gray-300 
             placeholder-gray-500
             focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          <div className="relative">
            <label className="font-bold text-black">Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 mt-1 rounded-lg 
             bg-gray-100 text-gray-900 
             border border-gray-300 
             placeholder-gray-500
             focus:ring-2 focus:ring-purple-400 outline-none pr-10"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 cursor-pointer text-gray-500 select-none"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <div className="relative">
            <label className="font-bold text-black">Confirm Password</label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-3 mt-1 rounded-lg 
             bg-gray-100 text-gray-900 
             border border-gray-300 
             placeholder-gray-500
             focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-10 cursor-pointer text-gray-500 select-none"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <div className="flex items-center justify-between text-black mt-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="h-4 w-4 accent-purple-600"
              />
              Male
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="h-4 w-4 accent-purple-600"
              />
              Female
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                checked={user.gender === "other"}
                onChange={() => handleCheckbox("other")}
                className="h-4 w-4 accent-purple-600"
              />
              Other
            </label>
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              className="text-purple-600 font-bold hover:underline"
              to="/login"
            >
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
