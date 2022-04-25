import state from "./state.js";

const addToCart = (item) => {
  const addedItem = { ...item, quantity: 1 };
  const idArr = state.cart.map((item) => {
    return item.id;
  });

  if (!idArr.includes(addedItem.id)) {
    state.cart.push(addedItem);
  }
  return false;
};

export default addToCart;
