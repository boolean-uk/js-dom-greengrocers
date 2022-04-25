import state from "./state.js";

const removeQuantity0 = () => {
  const quantity0 = state.cart.find((item) => item.quantity === 0);
  const targetIndex = state.cart.indexOf(quantity0);
  return state.cart.splice(targetIndex, 1);
};

export default removeQuantity0;
