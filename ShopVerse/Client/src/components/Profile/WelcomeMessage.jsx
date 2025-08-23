export default function WelcomeMessage({ userName }) {
    return (
        <div className="welcome-message">
            <h2>Welcome, {userName}!</h2>
            <p>Manage your account and settings here</p>
        </div>
    );
}
