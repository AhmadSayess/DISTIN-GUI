import React from 'react'
// import { NavLink } from "react-router-dom";
import "../NavBar/NavBar.css"
const NavBar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container container">
                    <input type="checkbox" />
                    <div className="hamburger-lines">
                        <span className="line line1" />
                        <span className="line line2" />
                        <span className="line line3" />
                    </div>

                    <div className="lona">
                        <h1>Distin-Gui</h1>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar