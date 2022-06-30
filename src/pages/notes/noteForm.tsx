import {  useParams, useNavigate } from 'react-router-dom';
import { SyntheticEvent, useEffect, useState} from 'react';
import type { Note } from '../../App'
import { useAsync } from './hooks';
import { Loader } from '../../components/loader';
import { isEmpty } from '../../utils/utils';

type EventTargetWithElements = EventTarget & {
  elements: {
    title: { value: string };
    markdown: { value: number[] }
  }
} 

export function NoteForm({ fetchNotes }: { fetchNotes: () => void }) {
  const {status: postNoteStatus, run: runPostNote} = useAsync({})
  const {data: note, status: fetchNoteStatus, run: runFetchNote} = useAsync({})
  const { noteId } = useParams<{noteId: string}>()
  let navigate = useNavigate();

  const [noteToEdit, setNoteToEdit] = useState<Note | null>(note || null)
  
  useEffect(() => {
    if(!noteId){
      setNoteToEdit(null)
      return
    }
    if(note){
      setNoteToEdit(note)
      return
    }
    runFetchNote(fetch(`http://localhost:3001/notes/${noteId}`))
  }, [noteId, runFetchNote, note])

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    const {title, markdown } = (event.target as EventTargetWithElements).elements
    const body = JSON.stringify({ title: title.value,  markdown: markdown.value })

    await runPostNote(fetch(`http://localhost:3001/notes${noteId ? `/${noteId}` : ''}`,
    { 
      method: noteId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    }))
    await fetchNotes()
    navigate(noteId ? `/notes/${noteId}` : '/notes')

  } 
  if(fetchNoteStatus === 'pending'){
    return <Loader />
  }
  if(noteToEdit &&  isEmpty(noteToEdit)){
    return <div>note note found :(</div>
  }

  return (
      <div>
        <h2>{noteId ? 'Update Note' : 'Create Note'}</h2>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
          <label>Title
            <input id='title' name='title' defaultValue={noteToEdit?.title}/>
          </label>
          <label htmlFor='markdown'>Markdown</label>
          <textarea defaultValue={noteToEdit?.markdown || ''} rows={5} id='markdown' name='markdown'/>
          <button style={{ background: 'mediumseagreen', height: '2rem', width: '8rem'}} type='submit' name='submit'>
            {postNoteStatus === 'pending' ? noteId ? 'Updating' : 'Creating' : noteId ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    );
  }


