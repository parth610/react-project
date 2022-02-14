import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './images/Asset 2.png'
import * as sessionActions from '../../store/session'

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('Demo-lition');
  const [password, setPassword] = useState('password');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

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
        <form onSubmit={handleSubmit} className='demo-user-button'>
          <input type='hidden' value={credential}/>
          <input type='hidden' value={password}/>
          <button type='submit'>Demo User</button>
          </form>
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
