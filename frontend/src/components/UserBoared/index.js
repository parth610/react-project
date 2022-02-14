import React, {useEffect, useState} from 'react';
import { NavLink, Redirect, useHistory, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import {getNotebooks, addNotebook, deleteNotebook, updateNotebookTitle} from '../../store/notebook'
import {addNote} from '../../store/note'
import NotesComponent from './Notes'
import NotebookComponent from './Notebook';
import './userboard.css'

function UserBoared () {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [noteTitle, setNoteTitle] = useState('Untitled');
    const [content, setContent] = useState('')
    const [selectNotebook, setSelectNotebook] = useState(null);
    const [showCreateButtons, setShowCreateButtons] = useState(false)
    const [noteErrors, setNoteErrors] = useState([]);

    const openCreateButtons = () => {
        if (showCreateButtons) return;
        setShowCreateButtons(true);
      };

    useEffect(() => {
        if (!showCreateButtons) return;

        const closeMenu = () => {
          setShowCreateButtons(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showCreateButtons]);

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
        dispatch(addNotebook(payload));
        const container = document.getElementsByClassName('notebook-form-page')[0];
        container.style.display = 'none';
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

    //Note
    const submitNote = (e) => {
        e.preventDefault();

        const data = {
            noteTitle,
            user_id: sessionUser.id,
            content,
            bookId: selectNotebook
        }
        dispatch(addNote(data));
        const container = document.getElementsByClassName('note-form-page')[0];
        container.style.display = 'none';
    }

    const createNotebookForm = (e) => {
        e.preventDefault();
        const container = document.getElementsByClassName('notebook-form-page')[0];
        container.style.display = 'flex';
        // if (container.style)
    }

    const formDisplay = (e) => {
    if (e.target.id === 'form-outside-area') {
        e.target.style.display = 'none';
    }
    }

    const showDropdown = (e) => {

        const container = document.getElementsByClassName('notebooks-dropdown-lists')[0];
        if (container.style.display === 'none') {
            container.style.display = 'block'
        } else {
            container.style.display = 'none';
        }
    }

    const createNoteForm = (e) => {
        e.preventDefault();
        const container = document.getElementsByClassName('note-form-page')[0];
        container.style.display = 'flex';
    }

    const noteFormDisplay = (e) => {
        if (e.target.id === 'note-form-outside-area') {
            e.target.style.display = 'none';
        }
        }

    return (
        <>
            <nav className='user-board-body'>
                <div className='user-nav-container'>
                    <ProfileButton user={sessionUser}/>
                    <div className='searchbar-container'>
                        <i className="fas fa-search" id='search-icon' />
                        <input type='search' placeholder='Search' className='search-input'/>
                    </div>
                    <div className='new-button-container'>
                        <button className='new-button' onClick={openCreateButtons}> <i id='plus-icon' className='fas fa-plus'/>New</button>
                        {showCreateButtons && (
                        <div className='create-buttons-container'>
                            <button onClick={createNotebookForm} className='create-notebook-button'>Create notebook</button>
                            <button onClick={createNoteForm} className='create-note-button'>Create note</button>
                        </div>
                        )}
                    </div>
                    <NavLink className='notes-navlink-container' to={`/${+sessionUser.id}/notes`}>
                        <div className='notes-nav-container'>
                            <p className='notes-nav'><i id='note-icon' className='fa fa-clipboard'/>Notes</p>
                        </div>
                    </NavLink>
                    <div className='notebooks-nav-adjustment'>
                    <NavLink className='notebooks-navlink-container' to={`/${sessionUser.id}/Notebooks`}>
                        <div className='notebooks-nav-container'>
                            <p className='notebooks-nav'><i id='note-icon' className='fas fa-swatchbook'/>Notebooks</p>
                        </div>
                    </NavLink>
                    <i onClick={showDropdown} id='notebook-list-down-arrow' className='fas fa-level-down-alt'/>
                    </div>
                    <div style={{display: 'none'}} className='notebooks-dropdown-lists'>
                    {notebooks.map(book => {
                        return (
                            <div key={book.id}>
                            <div id={`book-title-editable-${book.id}`}><p className='nav-book-list' id={`book-title-${book.id}`}><i id='note-icon' className='fas fa-book'/>{book.title}</p></div>
                            </div>
                            )
                         })}
                        </div>
                </div>
                <div onClick={formDisplay} id='form-outside-area' className='notebook-form-page'>
                    <div className='notebook-form-container'>
                        <form className='notebook-form' onSubmit={handleSubmit}>
                            <h2 className='notebook-form-header'>Create new notebook</h2>
                            <p className='notebook-form-paragraph'>Notebooks are useful for grouping notes around a common topic.</p>
                            <label>
                            Title
                            <input placeholder='Notebook name' className='notebook-form-input' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </label>
                        <button className='notebook-form-button' type='submit'>New Notebook</button>
                        </form>
                    </div>
                </div>
                <div onClick={noteFormDisplay} id='note-form-outside-area' className='note-form-page'>
                    <div className='note-form-container'>

                    <form className='note-form' onSubmit={submitNote}>
                    <label> Select notebook
                    <select className='note-form-input' onChange={(e) => setSelectNotebook(e.target.value)}>
                    <option value=''>-SELECT-</option>
                    {notebooks.map(book => {
                        return (
                            <option value={book.id} key={book.id}>{book.title}</option>
                        )
                    })}
                    </select>
                    </label>

                    <button className='note-form-button' type='submit'>New Note</button>
                    </form>
                    </div>
                </div>
            </nav>
        </>
    )
}


export default UserBoared
