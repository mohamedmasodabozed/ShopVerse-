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
                <li>Contact</li>
                <li>About</li>
                {renderLinks()}
            </ul>
        </div>
    );
}
