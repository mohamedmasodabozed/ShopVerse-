import React from 'react';
import Logo from './Logo.jsx';
import Navigation from './Navigation.jsx';
import UserActions from './UserActions.jsx';

export default function Header({isLoggedIn}) {

    return (
        <header>
            <nav>
                <Logo />
                <Navigation loggedIn={isLoggedIn} />
                <UserActions loggedIn={isLoggedIn} />
            </nav>
        </header>
    );
}