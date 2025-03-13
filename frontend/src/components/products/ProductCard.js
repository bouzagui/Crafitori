import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ data }) => {
  const navigate = useNavigate();

  const handleBuyNow = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className='mb-10'>
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center p-10 rounded-2xl bg-white">
        {data && data.length > 0 ? data.map((item) => (
          <div key={item.id} className="bg-white p-4 shadow rounded relative border transform transition-all duration-300 hover:scale-110">
            <div className="group">
              <img src={item.img} alt={item.name} className="w-48 h-48 object-contain mb-4" />

              <div className='hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center group-hover:backdrop-blur-sm justify-center items-center duration-200'>
                <button onClick={() => handleBuyNow(item.id)} className='bg-secondary text-3xl font-Poppins font-medium text-white px-7 py-1 rounded-full'>Details</button>
              </div>
            </div>

            <h3 className='text-text text-lg font-semibold font-Poppins'>{item.name}</h3>
            <p>{item.price}</p>

            <div className='flex items-center mt-2'>
              <FaStar className='text-yellow-500' />
              <FaStar className='text-yellow-500' />
              <FaStar className='text-yellow-500' />
              <FaStar className='text-yellow-500' />
              <FaStar className='text-yellow-500' />
            </div>

            <div className='absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-secondaryBlack group text-white text-sm rounded-full hover:bg-secondary hover:w-32 transition-all'>
              <span className='group-hover:hidden'>+</span>
              <button onClick={() => handleBuyNow(item.id)} className='hidden group-hover:block'>
                Add to Cart
              </button>
            </div>
          </div>
        )) : <p>No products available</p>}
      </div>
    </div>
  );
};

export default ProductCard;
