import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faXmark, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import {Link} from 'react-router-dom';
export default function Profilenav() {
    return (
        <nav className="profile-nav">
            <ul>
                <li>
                    <FontAwesomeIcon icon={faUser} />
                    <Link to="/profile">Manage My Account</Link>
                </li>
                <li>
                    <FontAwesomeIcon icon={faBox} />
                    <p>My Orders</p>
                </li>
                <li>
                    <FontAwesomeIcon icon={faXmark} />
                    <p>My Cancellations</p>
                </li>
                <li>
                    <FontAwesomeIcon icon={faStar} />
                    <p>My Reviews</p>
                </li>
                <li>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    <p>Logout</p>
                </li>
            </ul>
        </nav>
    );
}
