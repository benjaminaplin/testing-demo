import { Outlet, } from 'react-router-dom';
import { useEffect } from 'react';
import type { Note } from '../../App'
import { NoteView } from './noteView';
import { useAsync } from './hooks';
import { Loader } from '../../components/loader';

export function Notes() {
  const {data: notes, status, run} = useAsync({})
  useEffect(() => {
    run(fetch('http://localhost:3001/notes'))
  }, [run])

  if(status === 'pending'){
    return <Loader />
  }
  
return (
  <div>
    <div>
          Notes
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Outlet />
      <div style={{width: '80%'}}>
        {notes?.map((note: Note) => (
          <NoteView key={note.slug} note={note} />
        ))}
      </div>
      </div>
  </div>
);
}