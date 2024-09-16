import apiClient from '../../api';

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
