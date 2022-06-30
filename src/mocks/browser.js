// src/mocks/browser.js
import { setupWorker } from 'msw'
import notesHandlers from '../pages/notes/mocks'


// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...notesHandlers)