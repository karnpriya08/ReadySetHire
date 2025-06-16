import { describe, it, expect } from 'vitest';
import { resumeReducer } from '../../redux/reducers/resumeReducer';
import {
  RESUME_UPLOAD_REQUEST,
  RESUME_UPLOAD_SUCCESS,
  RESUME_UPLOAD_FAIL
} from '../../redux/actionTypes';

describe('resumeReducer', () => {
  const initialState = {
    loading: false,
    resumePath: '',
    error: null
  };

  it('should return initial state', () => {
    const result = resumeReducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should handle RESUME_UPLOAD_REQUEST', () => {
    const action = { type: RESUME_UPLOAD_REQUEST };
    const result = resumeReducer(initialState, action);
    expect(result).toEqual({ ...initialState, loading: true });
  });

  it('should handle RESUME_UPLOAD_SUCCESS', () => {
    const action = {
      type: RESUME_UPLOAD_SUCCESS,
      payload: '/uploads/resume.pdf'
    };
    const result = resumeReducer(initialState, action);
    expect(result).toEqual({
      loading: false,
      resumePath: '/uploads/resume.pdf',
      error: null
    });
  });

  it('should handle RESUME_UPLOAD_FAIL', () => {
    const action = {
      type: RESUME_UPLOAD_FAIL,
      payload: 'Upload failed'
    };
    const result = resumeReducer(initialState, action);
    expect(result).toEqual({
      loading: false,
    //   resumePath: '',
      error: 'Upload failed'
    });
  });
});
