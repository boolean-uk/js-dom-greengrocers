// SELECT EXISTING/FIXED DOM ELEMENTS

// DEFINE APPLICATION STATE (model)
const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
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
  const storeUL = document.querySelector(".item-list.store--item-list");
  state.items.forEach((item) => {
    const li = createStoreItem(item);
    storeUL.appendChild(li);
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

function clearBasketItems() {
  document.querySelector(".item-list.cart--item-list").innerHTML = "";
}

// INITIALISATION LOGIC
function main() {
  console.log("Initialising...");

  // perform any additional actions to load state

  // perfrom initial render
  renderStoreItems(state.items);

  // setup event handlers

  console.log("Initialisation done.");
}

main();
