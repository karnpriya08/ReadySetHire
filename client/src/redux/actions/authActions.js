import API from '../../utils/axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT } from '../actionTypes';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';

// for register 
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
        // POST request for register user
        const { data } = await API.post('/auth/register', { name, email, password })
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data
        })
    }
    // error handling dispatch
    catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message,
        })
    }
}
// Login 
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })
        // POST request for login 
        const { data } = await API.post('/auth/login', { email, password })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
        // saving in local storage 
        localStorage.setItem('token', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data.user));
    }
    // handling error dispatch
    catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response?.data?.message || err.message
        })
    }
}
// logout 
export const logout = () => async (dispatch) => {
    try {
        // Clear Firebase session if user is signed in via Google
        await signOut(auth);
    } catch (error) {
        console.warn("Firebase sign-out skipped or failed:", error.message);
    }
    // Clear Redux and localStorage
    dispatch({ type: LOGOUT });
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem("userProfile");
};