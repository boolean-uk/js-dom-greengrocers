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

function getItemById(itemId) {
  return state.items.find((item) => item.id === itemId);
}

function getCartItemById(itemId) {
  return state.cart.find((item) => item.id === itemId);
}

function calculateCartTotal() {
  return state.cart.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
}

function render() {
  const storeItemList = document.querySelector(".store--item-list");
  const cartItemList = document.querySelector(".cart--item-list");
  const cartTotal = document.querySelector(".total-number");

  storeItemList.innerHTML = "";
  cartItemList.innerHTML = "";

  state.items.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.innerHTML = `
    <div class="card">
  <img src="assets/icons/${item.name}.svg" alt="Item Image">
  <div class="card-info">
    <h3>${item.name}</h3>
    <p>£${item.price.toFixed(2)}</p>
  </div>
</div>
      <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
    `;
    storeItemList.appendChild(listItem);
  });

  state.cart.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.innerHTML = `
      <div class="cart-list"><span><img class="cart--item-icon" src="assets/icons/${
        item.name
      }.svg" alt="Item Image"> x ${item.quantity} - £${(
      item.quantity * item.price
    ).toFixed(2)}</span>
      <button class="remove-from-cart" data-id="${
        item.id
      }">Remove</button></div?
    `;
    cartItemList.appendChild(listItem);
  });

  cartTotal.innerText = `£${calculateCartTotal().toFixed(2)}`;
}

const storeItemList = document.querySelector(".store--item-list");
storeItemList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const itemId = event.target.dataset.id;
    const item = getItemById(itemId);
    const cartItem = getCartItemById(itemId);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      state.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      });
    }

    render();
  }
});

const cartItemList = document.querySelector(".cart--item-list");
cartItemList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart")) {
    const itemId = event.target.dataset.id;
    const cartItemIndex = state.cart.findIndex((item) => item.id === itemId);

    if (cartItemIndex !== -1) {
      state.cart.splice(cartItemIndex, 1);
    }

    render();
  }
});

render();
