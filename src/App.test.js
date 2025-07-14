import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Welcome! Thanks for interviewing with Pirros! text', () => {
  render(<App />);
  const element = screen.getByText(
    /Welcome! Thanks for interviewing with Pirros!/i,
  );
  expect(element).toBeInTheDocument();
});
