import React, { useEffect, useState } from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Pickup from '../components/Pickup';
import Process from '../components/Process';
import Stats from '../components/Stats';
import Main from '../components/Main';
import Auth from '../components/auth';
import Service from '../components/Services';

import { useSelector } from 'react-redux';

export const Home = () => {


  const [user, setUser] = useState(null);

  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [isAuthenticated]);


  
  return (
    <div>
      <Main/>
      <Stats/>
      <div className='flex border-2'>
        <Process/>
        {(!user || user?.role === 'user') && <Pickup/> }
      </div>
        <Service/>
      <Contact/>
      <Auth/>
    </div>
  )
}


export default Home;