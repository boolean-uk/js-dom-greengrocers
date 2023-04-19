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

function getElements() {
  const storeList = document.querySelector('.store--item-list');
  const cartList = document.querySelector('.cart--item-list');
  const totalPrice = document.querySelector('.total-number');

  return {
    storeList,
    cartList,
    totalPrice,
  };
}

// ID Maps
function mapItemIds() {
  console.log(state.items.map(item => item.id));
}

// Store Items
function renderStoreItems() {
  const { storeList } = getElements();
  let i = 0;
  while (i < state.items.length) {
    const listItem = createListItem(state.items[i]);
    addButtonClickListener(listItem, state.items[i]);
    storeList.appendChild(listItem);
    i++;
  }
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
  let cartItem;
  for (let i = 0; i < state.cart.length; i++) {
    if (state.cart[i].id === item.id) {
      cartItem = state.cart[i];
      break;
    }
  }
  if (cartItem) {
    cartItem.quantity++;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }
}

function renderCartItems() {
  const { cartList } = getElements();
  let i = 0;
  while (i < state.cart.length) {
    const listItem = createCartItem(state.cart[i]);
    addRemoveButtonClickListener(listItem, state.cart[i]);
    addAddButtonClickListener(listItem, state.cart[i]);
    cartList.appendChild(listItem);
    i++;
  }
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
  const { cartList, totalPrice } = getElements();

  clearCartItems(cartList);
  renderCartItems(cartList);
  updateCartTotal(totalPrice);
}

// Clear Cart Items
function clearCartItems(cartList) {
  cartList.innerHTML = '';
}

function updateCartTotal(totalPrice) {
  const total = calculateCartTotal();
  totalPrice.textContent = `£${total.toFixed(2)}`;
}

function calculateCartTotal() {
  return state.cart.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);
}

// Calling Functions
function App() {
  mapItemIds(); renderStoreItems(); renderCart();
}
// Iinitialize Function.

App();