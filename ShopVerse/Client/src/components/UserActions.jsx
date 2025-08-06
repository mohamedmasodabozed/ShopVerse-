import React from 'react';
import SearchBar from './SearchBar.jsx';
import WishlistIcon from './WishlistIcon.jsx';
import CartIcon from './CartIcon.jsx';
import Profile from './Profile.jsx';

export default function UserActions({ loggedIn }) {
    const [isClicked, setIsClicked] = React.useState(false);
    const handleClick = () => {
        setIsClicked(!isClicked);
    };
    return (
        <div className="search-items">
            <ul>
                <SearchBar />
                <WishlistIcon />
                <CartIcon />
                {loggedIn ? (
                    <li>
                        <a href="#" onClick={handleClick}>
                            <Profile />
                        </a>
                    </li>
                ) : null}
            </ul>
        </div>
    );
}
