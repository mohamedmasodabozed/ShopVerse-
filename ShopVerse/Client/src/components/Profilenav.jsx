import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faXmark, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import {Link} from 'react-router-dom';
export default function Profilenav() {
    const [highlight, setHighlight] = React.useState('profile');
    return (
        <nav className="profile-nav">
            <ul>
                <li className={highlight === 'profile' ? 'active' : ''}>
                    <FontAwesomeIcon icon={faUser} />
                    <Link to="/profile" onClick={() => setHighlight('profile')}>Manage My Account</Link>
                </li>
                <li className={highlight === 'orders' ? 'active' : ''}>
                    <FontAwesomeIcon icon={faBox} />
                    <Link to="/orders" onClick={() => setHighlight('orders')}>My Orders</Link>
                </li>
                <li className={highlight === 'cancellations' ? 'active' : ''}>
                    <FontAwesomeIcon icon={faXmark} />
                    <Link to="/cancellations" onClick={() => setHighlight('cancellations')}>My Cancellations</Link>
                </li>
                <li className={highlight === 'reviews' ? 'active' : ''}>
                    <FontAwesomeIcon icon={faStar} />
                    <Link to="/reviews" onClick={() => setHighlight('reviews')}>My Reviews</Link>
                </li>
                <li className={highlight === 'logout' ? 'active' : ''}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    <Link to="/logout" onClick={() => setHighlight('logout')}>Logout</Link>
                </li>
            </ul>
        </nav>
    );
}
