import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axiosInstance from '../axios/axiosInstance';
import Navbar from '../navBar/Navbar';

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const ordersResponse = await axiosInstance.get('/orders/');
        setOrders(ordersResponse.data);

        const salesResponse = await axiosInstance.get('/sales/');
        setSalesData(salesResponse.data);
      } catch (error) {
        setError('Failed to load dashboard data');
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Seller Dashboard</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* New Orders Section */}
        <section className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">New Orders</h2>
          {orders.length > 0 ? (
            <ul className="space-y-2">
              {orders.map(order => (
                <li key={order.id} className="p-3 sm:p-4 bg-gray-100 rounded-md">
                  <p className="text-sm sm:text-base">Order ID: {order.id}</p>
                  <p className="text-sm sm:text-base">Product: {order.product_title}</p>
                  <p className="text-sm sm:text-base">Quantity: {order.quantity}</p>
                  <p className="text-sm sm:text-base">Total: ${order.total_price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No new orders at the moment.</p>
          )}
        </section>

        {/* Sales Data Section */}
        <section className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Sales Data</h2>
          {salesData ? (
            <div className="p-3 sm:p-4 bg-gray-100 rounded-md">
              <p className="text-sm sm:text-base">Total Sales: {salesData.total_sales}</p>
              <p className="text-sm sm:text-base">Products Sold: {salesData.products_sold}</p>
            </div>
          ) : (
            <p className="text-gray-500">Sales data not available.</p>
          )}
        </section>

        {/* Create New Product Button */}
        <div className="text-center">
          <Link to="/create-product">
            <button className="px-3 sm:px-4 py-2 sm:py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 text-sm sm:text-base">
              Create New Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
