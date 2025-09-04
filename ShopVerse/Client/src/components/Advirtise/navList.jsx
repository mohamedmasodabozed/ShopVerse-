import { Link } from "react-router-dom";
export default function NavList() {
    let listItems = ['Woman’s Fashion' , 'Men’s Fashion' , 'Electronics', 'Home Appliances', 'Medicine', 'Sports & Outdoor' , 'Baby’s & Toys' , 'Groceries & Pets','Health & Beauty'];
    function getCategory(e){ 
        let category = e.target.innerText;
        sessionStorage.setItem('category', category);
        return category;
    }

    return (
        <div className="nav-list">
            <ul>
                {listItems.map((item, index) => (
                    <li key={index}>
                        <Link  to={`/browse/${item.toLowerCase().replace(/['\s&]/g, '-')}`} onClick={getCategory}>{item}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
