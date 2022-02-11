import React, {useEffect, useState} from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import {getNotebooks, addNotebook, deleteNotebook, updateNotebookTitle} from '../../store/notebook'

function UserBoared () {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (!sessionUser) return (
            history.push('/')
        )
    }, [sessionUser]);

    const notebooks = useSelector(state => {
       return Object.values(state.notebook)
    })

    useEffect(() => {
        if (sessionUser) {
            dispatch(getNotebooks())
        }
    }, [dispatch, sessionUser])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title,
            user_id: sessionUser.id
        }
        return dispatch(addNotebook(payload));
    }

    const clickDeleteHandle = (e) => {
        e.preventDefault();
        const bookData = {
            bookId: e.target.id
        }
        return dispatch(deleteNotebook(bookData))
    }

    const clickEditHandle = (e) => {
        e.preventDefault();
        const changeTitle = document.getElementById(`book-title-${e.target.id}`)
        console.log(changeTitle.innerHTML)
        const bookData = {
            updatedTitle: changeTitle.innerHTML,
            bookId: e.target.id
        }
        const titleDiv = document.querySelector(`#book-title-editable-${e.target.id}`)
        titleDiv.setAttribute('contentEditable', 'false')
        return dispatch(updateNotebookTitle(bookData))
    }

    const changeEditAttribute = (e) => {
        const titleDiv = document.querySelector(`#book-title-editable-${e.target.id}`)
        titleDiv.setAttribute('contentEditable', 'true')
    }

    return (
        <>
        <h1>welcome user</h1>
        <ProfileButton user={sessionUser}/>
        <h2>Your Notebooks</h2>
        {notebooks.map(book => {
            return (
                <div key={book.id}>
                <div id={`book-title-editable-${book.id}`} contentEditable='false' suppressContentEditableWarning='true'><p id={`book-title-${book.id}`}>{book.title}</p></div>
                <span><button id={`${book.id}`} onClick={clickDeleteHandle}>Delete</button></span>
                <span><button id={`${book.id}`} onClick={changeEditAttribute}>Edit</button></span>
                <span><button id={`${book.id}`} onClick={clickEditHandle}>Confirm</button></span>
                </div>
            )
        })}
        <form onSubmit={handleSubmit}>
            <label>
                Title
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <button type='submit'>New Notebook</button>
        </form>
        </>
    )
}


export default UserBoared
