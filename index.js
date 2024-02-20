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

function populateStore(){
  const storeItemList = document.querySelector(".store--item-list");
  storeItemList.innerHTML = "";
  state.items.forEach((item) => {
    const storeItem = document.createElement("li");
    storeItem.innerHTML = `
      <div class="store--item-icon">
        <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
      </div>
      <button>Add to cart</button>
    `;
    storeItem
      .querySelector("button")
      .addEventListener("click", () => {
        addToCart(item);
      });
    storeItemList.appendChild(storeItem);
  });
}

function addToCart(item){
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
  state.cart.forEach((item) => {
    cartItem = document.createElement("li");
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

    // Add event listeners for the quantity buttons
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

populateStore();