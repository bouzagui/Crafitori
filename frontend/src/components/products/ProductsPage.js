import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance'; 
import Navbar from '../navBar/Navbar';
import { FaStar } from 'react-icons/fa';
import { handleAddToCart } from '../../context/handleAddToCart'
import { CartContext } from '../../context/CartContext';


const ProductsPage = () => {
  const { subcategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [clickedProductId, setClickedProductId] = useState(null);


  useEffect(() => {
      axiosInstance.get(`/products/subcategory/${subcategoryId}/`)
          .then(response => {
            console.log('API Response:', response.data); 
            setProducts(response.data);
            setLoading(false);
          })
          .catch(error => {
              console.error('Error fetching products:', error);
              setLoading(false);
          });
  }, [subcategoryId]);
  console.log(products.data);

  if (loading) {
      return <div className='flex justify-center font-Poppins text-7xl font-bold'>Loading...</div>;
  }

  const handleBuyNow = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCartClick = (item) => {
    setClickedProductId(item.id); // Disable the button for this product
    handleAddToCart(item, 1, addToCart); // Call the cart function
    setTimeout(() => setClickedProductId(null), 1000); // Re-enable after 1 second
  };

  return (
    <div>
      <div className='mb-10'>
        <Navbar />
      </div>
      <div className='lg:max-w-7xl md:max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl'>
        <h1 className='flex justify-start text-text font-Poppins font-semibold text-center text-3xl mb-10'>
        {products.length > 0 ? products[0].name : 'No Products Available'}
        </h1>

        
        <div className=" flex justify-center items-center gap-4 flex-wrap">
          {products.map((item) => (
          <div className=' bg-white p-4 shadow rounded relative border transform transition-all duration-300 hover:scale-110'>
            {/* Check if images exist and display the first image */}
            <div className='group'>
              <img
                src={item.images && item.images.length > 0 ? item.images[0].image : 'placeholder.jpg'}
                alt={item.title}
                className='w-48 h-48 object-contain mb-4'/>
                  <div className='hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full text-center groub-hover:backdrop-blur-sm justify-center items-center duration-200'>
                      <button onClick={() => handleBuyNow(item.id)} className='bg-secondary text-3xl font-Poppins font-medium  text-white px-7 py-1 rounded-full'>Details</button>
                  </div>
            </div> 
            <h3 className='text-text text-lg font-Poppins'>{item.title}</h3>
            <p>{item.price}</p>
            <div className='flex items-center mt-2'>
              <FaStar className='text-yellow-500'/>
              <FaStar className='text-yellow-500'/>
              <FaStar className='text-yellow-500'/>
              <FaStar className='text-yellow-500'/>
              <FaStar className='text-yellow-500'/>
            </div>
            <div className='absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-secondaryBlack group text-white text-sm rounded-full hover:bg-secondary hover:w-32 transition-all'>
              <span className='group-hover:hidden'>+</span>
              <button onClick={() => handleAddToCartClick(item)}
              className='hidden group-hover:block'>
                {clickedProductId === item.id ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage;

// {/* <div className='mb-10'>
// <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
//   {products.map((item) => (
//     <div key={item.id} className="group border rounded-lg overflow-hidden shadow-md hover:shadow-xl">
//       <div className="relative">
//         {/* Check if images exist and display the first image */}
//         <img 
//           src={item.images && item.images.length > 0 ? item.images[0].image : 'placeholder.jpg'} 
//           alt={item.title} 
//           className="h-[180px] w-[260px] object-cover rounded-md"
//         />
//         <div className='hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200'>
//           <Link to={`/product/${item.id}`} className='bg-secondary text-3xl font-Poppins font-medium text-white px-7 py-1 rounded-full'>Add To Cart</Link>
//         </div>
//       </div>
//       <div className="leading-7">
//         <h3 className="font-semibold text-lg text-text flex justify-start pl-2 pt-2">{item.title}</h3>
//         <div className='flex gap-2'>
//           <p className="font-semibold text-lg text-text flex justify-start pl-2 pt-2">{item.price}</p>
//           <h3 className="font-light text-m text-primaryBlackHover flex justify-start pl-2 pt-2 items-center line-through">{item.oldprice}</h3>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>
// </div> */}