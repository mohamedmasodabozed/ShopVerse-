import React from 'react';

export default function Navigation({ loggedIn }) {
    return (
        <div className="links">
            <ul>
                <li>Home</li>
                <li>Contact</li>
                <li>About</li>
                {loggedIn === false ? <li>Sign up</li> : null}
            </ul>
        </div>
    );
}
