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

const renderAll = () => {
  state.items.forEach((item) => {
    const itemLi = createVegLi(item);
    storeItemList.append(itemLi);
  });
};

allBtn.addEventListener("change", () => {
  storeItemList.innerHTML = "";
  renderAll();
});

vegBtn.addEventListener("change", () => {
  const onlyVeg = filterBy("vegetable");
  storeItemList.innerHTML = "";
  onlyVeg.forEach((veg) => {
    const vegLi = createVegLi(veg);
    storeItemList.append(vegLi);
  });
});

fruitBtn.addEventListener("change", () => {
  const onlyFruit = filterBy("fruit");
  storeItemList.innerHTML = "";
  onlyFruit.forEach((fruit) => {
    const fruitLi = createVegLi(fruit);
    storeItemList.append(fruitLi);
  });
});

priceLowBtn.addEventListener("change", () => {
  storeItemList.innerHTML = "";
  sortBy("lowToHigh");
  renderAll();
});

priceHighBtn.addEventListener("change", () => {
  storeItemList.innerHTML = "";
  sortBy("highToLow");
  renderAll();
});

nameBtn.addEventListener("change", () => {
  storeItemList.innerHTML = "";
  sortBy("name");
  renderAll();
});

renderAll();
