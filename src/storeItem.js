import { renderCartItems } from "./cartItem.js";

/**
 *
 * @param {Array} items
 * @param {Array} cart
 */
export function renderStoreItems(
  items,
  cart,
  filter = undefined,
  sort = undefined
) {
  if (filter) {
    items = items.filter((p) => p.name.includes(filter));
  }
  console.log(sort);
  if (sort !== undefined) {
    items =
      sort === true
        ? items.sort((a, b) => a.price - b.price)
        : items.sort((a, b) => b.price - a.price);
  }
  const storeItemsList = document.getElementById("store-item-list");
  storeItemsList.innerHTML = "";
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

  const priceElement = document.createElement("p");
  priceElement.innerText = `£${item.price}`;

  const button = document.createElement("button");
  button.innerText = "Add to cart";
  button.onclick = () => addToCart(item, cart);

  container.appendChild(storeItemIcon);
  container.appendChild(priceElement);
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
