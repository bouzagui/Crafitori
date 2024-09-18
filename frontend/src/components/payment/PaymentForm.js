// import React, { useState } from 'react';
// import { createPaymentToken } from '../axios/axiosInstance';
// import { loadYouCanPay } from './youCanPay';

// const PaymentForm = ({ totalAmount, onPaymentResult }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//   });
//   const [loading, setLoading] = useState(false);  // Added state for loading
//   const [error, setError] = useState(null);       // State for error handling

//   // Handles form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Submits the form and processes payment
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.name || !formData.email) {
//       setError('Please fill in all required fields.');
//       return;
//     }
    
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await createPaymentToken({
//         order_id: 'order123',  // Replace this with a dynamic order ID in real-world use
//         amount: totalAmount * 100,  // Convert amount to cents (smallest currency unit)
//         currency: 'USD',
//         customer_ip: '123.123.123.123',  // Use dynamic IP in real-world scenarios
//         success_url: 'http://localhost:3000/success',  // Replace with your real success URL
//         error_url: 'http://localhost:3000/error',      // Replace with your real error URL
//         customer_info: {
//           name: formData.name,
//           email: formData.email,
//         },
//       });

//       const { token } = response.data;
//       loadYouCanPay(token)
//         .then(() => onPaymentResult('success'))  // Call on success
//         .catch(() => onPaymentResult('failure'));  // Call on failure

//     } catch (error) {
//       console.error('Error creating payment token:', error);
//       onPaymentResult('failure');  // Handle failure case
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 bg-white shadow-md">
//       <h2 className="text-2xl mb-4">Complete Your Payment</h2>
      
//       {/* Name input */}
//       <div className="mb-4">
//         <label className="block text-gray-700">Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />
//       </div>

//       {/* Email input */}
//       <div className="mb-4">
//         <label className="block text-gray-700">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />
//       </div>

//       {/* Error Message */}
//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {/* Loading Button */}
//       <button 
//         type="submit" 
//         className="w-full bg-blue-500 text-white py-2 rounded" 
//         disabled={loading}
//       >
//         {loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;
