import state from "./state.js";

const filterBy = (type) => {
  const targetItems = state.items.filter((item) => item.type === type);
  return targetItems;
};

export default filterBy;
