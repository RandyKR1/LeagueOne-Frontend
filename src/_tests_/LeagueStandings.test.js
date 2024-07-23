// src/_tests_/LeagueStandings.test.js

import React from 'react';
import { render } from '@testing-library/react';
import LeagueStandings from '../Leagues/LeagueStandings';
import { MemoryRouter, Route } from 'react-router-dom';

jest.mock('../api', () => ({
    someMethod: jest.fn(() => Promise.resolve({}))
  }));

test('LeagueUpdateForm renders without crashing', () => {
  render(
    <MemoryRouter>
      <LeagueStandings />
    </MemoryRouter>
  );
});
