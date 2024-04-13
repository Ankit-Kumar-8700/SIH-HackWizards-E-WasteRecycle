import React, { useEffect } from 'react'
import Table from '../components/Table'
import { useSelector, useDispatch } from 'react-redux'
import { getCollectorOrders } from '../redux/userSlice';
import Auth from '../components/auth';
import { useParams } from 'react-router-dom';


export const CollectorOrders = () => { 


    const { id } = useParams();
    const dispatch = useDispatch();
    const {orders} = useSelector((state)=> state.user);
  

  useEffect(() => {
      dispatch(getCollectorOrders(id));
  },[dispatch,id]);

  console.log(orders);


  return (
    <div className='h-screen flex flex-col pt-28 mx-8'>
        <h1>Collector's E-Waste</h1>
        <Table orders={orders} button="Verify and Recycle"/>
        <Auth/>
    </div>
  )
}
