import API from '../../utils/axios';
import { INTERVIEW_SCHEDULE_REQUEST, INTERVIEW_SCHEDULE_SUCCESS, INTERVIEW_SCHEDULE_FAIL } from '../actionTypes';
import { FETCH_INTERVIEWS_REQUEST, FETCH_INTERVIEWS_SUCCESS, FETCH_INTERVIEWS_FAIL } from '../actionTypes';

// schedule interview 
export const scheduleInterview = (interviewData) => async (dispatch, getState) => {
  try {
    dispatch({ type: INTERVIEW_SCHEDULE_REQUEST });

    // get looged-in user's token from redux 
    const {
      auth: { userInfo },
    } = getState();

     // Prepare headers for the API call
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      }
    }
    // console.log("Redux token:", userInfo?.token);

    // POST request for interview schedule
    const { data } = await API.post('/interviews', interviewData, config)
    dispatch({
      type: INTERVIEW_SCHEDULE_SUCCESS,
      payload: data.interview
    })
  }
  catch (error) {
    dispatch({
      type: INTERVIEW_SCHEDULE_FAIL,
      payload: error.response?.data?.message || error.message
    })

  }
}

// get user interviews
export const fetchUserInterviews = (status = 'upcoming') => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_INTERVIEWS_REQUEST });

    // Get the current user's token from Redux
    const {
      auth: { userInfo }
    } = getState();
// Include token in headers for authentication
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      }
    };
// GET request for fetching interview
    const { data } = await API.get(`/interviews?status=${status}`, config);

    dispatch({
      type: FETCH_INTERVIEWS_SUCCESS,
      payload: data
    });
    // handle error 
  } catch (error) {
    dispatch({
      type: FETCH_INTERVIEWS_FAIL,
      payload: error.response?.data?.message || 'Failed to fetch interviews'
    });
  }
};