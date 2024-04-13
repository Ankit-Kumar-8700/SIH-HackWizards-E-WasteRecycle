import React, { useEffect } from 'react'
import Table from '../components/Table'
import { useSelector, useDispatch } from 'react-redux'
import { availablePickups } from '../redux/userSlice';
import Auth from '../components/auth';


export const AvailablePickups = () => { 


  const dispatch = useDispatch();

  const {orders} = useSelector((state)=> state.user);
  

  useEffect(() => {
      dispatch(availablePickups());
  },[dispatch]);


 const head = ["userid", "date", "qty", "btn"];
  return (
    <div className='h-screen flex flex-col pt-28 mx-8'>
        <h1>Available Pickups</h1>
        <Table orders={orders} button="Accept"/>
        <Auth/>
    </div>
  )
}
