import PropTypes from "prop-types";

export const ingredientType = PropTypes.shape({
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
});

export const orderType = PropTypes.shape({
  ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  _id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
});