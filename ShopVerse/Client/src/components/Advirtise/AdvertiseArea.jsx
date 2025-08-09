import { useState, useEffect } from "react";
import Dot from "./Dot.jsx";
export default function AdvertiseArea(props) {
    const imgSrcs = [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&h=400&fit=crop", 
        "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop"
    ]
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imgSrcs.length);
        }, 3000);
        
        return () => clearInterval(interval);
    }, [imgSrcs.length]);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };
    return (
        <div className="advertise-area">
            <img src={imgSrcs[currentIndex]} alt="Place Holder" />
            { <ul>
                {imgSrcs.map((src, index) => (
                    <Dot key={index} active={index === currentIndex} onClick={() => handleDotClick(index)} />
                ))} 
            </ul> }
        </div>
    );
}
