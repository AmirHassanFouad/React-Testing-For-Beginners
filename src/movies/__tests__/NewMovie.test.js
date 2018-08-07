import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import NewMovie from '../NewMovie';

afterEach(cleanup);

test('<NewMovie />', () => {
  const { debug, getByTestId, queryByTestId, getByText, container } = render(
    <NewMovie />,
  );
  // container contains the whole component elements into a wrapper
  // difference between getByTestId & querByTestId:
  // getByTestId: you are sure that this element is already exists and if not it will fail the test.
  expect(getByTestId('page-title').textContent).toBe('New Movie');
  // queryByTestId: you are not sure if the element exists or not and you can assert on its result.
  expect(queryByTestId('movie-form')).toBeTruthy();
  //   debug();

  // snapshot testing: on the first run it will create a snapshot and for any change happens on the component
  // the snapshot test will fail and to update the snapshot click (u key)
  // container.firstChild => div element in the newMovie component
  // NOTE: don't rely on only snapshot testing as your only testing
  expect(container.firstChild).toMatchSnapshot();

  fireEvent.click(getByText('Submit'));
});
