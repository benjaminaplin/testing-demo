import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Note } from '../../App'
import { useAsync } from './hooks';
import { Loader } from '../../components/loader';
import Markdown from 'marked-react';

export function NoteView({note, fetchNotes}: {note?: Note, fetchNotes: () => void}) {
    const {noteId} = useParams<{noteId: string}>()
    const {data: noteFromApi, status, run} = useAsync({})
    const {status: delNoteStatus, run: runDelNote} = useAsync({})

    useEffect(() => {
      if(!noteId || note){
        return
      }
      run(fetch(`http://localhost:3001/notes/${noteId}`))
    }, [noteId, run, note])

  
    const [noteToDisplay, setNoteToDisplay] = useState(note || noteFromApi || null)
  
    useEffect(()=>{
      if(!noteFromApi){
        return
      }
      setNoteToDisplay(noteFromApi)
    },[noteId, noteFromApi])
  
    const handleDelete = async (noteId?: string | number) => {
      await runDelNote(fetch(`http://localhost:3001/notes/${noteId}`, {method: 'DELETE'}))
      fetchNotes()
    }
    if(status === 'pending' || delNoteStatus === 'pending'){
      return <Loader />
    }
    if(!noteToDisplay){
      return <div>no note!</div>
    }

    const { title, markdown, id} = noteToDisplay
    return (
      <div className='note-container'>
        <div className='note-container__header'>
          <Link
            style={{margin: '.5rem 0', fontWeight: '600', fontSize: '2rem'}}
            to={`/notes/${id}`}>
              {title}
          </Link>
          <div>
            <Link to={`/notes/${noteToDisplay.id}/update`}>Edit</Link>
            <span
              className='note-container__delete-btn'
              onClick={() => handleDelete(note?.id || noteId)}>Delete</span>
          </div>
        </div>
        <div style={{backgroundColor: '#2a314d', padding: '1rem', flexWrap: 'wrap'}}>
          <Markdown breaks gfm openLinksInNewTab>{markdown}</Markdown>
        </div>
      </div>
    );
  }

