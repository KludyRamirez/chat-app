import apiClient from '../../api';

export const register = async (data) => {
  try {
    return await apiClient.post('/api/register', data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};
