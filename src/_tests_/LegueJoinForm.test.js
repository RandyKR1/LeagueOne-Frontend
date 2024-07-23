// src/_tests_/LeagueJoinForm.test.js

import React from 'react';
import { render } from '@testing-library/react';
import LeagueJoinForm from '../components/LeagueJoinForm';
import { MemoryRouter, Route } from 'react-router-dom';


jest.mock('../api', () => ({
    someMethod: jest.fn(() => Promise.resolve({}))
  }));

test('LeagueUpdateForm renders without crashing', () => {
  render(
    <MemoryRouter>
      <LeagueJoinForm />
    </MemoryRouter>
  );
});
