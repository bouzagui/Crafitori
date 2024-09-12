import React, { useState } from 'react';
import { createPaymentToken } from '../axios/axiosInstance';
import { loadYouCanPay } from './youCanPay'; 

const PaymentForm = ({ totalAmount }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await createPaymentToken({
        order_id: 'order123',
        amount: totalAmount * 100,  // Convert to smallest currency unit
        currency: 'USD',
        customer_ip: '123.123.123.123',
        success_url: 'http://localhost:3000/success',
        error_url: 'http://localhost:3000/error',
        customer_info: {
          name: formData.name,
          email: formData.email,
        },
      });
      
      const { token } = response.data;
      loadYouCanPay(token);
      
    } catch (error) {
      console.error('Error creating payment token:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 bg-white shadow-md">
      <h2 className="text-2xl mb-4">Payment Form</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Pay Now</button>
    </form>
  );
};

export default PaymentForm;
