import { render, screen } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';

test('renders login title', () => {

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  const title = screen.getByRole('heading', { name: /login/i });

  expect(title).toBeInTheDocument();
});