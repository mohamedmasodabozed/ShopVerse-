export default function ArrivalCard(props) {
    const products = props.products || [];
    
    return (
        <div className="arrival-card">
            <div className="arrival-grid">
                <div className="grid-item large-item">
                    <img src={products[0]?.img || "https://via.placeholder.com/400x300"} alt="Product Image" />
                    <div className="item-content">
                        <h3>{products[0]?.title || "PlayStation 5"}</h3>
                        <p>{products[0]?.description || "Gaming console"}</p> 
                        <a href="#" className="shop-link">{products[0]?.link || "Shop Now"}</a>
                    </div>
                </div>
                
                <div className="grid-item medium-item">
                    <img src={products[1]?.img || "https://via.placeholder.com/400x300"} alt="Product Image" />
                    <div className="item-content">
                        <h3>{products[1]?.title || "Women's Collections"}</h3>
                        <p>{products[1]?.description || "Fashion items"}</p> 
                        <a href="#" className="shop-link">{products[1]?.link || "Shop Now"}</a>
                    </div>
                </div>
                
                <div className="grid-item small-item">
                    <img src={products[2]?.img || "https://via.placeholder.com/400x300"} alt="Product Image" />
                    <div className="item-content">
                        <h3>{products[2]?.title || "Speakers"}</h3>
                        <p>{products[2]?.description || "Audio equipment"}</p> 
                        <a href="#" className="shop-link">{products[2]?.link || "Shop Now"}</a>
                    </div>
                </div>
                
                <div className="grid-item small-item">
                    <img src={products[3]?.img || "https://via.placeholder.com/400x300"} alt="Product Image" />
                    <div className="item-content">
                        <h3>{products[3]?.title || "Perfume"}</h3>
                        <p>{products[3]?.description || "Luxury fragrance"}</p> 
                        <a href="#" className="shop-link">{products[3]?.link || "Shop Now"}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
