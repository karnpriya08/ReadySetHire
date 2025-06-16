import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login,register } from '../../redux/actions/authActions';
import * as actionTypes from '../../redux/actionTypes';

// mock axios instance
vi.mock('../../utils/axios', () => ({
    default: {
        post: vi.fn()
    }
}));

// mock local stoerage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key]),
        setItem: vi.fn((key, value) => { store[key] = value }),
        removeItem: vi.fn((key) => { delete store[key] }),
        clear: () => { store = {} }
    }
})();

Object.defineProperty(global, 'localStorage', {
    value: localStorageMock
});

// test for login
describe('Auth Actions - login', async () => {
    const mockDispatch = vi.fn();
    const API = (await import('../../utils/axios')).default;

    beforeEach(() => {
        // reset mock between test 
        vi.clearAllMocks();
    })

    it('dispatches LOGIN_SUCCESS on successful login', async () => {
        const fakeData = { token: '123abc', name: 'john' };
        API.post.mockResolvedValue({ data: fakeData });

        await login('test@example.com', 'password')(mockDispatch);

        expect(mockDispatch).toHaveBeenNthCalledWith(1, {
            type: actionTypes.LOGIN_REQUEST
        })
        expect(API.post).toHaveBeenCalledWith('/auth/login', { email: 'test@example.com', password: 'password' })
        expect(mockDispatch).toHaveBeenNthCalledWith(2, {
            type: actionTypes.LOGIN_SUCCESS,
            payload: fakeData
        })
        expect(localStorage.setItem).toHaveBeenCalledWith('token', fakeData.token)
        expect(localStorage.setItem).toHaveBeenCalledWith('userInfo', JSON.stringify(fakeData))
    });

    it('dispatch LOGIN_FAIL on error', async () => {
        const error = new Error('Request failed');
        error.response = { data: { message: 'Invalid credentials' } };
        API.post.mockRejectedValue(error);


        await login('wrong@example.com', 'badpass')(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledWith({ type: actionTypes.LOGIN_REQUEST });
        expect(mockDispatch).toHaveBeenCalledWith({
            type: actionTypes.LOGIN_FAIL,
            payload: 'Invalid credentials'
        })
    })
})


// test for register 

describe('Auth Action -register', async () => {
    const mockDispatch =vi.fn();
    const API = (await import ('../../utils/axios')).default; 

    beforeEach(() => {
        vi.clearAllMocks();
    })
it('dispatches REGISTER_SUCCESS on successful register' , async () => {
    const userData = { token: 'abc123', name: 'jane'};
    API.post.mockResolvedValue({ data: userData});

    await register('Jane Doe', "jane@example.com", 'securepass')(mockDispatch)
 expect(mockDispatch).toHaveBeenNthCalledWith(1,{
    type: actionTypes.REGISTER_REQUEST
 })

 expect(API.post).toHaveBeenCalledWith('/auth/register',{
    name: 'Jane Doe',
    email : 'jane@example.com',
    password: 'securepass'
 })
expect(mockDispatch).toHaveBeenNthCalledWith(2,{
    type: actionTypes.REGISTER_SUCCESS,
    payload: userData
});
})
it('dispatches REGISTER_FAIL on API error', async () => {
    const error = new Error('Register failed');
    error.response = { data: { message: 'Email already in use' } };
    API.post.mockRejectedValue(error);

    await register('Jane Doe', 'jane@example.com', 'securepass')(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: actionTypes.REGISTER_REQUEST });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actionTypes.REGISTER_FAIL,
      payload: 'Email already in use'
    });
  });



})