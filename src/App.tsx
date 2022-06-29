import './App.css';
import { Outlet, Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import { useEffect} from 'react';
import {  Notes } from './pages/notes/notes'
import { NoteView } from './pages/notes/noteView'
import {  NoteForm } from './pages/notes/noteForm'
import { useAsync } from './pages/notes/hooks'
import { Loader } from './components/loader';
export type Note = {id: number, slug: string, title: string, markdown: string}


function App() {
  const {data: notes, status, run} = useAsync({})
  console.log("🚀 ~ file: App.tsx ~ line 14 ~ App ~ status", status)
  useEffect(() => {
    run(fetch('http://localhost:3001/notes'))
  }, [run])
  if(status === 'pending'){
    return <Loader />
  }
  return (
    <div style={{backgroundColor: 'wheat'}}>
      <header>
        Welcome to your Notes
      </header>
      <nav>
        <Link to="/notes">Notes</Link> |{" "}
        <Link to="/notes/new">New Note</Link> |{" "}
      </nav>
      <main>
        <ul>{notes?.map((note: Note) => <li key={note.id}> <Link to={`notes/${note.id}`}>{note.title}</Link></li>)}</ul>
        <Outlet />
      </main>
  </div>
  )
}


export const AppRoutes  = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="notes" element={<Notes />}/>
          <Route path="notes/:noteId" element={<NoteView />} />
          <Route path="notes/new" element={<NoteForm />} />
        </Route>
        <Route path="*" element={<Nope />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

function Nope() {
  return (
    <div>nope</div>
  )
}
