// Home.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'; 
import Home from '../Home/Home';

test('renders Home component with correct elements', () => {
    const { getByText, getByRole } = render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );

    // Check if the header text is rendered
    expect(getByText('This is the Home Page')).toBeInTheDocument();

    // Check if the links are rendered with correct texts
    expect(getByRole('link', { name: 'Leagues' })).toBeInTheDocument();
    expect(getByRole('link', { name: 'Teams' })).toBeInTheDocument();
    expect(getByRole('link', { name: 'Users' })).toBeInTheDocument();
});
