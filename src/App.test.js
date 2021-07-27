import { render, screen } from '@testing-library/react';
import Issues from './Issues';

test('renders learn react link', () => {
  render(<Issues />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
