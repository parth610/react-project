import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';
import loginLogo from './images/Asset 3.png';
import { NavLink } from 'react-router-dom';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
      <Redirect exact to={`/${sessionUser.id}`} />
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.login({ credential, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    return (
      <div className='login-full-page'>
      <div className='login-form-container'>
        <NavLink className='heler-notes-logo-login' exact to='/'>
        <img className='helper-logo' src={`${loginLogo}`} alt='helper-note-logo-login-page'/>
        </NavLink>
      <form className='login-form' onSubmit={handleSubmit}>
        <ul className='login-errors-list'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className='login-label'>
          Username or Email
          <input className={errors.length ? 'login-input-error' : 'login-input'}
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className='login-label'>
          Password
          <input className={errors.length ? 'login-input-error' : 'login-input'}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='login-button' type="submit">Log In</button>
      </form>
      <div className='login-form-bottom'>
        <div>Don't have an account?</div>
        <NavLink className='signup-redirect-login-page' to='/signup'>Create account</NavLink>
      </div>
      </div>
      </div>
    );
  }

  export default LoginFormPage;
