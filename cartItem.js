export function renderCartItem(item) {
  const cart = document.getElementById("cart-item-list");
  cart.appendChild(cartItemComponent(item));
}

function cartItemComponent(item) {
  let quantity = 1;
  const container = document.createElement("li");
  const image = imageComponent(`assets/icons/${item.id}.svg`, item.name);
  const title = document.createElement("p");
  title.innerText = item.name;

  const removeBtn = document.createElement("button");
  removeBtn.className = "quantity-btn remove-btn center";
  removeBtn.innerHTML = "-";
  removeBtn.onclick = () => {
    quantity -= 1;
    quantityText.innerText = quantity;
  };

  const quantityText = document.createElement("span");
  quantityText.className = "quantity-text center";
  quantityText.innerText = quantity;

  const addBtn = document.createElement("button");
  addBtn.className = "quantity-btn add-btn center";
  addBtn.innerHTML = "+";
  addBtn.onclick = () => {
    quantity += 1;
    quantityText.innerText = quantity;
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
