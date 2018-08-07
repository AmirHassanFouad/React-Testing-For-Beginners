import React from 'react';
import { render, cleanup, wait } from 'react-testing-library';
import MovieDetail from '../MovieDetail';

// set fetch globally for entire test suites to be (jest-fetch-mock)
global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup();
  console.error.mockClear(); // reset mocked functions to not be affected in the next test suites
});

const match = {
  params: {
    id: 'adasdasd',
  },
};

console.error = jest.fn();

const movie = {
  id: '1',
  title: 'Home alone',
};

// Mocking fetch, Async Tests & Working With Data
// add jest-fetch-mock package
test('<MovieDetail />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movie));

  const { getByTestId } = render(<MovieDetail match={match} />);
  //   const movieTitle = getByTestId('movie-title'); // this will fail becasue we have to wait until it's rendered in DOM
  await wait(() => getByTestId('movie-title'));

  expect(getByTestId('movie-title').textContent).toBe(movie.title);
  //   debug();
});
