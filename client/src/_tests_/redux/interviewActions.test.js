import { describe, it, expect, vi, beforeEach } from 'vitest';
import API from '../../utils/axios';
import {
  scheduleInterview,
  fetchUserInterviews,
} from '../../redux/actions/interviewActions';
import * as actionTypes from '../../redux/actionTypes';

vi.mock('../../utils/axios');

const mockDispatch = vi.fn();
const mockGetState = () => ({
  auth: {
    userInfo: { token: 'mock-token' },
  },
});

beforeEach(() => {
  vi.clearAllMocks();
});

it('dispatches INTERVIEW_SCHEDULE_SUCCESS on successful interview scheduling', async () => {
    const mockData = { interview: { id: '123', title: 'Mock Interview' } };
    API.post.mockResolvedValue({ data: mockData });
  
    await scheduleInterview({ title: 'Mock Interview' })(mockDispatch, mockGetState);
  
    expect(mockDispatch).toHaveBeenCalledWith({ type: actionTypes.INTERVIEW_SCHEDULE_REQUEST });
  
    expect(API.post).toHaveBeenCalledWith(
      '/interviews',
      { title: 'Mock Interview' },
      {
        headers: {
          Authorization: 'Bearer mock-token',
          'Content-Type': 'application/json',
        },
      }
    );
  
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actionTypes.INTERVIEW_SCHEDULE_SUCCESS,
      payload: mockData.interview,
    });
  });

//   scheduleInterview failure
it('dispatches INTERVIEW_SCHEDULE_FAIL on API error', async () => {
    API.post.mockRejectedValue({ response: { data: { message: 'Failed to schedule' } } });
  
    await scheduleInterview({ title: 'Error Interview' })(mockDispatch, mockGetState);
  
    expect(mockDispatch).toHaveBeenCalledWith({ type: actionTypes.INTERVIEW_SCHEDULE_REQUEST });
  
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actionTypes.INTERVIEW_SCHEDULE_FAIL,
      payload: 'Failed to schedule',
    });
  });