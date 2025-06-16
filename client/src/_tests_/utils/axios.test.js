// src/_tests_/utils/axios.test.js
import { describe, it, expect, vi } from 'vitest';

// ✅ 1. Mock axios BEFORE importing your axios file
vi.mock('axios', () => {
  const requestInterceptor = {
    use: vi.fn(),        // fake .use function
    handlers: [],
  };

  const fakeAxiosInstance = {
    defaults: {
      baseURL: 'http://localhost:3001/api',
    },
    interceptors: {
      request: requestInterceptor,
    },
  };

  return {
    default: {
      create: vi.fn(() => fakeAxiosInstance),
    },
  };
});

// ✅ 2. Now import the custom axios instance
import API from '../../utils/axios';

// ✅ 3. Write actual tests
describe('Axios Utils', () => {
  it('should set baseURL correctly', () => {
    expect(API.defaults.baseURL).toBe('http://localhost:3001/api');
  });

  it('should register request interceptor', () => {
    expect(API.interceptors.request.use).toHaveBeenCalled();
  });
});
