import React, {useEffect, useState} from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import {getNotebooks, addNotebook} from '../../store/notebook'

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
        dispatch(getNotebooks())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title,
            user_id: sessionUser.id
        }
        return dispatch(addNotebook(payload));
    }

    return (
        <>
        <h1>welcome user</h1>
        <ProfileButton user={sessionUser}/>
        <h2>Your Notebooks</h2>
        {notebooks.map(book => {
            return (
                <div key={book.id}>{book.title}</div>
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
