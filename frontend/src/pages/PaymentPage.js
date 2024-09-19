// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const PaymentPage = () => {
//   const [ycPay, setYcPay] = useState(null);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { totalAmount } = location.state || {};

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://youcanpay.com/js/ycpay.js';
//     script.async = true;
//     script.onload = initializeYouCanPay;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const initializeYouCanPay = () => {
//     const ycPayInstance = new window.YCPay('pub_sandbox_0713df81-e7fc-42b4-8087-7c9c4', {
//       formContainer: '#payment-container',
//       locale: 'en',
//       isSandbox: true,  // Set to false for production
//       errorContainer: '#error-container'
//     });
//     setYcPay(ycPayInstance);
//     ycPayInstance.renderCreditCardForm();
//   };

//   const handlePayment = () => {
//     if (ycPay) {
//       ycPay.pay({
//         token: generateToken(),
//         sandbox: true,  // Set to false for production
//       })
//         .then(handlePaymentSuccess)
//         .catch(handlePaymentError);
//     }
//   };

//   const generateToken = () => {
//     // This is a simplified example. In a real application, you'd want to generate this on the server.
//     return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//   };

//   const handlePaymentSuccess = (response) => {
//     console.log('Payment successful:', response);
//     navigate('/payment-success');
//   };

//   const handlePaymentError = (error) => {
//     console.error('Payment failed:', error);
//     setError('Payment failed. Please try again.');
//   };

//   if (!totalAmount) {
//     return <div>No amount specified for payment.</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Payment</h2>
//       <div id="error-container"></div>
//       <div id="payment-container" className="mb-4"></div>
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <button
//         onClick={handlePayment}
//         className="bg-blue-500 text-white py-2 px-4 rounded"
//         disabled={!ycPay}
//       >
//         Pay ${totalAmount}
//       </button>
//     </div>
//   );
// };

// export default PaymentPage;






// // import React from 'react';
// // import { useLocation } from 'react-router-dom';
// // import PaymentForm from '../components/payment/PaymentForm';
// // import Navbar from '../components/navBar/Navbar';

// // const PaymentPage = () => {
// //   const location = useLocation();
// //   const totalAmount = location.state?.totalAmount || 0;  // Retrieve the total amount from the cart

// //   // Handle payment result based on success or failure
// //   const handlePaymentResult = (status) => {
// //     if (status === 'success') {
// //       window.location.href = '/success'; // Redirect to success page
// //     } else if (status === 'failure') {
// //       window.location.href = '/failure'; // Redirect to failure/error page
// //     }
// //   };

// //   return (
// //     <div>
// //         <Navbar />
// //         <div className="container mx-auto">
// //           <h1 className="text-4xl text-center my-8">Complete Your Payment</h1>
// //           <p className="text-xl text-center">Total Amount: ${totalAmount.toFixed(2)}</p>
          
// //           {/* Pass handlePaymentResult as a prop to PaymentForm */}
// //           <PaymentForm totalAmount={totalAmount} onPaymentComplete={handlePaymentResult} />
// //         </div>
// //     </div>
// //   );
// // };

// // export default PaymentPage;
