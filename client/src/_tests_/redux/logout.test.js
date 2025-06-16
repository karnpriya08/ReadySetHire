import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logout } from '../../redux/actions/authActions';
import { LOGOUT } from '../../redux/actionTypes';

// Mock Firebase functions
vi.mock('firebase/auth', async () => {
  return {
    // successful sign out
    signOut: vi.fn(() => Promise.resolve()), 
    getAuth: vi.fn(() => ({})),
    GoogleAuthProvider: vi.fn()
  };
});

// Import mocks to use them directly
import { signOut } from 'firebase/auth';

describe('Auth Actions - logout', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    mockDispatch.mockClear();
    localStorage.clear();

    // Spy on localStorage
    vi.spyOn(localStorage.__proto__, 'removeItem');
    // clear previous calls
    localStorage.removeItem.mockClear(); 
  });

  it('signs out from Firebase and clears localStorage', async () => {
    await logout()(mockDispatch);

    expect(signOut).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: LOGOUT });

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userInfo');
  });

  it('still dispatches LOGOUT if Firebase signOut fails', async () => {
    signOut.mockRejectedValueOnce(new Error('Network error'));

    await logout()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: LOGOUT });

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userInfo');
  });
});
