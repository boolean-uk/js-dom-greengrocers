import state from "./state.js";
import createVegLi from "./createVegLi.js";

const storeItemList = document.querySelector(".store--item-list");

// Creates the store Item list
state.items.forEach((veg) => {
  const vegLi = createVegLi(veg);
  storeItemList.append(vegLi);
});
