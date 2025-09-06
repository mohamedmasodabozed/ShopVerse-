import { Link, useNavigate } from "react-router-dom";
export default function ArrivalCard({products}) {
    console.log("ArrivalCard products:", products);
    const navigate = useNavigate();
    
    // Helper function to get image source from different product formats
    const getImage = (product) => {
        return product?.productImage?.URL || product?.productImage || product?.img || "https://via.placeholder.com/400x300";
    };
    
    // Helper function to get product title/name from different formats
    const getTitle = (product, defaultTitle) => {
        return product?.productName || product?.title || defaultTitle;
    };
    
    // Helper function to get product description from different formats
    const getDescription = (product, defaultDesc) => {
        return product?.productDescription || product?.description || defaultDesc;
    };
    
    // Helper function to get link text
    const getLink = (product) => {
        return product?.link || "Shop Now";
    };
    
    // Navigate to product details and ensure scroll to top
    const navigateToProduct = (productId) => {
        if (productId) {
            navigate(`/product/${productId}`);
            window.scrollTo(0, 0);
        }
    }
    return (
        <div className="arrival-card">
            <div className="arrival-grid">
                <div className="grid-item large-item">
                    <img src={getImage(products[0])} alt="Product Image" />
                    <div className="item-content">
                        <h3>{getTitle(products[0], "PlayStation 5")}</h3>
                        <p>{getDescription(products[0], "Gaming console")}</p> 
                        <button 
                            onClick={() => navigateToProduct(products[0]?.id)} 
                            className="shop-link"
                        >
                            Show Details
                        </button>
                    </div>
                </div>
                
                <div className="grid-item medium-item">
                    <img src={getImage(products[1])} alt="Product Image" />
                    <div className="item-content">
                        <h3>{getTitle(products[1], "Women's Collections")}</h3>
                        <p>{getDescription(products[1], "Fashion items")}</p> 
                        <button 
                            onClick={() => navigateToProduct(products[1]?.id)} 
                            className="shop-link"
                        >
                            Show Details
                        </button>
                    </div>
                </div>
                
                <div className="grid-item small-item">
                    <img src={getImage(products[2])} alt="Product Image" />
                    <div className="item-content">
                        <h3>{getTitle(products[2], "Speakers")}</h3>
                        <p>{getDescription(products[2], "Audio equipment")}</p> 
                        <button 
                            onClick={() => navigateToProduct(products[2]?.id)} 
                            className="shop-link"
                        >
                            {getLink(products[2])}
                        </button>
                    </div>
                </div>
                
                <div className="grid-item small-item">
                    <img src={getImage(products[3])} alt="Product Image" />
                    <div className="item-content">
                        <h3>{getTitle(products[3], "Perfume")}</h3>
                        <p>{getDescription(products[3], "Luxury fragrance")}</p> 
                        <button 
                            onClick={() => navigateToProduct(products[3]?.id)} 
                            className="shop-link"
                        >
                            {getLink(products[3])}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
