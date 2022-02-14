import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import signupLogo from '../LoginFormPage/images/Asset 3.png'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-full-page">
      <div className="signup-form-container">
        <NavLink className='helper-notes-logo-signup' exact to='/'>
          <img className='helper-logo-signup' src={`${signupLogo}`} alt='helper-note-logo-signup-page'/>
        </NavLink>
    <form className="singup-form" onSubmit={handleSubmit}>
      <ul className="signup-errors-list">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label className='signup-label'>
        Email
        <input  className="signup-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className='signup-label'>
        Username
        <input  className="signup-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label className='signup-label'>
        Password
        <input className="signup-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className='signup-label'>
        Confirm Password
        <input  className="signup-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button className="signup-button" type="submit">Sign Up</button>
    </form>
    <div className='login-form-bottom'>
        <div>Already have an account?</div>
        <NavLink className='login-redirect-login-page' to='/login'>Login</NavLink>
      </div>
      </div>
      </div>
  );
}

export default SignupFormPage;
