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

// Wait for the DOM content to load before accessing elements
//DomContentLoaded Event Listener: This event ensures that the script
//executes only after the HTML content has been fully loaded.

document.addEventListener('DOMContentLoaded', function() {
  //We're selecting various elements from the DOM using document.querySelector()
  const storeItemList = document.querySelector('.store--item-list');
  const cartItemList = document.querySelector('.cart--item-list');
  const totalNumber = document.querySelector('.total-number');

  // The populateStore() function iterates over the state.items array and creates HTML elements dynamically for each item, then it adds to the store list.
  function populateStore() {
    state.items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="store--item-icon">
          <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
        </div>
        <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add to cart</button>
      `;
      storeItemList.appendChild(li);
    });
  }

  //This function adds a click event listener to the store item buttons.
  //When u click, it will extract item details from the button attributes and then it calls addToChart() function.
  function setupStoreEvents() {
    storeItemList.addEventListener('click', function(event) {
      if (event.target.classList.contains('add-to-cart-btn')) {
        const itemId = event.target.getAttribute('data-id');
        const itemName = event.target.getAttribute('data-name');
        const itemPrice = parseFloat(event.target.getAttribute('data-price'));

        addToCart(itemId, itemName, itemPrice);
      }
    });
  }

  //This function starts with checking if the item already exists in the cart. 
  //If it does, it increments the quantity; otherwise, it adds the item to the cart.
  function addToCart(itemId, itemName, itemPrice) {
    const existingItem = state.cart.find(item => item.id === itemId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      state.cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
    }

    renderCart();
  }

  // Render chart: This function updates the cart UI based on the items in the cart array.
  //It iterates over the cart items and then calculate the total price.
  function renderCart() {
    cartItemList.innerHTML = '';
    let totalPrice = 0;

    state.cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img class="cart--item-icon" src="assets/icons/${item.id}.svg" alt="${item.name}" />
        <p>${item.name}</p>
        <button class="quantity-btn remove-btn center" data-id="${item.id}">-</button>
        <span class="quantity-text center">${item.quantity}</span>
        <button class="quantity-btn add-btn center" data-id="${item.id}">+</button>
      `;
      cartItemList.appendChild(li);

      totalPrice += item.price * item.quantity;
    });

    totalNumber.textContent = `£${totalPrice.toFixed(2)}`;
  }

  // Setup Cart: This function adds click events the the buttons in the cart. 
  //It handles removing items or increasing their quantity.
  function setupCartEvents() {
    cartItemList.addEventListener('click', function(event) {
      if (event.target.classList.contains('remove-btn')) {
        const itemId = event.target.getAttribute('data-id');
        removeCartItem(itemId);
      } else if (event.target.classList.contains('add-btn')) {
        const itemId = event.target.getAttribute('data-id');
        increaseCartItemQuantity(itemId);
      }
    });
  }

  //Remove Cart Item: This function removes an item from the cart array based on its ID.
  function removeCartItem(itemId) {
    state.cart = state.cart.filter(item => item.id !== itemId);
    renderCart();
  }

  // This function increases the quantity of an item in the cart array based on its ID.
  function increaseCartItemQuantity(itemId) {
    const item = state.cart.find(item => item.id === itemId);
    if (item) {
      item.quantity++;
      renderCart();
    }
  }

  // Initialize the application, The init() function initializes the application by populating the store, setting up event listeners, rendering the initial cart, and starting the application.
  function init() {
    populateStore();
    setupStoreEvents();
    setupCartEvents();
    renderCart();
  }

  // we call the init() function to start the application.
  init();
});
