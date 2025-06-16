import {
  LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL,REGISTER_RESET, LOGOUT

} from "../actionTypes";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  success: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null, success: false };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload.user || action.payload,
        token: action.payload.token || null,
      };

    case REGISTER_SUCCESS:
      return { ...state, loading: false, success: true, };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload,success: false };

      case REGISTER_RESET:
  return { ...state, success: false };
  
    case LOGOUT:
      return { userInfo: null, token: null, loading: false, error: null };

    default:
      return state;
  }
};
