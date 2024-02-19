// SELECT EXISTING/FIXED DOM ELEMENTS

// DEFINE APPLICATION STATE (model)
const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      colour: "pink",
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      colour: "orange",
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      colour: "red",
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      colour: "orange",
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      colour: "green",
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      colour: "yellow",
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      colour: "green",
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      colour: "red",
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      colour: "blue",
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      colour: "purple",
    },
  ],
  cart: [],
};

// LOGIC (functions) TO UPDATE APP STATE (controller -> model -> view update)
function addToCart(item) {
  const cartItem = state.cart.find((cartItem) => cartItem.id === item.id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }
  renderBasketItems();
}

// TODO implement filter flags instead
/*
function addFilters() {
  state.filters = [];
  state.items.forEach((item) => {
    if (!state.filters.includes(item.colour)) {
      state.filters.push({ colour: item.colour, isActive: false });
    }
  });
  console.log(state);
}
*/

function removeFromCart(item) {
  const cartItem = state.cart.find((cartItem) => cartItem.id === item.id);

  if (cartItem) {
    cartItem.quantity--;

    if (cartItem.quantity <= 0) {
      const index = state.cart.findIndex((item) => item.id === cartItem.id);
      state.cart.splice(index, 1);
    }

    renderBasketItems();
  }
}

function calculateTotalCost() {
  let totalCost = 0;
  state.cart.forEach((cartItem) => {
    totalCost += cartItem.price * cartItem.quantity;
  });
  return totalCost;
}

// LOGIC (functions) TO HANDLE USER EVENTS (view -> controller interaction)
function addToCartButtonEvent(item) {
  addToCart(item);
}

function removeFromCartButtonEvent(item) {
  removeFromCart(item);
}

// LOGIC (functions) TO HANDLE RENDERING / DISPLAY / CLEARING OF UI (view)
function createStoreItem(item) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const img = document.createElement("img");
  const button = document.createElement("button");

  div.classList.add("store--item-icon");
  img.src = `assets/icons/${item.id}.svg`;
  img.alt = item.name;
  button.innerText = "Add to cart";
  button.addEventListener("click", () => addToCartButtonEvent(item));

  div.appendChild(img);
  li.appendChild(div);
  li.appendChild(button);

  return li;
}

function renderStoreItems() {
  clearStoreItems();
  const storeUL = document.querySelector(".item-list.store--item-list");
  state.items.forEach((item) => {
    const li = createStoreItem(item);
    storeUL.appendChild(li);
  });
}

function renderStoreItemsWithFilter(filter) {
  clearStoreItems();
  const storeUL = document.querySelector(".item-list.store--item-list");
  state.items.forEach((item) => {
    if (item.colour === filter) {
      const li = createStoreItem(item);
      storeUL.appendChild(li);
    }
  });
}

function renderBasketItems() {
  clearBasketItems();
  renderTotalCost();

  state.cart.forEach((cartItem) => {
    const basketUL = document.querySelector(".item-list.cart--item-list");
    const li = document.createElement("li");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const buttonRemove = document.createElement("button");
    const span = document.createElement("span");
    const buttonAdd = document.createElement("button");

    img.classList.add("cart--item-icon");
    img.src = `assets/icons/${cartItem.id}.svg`;
    img.alt = cartItem.name;

    p.innerText = cartItem.name;

    buttonRemove.classList.add("quantity-btn.remove-btn.center");
    buttonRemove.innerText = "-";
    buttonRemove.addEventListener("click", () =>
      removeFromCartButtonEvent(cartItem)
    );

    span.classList.add("quantity-text.center");
    span.innerText = cartItem.quantity;

    buttonAdd.classList.add("quantity-btn.add-btn.center");
    buttonAdd.innerText = "+";
    buttonAdd.addEventListener("click", () => addToCartButtonEvent(cartItem));

    li.appendChild(img);
    li.appendChild(p);
    li.appendChild(buttonRemove);
    li.appendChild(span);
    li.appendChild(buttonAdd);
    basketUL.appendChild(li);
  });
}

