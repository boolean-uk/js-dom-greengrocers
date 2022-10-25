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
  displayCart: [],
};

// Selections
const store = document.querySelector(".store--item-list");
const cart = document.querySelector(".cart--item-list");
const total = document.querySelector(".total-number");

function createStoreItem(product) {
  const li = document.createElement("li");

  const div = document.createElement("div");
  div.classList.add("store--item-icon");

  const img = document.createElement("img");
  img.src = `assets/icons/${product.id}.svg`;
  img.alt = product.name;

  const button = document.createElement("button");
  button.innerText = "Add to cart";
  button.addEventListener("click", () => {
    state.cart.push(product);

    createCartDisplay();
    renderCart();

    console.log(state.cart);
    console.log(state.displayCart);
  });

  div.appendChild(img);
  li.appendChild(div);
  li.appendChild(button);

  return li;
}

state.items.forEach((product) => {
  const item = createStoreItem(product);

  // add products to store
  store.append(item);

  // const cartBtn = item.querySelector("button");
  // cartBtn.addEventListener("click", function () {
  //   createCartDisplay();
  //   renderCart();

  //   console.log(state.cart);
  //   console.log(state.displayCart);
  // });
});

// function to render the cart items
function renderCart() {
  clearCart();

  state.displayCart.forEach((cartItem) => {
    const cartItemDOM = createCartItem(cartItem);

    const removeBtn = cartItemDOM.querySelector(".remove-btn");
    const addBtn = cartItemDOM.querySelector(".add-btn");

    removeBtn.addEventListener("click", () => {
      removeFromCart(cartItem);
    });

    addBtn.addEventListener("click", () => {
      addToCart(cartItem);
    });
  });
  createTotal();
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

  // removeBtn.addEventListener("click", () => {
  //   removeFromCart(product);
  // });

  // addBtn.addEventListener("click", () => {
  //   addToCart(product);
  // });

  const span = document.createElement("span");
  span.classList.add("quantity-text", "center");
  span.innerText = product.quantity;

  cart.appendChild(li);
  li.appendChild(img);
  li.appendChild(p);
  li.appendChild(removeBtn);
  li.appendChild(span);
  li.appendChild(addBtn);

  return li;
}

// updates state.cart
function createCartDisplay() {
  state.cart.forEach((item) => {
    const match = state.displayCart.find(
      (product) => item.name === product.name
    );
    if (!match) {
      state.displayCart.push({ ...item, quantity: 1 });
    } else {
      match.quantity++;
    }
  });
}

// function to clear the cart list
function clearCart() {
  cart.innerHTML = "";
}

function addToCart(product) {
  product.quantity++;
  renderCart();
}

function removeFromCart(product) {
  product.quantity--;
  if (product.quantity < 1) {
    const found = state.displayCart.find((item) => item.id === product.id);
    const found2 = state.cart.find((item) => item.id === product.id);
    const index = state.displayCart.indexOf(found);
    const index2 = state.cart.indexOf(found2);
    state.displayCart.splice(index, 1);
    state.cart.splice(index2, 1);
  }
  renderCart();
}

function createTotal() {
  const totalAmount = state.displayCart.reduce((total, product) => {
    return (total + product.price) * product.quantity;
  }, 0);
  const totalDOM = `£${totalAmount.toFixed(2)}`;
  total.innerText = totalDOM;
}
