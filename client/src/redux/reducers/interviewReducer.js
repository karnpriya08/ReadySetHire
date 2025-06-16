
import {
  INTERVIEW_SCHEDULE_REQUEST, INTERVIEW_SCHEDULE_SUCCESS, INTERVIEW_SCHEDULE_FAIL,
  FETCH_INTERVIEWS_REQUEST, FETCH_INTERVIEWS_SUCCESS, FETCH_INTERVIEWS_FAIL
} from "../actionTypes";

// FOR SCHEDULING OFFER
const scheduleInitialState = {
  loading: false,
  success: false,
  error: null,
  interview: null,
};

export const interviewScheduleReducer = (state = scheduleInitialState, action) => {
  switch (action.type) {
    case INTERVIEW_SCHEDULE_REQUEST:
      return { ...state, loading: true, success: false, error: null };

    case INTERVIEW_SCHEDULE_SUCCESS:
      return { ...state, loading: false, success: true, interview: action.payload };

    case INTERVIEW_SCHEDULE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// for fetching interviews (completed/upcoming)
const listInitialState = {
  loading: false,
  interviews: [],
  error: null
};

export const interviewListReducer = (state = listInitialState, action) => {
  switch (action.type) {
    case FETCH_INTERVIEWS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_INTERVIEWS_SUCCESS:
      return { loading: false, interviews: action.payload, error: null };

    case FETCH_INTERVIEWS_FAIL:
      return { loading: false, error: action.payload, interviews: [] };

    default:
      return state;
  }
};