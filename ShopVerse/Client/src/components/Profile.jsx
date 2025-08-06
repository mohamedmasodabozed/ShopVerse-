
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
    return (
        <a href="#" className="profile-icon">
            <FontAwesomeIcon icon={faUser} className="icon-hover" />
        </a>
    );
}
