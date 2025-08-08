import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function CartIcon() {
    return (
        <li>
            <a href="#">
                <FontAwesomeIcon icon={faShoppingCart} className="icon-hover action cart-icon"  />
            </a>
        </li>
    );
}
