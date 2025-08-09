export default function CategoriesCard(props) {
  return (
      <li className="cat-card">
        {props.icon || <img src="https://via.placeholder.com/150" alt="Category Icon" />}
        <p>{props.title || "title is not loaded "}</p>
      </li>
  );
}
