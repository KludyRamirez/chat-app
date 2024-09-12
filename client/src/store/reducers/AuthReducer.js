import { AuthAction } from '../actions/AuthAction';

const initState = {
  userDetails: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AuthAction.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    case AuthAction.LOGOUT:
      return {
        ...state,
        userDetails: null,
      };
    default:
      return state;
  }
};

export default authReducer;
