const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
    },
  ],
  cart: [],
};

// Defines constant names for the main areas
function elementConstants() {
  const storeList = document.querySelector(`.store--item-list`);
  const basketList = document.querySelector(`.cart--item-list`);
  const totalPrice = document.querySelector(`.total-number`);
  return {
    storeList,
    basketList,
    totalPrice,
  };
}

// Renders the store
function renderStore() {
  const { storeList } = elementConstants();
  for (let i = 0; i < state.items.length; i++) {
    const storeItem = createStoreItem(i);
    storeEventListener(storeItem, i);
    storeList.append(storeItem);
  }
}

// Creates a store item
function createStoreItem(i) {
  const currentItem = state.items[i];
  const storeItem = document.createElement(`li`);
    const storeItemDiv = document.createElement(`div`);
    storeItemDiv.setAttribute(`class`, `store--item-icon`);
      const storeItemImage = document.createElement(`img`);
      storeItemImage.setAttribute(`src`, `assets/icons/${currentItem.id}.svg`);
      storeItemImage.setAttribute(`alt`, currentItem.name);
      const storeItemButton = document.createElement(`button`);
      storeItemButton.innerText = `Add to cart`;
  storeItemDiv.append(storeItemImage);
  storeItem.append(storeItemDiv);
  storeItem.append(storeItemButton);

  return storeItem;
}

// Add click action to store items
function storeEventListener(storeItem, i) {
  const storeItemButton = storeItem.querySelector(`button`);
  storeItemButton.addEventListener("click", () => {
    updateBasket(i);
    renderBasket()
  });
}

// Updates cart array with new item or increased quantity
function updateBasket(i) {
  let currentItem = state.items[i];
  if (state.cart.length === 0) {
    state.cart.push({ ...currentItem, quantity: 1 });
    return;
  } else if (state.cart.length !== 0) {
    for (let i = 0; i < state.cart.length; i++) {
      if (currentItem.id === state.cart[i].id) {
        state.cart[i].quantity++;
        return;
      }
    }
    state.cart.push({ ...currentItem, quantity: 1 });
    return;
  }
}

// Renders the basket area
function renderBasket() {
  const { basketList } = elementConstants();
  basketList.innerHTML = ``
  for (let i = 0; i < state.cart.length; i++) {
    if (state.cart[i].quantity > 0) {
    const basketItem = createBasketItem(i);
    addButtonEventListener(basketItem, i)
    removeButtonEventListener(basketItem, i)
    basketList.append(basketItem)
    }
  }
  updatePrice()
}

// Creates the basket items
function createBasketItem(i) {
  const currentItem = state.cart[i]
  const basketItem = document.createElement(`li`)
  basketItem.innerHTML = `
  <img
    class="cart--item-icon"
    src="assets/icons/${currentItem.id}.svg"
    alt="${currentItem.name}"
  />
  <p>${currentItem.name}</p>
  <button class="quantity-btn remove-btn center">-</button>
  <span class="quantity-text center">${currentItem.quantity}</span>
  <button class="quantity-btn add-btn center">+</button>
  `
  return basketItem
}

// Adds click response to add button
function addButtonEventListener(basketItem, i) {
  const addButton = basketItem.querySelector(`.add-btn`)
  addButton.addEventListener(`click`, () => {
    state.cart[i].quantity++
    renderBasket()
  })
}

// Adds click response to remove button
function removeButtonEventListener(basketItem, i) {
  const removeButton = basketItem.querySelector(`.remove-btn`)
  removeButton.addEventListener(`click`, () => {
    state.cart[i].quantity--
    renderBasket()
  })
}

// Updates total price
function updatePrice() {
  const { totalPrice } = elementConstants();
  let runningTotal = 0
  for (let i = 0; i < state.cart.length; i++) {
    runningTotal += state.cart[i].quantity *  state.cart[i].price
  }
  totalPrice.innerText = `£${runningTotal.toFixed(2)}`
}

function load() {
  renderStore();
  renderBasket();
}

load();