import NavList from "./NavList";
import WelcomeMessage from "./WelcomeMessage";
import {jwtDecode} from "jwt-decode";
import Header from "../Header";
import EditProfile from "./EditProfile";
import "./Profile.css"; // Import the CSS file

export default function Profile() {
    // Get token from localStorage and handle the case if it's not present
    let token = localStorage.getItem("authToken");
    // Use jwtDecode function to decode the token if it exists
    let decryptedToken = token ? jwtDecode(token) : {};
    let name = decryptedToken.email.split("@")[0];  
    
    return (
        <div>
            <Header isLoggedIn={true} />
            <div className="profile-container">
                <NavList />
                <div className="profile-main">
                    <WelcomeMessage userName={name} />
                    <EditProfile userName={name} email={decryptedToken.email} />
                </div>
            </div>
        </div>
    );
}
