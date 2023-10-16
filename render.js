// Render

function renderAll() {
  renderFilter();
  renderStore();
  renderCart();
  renderTotal();
}

function renderStore() {
  clearElement(STORE_ITEM_LIST);
  state.items.forEach((item) => {
    item.visible ? renderStoreItems(item) : null;
  });
}

function renderFilter() {
  const select = createSelect();
  const optionPick = createOption("", "Filter by type");
  optionPick.setAttribute("disabled", "");
  optionPick.setAttribute("selected", "");
  const optionVegetable = createOption("vegetable", "vegetable");
  const optionFruit = createOption("fruit", "fruit");

  multiAppend(select, optionPick, optionVegetable, optionFruit);
  STORE_FILTER.append(select);
}

function renderStoreItems(item) {
  const li = createElement("li");
  const itemIconDiv = createElement("div", "store--item-icon");
  const img = createImg(item);
  const button = createElement("button", null, null, "Add to cart");
  button.addEventListener("click", () => addToCart(item));

  multiAppend(li, itemIconDiv, button);
  itemIconDiv.append(img);
  STORE_ITEM_LIST.append(li);
}

function renderCart() {
  clearElement(CART_ITEM_LIST);
  state.cart.forEach((item, idx) => {
    renderCartItems(item);
  });
  renderTotal();
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
  buttonRemove.addEventListener("click", () => changeCartQuantity(item, "-"));

  const span = createElement(
    "span",
    "quantity-text center",
    null,
    item.quantity
  );

  const buttonAdd = createElement(
    "button",
    "quantity-btn add-btn center",
    null,
    "+"
  );
  buttonAdd.addEventListener("click", () => changeCartQuantity(item, "+"));

  multiAppend(li, img, p, buttonRemove, span, buttonAdd);
  CART_ITEM_LIST.append(li);
}

function renderTotal() {
  if (state.cart.length > 0) {
    const prices = state.cart.map((item) => item.price * item.quantity);
    const total = prices.reduce((sum, item) => sum + item);

    TOTAL_NUMBER.innerText = `£${total.toFixed(2)}`;
  } else {
    TOTAL_NUMBER.innerText = `£0.00`;
  }
}

// Clear

function clearElement(element) {
  while (element.lastChild) {
    element.lastChild.remove();
  }
}

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

function createSelect() {
  const select = createElement("select", "store-filter");
  select.addEventListener("input", (e) => filterStoreItems("type",e.target.value));
  return select;
}

function createOption(value, text) {
  const option = createElement("option");
  option.value = value;
  option.innerText = text[0].toUpperCase() + text.slice(1);
  return option;
}

// append

function multiAppend(parentElement, ...childElements) {
  childElements.forEach((child) => {
    parentElement.append(child);
  });
}
