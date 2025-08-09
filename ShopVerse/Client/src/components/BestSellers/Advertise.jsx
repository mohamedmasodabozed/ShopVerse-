export default function Advertise(props) {
    if (!props.img) {
        console.warn('Advertise component: img prop is missing');
        return null;
    }
    
    return (
        <div className="Advertise">
           <img 
               src={props.img} 
               alt="Advertisement" 
               onError={(e) => {
                   console.error('Failed to load advertisement image:', props.img);
                   e.target.style.display = 'none';
               }}
           />
        </div>
    );
}
