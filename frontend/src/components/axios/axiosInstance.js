import axios from 'axios';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Make sure the API URL is correct
  headers: {
    'Content-Type': 'application/json',  // Default content type for most requests
  },
});

// Add a request interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Add token if available
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);  // Handle the error
  }
);

// Add a response interceptor to handle token expiration (optional)
axiosInstance.interceptors.response.use(
  (response) => response,  // If the response is successful, return it as is
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (token expired or invalid)
      // You can log out the user or refresh the token here
      localStorage.removeItem('access_token');
      window.location.href = '/login';  // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export const createPaymentToken = (paymentData) => {
  return axiosInstance.post('/create-payment-token', paymentData);
};

export default axiosInstance;




// import axios from 'axios';

// // Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8000/api', 
// });

// // Add a request interceptor to include the Authorization header
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
