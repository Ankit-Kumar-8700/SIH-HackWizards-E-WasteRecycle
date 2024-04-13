import React, { useEffect } from 'react'
import Table from '../components/Table'
import { useSelector, useDispatch } from 'react-redux'
import { alreadyPickedUp } from '../redux/userSlice';

import Auth from '../components/auth';


export const History = () => { 


  const dispatch = useDispatch();

  const {orders} = useSelector((state)=> state.user);
  

  useEffect(() => {
      dispatch(alreadyPickedUp());
  },[dispatch]);


  return (
    <div className='h-screen flex flex-col pt-28 mx-8'>
        <h1>History of your orders</h1>
        <Table orders={orders}/>
        <Auth/>
    </div>
  )
}
