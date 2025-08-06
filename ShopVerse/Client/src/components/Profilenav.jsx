import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faXmark, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
export default function Profilenav() {
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
        setIsClicked(!isClicked);
    }
    return (
        <nav onClick={handleClick} className={`profile-nav ${isClicked ? 'active' : 'hide'}`}>
            <ul>
                <li>
                    <FontAwesomeIcon icon={faUser} /> <p>Manage My Account</p>
                </li>
                <li>
                    <FontAwesomeIcon icon={faBox} /><p>My Orders</p>
                </li>
                <li>
                    <FontAwesomeIcon icon={faXmark} /> <p>My Cancellations</p>
                </li>
                <li>
                    <FontAwesomeIcon icon={faStar} /> <p>My Reviews</p>
                </li>
                <li>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} /> <p>Logout</p>
                </li>
            </ul>
        </nav>
    );
}
