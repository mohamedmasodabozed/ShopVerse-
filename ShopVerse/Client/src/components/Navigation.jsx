import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation({ loggedIn }) {
    function renderLinks() {
        if (!loggedIn) {
            return (
                <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                </>
            );
        }
        return (
            <>
            </>
        );
    }

    return (
        <div className="links">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About</Link></li>
                {renderLinks()}
            </ul>
        </div>
    );
}
