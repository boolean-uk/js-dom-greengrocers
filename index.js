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

document.addEventListener("DOMContentLoaded", function () {
  const storeItemList = document.querySelector(".store--item-list");
  const cartItemList = document.querySelector(".cart--item-list");
  const totalNumber = document.querySelector(".total-number");

  // Render items in the store
  function renderStoreItems() {
    state.items.forEach((item) => {
      const storeItem = document.createElement("li");
      storeItem.innerHTML = `
        <div class="store--item-icon">
          <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
        </div>
        <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
      `;
      storeItemList.appendChild(storeItem);
    });
  }

  // Add item to the cart
  function addItemToCart(itemId) {
    const cartItemIndex = state.cart.findIndex((item) => item.id === itemId);
    if (cartItemIndex !== -1) {
      // Item already exists in cart, increase quantity
      state.cart[cartItemIndex].quantity++;
    } else {
      // Item does not exist in cart, add it
      const newItem = {
        ...state.items.find((item) => item.id === itemId),
        quantity: 1,
      };
      state.cart.push(newItem);
    }
    renderCartItems();
  }

  // Remove item from the cart
  function removeItemFromCart(itemId) {
    state.cart = state.cart.filter((item) => item.id !== itemId);
    renderCartItems();
  }

  // Render items in the cart
  function renderCartItems() {
    cartItemList.innerHTML = "";
    state.cart.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
        <img class="cart--item-icon" src="assets/icons/${item.id}.svg" alt="${item.name}" />
        <p>${item.name}</p>
        <button class="quantity-btn remove-btn center" data-id="${item.id}">-</button>
        <span class="quantity-text center">${item.quantity}</span>
        <button class="quantity-btn add-btn center" data-id="${item.id}">+</button>
      `;
      cartItemList.appendChild(cartItem);
    });
    updateTotal();
  }

  // Update total
  function updateTotal() {
    const totalPrice = state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    totalNumber.textContent = `£${totalPrice.toFixed(2)}`;
  }

  // Event listener for adding items to the cart
  storeItemList.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart-btn")) {
      const itemId = event.target.dataset.id;
      addItemToCart(itemId);
    }
  });

  // Event listener for removing items from the cart
  cartItemList.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
      const itemId = event.target.dataset.id;
      const item = state.cart.find((item) => item.id === itemId);
      if (item.quantity === 1) {
        removeItemFromCart(itemId);
      } else {
        item.quantity--;
        renderCartItems();
      }
    } else if (event.target.classList.contains("add-btn")) {
      const itemId = event.target.dataset.id;
      const item = state.cart.find((item) => item.id === itemId);
      item.quantity++;
      renderCartItems();
    }
  });

  // Initialize the app
  renderStoreItems();
});
