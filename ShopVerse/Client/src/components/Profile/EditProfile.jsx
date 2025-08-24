export default function EditProfile({ userName, email }) {
    return (
        <div className="profile-section">
            <h3>Edit Profile</h3>
            <div className="edit-profile-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" defaultValue={userName} readOnly/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" defaultValue={email} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password </label>
                    <input 
                        type="password" 
                        id="currentPassword" 
                        placeholder="Enter your current password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input 
                        type="password" 
                        id="newPassword" 
                        placeholder="Enter your new password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        placeholder="Confirm your new password"
                    />
                </div>
                <button className="save-button" type="button">Save Changes</button>
            </div>
        </div>
    );
}
