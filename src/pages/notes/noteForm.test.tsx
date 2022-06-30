import {  render, waitFor, screen } from '../../test-utils/customRender';
import userEvent from '@testing-library/user-event';
import {NoteForm} from './noteForm';
import { setupServer } from "msw/node";
import notesHandlers from '../notes/mocks'

jest.mock('./hooks',()=>{
  return {
    useAsync: () => ({data: [], run: jest.fn()})
  }
})

const mockNavigate = jest.fn(() => null);
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useNavigate: () => mockNavigate
}));

const server = setupServer(  ...notesHandlers
  );

afterAll(() => server.close());
beforeAll(() => server.listen({
  onUnhandledRequest(req) {
    console.log(
      "Found an unhandled %s request to %s",
      req.method,
      req.url.href
    );
  },
}));

afterEach(() => server.resetHandlers());

it('renders a form with inputs and submit button', async () => {

  const render(<NoteForm fetchNotes={jest.fn()}/>)
  screen.getByLabelText(/title/i)
  screen.getByLabelText(/markdown/i)
  const submitBtn = screen.getByRole('button', {name: /create/i})
  userEvent.click(submitBtn)
  await waitFor(()=>{
     expect(mockNavigate).toHaveBeenCalledTimes(1)
  })
})
