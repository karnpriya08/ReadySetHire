import { RESUME_UPLOAD_REQUEST, RESUME_UPLOAD_SUCCESS, RESUME_UPLOAD_FAIL } from "../actionTypes";
import API from '../../utils/axios';

// Upload Resume
const uploadResume = (file) => async (dispatch, getState) => {
    try {
        dispatch({ type: RESUME_UPLOAD_REQUEST });

        // Prepare the file data to be sent as multipart/form-data
        const formData = new FormData();
        formData.append('resume', file);

        // get user token from redux
        const {
            auth: { userInfo }
        } = getState();

        // include token in header for authentication
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                // 'Content-Type': 'multipart/form-data'
            }
        }
        //   POST request to upload resume 
        const { data } = await API.post('/users/upload-resume', formData, config)

        dispatch({
            type: RESUME_UPLOAD_SUCCESS,
            payload: data.resumePath
        })
        //    saving in local storage 
        localStorage.setItem('resumePath', JSON.stringify(data.resumePath));
        return data.resumePath;

    }
    // dispatching error
    catch (error) {
        dispatch({
            type: RESUME_UPLOAD_FAIL,
            payload:
                error?.response?.data?.message || 'Resume upload failed. Try again.',
        });
        throw error;
    }


}
export default uploadResume;