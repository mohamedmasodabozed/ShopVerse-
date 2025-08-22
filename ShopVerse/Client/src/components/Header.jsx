import React from 'react';
import Logo from './Logo.jsx';
import Navigation from './Navigation.jsx';
import UserActions from './UserActions.jsx';

export default function Header() {
    const loggedIn = false; 
    
    return (
        <header>
            <nav>
                <Logo />
                <Navigation loggedIn={loggedIn} />
                <UserActions loggedIn={loggedIn} />
            </nav>
        </header>
    );
}