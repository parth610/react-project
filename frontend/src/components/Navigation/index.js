import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './images/Asset 2.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
      <div className='login-buttons'>
        <NavLink to="/login" id="login-button">Log In</NavLink>
        <NavLink to="/signup" id="signup-button">Sign Up</NavLink>
        <span className='demo-user-button'>Demo User</span>
      </div>
      </>
    );
  }

  return (
    <div className='navigation-bar'>
        <NavLink exact to="/">
          <div className='logo-container'>
          <img className='helper-note-logo' src={`${logo}`} alt='helpernote-logo'/>
          </div>
        </NavLink>
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
