import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {addNote, getNotes, deleteNote} from '../../store/note'

function NotesComponent () {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [noteTitleUpdate, setNoteTitleUpdate] = useState('')
    const [noteContent, setNoteContent] = useState('')

    useEffect(() => {
        if (!sessionUser) return (
            history.push('/')
        )
    },[sessionUser]);

    const allNotes = useSelector(state => {
        return Object.values(state.note)
    })

    useEffect(() => {

        if (sessionUser) {
            dispatch(getNotes())
        }
    },[dispatch, sessionUser])

    const noteDeleteHandle = (e) => {
        e.preventDefault();
        const noteData = {
            noteId: e.target.id
        }
        return dispatch(deleteNote(noteData))
    }

    const updateNoteHandle = (e) => {
        e.preventDefault();
        const noteData = {
            noteId: e.target.id,
            noteTitleUpdate,
            noteContent
        }
    }

    const noteEditClick = async (e) => {
        const data = e.currentTarget.dataset.note;

        console.log(JSON.parse(data))
    }

    return (
        <>
        <div className='note-cards-container'>
            {allNotes.map(note => {
                return (
                    <div key={note.id}>
                <div data-note={JSON.stringify(note)}  onClick={noteEditClick}>
                    <div>{note.title}</div>
                    <div>{note.content}</div>
                </div>
                <span ><button id={note.id} onClick={noteDeleteHandle} >DELETE</button></span>
                    </div>
                )
            })}
        </div>
        <div>
            <input value={noteTitleUpdate} onChange={updateNoteHandle}/>
            <textarea value={noteContent} onChange={updateNoteHandle}/>
        </div>
        </>
    )
}

export default NotesComponent
