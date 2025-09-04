import { useEffect, useState } from 'react';

export default function Popup({ message }) {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        // Small delay to trigger animation
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10);
        
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div 
            className="popup"
            onClick={() => setIsVisible(false)} // Close when clicking on background
        >
            <div 
                className={`popup-content ${isVisible ? 'popup-visible' : ''}`} 
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
                    transition: 'opacity 0.3s, transform 0.3s'
                }}
                onClick={e => e.stopPropagation()} // Prevent closing when clicking on content
            >
                <p>{message}</p>
                <button 
                    onClick={() => setIsVisible(false)}
                    style={{
                        backgroundColor: '#DB4444',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
