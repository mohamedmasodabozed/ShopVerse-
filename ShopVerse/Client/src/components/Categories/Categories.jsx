import Tag from "../FlashSales/Tag.jsx";
import CategoryHeader from "./CategoryHeader.jsx";
import CategoriesCard from "./CategoriesCard.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Seprator from "../FlashSales/Seprator.jsx";
import { 
    faMobileAlt, 
    faLaptop, 
    faTabletAlt, 
    faHeadphones, 
    faClock, 
    faCamera 
} from '@fortawesome/free-solid-svg-icons';
import Separator from "../FlashSales/Seprator.jsx";

export default function Categories() {
    const trialInfo = [
        {
            imgsrc: <FontAwesomeIcon icon={faMobileAlt} />,
            title: "Phone"
        },
        {
            imgsrc: <FontAwesomeIcon icon={faLaptop} />,
            title: "Laptop"
        },
        {
            imgsrc: <FontAwesomeIcon icon={faTabletAlt} />,
            title: "Tablet"
        },
        {
            imgsrc: <FontAwesomeIcon icon={faHeadphones} />,
            title: "Headphones"
        },
        {
            imgsrc: <FontAwesomeIcon icon={faClock} />,
            title: "Smartwatch"
        },
        {
            imgsrc: <FontAwesomeIcon icon={faCamera} />,
            title: "Camera"
        }
    ];

    return (
        <div className="flash-sales">
            <Tag text="Categories" />
            <CategoryHeader />
            <ul className="categories-list sm:flex-wrap sm:justify-center lg:justify-start flex items-center justify-start gap-2 ">
                {trialInfo.map((icon, index) => (
                    <CategoriesCard key={index} icon={icon.imgsrc} title={icon.title} />
                ))}
            </ul>
        </div>
    );
}
