import { renderStoreItems } from "./storeItem.js";
import { state } from "./database.js";

const cart = state.cart;

renderStoreItems(state["items"], cart);
