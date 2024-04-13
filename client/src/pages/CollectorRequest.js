import React, { useEffect, useState } from 'react'
import { fetchCollectors } from '../api/api';
import { Link} from "react-router-dom";



import Auth from '../components/auth';
import user from "../img/user.png";



const Card = ({ _id, name, email, img, city, address }) => {
  return (
<div class="w-full max-w-sm  border  rounded-lg shadow bg-gray-800 border-gray-700">
    <div class="flex flex-col items-center py-10">
        <img class="w-32 h-32 mb-3 rounded-full shadow-lg" src={img} alt="Bonnieimage"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
      <p className="text-gray-300">Email: {email}</p>
         <p className="text-gray-300">Address: {address}</p>
         <p className="text-gray-300">City: {city}</p>
        <div class="flex mt-4 space-x-3 md:mt-6">
        <Link to = {`/ordersOfCollector/${_id}`}
          className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out inline-block text-decoration-none"
        >
          View Details
         </Link>
        </div>
    </div>
</div>

  );
};



export const CollectorRequest = () => { 

  const [collectors,setCollectors] = useState([]);

  useEffect(() => {

    const getCollectors = async() => {
      const {data}  = await fetchCollectors();
      setCollectors(data);  
    }

   getCollectors();

  },[]);

  console.log(collectors);

  
  return (
    <div className='h-screen flex flex-col pt-28 mx-8'>
        <h1>Request of Collectors</h1>

          {collectors?.map((collector) => <Card {...collector} img={user}/>)}

        <Auth/>
    </div>
  )
}
