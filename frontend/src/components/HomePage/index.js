import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import './home-page.css'
import folderImg from './images/folder_icon.png';
import reloadImg from './images/reload-icon.png';
import searchImg from './images/search-icon.png';
import { useSelector } from "react-redux";


function HomePage () {
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) return (
        <Redirect exact to={`/${sessionUser.id}`}/>
    )

    return (
        <div className="home-container">
            <h1 className="home-info-title">Why choose HelperNotes?</h1>
            <p>HelperNote gives you everything you need to keep life organized—great note taking, project planning, and easy ways to find what you need, when you need it.</p>
            <NavLink className="get-started-button" to="/signup">Let's get started</NavLink>
            <div className="info-cards">
                <div className="info">
                    <img className="info-icons" id='folder-icon' src={`${folderImg}`} alt='folder-icon'/>
                    <h2>Keep it together</h2>
                    <p>Create a personal space for all your most important ideas and information.</p>
                </div>
                <div className="info">
                    <img className="info-icons" src={`${searchImg}`} alt='search-icon'/>
                    <h2>Find it fast</h2>
                    <p>Get the right note, right away with powerful search.</p>
                </div>
                <div className="info">
                    <img className="info-icons" src={`${reloadImg}`} alt='reload-icon'/>
                    <h2>Take it anywhere</h2>
                    <p>Login on any device and get your notes accessible anytime.</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
