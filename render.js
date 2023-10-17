// Render

function renderAll() {
  renderFilter();
  renderSort();
  renderStore();
  renderCart();
  renderTotal();
}

function renderStore() {
  clearElement(STORE_ITEM_LIST);
  STATE.items.forEach((item) => {
    item.visible ? renderStoreItems(item) : null;
  });
}

function renderFilter() {
  const resetButton = createElement("button", null, null, "Reset");
  resetButton.addEventListener("click", resetFilter);

  const select = createFilterSelect();
  const optionPick = createOption("", "Filter By:");
  optionPick.setAttribute("disabled", "");
  optionPick.setAttribute("selected", "");

  const options = renderFilterDropDown(findFilterCategories());

  // const optionVegetable = createOption("vegetable", "vegetable");
  // const optionFruit = createOption("fruit", "fruit");
  // multiAppend(select, optionPick, optionVegetable, optionFruit);

  multiAppend(select, optionPick, ...options);
  multiAppend(STORE_FILTER_SORT, resetButton, select);
}

function renderFilterDropDown(categoryArray) {
  const result = [];

  categoryArray.forEach((category) => {
    const optGroup = document.createElement("optgroup");
    optGroup.label = category;

    const values = findFilterValues(category);
    values.forEach((value) => {
      const option = createOption(value, value);
      optGroup.append(option);
    });

    result.push(optGroup);
  });
  return result;
}

function renderSort() {
  const resetButton = createElement("button", null, null, "Reset");
  resetButton.addEventListener("click", resetSort);

  const select = createSortSelect();
  const optionPick = createOption("", "Sort by:");
  optionPick.setAttribute("disabled", "");
  optionPick.setAttribute("selected", "");

  const optionAToZ = createOption("aToZ", "Sort by: Name - A to Z");
  const optionZToA = createOption("zToA", "Sort by: Name - Z to A");
  const optionPriceAsc = createOption(
    "priceAsc",
    "Sort by: Price - Low to High"
  );
  const optionPriceDesc = createOption(
    "priceDesc",
    "Sort by: Price - High to Low"
  );

  multiAppend(
    select,
    optionPick,
    optionAToZ,
    optionZToA,
    optionPriceAsc,
    optionPriceDesc
  );
  multiAppend(STORE_FILTER_SORT, select, resetButton);
}

function renderStoreItems(item) {
  const li = createElement("li");

  const itemName = createElement(
    "div",
    "store--item-name",
    null,
    titleCase(item.name)
  );

  const itemIconDiv = createElement("div", "store--item-icon");
  const img = createImg(item);

  const itemDesc = createElement("div", "store--item-description");
  const itemPrice = createElement(
    "div",
    "store--item-price",
    null,
    `£${item.price.toFixed(2)}`
  );

  const button = createElement("button", null, null, "Add to cart");
  button.addEventListener("click", () => addToCart(item));

  multiAppend(itemIconDiv, img);
  multiAppend(itemDesc, itemPrice);

  multiAppend(li, itemName, itemIconDiv, itemDesc, button);

  STORE_ITEM_LIST.append(li);
}

function renderCart() {
  clearElement(CART_ITEM_LIST);
  STATE.cart.forEach((item, idx) => {
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
  if (STATE.cart.length > 0) {
    const prices = STATE.cart.map((item) => item.price * item.quantity);
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

function createFilterSelect() {
  const select = createElement("select", "filter-sort-select", "store-filter");
  select.addEventListener("input", (e) => {
    const selected = e.target.querySelector("option:checked");
    const parent = selected.parentElement;
    filterStoreItems(parent.label, e.target.value);
  });
  return select;
}

function createSortSelect() {
  const select = createElement("select", "filter-sort-select", "store-sort");
  select.addEventListener("input", (e) => sortStoreItems(e.target.value));
  return select;
}

function createOption(value, text) {
  const option = createElement("option");
  option.value = value;
  option.innerText = titleCase(text);
  return option;
}

// append

function multiAppend(parentElement, ...childElements) {
  childElements.forEach((child) => {
    parentElement.append(child);
  });
}

// text transform

function titleCase(text) {
  return text
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
