const itemsToRender = [];

export function renderCartItems(cart) {
  const cartElement = document.getElementById("cart-item-list");
  cartElement.innerHTML = "";
  for (let i = 0; i < cart.length; i++) {
    const cartItem = cartItemComponent(cart[i], cart);
    cartElement.appendChild(cartItem);
  }
  renderCartTotal(cart);
}

function renderCartTotal(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    sum += item.price * item.quantity;
  }
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = `£${sum}`;
}

/**
 * A component that is the foundation of a cart item.
 * @param {Object} item The item to be represented as an element.
 * @param {Array} cart The corresponding cart for the item.
 * @returns A fully constructed cart item element
 */
function cartItemComponent(item, cart) {
  const container = document.createElement("li");
  const image = imageComponent(`assets/icons/${item.id}.svg`, item.name);
  const title = document.createElement("p");
  title.innerText = item.name;

  const quantityText = document.createElement("span");
  quantityText.className = "quantity-text center";
  quantityText.innerText = item.quantity;

  const removeBtn = document.createElement("button");
  removeBtn.className = "quantity-btn remove-btn center";
  removeBtn.innerHTML = "-";
  removeBtn.onclick = () => {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      const itemIndex = cart.findIndex((p) => p.id === item.id);
      cart.splice(itemIndex, 1);
    }
    quantityText.innerText = item.quantity;
    renderCartItems(cart);
  };

  const addBtn = document.createElement("button");
  addBtn.className = "quantity-btn add-btn center";
  addBtn.innerHTML = "+";
  addBtn.onclick = () => {
    item.quantity += 1;
    quantityText.innerText = item.quantity;
    renderCartTotal(cart);
  };

  container.appendChild(image);
  container.appendChild(title);
  container.appendChild(removeBtn);
  container.appendChild(quantityText);
  container.appendChild(addBtn);

  return container;
}

function imageComponent(imageSrc, imageAlt) {
  const img = document.createElement("img");
  img.className = "cart--item-icon";
  img.src = imageSrc;
  img.alt = imageAlt;
  return img;
}
