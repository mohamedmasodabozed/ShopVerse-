import { useNavigate } from 'react-router-dom';

export default function ShowMoreButton(props) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        // Determine which category this button belongs to
        let category = "all-products";
        
        // Handle the 'from' prop which contains the header title
        if (props.from) {
            if (props.from === "Flash Sales") {
                category = "flash-sales";
            } else if (props.from === "Best Selling Products") {
                category = "best-selling";
            } else if (props.from === "Explore Our Products") {
                category = "our-products";
            }
        }
        
        console.log("Show More clicked for category:", category, "from:", props.from);
        
        // Store the category in sessionStorage for the ShowmorePage to use
        sessionStorage.setItem("fromCategory", category);
        
        // Navigate to the showmore page
        navigate('/showmore');
    };

    return (
        <button 
            onClick={handleClick} 
            className="show-more-button mt-4 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
            {props.text || "Show More"}
        </button>
    );
}