import { renderStoreItems } from "./storeItem.js";
import { state } from "./database.js";

const cart = state.cart;

const filterInputElement = document.getElementById("filter-input");
filterInputElement.addEventListener("input", () => {
  renderStoreItems(state["items"], cart, filterInputElement.value);
});
renderStoreItems(state["items"], cart);
