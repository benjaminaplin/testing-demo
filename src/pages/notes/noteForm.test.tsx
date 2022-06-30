import {  render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NoteForm} from './noteForm';

jest.mock('./hooks',()=>{
  return {
    useAsync: () => ({data: [], run: jest.fn()})
  }
})

it('renders a form with inputs and submit button', () => {

  render(<NoteForm fetchNotes={jest.fn()}/>)
  screen.getByLabelText(/title/i)
  screen.getByLabelText(/slug/i)
  screen.getByLabelText(/markdown/i)
  screen.getByLabelText(/markdown/i)
  const submitBtn = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submitBtn)
})
