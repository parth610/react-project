import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {addNote, getNotes, deleteNote, editNote} from '../../store/note'
import './notes-comp.css'

function NotesComponent () {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [noteTitleUpdate, setNoteTitleUpdate] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [noteIdSelected, setNoteIdSelected] = useState(null)

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
        return dispatch(editNote(noteData))
    }

    const noteEditClick = async (e) => {
        const data = e.currentTarget.dataset.note;
        const selectedNote = JSON.parse(data)
        setNoteContent(selectedNote.content);
        setNoteTitleUpdate(selectedNote.title)
        setNoteIdSelected(selectedNote.id)
    }

    return (
        <div className='notes-full-page'>
            <div className='notes-nav-space'>
            </div>
        <div className='notes-component-page'>
            <h2><i id='note-header-icon' className='fa fa-clipboard'/>Notes</h2>
            <h4>total notes</h4>
        <div className='note-cards-container'>
            {allNotes.map(note => {
                return (
                    <div className='note-card-parent' key={note.id}>
                    <div className='note-card-container' data-note={JSON.stringify(note)}  onClick={noteEditClick}>
                    <div className='note-card-title'>{note.title}</div>
                    <div className='note-card-content'>{note.content}</div>
                </div>
                <button className='note-card-delete-button' id={note.id} onClick={noteDeleteHandle} ><i className='fas fa-trash' id='note-delete-icon'/></button>
                    </div>
                )
            })}
        </div>
        </div>
        <div className='note-edit-area'>
            <input value={noteTitleUpdate} onChange={(e) => setNoteTitleUpdate(e.target.value)}/>
            <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)}/>
            <button id={noteIdSelected} onClick={updateNoteHandle}>Save</button>
        </div>
        </div>
    )
}

export default NotesComponent
