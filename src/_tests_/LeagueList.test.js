// src/_tests_/LeagueList.test.js

import React from 'react';
import { render } from '@testing-library/react';
import LeagueList from '../Leagues/LeagueList';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../api', () => ({
    someMethod: jest.fn(() => Promise.resolve({}))
  }));

test('LeagueUpdateForm renders without crashing', () => {
  render(
    <MemoryRouter>
      <LeagueList />
    </MemoryRouter>
  );
});
