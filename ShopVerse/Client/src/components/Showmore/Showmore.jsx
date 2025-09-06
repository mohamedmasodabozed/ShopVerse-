import { Link } from 'react-router-dom';

export default function Showmore() {
    return (
        <div className="show-more my-6 flex justify-center">
            <Link to="/showmore" className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
                Show More
            </Link>
        </div>
    );
}
