export default function NavList() { 
    return(
        <div className="profile-sidebar">
            <div className="profile-section">
                <h3>Account</h3>
                <ul className="nav-list">
                    <li>
                        <a href="#" className="active">
                            <i className="fas fa-user"></i> My Profile
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-shopping-bag"></i> My Orders
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-heart"></i> My Wishlist
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-map-marker-alt"></i> Address Book
                        </a>
                    </li>
                    <li>
                        <a href="#">
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