import { csrfFetch } from "./csrf";

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
        payload: book
    }
}

const removeNotebook = (book) => {
    return {
        type: REMOVE_NOTEBOOK,
        payload: book
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
        const newBook = response.json();
        dispatch(createNotebook(newBook));
        return response;
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
                ...action.newBook
            };
            // const bookList = newBooks.map(id => {
            //     return newBooks[id]
            // })
        }
        default:
            return state;
    }
}

export default notebookReducer;
