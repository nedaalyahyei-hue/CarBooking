import { render, screen } from '@testing-library/react';
import Register from './Register';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';

test('renders register title', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </Provider>
  );

  const title = screen.getByRole(
    'heading',
    { name: /sign up/i }
  );

  expect(title).toBeInTheDocument();
});