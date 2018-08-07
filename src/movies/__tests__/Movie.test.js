import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import Movie, { POSTER_PATH } from '../Movie';

afterEach(() => {
  cleanup();
  console.error.mockClear(); // reset mocked functions to not be affected in the next test suites
});

console.error = jest.fn();

// testing for errors & global mocks
test('<Movie />', () => {
  render(<Movie />);

  // this will be called because I didn't pass props to Movie component
  expect(console.error).toHaveBeenCalled();
});

const movie = {
  id: '1',
  title: 'Home alone',
  poster_path: 'xyz.jpg',
};

// Negative Assertions & Testing With React Router
// how to solve this error =>  Invariant Violation: You should not use <Link> outside a <Router>
// because the component is wrapped with Link component. =====> (the answer is by MemoryRouter)
test('<Movie /> with movie', () => {
  const { debug, getByTestId } = render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>,
  );

  // this will be called because I didn't pass props to Movie component
  expect(console.error).not.toHaveBeenCalled();

  console.log(getByTestId('movie-link').href); // http://localhost/1
  console.log(getByTestId('movie-link').getAttribute('href')); // /1

  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
  expect(getByTestId('movie-img').src).toBe(
    `${POSTER_PATH}${movie.poster_path}`,
  );
  //   debug();
});
