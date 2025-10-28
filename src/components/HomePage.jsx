import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) navigate("/login");
  }, [authUser, navigate]);

  return (
    <div className="flex flex-col sm:flex-row h-[95vh] min-h-0 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg overflow-hidden shadow-xl">
      {/* Sidebar */}
      <div
        className={`
      transition-all duration-300 ease-in-out
      ${selectedUser ? "hidden sm:block" : "block sm:block"}
      w-full sm:w-[40%] md:w-[35%] lg:w-[30%] xl:w-[25%]
      border-r border-gray-700 bg-zinc-900
      min-h-0 flex-shrink-0
    `}
      >
        <Sidebar />
      </div>

      {/* MessageContainer */}
      <div
        className={`
      transition-all duration-300 ease-in-out
      ${!selectedUser ? "hidden sm:block" : "block"}
      flex-1 bg-zinc-800 w-full min-h-0
      flex flex-col
    `}
      >
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;
