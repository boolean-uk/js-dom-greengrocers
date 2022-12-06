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
    addToCart(product);
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
});

// function to render the cart items
function renderCart(cartToRender) {
  clearCartDisplay();

  cartToRender.forEach((cartItem) => {
    const cartItemDOM = createCartItem(cartItem);

    // const removeBtn = cartItemDOM.querySelector(".remove-btn");
    // const addBtn = cartItemDOM.querySelector(".add-btn");

    // removeBtn.addEventListener("click", () => {
    //   removeFromCart(cartItem);
    // });

    // addBtn.addEventListener("click", () => {
    //   addToCart(cartItem);
    // });
  });

  createTotal();
}

// function to create cart item
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

  cart.appendChild(li);
  li.appendChild(img);
  li.appendChild(p);
  li.appendChild(removeBtn);
  li.appendChild(span);
  li.appendChild(addBtn);

  return li;
}

function addToCart(product) {
  const found = state.cart.find((cartItem) => cartItem.id === product.id);

  if (found) {
    const updatedCart = state.cart.map((item) => {
      if (item.name === product.name) {
        return { ...item, quantity: ++item.quantity };
      } else {
        return item;
      }
    });
    renderCart(updatedCart);
    return;
  }

  const newCartItem = { ...product, quantity: 1 };
  state.cart.push(newCartItem);
  renderCart(state.cart);
}

function editCartItem(product) {}

// function to clear the cart list
function clearCartDisplay() {
  cart.innerHTML = "";
}

function createTotal() {
  const totalAmount = state.cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  const totalDOM = `£${totalAmount.toFixed(2)}`;
  total.innerText = totalDOM;
}
