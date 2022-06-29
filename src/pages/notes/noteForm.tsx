import { Outlet, Route, BrowserRouter, Routes, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Note } from '../../App'
import { NoteView } from './noteView'

export function NoteForm() {
    return (
      <div>
          New Note Form
      </div>
    );
  }
  