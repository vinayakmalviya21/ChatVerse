import React, { useState, useEffect, useRef } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const originalUsersRef = useRef(null);

  useEffect(() => {
    if (otherUsers && !originalUsersRef.current) {
      originalUsersRef.current = Array.isArray(otherUsers)
        ? [...otherUsers]
        : [];
    }
  }, [otherUsers]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/user/logout`
      );
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const q = search.trim().toLowerCase();

    if (!q) {
      if (originalUsersRef.current) {
        dispatch(setOtherUsers(originalUsersRef.current));
      } else {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/api/v1/user`)
          .then((res) => {
            const users = res.data?.users ?? [];
            originalUsersRef.current = [...users];
            dispatch(setOtherUsers(users));
          })
          .catch(() => toast.error("Failed to fetch users"));
      }
      return;
    }

    const source = originalUsersRef.current ?? otherUsers ?? [];
    const matched = source.filter((user) =>
      user.fullName?.toLowerCase().includes(q)
    );

    if (matched.length) {
      dispatch(setOtherUsers(matched));
    } else {
      toast.error("User not found!");
    }
  };

  useEffect(() => {
    if (search === "") {
      if (originalUsersRef.current) {
        dispatch(setOtherUsers(originalUsersRef.current));
      }
    }
  }, [search]);

  return (
    <div className="flex flex-col h-full bg-zinc-900">
      {/* Search (sticky top) */}
      <div className="p-4 border-b border-gray-800 sticky top-0 bg-zinc-900 z-20">
        <form
          onSubmit={searchSubmitHandler}
          className="flex items-center gap-2"
          aria-label="search-form"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-md text-white transition"
            aria-label="search-button"
          >
            <BiSearchAlt2 className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Scrollable users list */}
      <div className="overflow-y-auto max-h-[calc(100vh-120px)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <OtherUsers />
      </div>

      {/* Sticky logout (bottom) */}
      <div className="bg-zinc-900 border-t border-gray-800 p-3 sticky bottom-0 z-20">
        <button
          onClick={logoutHandler}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
