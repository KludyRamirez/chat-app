import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  withCredentials: true,
});

// export const handleCsrfToken = async () => {
//   try {
//     const res = await apiClient.get(`/api/csrf-token`, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return res?.data?.csrfToken;
//   } catch (error) {
//     console.error(
//       'Error getting CSRF token. Please reload the browser.',
//       error
//     );
//     throw error;
//   }
// };

// handleCsrfToken()
//   .then((csrfToken) => {
//     apiClient.defaults.headers.common['X-CSRF-Token'] = csrfToken;
//     apiClient.defaults.headers.common['Content-Type'] = 'application/json';
//   })
//   .catch((error) => {
//     console.error('CSRF token not found in cookies', error);
//   });

export const login = async (data) => {
  try {
    return await apiClient.post('/api/login', data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data, authToken) => {
  try {
    return await apiClient.post('/api/register', data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export default apiClient;
