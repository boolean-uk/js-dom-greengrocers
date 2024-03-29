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


const storeItemList = document.querySelector('.store--item-list');

const renderStoreItems = () => {
  state.items.forEach(item => {
    const storeItemTemplate = document.createElement('template');
    storeItemTemplate.innerHTML = `
      <li>
        <div class="store--item-icon">
          <img src="assets/icons/${item.id}.svg" alt="${item.name}" data-item-id="${item.id}" />
        </div>
        <button>Add to cart</button>
      </li>
    `;
    storeItemList.appendChild(storeItemTemplate.content.firstElementChild);
  });
};

renderStoreItems();


const addToCart = (itemId) => {
  const existingItem = state.cart.find(item => item.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const newItem = state.items.find(item => item.id === itemId);
    state.cart.push({ ...newItem, quantity: 1 });
  }

  renderCart();
};

const handleAddToCart = (event) => {
  if (event.target.tagName === 'BUTTON') {
    const itemId = event.target.parentNode.querySelector('img').getAttribute('data-item-id');
    addToCart(itemId);
  }
};

storeItemList.addEventListener('click', handleAddToCart);

const cartItemList = document.querySelector('.cart--item-list');

const renderCart = () => {
  cartItemList.innerHTML = '';

  state.cart.forEach(item => {
    const cartItemTemplate = document.createElement('template');
    cartItemTemplate.innerHTML = `
      <li>
        <img class="cart--item-icon" src="assets/icons/${item.id}.svg" alt="${item.name}" data-item-id="${item.id}" />
        <p>${item.name}</p>
        <p>£${item.price.toFixed(2)}</p>
        <button class="quantity-btn remove-btn center">-</button>
        <span class="quantity-text center">${item.quantity}</span>
        <button class="quantity-btn add-btn center">+</button>
      </li>
    `;
    cartItemList.appendChild(cartItemTemplate.content.firstElementChild);
  });

  renderTotal();
};

const updateCartItemQuantity = (itemId, quantity) => {
  const item = state.cart.find(item => item.id === itemId);

  if (item) {
    item.quantity += quantity;

    if (item.quantity === 0) {
      removeCartItem(itemId);
    } else {
      renderCart();
    }
  }
};

const removeCartItem = (itemId) => {
  state.cart = state.cart.filter(item => item.id !== itemId);
  renderCart();
};

const handleCartItemQuantityChange = (event) => {
  if (event.target.classList.contains('remove-btn')) {
    const itemId = event.target.parentNode.querySelector('img').getAttribute('data-item-id');
    updateCartItemQuantity(itemId, -1);
  }

  if (event.target.classList.contains('add-btn')) {
    const itemId = event.target.parentNode.querySelector('img').getAttribute('data-item-id');
    updateCartItemQuantity(itemId, 1);
  }
};

cartItemList.addEventListener('click', handleCartItemQuantityChange);

const totalElement = document.querySelector('.total-number');

const renderTotal = () => {
  const total = state.cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  totalElement.textContent = `£${total.toFixed(2)}`;
};
