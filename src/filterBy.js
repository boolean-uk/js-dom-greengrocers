import state from "./state.js";

const filterBy = (type) => {
  if (type === "vegetable") {
    const onlyVeg = state.items.filter((item) => item.type === "vegetable");
    return onlyVeg;
  }
  if (type === "fruit") {
    const onlyFruit = state.items.filter((item) => item.type === "fruit");
    return onlyFruit;
  }
};

export default filterBy;
