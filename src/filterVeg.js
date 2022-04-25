import state from "./state.js";

const filterVeg = (veg) => {
  const onlyVeg = state.items((item) => item.type === "vegetable");
  return onlyVeg;
};

export default filterVeg;
