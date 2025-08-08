export default function DiscountTag(props) {
    return (
        <div className="discount-tag">
            <span>{props.discountPercentage}%</span>
        </div>
    );
}