<<<<<<< HEAD
/* global YCPay */
export const loadYouCanPay = (token) => {
    const ycPay = new YCPay('pub_sandbox_0713df81-e7fc-42b4-8087-7c9c4', {
      formContainer: '#payment-container',
      locale: 'en',
      isSandbox: true,  // Change to false for production
      errorContainer: '#error-container',
      token,
    });
  
    ycPay.renderCreditCardForm();
  
    // Handle payment on form submission
    document.getElementById('pay').addEventListener('click', () => {
      ycPay.pay(token)
        .then((response) => {
          console.log('Payment successful:', response);
          // Redirect or show success message
        })
        .catch((error) => {
          console.error('Payment failed:', error);
          // Handle error
        });
    });
    
  };
=======
// /* global YCPay */
// export const loadYouCanPay = (token) => {
//   const ycPay = new YCPay('pub_sandbox_0713df81-e7fc-42b4-8087-7c9c4', {
//     formContainer: '#payment-container',
//     locale: 'en',
//     isSandbox: true,
//     errorContainer: '#error-container',
//     token,
//   });

//   ycPay.renderCreditCardForm();

//   document.getElementById('pay').addEventListener('click', () => {
//     ycPay.pay(token)
//       .then((response) => {
//         console.log('Payment successful:', response);
//         window.location.href = 'http://localhost:3000/success'; // Redirect on success
//       })
//       .catch((error) => {
//         console.error('Payment failed:', error);
//         document.getElementById('error-container').innerHTML = 'Payment failed, please try again';
//       });
//   });
// };
>>>>>>> 37d074c8dd3e05c499535927240d1e9e16302484
  