// Render

function renderAll() {
  renderStore();
  renderCart();
}

function renderStore() {
  state.items.forEach((item) => {
    renderStoreItems(item);
  });
}

function renderStoreItems(item) {
  const li = createElement("li");
  const itemIconDiv = createElement("div", "store--item-icon");
  const img = createImg(item);
  const button = createElement("button", null, null, "Add to cart");

  li.append(itemIconDiv);
  itemIconDiv.append(img);
  li.append(button);

  STORE_ITEM_LIST.append(li);
}

function renderCart() {}

function renderCartItems() {}

function renderTotal() {}

// Clear

function clearElement() {}

// Create

function createElement(elementName, elementClass, elementId, innerText) {
  const element = document.createElement(elementName);

  elementClass ? (element.className = elementClass) : null;
  elementId ? (element.id = elementId) : null;
  innerText ? (element.innerText = innerText) : null;

  return element;
}

function createImg(item) {
  const img = createElement("img");

  img.src = `assets/icons/${item.id}.svg`;
  img.alt = item.name;

  return img;
}

const BEETROOT = state.items[0];
renderStore();
