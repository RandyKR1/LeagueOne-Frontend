import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LeagueDetail from '../Leagues/LeagueDetail';
import UserContext from '../Auth/UserContext';

jest.mock('../api', () => ({
    someMethod: jest.fn(() => Promise.resolve({}))
  }));

test('LeagueUpdateForm renders without crashing', () => {
  render(
    <MemoryRouter>
      <LeagueDetail />
    </MemoryRouter>
  );
});
