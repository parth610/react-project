import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotebooks, addNotebook, deleteNotebook, updateNotebookTitle } from "../../store/notebook";
import './Notebook-comp.css'

function NotebookComponent () {
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
        const changeTitle = document.getElementById(`book-page-title-${e.target.id}`)

        const bookData = {
            updatedTitle: changeTitle.innerHTML,
            bookId: e.target.id
        }
        const titleDiv = document.querySelector(`#book-page-title-editable-${e.target.id}`)
        titleDiv.setAttribute('contentEditable', 'false')
        return dispatch(updateNotebookTitle(bookData))
    }

    const changeEditAttribute = (e) => {
        const titleDiv = document.querySelector(`#book-page-title-editable-${e.target.id}`)
        titleDiv.setAttribute('contentEditable', 'true')
        titleDiv.focus();
    }

    const notebookDate = (date) => {
        const update = new Date (date);
        return update.toDateString();
    }

    const notebookOptions = (e) => {
        e.preventDefault();
        const bookId = e.currentTarget.id;
        const moreOptions = document.getElementById(`notebook-option-parent-${bookId}`);
        if (moreOptions.style.display === 'none' || !moreOptions.style.display) {
            moreOptions.style.display = 'flex';
        } else {
            moreOptions.style.display = 'none';
        }
    }

    const notebookOptionsHide = (e) => {
        e.preventDefault()
        notebookOptions(e)
    }

    const notebookDeleteConf = (e) => {
        e.preventDefault();
        const bookId = e.currentTarget.id;
        const confCard = document.getElementById(`notebook-delete-confirmation-${bookId}`);
        if (confCard.style.display === 'none' || !confCard.style.display) {
            confCard.style.display = 'flex';
        } else {
            confCard.style.display = 'none'
        }
    }

    const notebookDeleteconfHide = (e) => {
        e.preventDefault()
        notebookDeleteConf(e)
        notebookOptions(e)
    }



     return (
         <div className="Notebooks-page">
            <h2>Notebooks</h2>
            <h2>TotalNotebooks</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>TITLE</th>
                            <th>CREATED BY</th>
                            <th>UPDATED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
            {notebooks.map(book => {
                return (
                    <tr key={book.id}>
                    <td className="notebook-title-column">
                <div id={`book-page-title-editable-${book.id}`} contentEditable='false' suppressContentEditableWarning='true'><p id={`book-page-title-${book.id}`}>{book.title}</p></div>
                        </td>
                        <td className="notebook-user-column">{sessionUser.username}</td>
                        <td className="notebook-updated-column">{
                        notebookDate(book.updatedAt)
                        }</td>
                        <td className="notebook-action-column">
                        <i className="fas fa-ellipsis-h" onClick={notebookOptions} id={book.id}/>
                        <div className="notebook-options-parent" id={`notebook-option-parent-${book.id}`}>
                            <div className="notebook-more-options">
                                <button className="note-book-delete-button" id={`${book.id}`} onClick={notebookDeleteConf}>Delete</button>
                                <button className="notebook-edit-button" id={`${book.id}`} onClick={changeEditAttribute}>Edit</button>
                            </div>
                                <div className='notebook-option-bg' onClick={notebookOptionsHide} id={book.id}> </div>
                                <div className="notebook-delete-confirmation-bg" id={`notebook-delete-confirmation-${book.id}`}>
                                <div className="notebook-delete-confirmation-card">
                                    <p>Are you sure you want to DELETE notebook "{book.title}" ?</p>
                                    <div className="delete-notebook-confirmation-buttons">
                                        <div className="delete-notebook-yes" id={book.id} onClick={clickDeleteHandle}>Yes</div>
                                        <div className="delete-notebook-cancel" id={book.id} onClick={notebookDeleteconfHide}>No</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div>
                            <button className="notebook-edit-confirm" id={`${book.id}`} onClick={clickEditHandle}>Confirm</button>
                            </div>

                        </td>
                </tr>
            )
        })}
                    </tbody>
                </table>
            </div>
         </div>
     )
}



 export default NotebookComponent;
