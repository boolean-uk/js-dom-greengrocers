import state from "./state.js";
import createVegLi from "./createVegLi.js";
import filterVeg from "./filterVeg.js";
import filterFruit from "./filterFruit.js";

const vegBtn = document.querySelector(".veg-btn");
const fruitBtn = document.querySelector(".fruit-btn");
const allBtn = document.querySelector(".all-btn");
const storeItemList = document.querySelector(".store--item-list");

// Creates the store Item list
const renderAll = () => {
  state.items.forEach((item) => {
    const itemLi = createVegLi(item);
    storeItemList.append(itemLi);
  });
};

vegBtn.addEventListener("click", () => {
  const onlyVeg = filterVeg();
  storeItemList.innerHTML = "";
  onlyVeg.forEach((veg) => {
    const vegLi = createVegLi(veg);
    storeItemList.append(vegLi);
  });
});

fruitBtn.addEventListener("click", () => {
  const onlyFruit = filterFruit();
  storeItemList.innerHTML = "";
  onlyFruit.forEach((fruit) => {
    const fruitLi = createVegLi(fruit);
    storeItemList.append(fruitLi);
  });
});

allBtn.addEventListener("click", () => {
  storeItemList.innerHTML = "";
  renderAll();
});

renderAll();
