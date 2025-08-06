import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export default function WishlistIcon() {
    return (
        <li>
            <a href="#">
                <FontAwesomeIcon icon={faHeart} />
            </a>
        </li>
    );
}
