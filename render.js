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

  multiAppend(li, itemIconDiv, button);
  itemIconDiv.append(img);
  STORE_ITEM_LIST.append(li);
}

function renderCart() {
  state.cart.forEach((item) => {
    renderCartItems(item)
  });
}

function renderCartItems(item) {
  const li = createElement("li");
  const img = createImg(item, "cart--item-icon");
  const p = createElement("p", null, null, item.name);
  const buttonRemove = createElement(
    "button",
    "quantity-btn remove-btn center",
    null,
    "-"
  );
  const span = createElement("span", "quantity-text center", null, "1");
  const buttonAdd = createElement(
    "button",
    "quantity-btn add-btn center",
    null,
    "+"
  );

  multiAppend(li, img, p, buttonRemove, span, buttonAdd);
  CART_ITEM_LIST.append(li);
}

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

function createImg(item, className) {
  const img = createElement("img");

  className ? (img.className = className) : null;
  img.src = `assets/icons/${item.id}.svg`;
  img.alt = item.name;

  return img;
}

// append

function multiAppend(parentElement, ...childElements) {
  childElements.forEach((child) => {
    parentElement.append(child);
  });
}

const BEETROOT = state.items[0];
renderStore();

state.cart.push(BEETROOT)
state.cart.push(BEETROOT)
state.cart.push(BEETROOT)
state.cart.push(BEETROOT)
state.cart.push(BEETROOT)
renderCart()