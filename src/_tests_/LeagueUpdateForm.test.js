// src/_tests_/LeagueUpdateForm.test.js

import React from 'react';
import { render } from '@testing-library/react';
import LeagueUpdateForm from '../Leagues/LeagueUpdateForm';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../api', () => ({
    someMethod: jest.fn(() => Promise.resolve({}))
  }));

test('LeagueUpdateForm renders without crashing', () => {
  render(
    <MemoryRouter>
      <LeagueUpdateForm />
    </MemoryRouter>
  );
});
