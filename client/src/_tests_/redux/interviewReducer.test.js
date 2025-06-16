import { describe, it, expect } from 'vitest';
import {
  INTERVIEW_SCHEDULE_REQUEST,
  INTERVIEW_SCHEDULE_SUCCESS,
  INTERVIEW_SCHEDULE_FAIL,
  FETCH_INTERVIEWS_REQUEST,
  FETCH_INTERVIEWS_SUCCESS,
  FETCH_INTERVIEWS_FAIL
} from '../../redux/actionTypes';

import {
  interviewScheduleReducer,
  interviewListReducer
} from '../../redux/reducers/interviewReducer';

describe('Interview Schedule Reducer', () => {
  const initialScheduleState = {
    loading: false,
    success: false,
    error: null,
    interview: null,
  };

  it('should handle INTERVIEW_SCHEDULE_REQUEST', () => {
    const action = { type: INTERVIEW_SCHEDULE_REQUEST };
    const result = interviewScheduleReducer(initialScheduleState, action);
    expect(result).toEqual({ ...initialScheduleState, loading: true });
  });

  it('should handle INTERVIEW_SCHEDULE_SUCCESS', () => {
    const payload = { id: 1, title: 'Mock Interview' };
    const action = { type: INTERVIEW_SCHEDULE_SUCCESS, payload };
    const result = interviewScheduleReducer(initialScheduleState, action);
    expect(result).toEqual({
      ...initialScheduleState,
      loading: false,
      success: true,
      interview: payload
    });
  });

  it('should handle INTERVIEW_SCHEDULE_FAIL', () => {
    const action = { type: INTERVIEW_SCHEDULE_FAIL, payload: 'Error scheduling' };
    const result = interviewScheduleReducer(initialScheduleState, action);
    expect(result).toEqual({
      ...initialScheduleState,
      loading: false,
      error: 'Error scheduling'
    });
  });
});

describe('Interview List Reducer', () => {
  const initialListState = {
    loading: false,
    interviews: [],
    error: null
  };

  it('should handle FETCH_INTERVIEWS_REQUEST', () => {
    const action = { type: FETCH_INTERVIEWS_REQUEST };
    const result = interviewListReducer(initialListState, action);
    expect(result).toEqual({ ...initialListState, loading: true });
  });

  it('should handle FETCH_INTERVIEWS_SUCCESS', () => {
    const interviews = [{ id: 1, title: 'Upcoming' }];
    const action = { type: FETCH_INTERVIEWS_SUCCESS, payload: interviews };
    const result = interviewListReducer(initialListState, action);
    expect(result).toEqual({ loading: false, interviews, error: null });
  });

  it('should handle FETCH_INTERVIEWS_FAIL', () => {
    const action = { type: FETCH_INTERVIEWS_FAIL, payload: 'Failed to fetch' };
    const result = interviewListReducer(initialListState, action);
    expect(result).toEqual({ loading: false, interviews: [], error: 'Failed to fetch' });
  });
});
