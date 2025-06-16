import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL } from "../actionTypes";

export const initialState = {
    loading: false,
    user: {}, 
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
        case USER_PROFILE_REQUEST:
            return { ...state, loading: true, error: null };

        case USER_UPDATE_SUCCESS:
        case USER_PROFILE_SUCCESS:
            // Store the user data in Redux and localStorage
            localStorage.setItem('userProfile', JSON.stringify(action.payload));
            return { ...state, loading: false, user: action.payload };

        case USER_UPDATE_FAIL:
        case USER_PROFILE_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default userReducer;