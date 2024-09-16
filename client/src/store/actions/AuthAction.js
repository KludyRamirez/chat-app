import { login as apiLogin } from '../../functions/authentication/Login';
import { register as apiRegister } from '../../functions/authentication/Register';
import toast from 'react-hot-toast';

export const AuthAction = {
  SET_USER_DETAILS: 'AUTH.SET_USER_DETAILS',
  LOGOUT: 'LOGOUT',
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails) => dispatch(register(userDetails)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  };
};

export const logout = () => ({
  type: AuthAction.LOGOUT,
});

export const setUserDetails = (userDetails) => {
  return {
    type: AuthAction.SET_USER_DETAILS,
    userDetails,
  };
};

const login = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await apiLogin(userDetails);
    if (response.error) {
      dispatch(toast.error(response?.exception?.response?.data.message));
    } else {
      const { userDetails } = response?.data;
      localStorage.setItem('user', JSON.stringify(userDetails));
      dispatch(setUserDetails(userDetails));
      navigate('/');
    }
  };
};

const register = (userDetails) => {
  return async () => {
    try {
      const response = await apiRegister(userDetails);
      if (response?.error) {
        toast.error(
          response?.exception?.response?.data?.message ||
            'An error occurred during registration.'
        );
      } else {
        toast.success(response?.data?.message || 'Registration successful.');
      }
    } catch (err) {
      toast.error('An error occurred during registration. Please try again.');
      console.error('Error on creating new user. Please try again.', err);
    }
  };
};
