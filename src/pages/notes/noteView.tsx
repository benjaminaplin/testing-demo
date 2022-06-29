import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Note } from '../../App'
import { useAsync } from './hooks';
import { Loader } from '../../components/loader';

export function NoteView({note}: {note?: Note}) {
    const {noteId} = useParams<{noteId: string}>()
    const {data: noteFromApi, status, run} = useAsync({})

    useEffect(() => {
      if(!noteId || note || noteFromApi){
        return
      }
      run(fetch(`http://localhost:3001/notes/${noteId}`))
    }, [noteId, run, note, noteFromApi])

  
    const [noteToDisplay, setNoteToDisplay] = useState(note || noteFromApi || null)
  
    useEffect(()=>{
      if(!noteFromApi){
        return
      }
      setNoteToDisplay(noteFromApi)
    },[noteId, noteFromApi])
  
  
    if(status === 'pending'){
      return <Loader />
    }
    if(!noteToDisplay){
      return <div>no note!</div>
    }

    const { title, slug, markdown, id} = noteToDisplay
    return (
      <div style={{border: '1px solid cornflowerblue', margin: '1rem', padding: '1rem'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'space-around'}}>
            <span style={{margin: '.5rem 0', fontWeight: '600'}}><Link to={`/notes/${id}`}>Title</Link></span>
            <span>{title}</span>
            <span style={{margin: '.5rem 0', fontWeight: '600'}}>Slug</span>
            <span>{slug}</span>
            <span style={{margin: '.5rem 0', fontWeight: '600'}}>Markdown</span>
            <span>{markdown}</span>
          </div>
      </div>
    );
  }

