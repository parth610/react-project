import React, {useEffect} from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';

function UserBoared () {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (!sessionUser) return (
            history.push('/')
        )
    }, [sessionUser])
    return (
        <>
        <h1>welcome user</h1>
        <ProfileButton user={sessionUser}/>
        </>
    )
}


export default UserBoared
