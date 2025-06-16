import { describe, it, expect, beforeEach, vi } from 'vitest';
import userReducer, { initialState } from '../../redux/reducers/userReducer';
import * as actionTypes from '../../redux/actionTypes';

describe('userReducer', () => {
  beforeEach(() => {
    // Prevent localStorage pollution
    vi.spyOn(global.localStorage.__proto__, 'setItem').mockImplementation(() => {});
  });

  it('should return the initial state', () => {
    const result = userReducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should handle USER_UPDATE_REQUEST and USER_PROFILE_REQUEST', () => {
    const action = { type: actionTypes.USER_UPDATE_REQUEST };
    const result = userReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('should handle USER_UPDATE_SUCCESS and store user in state and localStorage', () => {
    const mockUser = { name: 'Jane Doe' };
    const action = { type: actionTypes.USER_UPDATE_SUCCESS, payload: mockUser };

    const result = userReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      loading: false,
      user: mockUser,
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('userProfile', JSON.stringify(mockUser));
  });

  it('should handle USER_PROFILE_FAIL and USER_UPDATE_FAIL', () => {
    const action = { type: actionTypes.USER_PROFILE_FAIL, payload: 'Profile load failed' };

    const result = userReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Profile load failed',
    });
  });
});
