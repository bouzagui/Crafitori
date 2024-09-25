import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navBar/Navbar';

const PaymentPage = () => {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;
  const paypalContainerRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPayPalScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = "https://www.paypal.com/sdk/js?client-id=AartfsAJihC78lPm8_kFqloOD0PwsFiiHQL2YmCYwMOAgaKc268HkeQiX8DyGQOGEalVATpZwBUSLWex";
        script.async = true;
        script.onload = () => {
          setIsScriptLoaded(true);
          resolve();
        };
        script.onerror = () => {
          setError('Failed to load PayPal SDK');
          reject();
        };
        document.body.appendChild(script);
      });
    };

    if (!isScriptLoaded) {
      loadPayPalScript().catch(console.error);
    }

    return () => {
      if (paypalContainerRef.current) {
        paypalContainerRef.current.innerHTML = '';
      }
    };
  }, [isScriptLoaded]);

  useEffect(() => {
    const renderPayPalButtons = () => {
      if (window.paypal && paypalContainerRef.current) {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: totalAmount.toFixed(2),
                },
              }],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              console.log('Payment completed successfully', details);
              window.location.href = '/success';
            });
          },
          onError: (err) => {
            console.error('PayPal Checkout Error: ', err);
            setError('Payment failed. Please try again.');
          }
        }).render(paypalContainerRef.current)
          .catch(err => {
            console.error('Failed to render PayPal buttons', err);
            setError('Failed to initialize payment system');
          });
      }
    };

    if (isScriptLoaded && paypalContainerRef.current) {
      renderPayPalButtons();
    }
  }, [isScriptLoaded, totalAmount]);

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="max-w-screen-lg mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl my-4 sm:my-6 lg:my-8">Error</h1>
          <p className="text-lg sm:text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl my-4 sm:my-6 lg:my-8 text-center">
          Complete Your Payment
        </h1>
        <p className="text-lg sm:text-xl text-center">
          Total Amount: ${totalAmount.toFixed(2)}
        </p>
        <div id="paypal-button-container" ref={paypalContainerRef} className="w-full mt-4"></div>
      </div>
    </div>
  );
};

export default PaymentPage;
