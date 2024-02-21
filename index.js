const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "Vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "Vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "Fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "Fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "Vegetable"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "Fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "Vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
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
      price: 0.35,
      type: "Vegetable"
    }
  ],
  cart: []
};


const filters = document.querySelectorAll(".filter-btn");
const clearFilterButton = document.querySelector(".clear-filter-btn");
filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const filterType = filter.dataset.type;
    const filteredItems = state.items.filter((item) => item.type === filterType);
    renderStore(filteredItems);
  });
});
clearFilterButton.addEventListener("click", () => {renderStore(state.items);
});

function renderStore(items) {
  const storeItemList = document.querySelector(".store--item-list");
  storeItemList.innerHTML = "";
  items.forEach((item) => {
    const storeItem = document.createElement("li");
    storeItem.innerHTML = `
      <div class="store--item-icon">
        <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
      </div>
      <button>Add TO CART</button>
    `;
    storeItem.querySelector("button").addEventListener("click", () => {addItemToCart(item);});
    storeItemList.appendChild(storeItem);
  });
}


function populateStoreImg(){
  const storeItemList = document.querySelector(".store--item-list");
  storeItemList.innerHTML = "";
  state.items.forEach((item) => {
    const storeItem = document.createElement("li");
    storeItem.innerHTML = `
      <div class="store--item-icon">
        <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
      </div>
      <button>Add TO CART</button>
    `;
    storeItem.querySelector("button").addEventListener("click", () => {addItemToCart(item);});
    storeItemList.appendChild(storeItem);
  });
}

function addItemToCart(item){
  if (state.cart.some(cartItem => cartItem.id === item.id)) {
    changeCartItemQuantity(item, 1)
    renderCart();
    return;
  }
  else{
    state.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
    renderCart();
  }
}

function renderCart(){
  const cartItemList = document.querySelector(".cart--item-list");
  cartItemList.innerHTML = "";

  let total = 0;

  state.cart.forEach((item) => {cartItem = document.createElement("li");
    cartItem.innerHTML = `
      <img
        class="cart--item-icon"
        src="assets/icons/${item.id}.svg"
        alt="${item.name}"
      />
      <p>${item.name}</p>
      <button class="quantity-btn remove-btn center">-</button>
      <span class="quantity-text center">${item.quantity}</span>
      <button class="quantity-btn add-btn center">+</button>
    `;
    cartItemList.appendChild(cartItem);
    total += item.price * item.quantity;

    
    const quantityText = cartItem.querySelector(".quantity-text");
    const quantityInt = parseInt(quantityText.textContent);
    const removeButton = cartItem.querySelector(".remove-btn");

    removeButton.addEventListener("click", () => {
      if (quantityInt <= 1) {
        state.cart = state.cart.filter(cartItem => cartItem.id !== item.id);
      } 
      else {
        changeCartItemQuantity(item, -1);
      }
      renderCart();
    });
    const addButton = cartItem.querySelector(".add-btn");
    addButton.addEventListener("click", () => {
      changeCartItemQuantity(item, 1);
      renderCart();
    });
  });
  const totalNumber = document.querySelector(".total-number");
  totalNumber.textContent = `£${total.toFixed(2)}`;
}

function changeCartItemQuantity(item, value){
  state.cart = state.cart.map(cartItem => {
    if (cartItem.id === item.id) {
      return Object.assign({}, cartItem, { quantity: cartItem.quantity + value });
    }
    return cartItem;
  });
}
populateStoreImg();