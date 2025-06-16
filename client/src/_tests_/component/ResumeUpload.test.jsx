import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk }  from 'redux-thunk';  

const middlewares = [thunk.default || thunk]; 
const mockStore = configureMockStore(middlewares);

import ResumeUpload from '../../component/ResumeUpload';

describe('ResumeUpload component', () => {
  it('renders file input and button', () => {
    const store = mockStore({
      resume: {
        loading: false,
        resumePath: '',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ResumeUpload />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: /upload resume/i })).toBeInTheDocument();
    expect(screen.getByText(/upload your resume/i)).toBeInTheDocument();
  });
});
