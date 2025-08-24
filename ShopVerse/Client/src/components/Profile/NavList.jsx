import { Link } from "react-router-dom";
import React from "react";
export default function NavList({role, activeLink, setActiveLink}) { 

    return(
        <div className="profile-sidebar">
            <div className="profile-section">
                <h3>Account</h3>
                <ul className="nav-list">
                    <li>
                        <Link to="/profile" className={activeLink === 'profile' ? 'active' : 'not-active'} onClick={() => setActiveLink(() => 'profile')}>
                            <i className="fas fa-user"></i> My Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders" className={activeLink === 'orders' ? 'active' : 'not-active'} onClick={() => setActiveLink(() => 'orders')}>
                            <i className="fas fa-shopping-bag"></i> My Orders
                        </Link>
                    </li>
                    {role ? <li>
                        <Link to="/selling-products" className={activeLink === 'selling-products' ? 'active' : 'not-active'} onClick={() => setActiveLink(() => 'selling-products')}>
                            <i className="fas fa-shopping-bag"></i> Selling Products
                        </Link>
                    </li> : null}
                    <li>
                        <a href="#" className={activeLink === 'wishlist' ? 'active' : 'not-active'} onClick={() => setActiveLink(() => 'wishlist')}>
                            <i className="fas fa-heart"></i> My Wishlist
                        </a>
                    </li>
                    <li>
                        <a href="#" className={activeLink === 'address-book' ? 'active' : 'not-active'} onClick={() => setActiveLink(() => 'address-book')}>
                            <i className="fas fa-map-marker-alt"></i> Address Book
                        </a>
                    </li>
                    <li>
                        <a href="#" className={activeLink === 'payment-methods' ? 'active' : 'not-active'} onClick={() => setActiveLink(() => 'payment-methods')}>
                            <i className="fas fa-credit-card"></i> Payment Methods
                        </a>
                    </li>
                </ul>
            </div>
            
            <div className="profile-section">
                <h3>Settings</h3>
                <ul className="nav-list">
                    <li>
                        <a href="#">
                            <i className="fas fa-bell"></i> Notifications
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-shield-alt"></i> Privacy & Security
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}