import axios from 'axios';

const apiClient = axios.create({
   baseURL: 'http://localhost:8081/routemasterapi',
   timeout: 1000000,
   headers: {
      'Content-Type': 'application/json',
   },
});





apiClient.interceptors.response.use(
   (response) => {
      return response; // Return the full response object
   },
   (error) => {
      if (error.response) {
         console.error('HTTP Error:', error.response.status, error.response.data);
      } else if (error.request) {
         console.error('No response received from server:', error.request);
      } else {
         console.error('Error setting up request:', error.message);
      }
      return Promise.reject(error);
   }
);

export default apiClient;