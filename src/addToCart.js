import state from "./state.js";

const addToCart = (veg) => {
  const addedVeg = { ...veg, quantity: 1 };
  state.cart.push(addedVeg);
};

export default addToCart;
