import {  render, waitFor, screen } from '../../test-utils/customRender';
import { NoteView } from './noteView';

const note = {
  "title": "This also from msw",
  "markdown": `# organic ~artisan~ *synth* bicycle rights
  Live-edge pinterest hot chicken cloud*
  Live-edge pinterest hot chicken cloud bread tilde hammock
  organic artisan synth bicycle rights. Truffaut
   raclette farm-to-table affogato scenester mixtape.
  Portland woke paleo pabst vaporware gentrify hell`,
  "id": 2
}
jest.mock('./hooks',()=>{
  return {
    useAsync: () => ({data: note, run: jest.fn()})

  }
})

it('renders a form with inputs and submit button', async () => {
  render(
    <NoteView note={undefined} fetchNotes={jest.fn()}/>,
    {routeOptions: {path:"notes/:noteId", route: '/notes/2' }}
  )
  await waitFor(()=>{
    expect(screen.getByText(/this also from msw/i)).toBeInTheDocument()
  })
})
