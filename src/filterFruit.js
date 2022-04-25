import state from "./state.js";

const filterFruit = () => {
  const onlyFruit = state.items.filter((item) => item.type === "fruit");
  return onlyFruit;
};

export default filterFruit;
