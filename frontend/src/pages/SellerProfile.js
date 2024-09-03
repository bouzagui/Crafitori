import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../components/axios/axiosInstance';
import Navbar from '../components/navBar/Navbar';
// import ProductCard from '../components/products/ProductCard';
import ProductCard from '../components/products/ProductCard'
import Product_1 from '../assets/products/produt_1.jpg'
import Product_2 from '../assets/products/produt_2.jpg'
import Product_3 from '../assets/products/produt_3.jpg'
import Product_4 from '../assets/products/produt_4.jpg'
// import BestSelllingT from '../Titells/BestSelllingT'


const ProductData = [
    { id: 1, img: Product_1, name: ``, price: `$100.00`, oldprice: '$252.23', aosDekay: "0", url: `/product/1`},
    { id: 2, img: Product_2, name: ``, price: `$50.32`, oldprice: '$90.55', aosDekay: "200", url: `/product/2`},
    { id: 3, img: Product_3, name: ``, price: `$25.14`, oldprice: '$100.55', aosDekay: "400", url: `/product/3`},
    { id: 3, img: Product_4, name: ``, price: `$548.56`, oldprice: '$800.99', aosDekay: "400", url: `/product/4`},
    { id: 5, img: Product_1, name: ``, price: `$100.00`, oldprice: '$252.23', aosDekay: "0", url: `/product/5`},
    { id: 6, img: Product_2, name: ``, price: `$50.32`, oldprice: '$90.55', aosDekay: "200", url: `/product/6`},
    { id: 7, img: Product_3, name: ``, price: `$25.14`, oldprice: '$100.55', aosDekay: "400", url: `/product/7`},
    { id: 8, img: Product_4, name: ``, price: `$548.56`, oldprice: '$800.99', aosDekay: "400", url: `/product/8`}
]


const SellerProfile = () => {
  const { seller_id } = useParams();
  const [sellerData, setSellerData] = useState({});
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/profile/${seller_id}/`)
      .then(response => {
        setSellerData(response.data);
        // setProducts(response.data.products);
      })
      .catch(error => console.error('Error fetching seller data:', error));
  }, [seller_id]);


  return (
    <div>
    <Navbar />
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg text-text">
        <h2 className="text-4xl font-bold font-Poppins mb-6 text-center text-text">Seller Profile</h2>
        <form className="space-y-4">
        <div>
            <label className="block text-gray-700 font-bold mb-2">First Name:</label>
            <input
            type="text"
            name="first_name"
            value={sellerData.first_name}
            // onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
            />
        </div>
        <div>
            <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
            <input
            type="text"
            name="last_name"
            value={sellerData.last_name}
            // onChange={handleChange}
            className=" w-full   px-3 py-2 border  border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>

        {/* Add more fields as needed */}
        {/* <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
            Update Profile
        </button> */}
        </form>
        {/* {message && <p className="mt-4 text-center text-green-500">{message}</p>} */}

    </div>
    <div className='mt-10 gap-2'>
          {/* products */}
          <ProductCard data={ProductData}/>
    </div>
</div>
  );
};

export default SellerProfile;