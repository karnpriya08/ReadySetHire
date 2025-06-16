import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserProfile } from '../../redux/actions/userActions';
import * as actionTypes from '../../redux/actionTypes';
import API from '../../utils/axios';

vi.mock('../../utils/axios');

describe('getUserProfile', () => {
  const mockDispatch = vi.fn();
  const mockGetState = () => ({
    auth: { userInfo: { token: 'mock-token', email: 'test@example.com' } },
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('dispatches USER_PROFILE_SUCCESS on successful API call', async () => {
    const profileData = { name: 'John Doe' };
    API.get.mockResolvedValue({ data: profileData });

    await getUserProfile()(mockDispatch, mockGetState);

    expect(mockDispatch).toHaveBeenCalledWith({ type: actionTypes.USER_PROFILE_REQUEST });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actionTypes.USER_PROFILE_SUCCESS,
      payload: { ...profileData, email: 'test@example.com' },
    });
  });

  it('dispatches USER_PROFILE_FAIL on API error', async () => {
    API.get.mockRejectedValue({ response: { data: { message: 'Failed' } } });

    await getUserProfile()(mockDispatch, mockGetState);

    expect(mockDispatch).toHaveBeenCalledWith({ type: actionTypes.USER_PROFILE_REQUEST });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actionTypes.USER_PROFILE_FAIL,
      payload: 'Failed',
    });
  });
});
