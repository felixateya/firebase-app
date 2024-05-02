import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders Home page by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Assuming your Login component has a unique text/content
    const loginElement = screen.getByText(/Login Page/i);
    expect(loginElement).toBeInTheDocument();
  });

  it('renders register page when the route is /register', () => {
    render(
      <BrowserRouter initialEntries={['/register']}>
        <App />
      </BrowserRouter>
    );

    // Assuming your Register component has a unique text/content
    const registerElement = screen.getByText(/Register Page/i);
    expect(registerElement).toBeInTheDocument();
  });

  // Add more test cases for other routes and components as needed
});
