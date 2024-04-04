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

document.addEventListener('DOMContentLoaded', () => {
  const storeItemList = document.querySelector('.store--item-list');
  const cartItemList = document.querySelector('.cart--item-list');
  const totalNumber = document.querySelector('.total-number');

  function renderStoreItems() {
    state.items.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div class="store--item-icon">
          <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
        </div>
        <button data-id="${item.id}">Add to cart</button>
      `;

      listItem.querySelector('button').addEventListener('click', addToCart);
      storeItemList.appendChild(listItem);
    });
  }

  function addToCart(event) {
    const itemId = event.target.dataset.id;
    const itemInCart = state.cart.find(item => item.id === itemId);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      const itemDetails = state.items.find(item => item.id === itemId);
      state.cart.push({ ...itemDetails, quantity: 1 });
    }
    updateCartDisplay();
  }

  function updateCartDisplay() {
    cartItemList.innerHTML = '';

    state.cart.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img
          class="cart--item-icon"
          src="assets/icons/${item.id}.svg"
          alt="${item.name}"
        />
        <p>${item.name}</p>
        <button class="quantity-btn remove-btn center" data-id="${item.id}">-</button>
        <span class="quantity-text center">${item.quantity}</span>
        <button class="quantity-btn add-btn center" data-id="${item.id}">+</button>
      `;

      listItem.querySelector('.remove-btn').addEventListener('click', () => adjustQuantity(item.id, -1));
      listItem.querySelector('.add-btn').addEventListener('click', () => adjustQuantity(item.id, 1));
      cartItemList.appendChild(listItem);
    });

    updateTotal();
  }

  function adjustQuantity(id, amount) {
    const itemInCart = state.cart.find(item => item.id === id);
    if (itemInCart) {
      itemInCart.quantity += amount;

      if (itemInCart.quantity <= 0) {
        state.cart = state.cart.filter(item => item.id !== id);
      }

      updateCartDisplay();
    }
  }

  function updateTotal() {
    let total = 0;
    state.cart.forEach(item => {
      total += item.price * item.quantity;
    });

    totalNumber.textContent = `£${total.toFixed(2)}`;
  }

  renderStoreItems();
});
