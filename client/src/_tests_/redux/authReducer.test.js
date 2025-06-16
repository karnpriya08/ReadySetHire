import { describe, it, expect } from 'vitest';
import { authReducer } from '../../redux/reducers/authReducer';
import * as actionTypes from '../../redux/actionTypes';

describe('authReducer', () => {
    const initialState = {
        userInfo: null,
        token: null,
        loading: false,
        error: null,
        success: false
    }


    it('should return the initial state by default', () => {
        const result = authReducer(undefined, {});
        expect(result).toEqual(initialState);
    })

    it('should handle LOGIN_REQUEST', () => {
        const action = { type: actionTypes.LOGIN_REQUEST };
        const result = authReducer(initialState, action);
        expect(result).toEqual({ ...initialState, loading: true });
    })

    it('should handle LOGIN_SUCCESS', () => {
        const payload = {
            user:
            {
                name: 'Jane',
                token: 'abc123'
            }
        }
        const action = {
            type: actionTypes.LOGIN_SUCCESS,
            payload
        }
        const result = authReducer(initialState, action);
        expect(result).toEqual({
            ...initialState, userInfo: payload.user, toke: payload.token, loading: false
        })
    })

    it('should handle LOGIN_FAIL', () => {
        const action = { type: actionTypes.LOGIN_FAIL, payload: 'Invalid credentials' }
        const result = authReducer(initialState, action);
        expect(result).toEqual({ ...initialState, success: false, loading: false, error: 'Invalid credentials' });
    })

    it('should handle REGISTER_REQUEST', () => {
        const action = { type: actionTypes.REGISTER_REQUEST };
        const result = authReducer(initialState, action);
        expect(result).toEqual({ ...initialState, loading: true })
    })

    it('should handle REGISTER_SUCCESS', () => {
        const action = { type: actionTypes.REGISTER_SUCCESS };
        const result = authReducer(initialState, action);
        expect(result).toEqual({ ...initialState, success: true, loading: false })
    })

    it('should handle REGISTER_FAIL', () => {
        const action = { type: actionTypes.REGISTER_FAIL, payload: 'Email already exists' };
        const result = authReducer(initialState, action);
        expect(result).toEqual({
            ...initialState, error: "Email already exists",
            success: false, loading: false
        })
    })

    it('should handle REGISTER_RESET', () => {
        const state = { ...initialState, success: true };
        const action = { type: actionTypes.REGISTER_RESET };
        const result = authReducer(state, action);
        expect(result.success).toBe(false);
    })

    it('should handle LOGOUT', () => {
        const state = { userInfo: { name: 'Jane' }, token: 'abc123', loading: false, error: null, success: false };
        const action = { type: actionTypes.LOGOUT };
        const result = authReducer(state, action);
        expect(result).toEqual({ userInfo: null, token: null, loading: false, error: null, })
    })

});
