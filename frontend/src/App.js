import Signup from './components/Signup';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect, useRef } from 'react';
import {useSelector,useDispatch} from "react-redux";
import { setOnlineUsers } from './redux/userSlice';
import io from "socket.io-client";

const router = createBrowserRouter([
  { path:"/", element:<HomePage/> },
  { path:"/signup", element:<Signup/> },
  { path:"/login", element:<Login/> },
]);

function App() { 
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const socketRef = useRef(null); // <-- store socket in ref, not Redux

  useEffect(() => {
    if(authUser){
      // initialize socket only once
      socketRef.current = io(`${process.env.REACT_APP_BASE_URL}`, {
        query: { userId: authUser._id }
      });

      socketRef.current.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socketRef.current?.close();
        socketRef.current = null;
      }
    } else {
      socketRef.current?.close();
      socketRef.current = null;
    }
  }, [authUser, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
