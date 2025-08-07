export default function Dot({ active, onClick }) {
    return (
        <li className={`dot ${active ? 'active' : ''}`} onClick={onClick}>

        </li>
    );
}
// make the images clickable dots for the advertisement slider 