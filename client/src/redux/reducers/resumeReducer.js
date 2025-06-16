import { REGISTER_REQUEST, RESUME_UPLOAD_SUCCESS, RESUME_UPLOAD_FAIL, RESUME_UPLOAD_REQUEST } from "../actionTypes";

const initialState = {
    loading: false,
    resumePath: '',
    error: null
}

export const resumeReducer = (state = initialState, action) => {

    switch (action.type) {
        case RESUME_UPLOAD_REQUEST:
            return { ...state, loading: true };

        case RESUME_UPLOAD_SUCCESS:
            return { loading: false, resumePath: action.payload, error: null };

        case RESUME_UPLOAD_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }

}