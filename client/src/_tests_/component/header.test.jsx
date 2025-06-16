// src/_tests_/component/navbar.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Index from '../../component/Header'; 
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../redux/store'; 

describe('Navbar Component', () => {
  test('toggles mobile menu on hamburger button click', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      </Provider>
    );

    // Initially, mobile menu should NOT be in the document
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();

    // Find hamburger button by aria-label and click it
    const hamburgerBtn = screen.getByRole('button', { name: /menu toggle/i });
    fireEvent.click(hamburgerBtn);

    // Mobile menu should now be present
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

    // Click hamburger again to close mobile menu
    fireEvent.click(hamburgerBtn);

    // Mobile menu should be gone again
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });
});
