import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { ArrowLeft } from "lucide-react";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser !== null ? (
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
            {/* Back btn (only on mobile) */}
            <button
              className="sm:hidden text-white hover:text-gray-300 transition"
              onClick={() => dispatch(setSelectedUser(null))}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="user-profile" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p>{selectedUser?.fullName}</p>
                <span className="text-sm text-gray-400">
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-zinc-800">
            <Messages />
          </div>

          {/* Send Input */}
          <div className="p-3 bg-zinc-900">
            <SendInput />
          </div>
        </div>
      ) : (
        <div className="md:min-w-[550px] h-screen flex flex-col justify-center items-center">
          <h1 className="text-4xl text-white font-bold">
            Hi, {authUser?.fullName}{" "}
          </h1>
          <h1 className="text-2xl text-white">Let's start conversation</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
