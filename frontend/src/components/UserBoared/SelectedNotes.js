import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {addNote, getNotes, deleteNote, editNote, getSelectedNotes} from '../../store/note'
import './notes-comp.css'

function SelectedNotesComponent () {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [noteTitleUpdate, setNoteTitleUpdate] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [noteIdSelected, setNoteIdSelected] = useState(null);
    const [deleteNoteSelect, setDeleteNoteSelect] = useState({})

    useEffect(() => {
        if (!sessionUser) return (
            history.push('/')
        )
    },[sessionUser]);

    const allNotes = useSelector(state => {
        return Object.values(state.note)
    })

    const {id} = useParams();

    useEffect(() => {

        const data = {
            notebookId: id
        }
        if (sessionUser) {
            dispatch(getSelectedNotes(data))
            setNoteIdSelected(null);
            setNoteContent('');
            setNoteTitleUpdate('');
        }
    },[id])

    const noteDeleteHandle = (e) => {
        e.preventDefault();
        const noteData = {
            noteId: e.target.id
        }
        dispatch(deleteNote(noteData))
        deleteNoteConfirmDisplay();
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

    const deleteNoteConfirmation = async (e) => {
        e.preventDefault();
        let noteObject = {}
        const noteId = e.target.id;
        const findNote = allNotes.find((note) => {
            return note.id === +noteId
        })
        noteObject = {...findNote}
        setDeleteNoteSelect(deleteNote =>({
            ...deleteNote,
            ...noteObject
        }))
    }

    const deleteNoteConfirmDisplay = (e) => {
        const confCard = document.getElementById(`note-delete-confirmation`);
        if (confCard.style.display === 'none' || !confCard.style.display) {
            confCard.style.display = 'flex';
        } else {
            confCard.style.display = 'none'
        }
    }

    const deleteNoteFunctionHandles = (e) => {
        deleteNoteConfirmation(e);
        deleteNoteConfirmDisplay(e)
    }

    const timeCal = (date) => {
        const givenTime = new Date(date)
        const currentTime = new Date()
        const updatedMonths = givenTime.getMonth();
        const currentMonth = currentTime.getMonth();
        const updatedDays = givenTime.getDate();
        const currentDate = currentTime.getDate();
        const updatedHour = givenTime.getHours();
        const currentHour = currentTime.getHours()
        const updatedMinutes = givenTime.getMinutes();
        const currentMinutes = currentTime.getMinutes();

        if (currentMonth - updatedMonths > 0) {
            if (currentMonth - updatedMonths > 1) {
                return `${currentMonth - updatedMonths} months ago`
            } else {
                return `${currentMonth - updatedMonths} month ago`
            }
        } else if (currentDate - updatedDays > 0) {
            if (currentDate - updatedDays > 1) {
                return `${currentDate - updatedDays} days ago`
            } else {
                return `${currentDate - updatedDays} day ago`
            }
        } else if (currentHour - updatedHour > 0) {
            if (currentHour - updatedHour > 1) {
                return `${currentHour - updatedHour} hours ago`
            } else {
                return `an hour ago`
            }
        } else if (currentMinutes - updatedMinutes >= 0) {
            if (currentMinutes - updatedMinutes > 1) {
                return `${currentMinutes - updatedMinutes} minutes ago`
            } else {
                return `a minute ago`
            }
        }
        return currentMinutes - updatedMinutes;
    }

    return (
        <div className='notes-full-page'>
        <div className='notes-component-page'>
            <h2><i id='note-header-icon' className='fa fa-clipboard'/>Notes</h2>
            <h4>{allNotes.length} notes</h4>
        <div className='note-cards-container'>
            {allNotes.map(note => {
                return (
                    <div className={noteIdSelected === note.id ? 'note-card-parent-selected' : 'note-card-parent'} key={`note-card-parent-${note.id}`}>
                    <div className='note-card-container' data-note={JSON.stringify(note)}  onClick={noteEditClick}>
                    <div className='note-card-title'>{note.title}</div>
                    <div className='note-card-content'>{note.content}</div>
                </div>
                <div className='note-time'>{timeCal(note.updatedAt)}</div>
                <button className='note-card-delete-button' id={note.id} onClick={deleteNoteFunctionHandles} >Delete</button>
                    </div>
                )
            })}
        </div>
        </div>
        <div className='note-edit-area'>
            <div>Edit your note</div>
            <input className='note-title-edit-input' disabled={noteIdSelected ? false : true} value={noteTitleUpdate} onChange={(e) => setNoteTitleUpdate(e.target.value)}/>
            <textarea className='note-content-edit-input' disabled={noteIdSelected ? false : true} value={noteContent} onChange={(e) => setNoteContent(e.target.value)}/>
            <button className='note-save-button' id={noteIdSelected} onClick={updateNoteHandle}>Save</button>
        </div>
        <div className='note-delete-confirmation-bg' id={`note-delete-confirmation`}>
            <div className='note-delete-confirmation-card'>
                <p>Are you sure you want to DELETE "{deleteNoteSelect.title}"?</p>
                <div className="delete-note-confirmation-buttons">
                    <div className="delete-note-yes" id={deleteNoteSelect.id}  onClick={noteDeleteHandle}>Yes</div>
                    <div className="delete-note-cancel" id={deleteNoteSelect.id}  onClick={deleteNoteConfirmDisplay}>No</div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default SelectedNotesComponent
