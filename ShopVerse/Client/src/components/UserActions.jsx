import React from 'react';
import SearchBar from './SearchBar.jsx';
import WishlistIcon from './WishlistIcon.jsx';
import CartIcon from './CartIcon.jsx';
import Profile from './Profile.jsx';
import Profilenav from './Profilenav.jsx';

export default function UserActions({ loggedIn }) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <div className="search-items">
            <ul>
                <SearchBar />
                <WishlistIcon />
                <CartIcon />
                {loggedIn ? (
                    <li className="profile-wrapper" 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave} 
                        onClick={handleClick}>
                        <Profile />
                        {(isHovered || isClicked) && <Profilenav />}
                    </li>
                ) : null}
            </ul>
        </div>
    );
}
