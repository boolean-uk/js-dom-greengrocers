const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: 'VEG'
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: 'VEG'
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: 'FRUIT'
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: 'FRUIT'
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: 'VEG'
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: 'FRUIT'
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: 'VEG'
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: 'FRUIT'
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: 'FRUIT'
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: 'VEG'
    }
  ],
  filter: "ALL",
  cart: []
};


function renderStoreItems() {
  const itemList = document.querySelector(".store--item-list");
  itemList.innerHTML = ""; 

  const filterStore = state.items.filter(filterCartItems)
 filterStore.forEach(item => {
    const itemHTML = `
      <li class="store-item">
        <div class="store--item-icon">
          <img src="assets/icons/${item.id}.svg" alt="${item.name}" class="item-icon"/>
        </div>
        <p class="item-name">${item.name}</p>
        <p class="item-price">£${item.price.toFixed(2)}</p>
        <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
      </li>
    `;

    itemList.innerHTML += itemHTML;
  });
}

function filterCartItems(item) {
  if (state.filter === 'ALL') {
    return true
  }
  if (state.filter === 'VEG' && item.type === 'VEG') {
    return true
  }
  if (state.filter === 'FRUIT' && item.type === 'FRUIT') {
    return true
  }
  
  console.log('item.text', item.type)
  return false
}

function renderCartItems() {
  const cartItemList = document.querySelector(".cart--item-list");
  cartItemList.innerHTML = "";
 
state.cart.forEach(item => {
    const cartItemHTML = `
      <li class="cart-item">
        <img class="cart--item-icon" src="assets/icons/${item.id}.svg" alt="${item.name}" />
        <p class="item-name">${item.name}</p>
        <div class="quantity-controls">
          <button onclick="adjustQuantity('${item.id}', -1)" class="quantity-btn remove-btn" data-id="${item.id}">-</button>
          <span class="quantity-text">${item.quantity}</span>
          <button onclick="adjustQuantity('${item.id}', 1)"  class="quantity-btn add-btn" data-id="${item.id}">+</button>
        </div>
      </li>
    `;

    cartItemList.innerHTML += cartItemHTML;
  });
}

function setFilter(filterType) {
  console.log(filterType)
  state.filter = filterType;
  renderStoreItems()
}

function addToCart(itemData) {
  const exists = state.cart.find((item) => {return item.id === itemData.id})
  if (exists !== undefined) {
    adjustQuantity(itemData.id, 1)
    return
  }
      state.cart.push({...itemData, quantity: 1})
      renderCartItems()
      renderTotal()
}

function renderTotal() {
  const totalElement = document.querySelector(".total-number");
  const total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalElement.textContent = `£${total.toFixed(2)}`;
}

function adjustQuantity(itemId, quantity) {
  const newCart = state.cart.map((item) => {
    return item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item;
  }).filter((item) => {
    return item.quantity > 0;
  });
  state.cart = newCart;
  renderCartItems();
  renderTotal();
}

document.addEventListener("DOMContentLoaded", () => {
  renderStoreItems();
  renderCartItems();
  renderTotal();

  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-id");
      const itemData = state.items.find((item) => {return item.id === itemId})
      addToCart(itemData);
    });
  });

});
