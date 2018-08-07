import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import MovieForm from '../MovieForm';

afterEach(cleanup);

const onSubmit = jest.fn();

test('<MovieForm />', () => {
  const { queryByTestId, getByText, getByLabelText } = render(
    <MovieForm submitForm={onSubmit} />,
  );

  expect(queryByTestId('movie-form')).toBeTruthy();

  // NOTE: might not work
  //   getByLabelText('Text').value = 'hello';
  //   fireEvent.change(getByLabelText('Text')); // fire change event to let it track the change happened on the line above
  // Another better solution
  fireEvent.change(getByLabelText('Text'), { target: { value: 'hi' } });

  fireEvent.click(getByText('Submit'));
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({ text: 'hi' });
});
