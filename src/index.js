import { renderStoreItems } from "./storeItem.js";
import { state } from "./database.js";

const cart = state.cart;

const filterInputElement = document.getElementById("filter-input");
filterInputElement.addEventListener("input", () => {
  renderStoreItems(state["items"], cart, filterInputElement.value);
});

const sortButton = document.getElementById("sort-by-price-btn");
sortButton.isActive = true;
sortButton.addEventListener("click", () => {
  sortButton.isActive = !sortButton.isActive;
  renderStoreItems(state["items"], cart, undefined, sortButton.isActive);
});

renderStoreItems(state["items"], cart);
