import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../components/axios/axiosInstance';
import Navbar from '../components/navBar/Navbar';
import ProductCard from '../components/products/ProductCard';

const SellerProfile = () => {
  const { seller_id } = useParams();
  const [sellerData, setSellerData] = useState(null);  // Initial state is null to handle loading

  useEffect(() => {
    axiosInstance.get(`/profile/${seller_id}/`)
      .then(response => {
        setSellerData(response.data);  // Make sure this matches the actual API response structure
      })
      .catch(error => console.error('Error fetching seller data:', error));
  }, [seller_id]);

  // Display a loading message while the data is being fetched
  if (!sellerData) {
    return <div>Loading...</div>;
  }

  // Display the seller's profile once the data has been fetched
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg text-text">
        <h2 className="text-4xl font-bold font-Poppins mb-6 text-center text-text">Seller Profile</h2>
        <div className="text-center">
          <img 
            src={sellerData.image} 
            alt={`${sellerData.user.fullname}`} 
            className="w-32 h-32 rounded-full mx-auto" 
          />
          <h3 className="text-2xl font-semibold mt-4">{sellerData.user.fullname}</h3>
          <p className="mt-2">{sellerData.bio}</p>
        </div>
        <div className="mt-4 text-center">
          <h4 className="text-lg font-bold">Email:</h4>
          <p>{sellerData.user.email}</p>
        </div>
        <div className="mt-4 text-center gap-4">
          <h4 className="text-lg font-bold mb-4">Products:</h4>

          {sellerData.user.products.length > 0 ? (
            <ProductCard 
              data={sellerData.user.products.map(product => ({
                id: product.id,
                img: '',  // If no image is available for the product
                name: product.title,
                price: `$${product.price}`,
                oldprice: '', // Handle old price if needed
              }))} 
            />
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
