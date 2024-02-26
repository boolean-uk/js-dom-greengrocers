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
      price: 0.35,
      type: "vegetable"

    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruit"

    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruit"

    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "fruit"

    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruit"

    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "vegetable"

    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruit"

    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "fruit"

    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "vegetable"

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

  //Extension 1
  const filterButtons = document.querySelectorAll('.filter-btn'); // Select all filter buttons

  //Extension1
  //Function to filter items by type
  const filterItems = (type) => {
    if (type === 'vegetable') {
      return state.items.filter(item => item.type === 'vegetable');
    } else if (type === 'fruit') {
      return state.items.filter(item => item.type === 'fruit');
    } else {
      return state.items; // Return all items if the type is 'all'
    }
  };


  /* TASK: CORE 
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
  */

  
  //Extension 1
  // Function to populate the store with filtered items
  const populateStore = (items) => {
    storeItemList.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="store--item-icon">
          <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
        </div>
        <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add to cart</button>
      `;
      storeItemList.appendChild(li);
    });
  };

  
  //Extension1  
  //Function to setup filter button events
  const setupFilterEvents = () => {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterType = button.getAttribute('data-filter');
        const filteredItems = filterItems(filterType);
        populateStore(filteredItems);
      });
    });
  };


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
    const itemIndex = state.cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        const currentItem = state.cart[itemIndex];
        if (currentItem.quantity === 1) {
            state.cart.splice(itemIndex, 1); // Remove the item from the cart if its quantity is 1
        } else {
            currentItem.quantity--; // Decrease the quantity if it's more than 1
        }
        renderCart();
    }
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
    populateStore(state.items);
    setupStoreEvents();
    setupCartEvents();
    setupFilterEvents();
    renderCart();
  }

  // we call the init() function to start the application.
  init();
});
