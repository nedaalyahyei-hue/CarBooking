import { render, screen } from '@testing-library/react';
import EditBooking from './EditBooking';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';

test('renders edit booking title', () => {

  const mockBooking = {
    _id: "1",
    fullname: "Ali",
    phone: "99999999",
    cartype: "BMW",
    size: "Small",
    startdate: "2025-05-10",
    enddate: "2025-05-12",
    totalprice: 50,
    email: "ali@gmail.com"
  };

  render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/editbooking",
            state: mockBooking
          }
        ]}
      >
        <Routes>
          <Route
            path="/editbooking"
            element={<EditBooking />}
          />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  const title = screen.getByRole(
    'heading',
    { name: /edit booking/i }
  );

  expect(title).toBeInTheDocument();
});