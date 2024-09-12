import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentForm from '../components/payment/PaymentForm';
import Navbar from '../components/navBar/Navbar';

const PaymentPage = () => {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;  // Retrieve the total amount from the cart

  return (
    <div>
        <Navbar />
        <div className="container mx-auto">
          <h1 className="text-4xl text-center my-8">Complete Your Payment</h1>
          <p className="text-xl text-center">Total Amount: ${totalAmount.toFixed(2)}</p>
          <PaymentForm totalAmount={totalAmount} />
        </div>
    </div>
  );
};

export default PaymentPage;
