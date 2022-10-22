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

// Render function that loops through the data and adds HTML for each item to store
// Function to create page item (called in forEach/ first function)

// Selections
const store = document.querySelector(".store--item-list");
const cart = document.querySelector(".cart--item-list");

function createStoreItem(product) {
  const li = document.createElement("li");

  const div = document.createElement("div");
  div.classList.add("store--item-icon");

  const img = document.createElement("img");
  img.src = `assets/icons/${product.id}.svg`;
  img.alt = product.name;

  const button = document.createElement("button");
  button.innerText = "Add to cart";

  div.appendChild(img);
  li.appendChild(div);
  li.appendChild(button);

  return li;
}

state.items.forEach((product) => {
  const item = createStoreItem(product);

  // add products to store
  store.append(item);

  const cartBtn = item.querySelector("button");
  cartBtn.addEventListener("click", function () {
    // perhaps I should be passing in the cart data instead
    addToCart(product);
    renderCart();
  });
});

// function to select the button and add the event listener which will listen for click event

// function to render the cart items
function renderCart() {
  clearCart();
  state.cart.forEach((cartItem) => {
    const cartItemDOM = createCartItem(cartItem);
    cart.appendChild(cartItemDOM);
  });
}

// function to add item to cart
function createCartItem(product) {
  const li = document.createElement("li");

  const img = document.createElement("img");
  img.src = `assets/icons/${product.id}.svg`;
  img.alt = product.name;
  img.classList.add("cart--item-icon");

  const p = document.createElement("p");
  p.innerText = product.name;

  const removeBtn = document.createElement("button");
  const addBtn = document.createElement("button");
  removeBtn.classList.add("quantity-btn", "remove-btn", "center");
  removeBtn.innerText = "-";
  addBtn.classList.add("quantity-btn", "add-btn", "center");
  addBtn.innerText = "+";

  const span = document.createElement("span");
  span.classList.add("quantity-text", "center");
  span.innerText = product.quantity;

  li.appendChild(img);
  li.appendChild(p);
  li.appendChild(removeBtn);
  li.appendChild(span);
  li.appendChild(addBtn);

  return li;
}

// updates state.cart
function addToCart(product) {
  product.quantity = 1;
  state.cart.push(product);
}

// function to clear the cart list
function clearCart() {
  cart.innerHTML = "";
}
