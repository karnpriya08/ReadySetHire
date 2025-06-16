import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; 
import GoogleLogin from '../../component/GoogleLogin';

const mockStore = configureStore([]);
const store = mockStore({
  auth: {
    userInfo: { name: 'Test User', token: 'fake-token' }
  }
});

describe('GoogleLogin Component', () => {
  test('renders Google button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <GoogleLogin />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/google/i)).toBeInTheDocument();
  });
});
