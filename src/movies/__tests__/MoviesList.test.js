import React from 'react';
import { render, cleanup, wait } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import MoviesList from '../MoviesList';

// set fetch globally for entire test suites to be (jest-fetch-mock)
global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup();
  console.error.mockClear(); // reset mocked functions to not be affected in the next test suites
});

console.error = jest.fn();

const movies = {
  success: true,
  results: [
    { id: '1', title: 'Home alone', poster_path: 'home alone.jpg' },
    { id: '2', title: 'Taken', poster_path: 'taken.jpg' },
    { id: '3', title: 'Terminator', poster_path: 'Terminator.jpg' },
  ],
};

const movie = movies.results[0];

//  Testing Loading States & More Pitfalls
test('<MoviesList />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));

  const { getByTestId, queryByTestId, getAllByTestId, debug } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>,
  );
  expect(getByTestId('loading')).toBeTruthy();
  await wait(() => getByTestId('movie-link'));
  expect(queryByTestId('loading')).toBeFalsy();
  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
  expect(getAllByTestId('movie-link').length).toBe(movies.results.length);
  //   debug();
});

test('<MoviesList /> api fails', async () => {
  movies.success = false;
  fetch.mockResponseOnce(JSON.stringify(movies));

  const { getByTestId, queryByTestId, getAllByTestId, debug } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>,
  );
  expect(getByTestId('loading')).toBeTruthy();
});
