
import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';


function ProfileButton({ user }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
      history.push('/')
  };

  return (
    <div className='user-profile-container'>
      <button className="user-profile-button" onClick={openMenu}>

        <i className="fas fa-user-circle" id='profile-logo'/>
        <span className="profile-username">{user.email}</span>
        <i className="fas fa-chevron-down"></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown-container">
          <h2 className="profile-header">ACCOUNT</h2>
          <ul className="profile-dropdown-list">
          <li className="profile-options"><span>USERNAME</span>{user.username}</li>
          <li className="profile-options"><span>EMAIL</span>{user.email}</li>
          <li className="profile-options">
            <button className="logout-button" onClick={logout}>Log Out {user.username}</button>
          </li>
        </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
