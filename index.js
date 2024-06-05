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
function renderStoreItems() {
  const storeList = document.querySelector(".store--item-list");
  storeList.innerHTML = "";

  state.items.forEach((item) => {
    const itemElement = document.createElement("li");
    itemElement.innerHTML = `
            <div class="store--item-icon">
                <img src="assets/icons/${item.id}.svg" alt="${item.name}">
            </div>
            <button onclick="addToCart('${item.id}')">Add to cart</button>
        `;
    storeList.appendChild(itemElement);
  });
}

function renderCartItems() {
  const cartList = document.querySelector(".cart--item-list");
  cartList.innerHTML = "";

  state.cart.forEach((cartItem) => {
    const cartItemElement = document.createElement("li");
    cartItemElement.innerHTML = `
            <img class="cart--item-icon" src="assets/icons/${cartItem.id}.svg" alt="${cartItem.name}">
            <p>${cartItem.name}</p>
            <button class="quantity-btn remove-btn center" onclick="updateCartItemQuantity('${cartItem.id}', -1)">-</button>
            <span class="quantity-text center">${cartItem.quantity}</span>
            <button class="quantity-btn add-btn center" onclick="updateCartItemQuantity('${cartItem.id}', 1)">+</button>
        `;
    cartList.appendChild(cartItemElement);
  });

  updateTotal();
}

function addToCart(itemId) {
  const itemInCart = state.cart.find((cartItem) => cartItem.id === itemId);
  if (itemInCart) {
    itemInCart.quantity++;
  } else {
    const item = state.items.find((item) => item.id === itemId);
    state.cart.push({ ...item, quantity: 1 });
  }
  renderCartItems();
}

function updateCartItemQuantity(itemId, change) {
  const itemInCart = state.cart.find((cartItem) => cartItem.id === itemId);
  if (itemInCart) {
    itemInCart.quantity += change;
    if (itemInCart.quantity <= 0) {
      state.cart = state.cart.filter((cartItem) => cartItem.id !== itemId);
    }
  }
  renderCartItems();
}

function updateTotal() {
  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  document.querySelector(".total-number").textContent = `£${total.toFixed(2)}`;
}

renderStoreItems();
renderCartItems();
document.getElementById("add-new-product").addEventListener("click", () => {
  window.location.href = "new-product.html";
});
