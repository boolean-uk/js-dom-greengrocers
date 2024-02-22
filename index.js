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

// Extension function to sort items by name
function sortItems() {
  state.items.sort((a, b) => a.name.localeCompare(b.name));
}

// Extension function to shuffle items
function randomizeItemsOrder() {
  shuffle(state.items);
}

// Helper function using Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Select Root Elements
const groceriesListUL = document.querySelector(".item-list.store--item-list");
const cartListUL = document.querySelector(".item-list.cart--item-list");
// Might not need the line below, hm. 
const cartItems = cartListUL.querySelector('li');

// Function to create an Item list item
function createItemListItem(item) {
  const itemLi = document.createElement('li');
  itemLi.classList.add('store--item-icon');

  const itemImg = createItemImage(item.id);
  itemLi.appendChild(itemImg);

  const addToCartButton = createAddToCartButton(item);
  itemLi.appendChild(addToCartButton);
  return itemLi;
}

// Helper function to set image of list item
function createItemImage(itemId) {
  const itemImg = document.createElement('img');
  itemImg.classList.add('card--img');
  itemImg.setAttribute('src', `assets/icons/${itemId}.svg`);
  itemImg.setAttribute('width', '100');
  // itemImg.setAttribute('height', '100');
  return itemImg;
}

// Helper function to set button of list item
function createAddToCartButton(item) {
  const button = document.createElement('button');
  button.innerText = 'ADD TO CART';
  button.addEventListener('click', () => {
    console.log(`${item.name} added`);
    addGroceryToCart(item);
  })
  return button;
}

// Function to render the list of Groceries
function renderGroceries() {
  groceriesListUL.innerHTML = "";
  state.items.forEach(item => {
    const itemLi = createItemListItem(item);
    groceriesListUL.appendChild(itemLi);
  });
  const sortButton = createSortItemsButton();
  const shuffleButton = createShuffleItemsButton();
  groceriesListUL.appendChild(sortButton);
  groceriesListUL.appendChild(shuffleButton);
}

// Helper function to update the total based on cart items
function updateTotal() {
  const totalNumberSpan = document.querySelector('.total-number');
  const itemPrice = 0.35;
  let totalQuantity = 0;

  const cartItems = cartListUL.querySelectorAll('li');
  cartItems.forEach(cartItem => {
    totalQuantity += parseInt(cartItem.querySelector('span.quantity-text').innerText);
  });

  const total = totalQuantity * itemPrice;
  const formattedTotal = total.toFixed(2);
  totalNumberSpan.textContent = `£${formattedTotal}`;
}

// Helper function to check if item already exists in cart
function checkIfCartContainsItem(item) {
  let itemExists = false;
  const cartItems = cartListUL.querySelectorAll('li');
  cartItems.forEach(cartItem => {
    const cartItemName = cartItem.querySelector('p').innerText;
    if (cartItemName === item.name) {
      cartItem.querySelector('span.quantity-text').innerText = parseInt(cartItem.querySelector('span.quantity-text').innerText) + 1;
      itemExists = true;
    }
  });
  return itemExists;
}

// Function to add item to cart
function addGroceryToCart(item) {
  if (checkIfCartContainsItem(item)) {
    updateTotal();
    console.log("already in cart");
  } else {
  const cartLi = document.createElement('li');
  
  const cartItemImg = createItemImage(item.id);
  cartLi.appendChild(cartItemImg);

  const cartItemName = document.createElement('p');
  cartItemName.innerText = item.name;
  cartLi.appendChild(cartItemName);
  cartListUL.appendChild(cartLi);

  const cardinalityItemSpan = createCardinalityItemSpan();
  const decreaseButton = createDecreaseButton(item, cardinalityItemSpan);
  const increaseButton = createIncreaseButton(item, cardinalityItemSpan)
  
  cartLi.appendChild(decreaseButton);
  cartLi.appendChild(cardinalityItemSpan);
  cartLi.appendChild(increaseButton);
  updateTotal();
  }
}

// Helper function to create span for cart item
function createCardinalityItemSpan() {
  const span = document.createElement('span');
  span.classList.add('quantity-text', 'center');
  span.innerText = 1;
  return span;
}

// Helper function to create decrease button for cart item
function createDecreaseButton(item, span) {
  const button = document.createElement('button');
  button.classList.add('quantity-btn', 'remove-btn', 'center');
  button.innerText = '-';
  button.addEventListener('click', () => {
    console.log(`${item.name} decreased by 1`);
    if (parseInt(span.innerText) > 1) {
        span.innerText = parseInt(span.innerText) - 1;
    } else {
      button.parentElement.remove();
    }
    updateTotal();
  })
  return button;
}

// Helper function to create increase button for cart item
function createIncreaseButton(item, span) {
  const button = document.createElement('button');
  button.classList.add('quantity-btn', 'add-btn', 'center');
  button.innerText = '+';
  button.addEventListener('click', () => {
    console.log(`${item.name} increased by 1`);
    span.innerText = parseInt(span.innerText) + 1;
    updateTotal();
  })
  return button;
}

// Helper function to create sortItems button
function createSortItemsButton() {
  const button = document.createElement('button');
  button.innerText = 'SORT ITEMS BY NAME';
  button.addEventListener('click', () => {
    sortItems();
    renderGroceries();
  })
  return button;
}

// Helper function to create shuffleItems button
function createShuffleItemsButton() {
  const button = document.createElement('button');
  button.innerText = 'DO NOT PRESS';
  button.addEventListener('click', () => {
    randomizeItemsOrder();
    renderGroceries();
  })
  return button;
}

// Render
function main () {
  renderGroceries();
}

main();