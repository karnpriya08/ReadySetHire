import { describe, it, expect, vi, beforeEach } from 'vitest';
import uploadResume from '../../redux/actions/resumeActions';
import API from '../../utils/axios';
import * as actionTypes from '../../redux/actionTypes';

vi.mock('../../utils/axios');

describe('uploadResume action', () => {
  let mockDispatch, mockGetState, file;

  beforeEach(() => {
    mockDispatch = vi.fn();
    file = new File(['resume content'], 'resume.pdf', { type: 'application/pdf' });

    mockGetState = () => ({
      auth: {
        userInfo: {
          token: 'test-token'
        }
      }
    });

    // Clear localStorage between tests
    localStorage.clear();
  });

  it('dispatches RESUME_UPLOAD_SUCCESS on successful upload', async () => {
    const mockResumePath = '/uploads/resume.pdf';
    API.post.mockResolvedValue({ data: { resumePath: mockResumePath } });

    const result = await uploadResume(file)(mockDispatch, mockGetState);

    expect(mockDispatch).toHaveBeenCalledWith({ type: actionTypes.RESUME_UPLOAD_REQUEST });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actionTypes.RESUME_UPLOAD_SUCCESS,
      payload: mockResumePath,
    });

    expect(localStorage.getItem('resumePath')).toEqual(JSON.stringify(mockResumePath));
    expect(result).toBe(mockResumePath);
  });

  it('dispatches RESUME_UPLOAD_FAIL on API error', async () => {
    const errorMessage = 'Resume upload failed';
    API.post.mockRejectedValue({
      response: { data: { message: errorMessage } }
    });

    await expect(uploadResume(file)(mockDispatch, mockGetState)).rejects.toThrow();

    expect(mockDispatch).toHaveBeenCalledWith({ type: actionTypes.RESUME_UPLOAD_REQUEST });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actionTypes.RESUME_UPLOAD_FAIL,
      payload: errorMessage,
    });
  });
});
