
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
function renderStore() {
  const storeItemList = document.querySelector('.store--item-list');
  storeItemList.innerHTML = ''; // Clear previous content

  state.items.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="store--item-icon">
        <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
      </div>
      <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add to cart</button>
    `;
    storeItemList.appendChild(listItem);
  });

  // Add event listeners for adding items to cart
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

// Function to add items to cart
function addToCart(event) {
  const itemId = event.target.dataset.id;
  const itemName = event.target.dataset.name;
  const itemPrice = parseFloat(event.target.dataset.price);
  const existingItem = state.cart.find(item => item.id === itemId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    state.cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
  }

  renderCart();
}

// Function to render cart items and update total
function renderCart() {
  const cartItemList = document.querySelector('.cart--item-list');
  cartItemList.innerHTML = ''; // Clear previous content

  let total = 0;

  state.cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img class="cart--item-icon" src="assets/icons/${item.id}.svg" alt="${item.name}" />
      <p>${item.name}</p>
      <button class="quantity-btn remove-btn center" data-id="${item.id}">-</button>
      <span class="quantity-text center">${item.quantity}</span>
      <button class="quantity-btn add-btn center" data-id="${item.id}">+</button>
    `;
    cartItemList.appendChild(listItem);

    total += item.price * item.quantity;
  });

  // Update total
  const totalElement = document.querySelector('.total-number');
  totalElement.textContent = `£${total.toFixed(2)}`;

  // Add event listeners for adjusting quantities
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeFromCart);
  });

  const addButtons = document.querySelectorAll('.add-btn');
  addButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
}


// Function to remove items from cart
function removeFromCart(event) {
  const itemId = event.target.dataset.id;
  const index = state.cart.findIndex(item => item.id === itemId);
  if (index !== -1) {
    const item = state.cart[index];
    item.quantity--;
    if (item.quantity === 0) {
      state.cart.splice(index, 1);
    }
  }
  renderCart();
}

renderStore();
renderCart();