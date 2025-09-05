export default function ArrivalCard({products}) {
    console.log("ArrivalCard products:", products);
    
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
    return (
        <div className="arrival-card">
            <div className="arrival-grid">
                <div className="grid-item large-item">
                    <img src={getImage(products[0])} alt="Product Image" />
                    <div className="item-content">
                        <h3>{getTitle(products[0], "PlayStation 5")}</h3>
                        <p>{getDescription(products[0], "Gaming console")}</p> 
                        <a href="#" className="shop-link">{getLink(products[0])}</a>
                    </div>
                </div>
                
                <div className="grid-item medium-item">
                    <img src={getImage(products[1])} alt="Product Image" />
                    <div className="item-content">
                        <h3>{getTitle(products[1], "Women's Collections")}</h3>
                        <p>{getDescription(products[1], "Fashion items")}</p> 
                        <a href="#" className="shop-link">{getLink(products[1])}</a>
                    </div>
                </div>
                
                <div className="grid-item small-item">
                    <img src={getImage(products[2])} alt="Product Image" />
                    <div className="item-content">
                        <h3>{getTitle(products[2], "Speakers")}</h3>
                        <p>{getDescription(products[2], "Audio equipment")}</p> 
                        <a href="#" className="shop-link">{getLink(products[2])}</a>
                    </div>
                </div>
                
                <div className="grid-item small-item">
                    <img src={getImage(products[3])} alt="Product Image" />
                    <div className="item-content">
                        <h3>{getTitle(products[3], "Perfume")}</h3>
                        <p>{getDescription(products[3], "Luxury fragrance")}</p> 
                        <a href="#" className="shop-link">{getLink(products[3])}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
