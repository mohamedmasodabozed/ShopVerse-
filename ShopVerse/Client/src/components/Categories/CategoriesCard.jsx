export default function CategoriesCard(props) {
  return (
      <li className="cat-card xsm:px-3 xsm:py-2 sm:flex-col flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow duration-300">
        {props.icon || <img src="https://via.placeholder.com/150" alt="Category Icon" />}
        <p>{props.title || "title is not loaded "}</p>
      </li>
  );
}
