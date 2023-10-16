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

const storeList = document.querySelector('.store--item-list');
const cartList = document.querySelector('.cart--item-list');
const totalDisplayed = document.querySelector('.total-number');

// Helper function to create elements
function createElement(elementType, attributes = {}) {
  const element = document.createElement(elementType);
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
}

// Add an item to the cart
function addItemToCart(groceryItem) {
  const existingCartItem = state.cart.find(cartItem => cartItem.id === groceryItem.id);

  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    const cartObject = {
      id: groceryItem.id,
      name: groceryItem.name,
      price: groceryItem.price,
      quantity: 1
    };
    state.cart.push(cartObject);
  }

  renderCart();
  renderTotal();
}

// Remove an item from the cart
function removeItemFromCart(index) {
  state.cart[index].quantity--;
  if (state.cart[index].quantity === 0) {
    state.cart.splice(index, 1);
  }
  renderCart();
  renderTotal();
}

// Render store items
function renderStoreItems() {
  const groceryItems = state.items;

  groceryItems.forEach(groceryItem => {
    const stockList = createElement('li', { style: 'list-style: none;' });
    const div = createElement('div', { class: 'store--item-icon' });
    const img = createElement('img', {
      src: `assets/icons/${groceryItem.id}.svg`,
      alt: groceryItem.name
    });
    const addToCartButton = createElement('button');
    addToCartButton.innerText = 'Add to cart';

    addToCartButton.addEventListener('click', () => {
      addItemToCart(groceryItem);
    });

    storeList.appendChild(stockList);
    stockList.appendChild(div);
    div.appendChild(img);
    stockList.appendChild(addToCartButton);
  });

  renderTotal();
}

// Render the cart
function renderCart() {
  cartList.innerHTML = '';

  state.cart.forEach((cartItem, index) => {
    const foodItem = createElement('li');
    const foodImg = createElement('img', {
      class: 'cart--item-icon',
      src: `assets/icons/${cartItem.id}.svg`,
      alt: cartItem.name
    });
    const foodName = createElement('p');
    foodName.innerText = cartItem.name;

    const removeButton = createElement('button', { class: 'quantity-btn remove-btn center' });
    removeButton.innerText = '-';
    removeButton.addEventListener('click', () => {
      removeItemFromCart(index);
    });

    const quantityTracker = createElement('span', { class: 'quantity-text center' });
    quantityTracker.innerText = cartItem.quantity;

    const addButton = createElement('button', { class: 'quantity-btn add-btn center' });
    addButton.innerText = '+';
    addButton.addEventListener('click', () => {
      cartItem.quantity++;
      renderCart();
      renderTotal();
    });

    foodItem.appendChild(foodImg);
    foodItem.appendChild(foodName);
    foodItem.appendChild(removeButton);
    foodItem.appendChild(quantityTracker);
    foodItem.appendChild(addButton);

    cartList.appendChild(foodItem);
  });

  renderTotal();
}

// Render the total price
function renderTotal() {
  let total = 0;

  state.cart.forEach(item => {
    total += item.price * item.quantity;
  });

  const finalTotal = total.toFixed(2);
  totalDisplayed.innerText = `£${finalTotal}`;
}

// Initial rendering
renderStoreItems();