function renderTotalCost() {
  const totalSPAN = document.querySelector(".total-number");
  totalSPAN.innerText = `£${calculateTotalCost().toFixed(2)}`;
}

function createClearFiltersLiButton() {
  const clearFilterLi = document.createElement("li");
  const clearButton = document.createElement("button");

  clearFilterLi.classList.add("filter");

  clearButton.textContent = "CLEAR FILTER";
  clearButton.addEventListener("click", () => renderStoreItems());

  clearFilterLi.appendChild(clearButton);
  return clearFilterLi;
}

function createFilterLiButton(item) {
  if (!document.getElementById(item.colour)) {
    const filterLi = document.createElement("li");
    const button = document.createElement("button");

    filterLi.setAttribute("id", item.colour);
    filterLi.classList.add("filter");

    button.textContent = item.colour;
    button.addEventListener("click", () =>
      renderStoreItemsWithFilter(button.textContent)
    );
    filterLi.appendChild(button);
    return filterLi;
  } else {
    return null;
  }
}

function CreateFilterButtons(filterListUL) {
  filterListUL.appendChild(createClearFiltersLiButton());
  state.items.forEach((item) => {
    const filterButton = createFilterLiButton(item);
    if (filterButton != null) {
      filterListUL.appendChild(filterButton);
    }
  });
}

function renderFilters() {
  const filterListUL = document.querySelector(".filter-list");
  CreateFilterButtons(filterListUL);
}

function createClearSortingsButton() {
  const clearSortingsLi = document.createElement("li");
  const clearButton = document.createElement("button");

  clearSortingsLi.classList.add("sort");

  clearButton.textContent = "CLEAR SORTING";
  clearButton.addEventListener("click", () => {
    let items = state.items;

    items = items.sort(function (a, b) {
      const itemA = a.id.toLowerCase();
      const itemB = b.id.toLowerCase();
      if (itemA < itemB) {
        return -1;
      }
      if (itemA > itemB) {
        return 1;
      }
      return 0;
    });

    state.items = items;

    renderStoreItems();
  });

  clearSortingsLi.appendChild(clearButton);
  return clearSortingsLi;
}

function createSortAZButton() {
  const sortingLi = document.createElement("li");

  const button = document.createElement("button");

  sortingLi.classList.add("sort");

  button.textContent = "A-Z";
  sortingLi.appendChild(button);

  button.addEventListener("click", () => {
    let items = state.items;

    items = items.sort(function (a, b) {
      const itemA = a.name.toLowerCase();
      const itemB = b.name.toLowerCase();
      if (itemA < itemB) {
        return -1;
      }
      if (itemA > itemB) {
        return 1;
      }
      return 0;
    });

    state.items = items;

    renderStoreItems();
  });

  return sortingLi;
}

function createSortZAButton() {
  const sortingLi = document.createElement("li");

  const button = document.createElement("button");

  sortingLi.classList.add("sort");

  button.textContent = "Z-A";
  sortingLi.appendChild(button);

  button.addEventListener("click", () => {
    let items = state.items;

    items = items.sort(function (a, b) {
      const itemA = a.name.toLowerCase();
      const itemB = b.name.toLowerCase();
      if (itemA > itemB) {
        return -1;
      }
      if (itemA < itemB) {
        return 1;
      }
      return 0;
    });

    state.items = items;

    renderStoreItems();
  });

  return sortingLi;
}

function renderSortings() {
  const sortListUL = document.querySelector(".sort-list");
  sortListUL.appendChild(createClearSortingsButton());
  sortListUL.appendChild(createSortAZButton());
  sortListUL.appendChild(createSortZAButton());
}

function clearBasketItems() {
  document.querySelector(".item-list.cart--item-list").innerHTML = "";
}

function clearStoreItems() {
  document.querySelector(".item-list.store--item-list").innerHTML = "";
}

// INITIALISATION LOGIC
function main() {
  console.log("Initialising...");

  // perform any additional actions to load state

  // perfrom initial render
  renderStoreItems(state.items);
  renderFilters();
  renderSortings();
  // addFilters();

  // setup event handlers

  console.log("Initialisation done.");
}

main();
