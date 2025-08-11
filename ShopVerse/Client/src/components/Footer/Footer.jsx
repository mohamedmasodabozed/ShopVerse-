import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer>
            <div className="footer-content"> 
                <div className="Exclusive">
                    <ul>
                        <li><a href="">Exclusive</a></li>
                        <li><a href="">Subscribe</a></li>
                        <li><a href="">Get 10% off your first order</a></li>
                        <li><input type="text" placeholder="Enter your email" /></li>
                    </ul>
                </div>
                <div className="support">
                    <ul>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</a></li>
                        <li><a href="#">shopVerse@gmail.com</a></li>
                        <li><a href="#">+88015-88888-9999</a></li>
                    </ul>
                </div>
                <div className="social-media">
                    <ul>
                        <li><a href="#">Account</a></li>
                        <li><a href="#">my Account</a></li>
                        <li><a href="#">Login / Register</a></li>
                        <li><a href="#">Cart</a></li>
                        <li><a href="#">Wishlist</a></li>
                        <li><a href="#">shop</a></li>
                    </ul>
                </div>
                <div className="quick-link">
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">content</a></li>
                    </ul>
                </div>
                <div className="download-app">
                    <ul>
                        <li><a href="#">Download App</a></li>
                        <li><a href="#">Save $3 with App New User Only</a></li>
                    </ul>
                    <div className="app-links">
                        <a href="#" className="app-store">App Store</a>
                        <a href="#" className="google-play">Google Play</a>
                    </div>
                    <div className="social-links">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </div>
                    <p>&copy; Copyright Rimel 2022. All right reserved</p>
                </div>
            </div>
        </footer>
    );
}
