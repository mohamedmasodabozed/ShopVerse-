import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
    return (
        <li className='search-input'>
            <input type="text" placeholder="What are you looking for" />
            <FontAwesomeIcon icon={faSearch} className=" search-icon" />
        </li>
    );
}
