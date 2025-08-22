import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation({ loggedIn }) {
    return (
        <div className="links">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li>Contact</li>
                <li>About</li>
                {loggedIn === false ? <li><Link to="/signup">Sign up</Link></li> : null}
            </ul>
        </div>
    );
}
