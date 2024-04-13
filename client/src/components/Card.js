import React from 'react';

const Card = ({img,title ,content}) => {
  return (
    <div className=" bg-white shadow-md rounded-md overflow-hidden flex flex-col justify-center items-center mb-8 p-4">
      <img src={img} alt="CardImage" className='h-32 w-32 object-cover' />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{content}</p>
        <div className="mt-4">
          <button className="px-4 py-2 bg-darkGreen text-white rounded hover:bg-secondary">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
