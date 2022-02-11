import { csrfFetch } from "./csrf";
import { REMOVE_USER } from "./session";

const CREATE_NOTEBOOK = 'notebook/createNotebook';
const UPDATE_NOTEBOOK = 'notebook/updateNotebook';
const REMOVE_NOTEBOOK = 'notebook/removeNotebook';
const LOAD_NOTEBOOK = 'notebook/loadNotebook';

const createNotebook = (payload) => {
    return {
        type: CREATE_NOTEBOOK,
        payload
    }
}

const updateNotebook = (book) => {
    return {
        type: UPDATE_NOTEBOOK,
        book
    }
}

const removeNotebook = (book) => {
    return {
        type: REMOVE_NOTEBOOK,
        book
    }
}

const loadNotebook = (books) => {
    return {
        type: LOAD_NOTEBOOK,
        books
    }
}

export const getNotebooks = () => async (dispatch) => {
    const response = await csrfFetch('/api/notebook');
    if (response.ok) {
        const books = await response.json();
        dispatch(loadNotebook(books))
    }
}

export const addNotebook = (data) => async (dispatch) => {
    const {title, user_id} = data
    const response = await csrfFetch('/api/notebook', {
        method: 'POST',
        body: JSON.stringify({
            title,
            user_id
        }),
        headers: {
            'Content-Type': 'application/json',
          }
    })
        const newBook = await response.json();
        dispatch(createNotebook(newBook));
        return response;
}

export const deleteNotebook = (book) => async (dispatch) => {
    const {bookId} = book;
    const response = await csrfFetch(`/api/notebook/${bookId}`, {
        method: 'DELETE',
        body: JSON.stringify({bookId})
    })

    if (response.ok) {
        const delBook = await response.json();
        dispatch(removeNotebook(delBook))
    }
}

export const updateNotebookTitle = (book) => async (dispatch) => {
    const {updatedTitle, bookId} = book;
    const response = await csrfFetch(`/api/notebook/${bookId}`, {
        method: 'PUT',
        body: JSON.stringify({title: updatedTitle})
    });
    if (response.ok) {
        const updated = await response.json();
        dispatch(updateNotebook(updated))
    }
}

const initialState = {};

const notebookReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTEBOOK: {
            const newBooks = {};
            action.books.forEach(book => {
                newBooks[book.id] = book;
            })
                return {
                    ...state,
                    ...newBooks
                }
        }
        case CREATE_NOTEBOOK: {
            const newBooks = {...state,
            };
            newBooks[action.payload.id] = action.payload
            return newBooks
        }

        case REMOVE_NOTEBOOK: {
            const newBook = { ...state }
            delete newBook[action.book.id]
            return newBook
        }

        case UPDATE_NOTEBOOK: {
            const newBook = { ...state }
            newBook[action.book.id] = action.book
            return newBook;
        }

        case REMOVE_USER: {
            return {}
        }

        default:
            return state;
    }
}

export default notebookReducer;
