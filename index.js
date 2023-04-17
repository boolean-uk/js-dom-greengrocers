const state = {
  items: [
    { id: "001-beetroot", name: "beetroot", price: 0.35 },
    { id: "002-carrot", name: "carrot", price: 0.35 },
    { id: "003-apple", name: "apple", price: 0.35 },
    { id: "004-apricot", name: "apricot", price: 0.35 },
    { id: "005-avocado", name: "avocado", price: 0.35 },
    { id: "006-bananas", name: "bananas", price: 0.35 },
    { id: "007-bell-pepper", name: "bell pepper", price: 0.35 },
    { id: "008-berry", name: "berry", price: 0.35 },
    { id: "009-blueberry", name: "blueberry", price: 0.35 },
    { id: "010-eggplant", name: "eggplant", price: 0.35 },
  ],
  cart: [],
};

const storeItemsList = document.querySelector('.store--item-list');
const cartItemsList = document.querySelector('.cart--item-list');
const cartTotal = document.querySelector('.total-number');

// ID Maps
function mapItemIds() {
  console.log(state.items.map(item => item.id));
}

// Store Items
function renderStoreItems() {
  const storeItemsList = document.querySelector('.store--item-list');
  state.items.forEach(item => {
    const listItem = createListItem(item);
    addButtonClickListener(listItem, item);
    storeItemsList.appendChild(listItem);
  });
}

function createListItem(item) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <div class="store--item-icon">
      <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
    </div>
    <button>Add to cart</button>
  `;
  return listItem;
}

function addButtonClickListener(listItem, item) {
  listItem.querySelector('button').addEventListener('click', () => {
    addOrUpdateCartItem(item);
    renderCart();
  });
}

// Cart Items Update Function
function addOrUpdateCartItem(item) {
  const cartItem = state.cart.find(cartItem => cartItem.id === item.id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }
}

function renderCartItems() {
  state.cart.forEach(cartItem => {
    const listItem = createCartItem(cartItem);
    addRemoveButtonClickListener(listItem, cartItem);
    addAddButtonClickListener(listItem, cartItem);
    cartItemsList.appendChild(listItem);
  });
}

function createCartItem(cartItem) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <img class="cart--item-icon" src="assets/icons/${cartItem.id}.svg" alt="${cartItem.name}" />
    <p>${cartItem.name}</p>
    <button class="quantity-btn remove-btn center">-</button>
    <span class="quantity-text center">${cartItem.quantity}</span>
    <button class="quantity-btn add-btn center">+</button>
  `;
  return listItem;
}

function addRemoveButtonClickListener(listItem, cartItem) {
  listItem.querySelector('.remove-btn').addEventListener('click', () => {
    decreaseCartItemQuantity(cartItem);
    renderCart();
  });
}

function addAddButtonClickListener(listItem, cartItem) {
  listItem.querySelector('.add-btn').addEventListener('click', () => {
    increaseCartItemQuantity(cartItem);
    renderCart();
  });
}

function decreaseCartItemQuantity(cartItem) {
  cartItem.quantity--;
  if (cartItem.quantity === 0) {
    state.cart = state.cart.filter(item => item.id !== cartItem.id);
  }
}

function increaseCartItemQuantity(cartItem) {
  cartItem.quantity++;
}

// Cart Total & Render Cart Function
function renderCart() {
  const cartItemsList = document.querySelector('.cart--item-list');
  const cartTotal = document.querySelector('.total-number');

  clearCartItems(cartItemsList);
  renderCartItems(cartItemsList);
  updateCartTotal(cartTotal);
}

function clearCartItems(cartItemsList) {
  cartItemsList.innerHTML = '';
}

function updateCartTotal(cartTotal) {
  const total = calculateCartTotal();
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function calculateCartTotal() {
  return state.cart.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);
}
// Call Functions 
mapItemIds();
renderStoreItems();
renderCart();
