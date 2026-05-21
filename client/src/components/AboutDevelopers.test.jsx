import { render, screen } from '@testing-library/react';

import AboutDevelopers from './AboutDevelopers';

import { BrowserRouter } from 'react-router-dom';

test('renders developers page', () => {

  render(
    <BrowserRouter>
      <AboutDevelopers />
    </BrowserRouter>
  );

  const title = screen.getByRole(
    'heading',
    { name: /about developers/i }
  );

  expect(title).toBeInTheDocument();
});