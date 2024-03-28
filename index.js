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


function renderStoreItems() {
  const itemList = document.querySelector(".store--item-list");
  itemList.innerHTML = ""; 

  state.items.forEach(item => {
    const itemHTML = `
      <li class="store-item">
        <div class="store--item-icon">
          <img src="assets/icons/${item.id}.svg" alt="${item.name}" class="item-icon"/>
        </div>
        <p class="item-name">${item.name}</p>
        <p class="item-price">£${item.price.toFixed(2)}</p>
        <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
      </li>
    `;

    itemList.innerHTML += itemHTML;
  });
}

function renderCartItems() {
  const cartItemList = document.querySelector(".cart--item-list");
  cartItemList.innerHTML = "";

  state.cart.forEach(item => {
    const cartItemHTML = `
      <li class="cart-item">
        <img class="cart--item-icon" src="assets/icons/${item.id}.svg" alt="${item.name}" />
        <p class="item-name">${item.name}</p>
        <div class="quantity-controls">
          <button class="quantity-btn remove-btn" data-id="${item.id}">-</button>
          <span class="quantity-text">${item.quantity}</span>
          <button class="quantity-btn add-btn" data-id="${item.id}">+</button>
        </div>
      </li>
    `;

    cartItemList.innerHTML += cartItemHTML;
  });
}

function renderTotal() {
  const totalElement = document.querySelector(".total-number");
  const total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalElement.textContent = `£${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderStoreItems();
  renderCartItems();
  renderTotal();

  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-id");
      addToCart(itemId);
    });
  });

  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-id");
      adjustQuantity(itemId, -1);
    });
  });

  document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-id");
      adjustQuantity(itemId, 1);
    });
  });
});
