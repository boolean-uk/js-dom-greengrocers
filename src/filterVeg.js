import state from "./state.js";

const filterVeg = () => {
  const onlyVeg = state.items.filter((item) => item.type === "vegetable");
  return onlyVeg;
};

export default filterVeg;
