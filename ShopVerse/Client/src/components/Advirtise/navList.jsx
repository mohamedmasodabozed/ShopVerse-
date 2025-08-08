export default function NavList() {
    let listItems = ['Woman’s Fashion' , 'Men’s Fashion' , 'Electronics', 'Home Appliances', 'Medicine', 'Sports & Outdoor' , 'Baby’s & Toys' , 'Groceries & Pets','Health & Beauty'];
    return (
        <div className="nav-list">
            <ul>
                {listItems.map((item, index) => (
                    <li key={index}>
                        <a href="#">{item}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
