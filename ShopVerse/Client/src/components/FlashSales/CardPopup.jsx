import { useEffect, useState } from 'react';

export default function CardPopup({ message }) {
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
            style={{
                position: 'relative',
                zIndex: 1000
            }}
            onClick={() => setIsVisible(false)}
        >
            <div 
                style={{
                    backgroundColor: 'rgba(219, 68, 68, 0.9)',
                    padding: '10px 15px',
                    borderRadius: '6px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    maxWidth: '200px',
                    width: '100%',
                    textAlign: 'center',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                    transition: 'opacity 0.3s, transform 0.3s',
                    margin: '0 auto'
                }}
                onClick={e => e.stopPropagation()}
            >
                <p style={{
                    margin: '0',
                    fontSize: '14px',
                    color: 'white',
                    fontWeight: '500'
                }}>
                    {message}
                </p>
            </div>
        </div>
    );
}
