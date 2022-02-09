import { csrfFetch } from "./csrf";

const CREATE_NOTEBOOK = 'notebook/createNotebook';
const UPDATE_NOTEBOOK = 'notebook/updateNotebook';
const REMOVE_NOTEBOOK = 'notebook/removeNotebook';
const LOAD_NOTEBOOK = 'notebook/loadNotebook';

const createNotebook = (book) => {
    return {
        type: CREATE_NOTEBOOK,
        payload: book
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
        payload: books
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
    }
}

export default notebookReducer;
