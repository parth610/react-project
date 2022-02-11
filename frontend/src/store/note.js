import { csrfFetch } from "./csrf";
import { REMOVE_USER } from "./session";

const CREATE_NOTE = 'note/createNote';
const UPDATE_NOTE = 'note/updateNote';
const REMOVE_NOTE = 'note/removeNote';
const LOAD_NOTE = 'note/loadNote';

const createNote = (note) => {
    return {
        type: CREATE_NOTE,
        note
    }
}

export const addNote = (data) => async(dispatch) => {
    const {noteTitle, user_id, bookId, content} = data;
    console.log(noteTitle, user_id, bookId, content)
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
    console.log(response)
    const newNote = await response.json();
    dispatch(createNote(newNote));
    return response;
}

const initialState = {};

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTE: {
            const newNotes = {...state}
            newNotes[action.note.id] = action.note
            return newNotes
        };
        default: return state;
    }
}

export default noteReducer;
