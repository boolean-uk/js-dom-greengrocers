import state from "./state.js";
import createVegLi from "./createItemLi.js";
import filterBy from "./filterBy.js";
import sortBy from "./sortBy.js";

const vegBtn = document.querySelector("#veg-btn");
const fruitBtn = document.querySelector("#fruit-btn");
const allBtn = document.querySelector("#all-btn");
const priceLowBtn = document.querySelector("#priceLow-btn");
const priceHighBtn = document.querySelector("#priceHigh-btn");
const nameBtn = document.querySelector("#name-btn");
const storeItemList = document.querySelector(".store--item-list");

const renderList = (listType) => {
  listType.forEach((item) => {
    const itemLi = createVegLi(item);
    storeItemList.append(itemLi);
  });
};

allBtn.addEventListener("change", () => {
  storeItemList.innerHTML = "";
  renderList(state.items);
});

vegBtn.addEventListener("change", () => {
  const onlyVeg = filterBy("vegetable");
  storeItemList.innerHTML = "";
  renderList(onlyVeg);
});

fruitBtn.addEventListener("change", () => {
  const onlyFruit = filterBy("fruit");
  storeItemList.innerHTML = "";
  renderList(onlyFruit);
});

priceLowBtn.addEventListener("change", () => {
  storeItemList.innerHTML = "";
  sortBy("lowToHigh");
  renderList(state.items);
});

priceHighBtn.addEventListener("change", () => {
  storeItemList.innerHTML = "";
  sortBy("highToLow");
  renderList(state.items);
});

nameBtn.addEventListener("change", () => {
  storeItemList.innerHTML = "";
  sortBy("name");
  renderList(state.items);
});

renderList(state.items);
