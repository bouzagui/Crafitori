// import React, { useEffect } from 'react';
// import axiosInstance from '../axios/axiosInstance';

// const PayPalCheckout = () => {
//   const orderData = {
//     order_id: undefined, // To be populated by the backend
//     paypal_order_id: '', // PayPal order ID
//   };

//   // Function to dynamically load PayPal SDK
//   const loadPayPalScript = () => {
//     const script = document.createElement('script');
//     script.src = 'https://www.paypal.com/sdk/js?client-id=AartfsAJihC78lPm8_kFqloOD0PwsFiiHQL2YmCYwMOAgaKc268HkeQiX8DyGQOGEalVATpZwBUSLWex';
//     script.async = true;
//     script.onload = () => initializePayPalButtons();
//     document.body.appendChild(script);
//   };

//   // Initialize PayPal buttons and set up the order flow
//   const initializePayPalButtons = () => {
//     window.paypal.Buttons({
//       createOrder: async (data, actions) => {
//         try {
//           // Fetch cart data or order details dynamically
//           const cart = [{ product_id: 6, quantity: 1 }];

//           // 1. Send the cart data to your backend to create the Order object
//           const res = await axiosInstance.post('/checkout/', { cart });

//           if (res.data.error) {
//             alert('Error creating order: ' + res.data.error);
//             throw new Error(res.data.error);
//           }

//           orderData.order_id = res.data.order_id;

//           // 2. Create a PayPal order using the order_id from the backend
//           const paypalOrderRes = await axiosInstance.post(`/checkout/create-paypal-order/?order_id=${orderData.order_id}`);

//           if (paypalOrderRes.data.error) {
//             alert('Error creating PayPal order: ' + paypalOrderRes.data.error);
//             throw new Error(paypalOrderRes.data.error);
//           }

//           orderData.paypal_order_id = paypalOrderRes.data.paypal_order_id;
//           return paypalOrderRes.data.paypal_order_id;  // Return the PayPal order ID
//         } catch (error) {
//           console.error('Error creating PayPal order:', error);
//           throw error;
//         }
//       },

//       onApprove: async (data, actions) => {
//         try {
//           // Capture the PayPal order using the PayPal order ID
//           const captureRes = await axiosInstance.post('/checkout/capture-paypal-order/', { orderData });

//           if (captureRes.data.status === 'success') {
//             alert('Transaction completed by ' + captureRes.data.details.payer.name.given_name);
//           } else {
//             alert('Transaction failed: ' + captureRes.data.message);
//           }
//         } catch (error) {
//           console.error('Error capturing PayPal order:', error);
//           alert('Error capturing PayPal order');
//         }
//       },
//     }).render('#paypal-button-container');  // Render PayPal buttons
//   };

//   // Load PayPal SDK and initialize buttons when component mounts
//   useEffect(() => {
//     loadPayPalScript();
//   }, []);

//   return (
//     <div>
//       <h1>PayPal Checkout</h1>
//       <div id="paypal-button-container"></div>
//     </div>
//   );
// };

// export default PayPalCheckout;
