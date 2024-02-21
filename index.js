
const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.15,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.45,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.55,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.63,
      type: "fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.16,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.70,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.40,
      type: "berry"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "berry"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.45,
      type: "vegetable"
    }
  ],
  cart: []
};

// Function to render store items based on selected type
function renderStore(selectedType) {
  const storeItemList = document.querySelector('.store--item-list');
  storeItemList.innerHTML = ''; // Clear previous content

  let filteredItems;
  if (selectedType) {
    filteredItems = state.items.filter(item => item.type === selectedType);
  } else {
    filteredItems = state.items;
  }

  filteredItems.forEach(item => {
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

// Function to handle filter click event
function handleFilterClick(event) {
  const selectedType = event.target.dataset.type;
  renderStore(selectedType);
}

// Add event listeners to filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
  button.addEventListener('click', handleFilterClick);
});


// Function to handle sort click event
function handleSortClick(event) {
  const sortType = event.target.dataset.sort;
  sortItems(sortType);
}

// Add event listeners to sort buttons
const sortButtons = document.querySelectorAll('.sort-btn');
sortButtons.forEach(button => {
  button.addEventListener('click', handleSortClick);
});


// Function to sort items
function sortItems(sortType) {
  switch (sortType) {
    case 'price':
      state.items.sort((a, b) => a.price - b.price);
      break;
    case 'alphabetical':
      state.items.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }
  renderStore();
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


// Function to handle home button click event
function handleHomeClick() {
  // Render the store without any filters or sorting
  renderStore();
}

// Function to handle item types button click event
function handleItemTypesClick() {
  // Render the store with all item types
  renderStore();
}

// Function to handle sort items button click event
function handleSortItemsClick() {
  // Render the store without any sorting
  renderStore();
}

handleHomeClick();
// Add event listeners to buttons
document.getElementById('home-btn').addEventListener('click', handleHomeClick);
document.getElementById('item-types-btn').addEventListener('click', handleItemTypesClick);
document.getElementById('sort-items-btn').addEventListener('click', handleSortItemsClick);
