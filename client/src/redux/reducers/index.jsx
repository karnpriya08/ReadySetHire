import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { interviewScheduleReducer, interviewListReducer } from './interviewReducer';
import userReducer from './userReducer';
import { resumeReducer } from './resumeReducer';

// combine reducer 
const rootReducer = combineReducers({
    auth: authReducer,
    interview: interviewScheduleReducer,
    interviewList: interviewListReducer,
    user: userReducer,
    resume: resumeReducer
});

export default rootReducer;