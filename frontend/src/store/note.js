import { csrfFetch } from "./csrf";
import { REMOVE_USER } from "./session";
import { REMOVE_NOTEBOOK } from "./notebook";

const CREATE_NOTE = 'note/createNote';
const UPDATE_NOTE = 'note/updateNote';
export const REMOVE_NOTE = 'note/removeNote';
const LOAD_NOTE = 'note/loadNote';

const createNote = (note) => {
    return {
        type: CREATE_NOTE,
        note
    }
}

const loadNotes = (notes) => {
    return {
        type: LOAD_NOTE,
        notes
    }
}

const removeNote = (note) => {
    return {
        type: REMOVE_NOTE,
        note
    }
}

const updateNote = (note) => {
    return {
        type: UPDATE_NOTE,
        note
    }
}

export const addNote = (data) => async(dispatch) => {
    const {noteTitle, user_id, bookId, content} = data;

    const response = await csrfFetch('/api/note', {
        method: 'POST',
        body: JSON.stringify({
            title: noteTitle,
            user_id,
            notebook_id: bookId,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const newNote = await response.json();
    dispatch(createNote(newNote));
    return response;
}

export const getNotes = () => async (dispatch) => {
    const response = await csrfFetch('/api/note/all');

    if (response.ok) {
        const notes = await response.json();
        dispatch(loadNotes(notes))
    }
}

export const deleteNote = (noteData) => async (dispatch) => {
    const {noteId} = noteData;
    const response = await csrfFetch(`/api/note/${noteId}`, {
        method: 'DELETE',
        body: JSON.stringify({noteId})
    })
    if (response.ok) {
        const delNote = await response.json();
        dispatch(removeNote(delNote))
    }
}

export const editNote = (note) => async (dispatch) => {
    const {noteTitleUpdate, noteContent, noteId} = note;
    const response = await csrfFetch(`/api/note/${noteId}`, {
        method: 'PUT',
        body: JSON.stringify({title: noteTitleUpdate, content: noteContent})
    });
    if (response.ok) {
        const updatedNote = await response.json();
        dispatch(updateNote(updatedNote))
    }
}

const initialState = {};

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTE: {
            const newNotes = {...state}
            newNotes[action.note.id] = action.note
            return newNotes
        };

        case LOAD_NOTE: {
            const newNotes = {};
            action.notes.forEach(note => {
                newNotes[note.id] = note
            });
            return {
                ...state,
                ...newNotes
            }
        }

        case REMOVE_NOTE: {
            const newNote = {...state}
            delete newNote[action.note.id];
            return newNote;
        }

        case UPDATE_NOTE: {
            const newNote = { ...state };
            newNote[action.note.id] = action.note;
            return newNote;
        }

        case REMOVE_NOTEBOOK: {
            const newNotes = {...state}
            const deletedBook = action.book

            for (let key in newNotes) {
                if (deletedBook.id === newNotes[key].notebook_id) {
                    delete newNotes[key]
                }
            }
            return newNotes
        }

        case REMOVE_USER: {
            return {}
        }

        default: return state;
    }
}

export default noteReducer;
