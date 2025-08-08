import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Arrows() {
    return (
        <div className="arrows">
            <div className="leftArrow">
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div className="rightArrow">
                <FontAwesomeIcon icon={faArrowRight} />
            </div>
        </div>
    );
}
