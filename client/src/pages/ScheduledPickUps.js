import React, { useEffect } from 'react'
import Table from '../components/Table'
import { useSelector, useDispatch } from 'react-redux'
import { scheduledPickups } from '../redux/userSlice';
import Auth from '../components/auth';


export const ScheduledPickUps = () => { 


  const dispatch = useDispatch();

  const {orders} = useSelector((state)=> state.user);
  

  useEffect(() => {
      dispatch(scheduledPickups());
  },[dispatch]);

  console.log(orders);

  return (
    <div className='h-screen flex flex-col pt-28 mx-8'>
        <h1>Your Scheduled Pickups</h1>
        <Table orders={orders} button="MarkPickedUp"/>
        <Auth/>
    </div>
  )
}
