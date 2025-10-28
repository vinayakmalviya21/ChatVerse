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

  // keep a ref to the original full list so we can restore it later
  const originalUsersRef = useRef(null);

  // If otherUsers comes from redux async load, store it once as the original list
  useEffect(() => {
    if (otherUsers && !originalUsersRef.current) {
      // clone to avoid accidental mutation
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

    // If query is empty -> restore the original list (if we have it), otherwise refetch
    if (!q) {
      if (originalUsersRef.current) {
        dispatch(setOtherUsers(originalUsersRef.current));
      } else {
        // fallback: fetch from server (only if we don't have original cached list)
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

    // filter using the ORIGINAL list if available so repeated searches work correctly
    const source = originalUsersRef.current ?? otherUsers ?? [];
    const matched = source.filter((user) =>
      user.fullName?.toLowerCase().includes(q)
    );

    if (matched.length) {
      dispatch(setOtherUsers(matched));
    } else {
      // no matches: show toast and optionally clear list or keep as-is
      toast.error("User not found!");
      // keep current displayed list unchanged — or uncomment to show empty:
      // dispatch(setOtherUsers([]));
    }
  };

  // Optional: live reset when user clears the input (makes UX smoother)
  useEffect(() => {
    if (search === "") {
      if (originalUsersRef.current) {
        dispatch(setOtherUsers(originalUsersRef.current));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="h-full flex flex-col bg-zinc-900 p-4">
      <div className="flex flex-col flex-1 min-h-0">
        <form
          onSubmit={searchSubmitHandler}
          className="flex items-center gap-2"
          aria-label="search-form"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-0 bg-zinc-800 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Search..."
          />

          <button
            type="submit"
            className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-md text-white transition"
            aria-label="search-button"
          >
            <BiSearchAlt2 className="w-5 h-5" />
          </button>
        </form>

        <div className="divider my-4 border-gray-700"></div>

        <div className="flex-1 overflow-y-auto min-h-0 min-w-0 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-zinc-900">
          <OtherUsers />
        </div>
      </div>

      <div className="mt-4 border-t border-gray-800 pt-3">
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
