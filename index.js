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

// Function to render items in the store
function renderStore() {
  const storeItemList = document.querySelector('.store--item-list');
  storeItemList.innerHTML = ''; // Clear existing items
  
  state.items.forEach(item => {
    const itemHTML = `
      <li class="item">
        <img src="assets/icons/${item.id}.svg" alt="${item.name}" /> <!-- Add image -->
        <button class="add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
      </li>
    `;
    storeItemList.insertAdjacentHTML('beforeend', itemHTML);
  });
  
  // Add event listeners to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

// Function to add items to the cart
function addToCart(event) {
  // Extract item details from the clicked button's data attributes
  const itemId = event.target.dataset.id;
  const itemName = event.target.dataset.name;
  const itemPrice = parseFloat(event.target.dataset.price);
  
  // Check if item is already in the cart
  const existingItem = state.cart.find(item => item.id === itemId);
  if (existingItem) {
    // If item already exists, increase its quantity
    existingItem.quantity += 1;
  } else {
    // If item is not in the cart, add it with quantity 1
    state.cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
  }
  
  // After updating the cart, re-render it
  renderCart();
}


// Function to remove items from the cart
function removeFromCart(event) {
  const itemId = event.target.dataset.id;
  const itemIndex = state.cart.findIndex(item => item.id === itemId);
  
  if (itemIndex !== -1) {
    state.cart.splice(itemIndex, 1); // Remove item from cart array
    renderCart(); // Re-render the cart
  }
}

// Function to render items in the cart and calculate total
function renderCart() {
  const cartItemList = document.querySelector('.cart--item-list');
  const totalElement = document.querySelector('.total-number');
  
  cartItemList.innerHTML = ''; // Clear existing items
  
  let total = 0;
  state.cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const itemHTML = `
      <li class="item">
        <img src="assets/icons/${item.id}.svg" alt="${item.name}" /> <!-- Add image -->
        <span>${item.name}</span>
        <div class="quantity-controls">
          <button class="decrement quantity-btn remove-btn" data-id="${item.id}">-</button> <!-- Decrement button -->
          <span class="quantity-text">${item.quantity}</span> <!-- Quantity display -->
          <button class="increment quantity-btn add-btn" data-id="${item.id}">+</button> <!-- Increment button -->
        </div>
      </li>
    `;
    cartItemList.insertAdjacentHTML('beforeend', itemHTML);
  });
  
  // Display total
  totalElement.textContent = `£${total.toFixed(2)}`;
  
  // Add event listeners to "Decrement" buttons
  const decrementButtons = document.querySelectorAll('.decrement');
  decrementButtons.forEach(button => {
    button.addEventListener('click', decrementCartItem);
  });
  
  // Add event listeners to "Increment" buttons
  const incrementButtons = document.querySelectorAll('.increment');
  incrementButtons.forEach(button => {
    button.addEventListener('click', incrementCartItem);
  });
}

// Function to decrement quantity of items in the cart
function decrementCartItem(event) {
  const itemId = event.target.dataset.id;
  const itemIndex = state.cart.findIndex(item => item.id === itemId);
  
  if (itemIndex !== -1) {
    const currentItem = state.cart[itemIndex];
    if (currentItem.quantity > 1) {
      currentItem.quantity -= 1; // Decrement quantity
    } else {
      // Remove item from cart if quantity is 1
      state.cart.splice(itemIndex, 1);
    }
    
    renderCart(); // Re-render the cart
  }
}


// Function to increment quantity of items in the cart
function incrementCartItem(event) {
  const itemId = event.target.dataset.id;
  const itemIndex = state.cart.findIndex(item => item.id === itemId);
  
  if (itemIndex !== -1) {
    const currentItem = state.cart[itemIndex];
    currentItem.quantity += 1; // Increment quantity
    renderCart(); // Re-render the cart
  }
}


// Initial rendering
renderStore();
renderCart();
