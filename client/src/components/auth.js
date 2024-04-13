import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import { CloseOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import "./cart.css";
import { getCredits, logout } from "../redux/userSlice";
import {fetchNearestCenter} from "../api/api";



export default function Auth({ setShowModal }) {
  const [user, setUser] = useState(null);

  const { isAuthenticated, credits} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeCart = (e) => {
    e.preventDefault();
    const el = document.querySelector('.user');
    el.classList.remove('showCart');
    el.classList.add('hidecart');
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [isAuthenticated]);
  
  useEffect(()=> {
    const callGetCredits = () => {
      if(user && user.role === 'user') dispatch(getCredits());
    }
      
    const intervalId = setInterval(callGetCredits,60 * 60 * 1000);    // Calling getCredits every 1hr

    return () => clearInterval(intervalId);
  },[dispatch,user])


  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
};

  const handleCollectorRequest = async(e) => {
    e.preventDefault();
     const {data} = await fetchNearestCenter();
     alert(data?.message);
  }

  console.log(user);



  return (

    <div className='user p-8 h-full gap-4 hidecart' style={{ transition: "0.4s all ease-in-out" }}>
      <div className='flex justify-between'>
        <h4 className="">Account Details</h4>
        <CloseOutlined className='cursor-pointer' onClick={(e) => closeCart(e)} />
      </div>

      <div className='flex flex-col justify-between h-full'>

        {
          user ?
            <>
              <div className="flex flex-col gap-2">
                <p className="cursor-pointer text-lg flex items-center justify-between">
                  {user?.imageUrl ? <Avatar alt="Remy Sharp" src={user.imageUrl} /> :
                    <Avatar> {user?.name?.slice(0, 1)} </Avatar>
                  }
                  Welcome {user?.name} 👋
                </p>

                {user.role === 'user' &&             
                  <>
                  <Link to='/recycled'>
                    <button className="cursor-pointer text-center text-md text-decoration-none w-full shop-now p-2 text-darkGreen">View my recycled e-waste</button>
                  </Link>

                  <p className="text-darkGreen">Credits : {credits ||  user?.credits}</p>
                  </>
                }

                {user.role === 'center' && (
                  <>
                    <Link to='/viewCollectors'>
                      <button className="cursor-pointer text-center text-md text-decoration-none w-full shop-now p-2 text-darkGreen">View Collector Requests</button>
                    </Link>

                  </>
                )}
                
                {user.role === 'collector' && (
                  <div className="flex flex-col items-center ">
                    <Link to='/availablePickups' className="w-full">
                      <button className="cursor-pointer text-center text-md text-decoration-none my-2 w-full shop-now p-2 bg-darkGreen text-white rounded-md">View available Pickups</button>
                    </Link>
                    <Link to='/scheduledPickups' className="w-full">
                      <button className="cursor-pointer text-center text-md text-decoration-none my-2 w-full shop-now p-2 bg-darkGreen text-white rounded-md">View Scheduled Pickups</button>
                    </Link>
                    <Link to='/history' className="w-full">
                      <button className="cursor-pointer text-center text-md text-decoration-none my-2 w-full  shop-now p-2 bg-darkGreen text-white  rounded-md">View History of your pickups</button>
                    </Link>

                    <button className="cursor-pointer text-center text-md text-decoration-none my-2 w-full  shop-now p-2 bg-darkGreen text-white  rounded-md" onClick={(e) => handleCollectorRequest(e)} >Recycle at nearest center</button>
                  </div>
                )}

                  
        {/* For center in future make track of e-waste recycled by them */}


              </div>
              <button className="cursor-pointer text-center text-md text-decoration-none w-1/2 shop-now p-2 bg-darkGreen text-white" onClick={(e) => handleLogout(e)}>Logout</button>
            </>
            :
            <>
              <div>
                <p className="cursor-pointer">To View your details please Login</p>
              </div>
              <Link to='/auth' className="cursor-pointer text-center text-md text-decoration-none w-1/2 bg-darkGreen text-white p-2" style={{ backgroundColor: "#435334" }}>Login</Link>
            </>
        }
      </div>
    </div>
  )

}