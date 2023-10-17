const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

const storeItemList = document.querySelector(".store--item-list");
const cartItemList = document.querySelector(".cart--item-list");
const totalNumber = document.querySelector(".total-number");

// Render the items in the store
function renderStoreItems() {
  storeItemList.innerHTML = "";

  state.items.forEach((item) => {
    const storeItem = document.createElement("li");
    storeItem.innerHTML = `
      <div class="store--item-icon">
        <img src="assets/icons/${item.id}.svg" alt="${item.id}">
      </div>
      <button class="store--item-add">Add to Cart</button>
    `;

    const addToCartButton = storeItem.querySelector(".store--item-add");
    addToCartButton.addEventListener("click", () => addToCart(item));

    storeItemList.appendChild(storeItem);
  });
}

function addToCart(item) {
  const cartItem = state.cart.find((product) => product.name === item.name);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    item.quantity = 1;
    state.cart.push(item);
  }

  placeItemsInCart();
  calculateTotal();
}

function placeItemsInCart() {
  cartItemList.innerHTML = "";

  state.cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
      <div class="cart--item-icon">
        <img src="assets/icons/${item.id}.svg" alt="${item.id}">
      </div>
      <p>${item.name}</p>
      <button class="quantity-btn remove-btn center">-</button>
      <span class="quantity-text center">${item.quantity}</span>
      <button class="quantity-btn add-btn center">+</button>
    `;

    const removeButton = cartItem.querySelector(".remove-btn");
    const addButton = cartItem.querySelector(".add-btn");

    removeButton.addEventListener("click", () => adjustQuantity(item, -1));
    addButton.addEventListener("click", () => adjustQuantity(item, 1));

    cartItemList.appendChild(cartItem);
  });
}

function adjustQuantity(item, amount) {
  item.quantity += amount;

  if (item.quantity <= 0) {
    const index = state.cart.indexOf(item);
    state.cart.splice(index, 1);
  }

  placeItemsInCart();
  calculateTotal();
}

function calculateTotal() {
  let total = 0;

  state.cart.forEach((item) => {
    total += item.quantity * item.price;
  });

  totalNumber.textContent = `£${total.toFixed(2)}`;
}

// Initial render
renderStoreItems();
placeItemsInCart();
calculateTotal();
