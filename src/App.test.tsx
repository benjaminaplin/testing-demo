import {   waitFor, screen, within } from './test-utils/customRender';
import userEvent from '@testing-library/user-event';
import App from './App';
import { render } from '@testing-library/react';
import { setupServer } from "msw/node";
import notesHandlers from './pages/notes/mocks'

const server = setupServer(...notesHandlers);

afterAll(() => server.close());
beforeAll(() => server.listen({
  onUnhandledRequest(req) {
    console.log(
      "Found an unhandled `%s request to %s",
      req.method,
      req.url.href
    );
  },
}));

afterEach(() => server.resetHandlers());

it('renders a form with inputs and submit button', async () => {
  render(
    <App />
  )
  await waitFor(()=>{
    const list = screen.getByRole('list');

    within(list).getByRole('link', {
      name: /this note is from msw/i
    });
  })
})
