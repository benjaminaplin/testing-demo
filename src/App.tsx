import './App.css';
import { Outlet, Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import { useCallback, useEffect} from 'react';
import {  Notes } from './pages/notes/notes'
import { NoteView } from './pages/notes/noteView'
import {  NoteForm } from './pages/notes/noteForm'
import { useAsync } from './pages/notes/hooks'
import { Loader } from './components/loader';
export type Note = {id: number, slug?: string, title: string, markdown: string}

// if (process.env.NODE_ENV === 'development') {
//   const { worker } = require('./mocks/browser')
//   worker.start()
// }

function App({notes, status}:{notes: Note[],  status: string}) {
 
  if(status === 'pending'){
    return <Loader />
  }

  return (
    <div>
      <header>
        <h1>Welcome to your Notes</h1>
      </header>
      <nav >
        <Link style={{color: '#f67b53'}} to="/notes">Notes</Link> |{" "}
        <Link style={{color: '#f67b53'}} to="/notes/new">New Note</Link> |{" "}
      </nav>
      <main>
        <ul>
          {notes?.map((note: Note) => (
            <li className='App-link' key={note.id}>
              <Link style={{color: '#61dafb'}} to={`notes/${note.id}`}>
                {note.title}
              </Link>
            </li>
           ))}
          </ul>
        <Outlet />
      </main>
  </div>
  )
}


export const AppRoutes  = () => {
  const {data: notes, status, run} = useAsync({})

  const fetchNotes = useCallback(() => run(fetch('http://localhost:3001/notes')),[run])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App notes={notes} status={status}/>}>
          <Route path="notes" element={<Notes fetchNotes={fetchNotes} notes={notes} />}/>
          <Route path="notes/:noteId" element={<NoteView fetchNotes={fetchNotes} />} />
          <Route path="notes/:noteId/update" element={<NoteForm fetchNotes={fetchNotes}/>} />
          <Route path="notes/new" element={<NoteForm fetchNotes={fetchNotes}/>} />
        </Route>
        <Route path="*" element={<Nope />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

function Nope() {
  return (
    <div>nope :o</div>
  )
}
