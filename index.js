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
document.addEventListener("DOMContentLoaded", function () {
  const storeItemList = document.querySelector(".store--item-list");
  const cartItemList = document.querySelector(".cart--item-list");
  const totalNumber = document.querySelector(".total-number");

  function renderStore() {
    storeItemList.innerHTML = "";
    state.items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <div class="store--item-icon">
          <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
        </div>
        <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
      `;
      storeItemList.appendChild(listItem);

      listItem.querySelector(".add-to-cart-btn").addEventListener("click", () => {
        addToCart(item.id);
        renderCart();
        renderTotal();
      });
    });
  }

  function renderCart() {
    cartItemList.innerHTML = "";
    state.cart.forEach((cartItem) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <img class="cart--item-icon" src="assets/icons/${cartItem.id}.svg" alt="${cartItem.name}" />
        <p>${cartItem.name}</p>
        <button class="quantity-btn remove-btn center" data-id="${cartItem.id}">-</button>
        <span class="quantity-text center">${cartItem.quantity}</span>
        <button class="quantity-btn add-btn center" data-id="${cartItem.id}">+</button>
      `;
      cartItemList.appendChild(listItem);

      listItem.querySelector(".remove-btn").addEventListener("click", () => {
        removeFromCart(cartItem.id);
        renderCart();
        renderTotal();
      });

      listItem.querySelector(".add-btn").addEventListener("click", () => {
        addToCart(cartItem.id);
        renderCart();
        renderTotal();
      });
    });
  }

  function renderTotal() {
    const total = state.cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    totalNumber.textContent = `£${total.toFixed(2)}`;
  }

  function addToCart(itemId) {
    const cartItem = state.cart.find((item) => item.id === itemId);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      const storeItem = state.items.find((item) => item.id === itemId);
      state.cart.push({ ...storeItem, quantity: 1 });
    }
  }

  function removeFromCart(itemId) {
    const cartItemIndex = state.cart.findIndex((item) => item.id === itemId);

    if (cartItemIndex !== -1) {
      const cartItem = state.cart[cartItemIndex];

      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        state.cart.splice(cartItemIndex, 1);
      }
    }
  }

  renderStore();
  renderCart();
  renderTotal();
});
