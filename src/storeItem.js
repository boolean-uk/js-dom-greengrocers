import { renderCartItems } from "./cartItem.js";

export function renderStoreItems(items, cart) {
  const storeItemsList = document.getElementById("store-item-list");
  for (let i = 0; i < items.length; i++) {
    const storeItem = storeItemComponent(items[i], cart);
    storeItemsList.appendChild(storeItem);
  }
}

function storeItemComponent(item, cart) {
  const container = document.createElement("li");

  const storeItemIcon = document.createElement("div");
  storeItemIcon.className = "store--item-icon";
  const img = document.createElement("img");
  img.src = `assets/icons/${item.id}.svg`;
  img.alt = item.name;
  storeItemIcon.appendChild(img);

  const button = document.createElement("button");
  button.innerText = "Add to cart";
  button.onclick = () => addToCart(item, cart);

  container.appendChild(storeItemIcon);
  container.appendChild(button);

  return container;
}

/**
 * Adds an item to a given cart and renders it.
 * @param {Object} item The item to add
 * @param {Array} cart The cart the item will be added to
 */
const addToCart = (item, cart) => {
  if (cart.includes(item)) {
    item.quantity += 1;
    renderCartItems(cart);
    return;
  }
  item.quantity = 1;
  cart.push(item);
  renderCartItems(cart);
};
