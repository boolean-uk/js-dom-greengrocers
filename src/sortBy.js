import state from "./state.js";

const sortBy = (method) => {
  if (method === "lowToHigh") {
    state.items.sort((item1, item2) => {
      return item1.price - item2.price;
    });
  }
  if (method === "highToLow") {
    state.items.sort((item1, item2) => {
      return item2.price - item1.price;
    });
  }
  if (method === "name") {
    state.items.sort((item1, item2) => {
      return item1.name.localeCompare(item2.name);
    });
  }
};

export default sortBy;
