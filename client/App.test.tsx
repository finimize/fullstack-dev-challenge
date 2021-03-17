import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

describe('App', () => {
it('renders learn react link', () => {
   const { container } = render(<App />);
    expect(container).toMatchSnapshot();
});
})

