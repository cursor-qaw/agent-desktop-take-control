import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders to-do heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /to-do/i })).toBeInTheDocument();
});

test('Test button logs Godfather quote', async () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: /^test$/i }));

  expect(logSpy).toHaveBeenCalledWith(
    "I'm gonna make him an offer he can't refuse"
  );
  logSpy.mockRestore();
});

test('adds a task and shows it in the list', async () => {
  render(<App />);

  await userEvent.type(screen.getByPlaceholderText(/add a task/i), 'Buy milk');
  await userEvent.click(screen.getByRole('button', { name: /^add$/i }));

  expect(screen.getByText('Buy milk')).toBeInTheDocument();
});
