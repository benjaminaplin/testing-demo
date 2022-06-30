import { Outlet, } from 'react-router-dom';
import type { Note } from '../../App'
import { NoteView } from './noteView';

export function Notes({notes, fetchNotes}: {notes: Note[], fetchNotes: () => void}) {
  return (
    <div>
      <div>
        <h2>Notes</h2>
        </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Outlet />
          <div className='notes-container'>
            {notes?.map((note: Note) => (
              <NoteView fetchNotes={fetchNotes} key={note.slug} note={note} />
            ))}
          </div>
        </div>
    </div>
  );
}