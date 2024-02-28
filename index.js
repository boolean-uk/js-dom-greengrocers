const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      image: "assets/icons/001-beetroot.svg",
      quantity: 0
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      image: "assets/icons/002-carrot.svg",
      quantity: 0

    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      image: "assets/icons/003-apple.svg",
      quantity: 0
    },
    {   
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      image: "assets/icons/004-apricot.svg",
      quantity: 0
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      image: "assets/icons/005-avocado.svg",
      quantity: 0
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      image: "assets/icons/006-bananas.svg",
      quantity: 0
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      image: "assets/icons/007-bell-pepper.svg",
      quantity: 0
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      image: "assets/icons/008-berry.svg",
      quantity: 0
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      image: "assets/icons/009-blueberry.svg",
      quantity: 0
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      image: "assets/icons/010-eggplant.svg",
      quantity: 0
    }
  ],
  cart: [],
  totalPrice: 0,
};


function addItemToCart(index) {
  const newItem = state.items[index];
  const existingItemIndex = state.cart.findIndex(item => item.id === newItem.id);

  if (existingItemIndex !== -1) {
    state.cart[existingItemIndex].quantity++;
  } else {
    newItem.quantity = 1;
    state.cart.push(newItem);
  }

  state.totalPrice += newItem.price;
  updateTotal();
  renderCart();
};


function removeItemFromCart(index) {
  const itemToRemove = state.cart[index];

  if (itemToRemove.quantity > 1) {
    itemToRemove.quantity--;
  } else {
    state.cart.splice(index, 1);
  }

  state.totalPrice -= itemToRemove.price;
  updateTotal();
  renderCart();
};


function renderStoreItems() {
  const itemList = document.querySelector('.item-list.store--item-list');
  itemList.innerHTML = '';

  state.items.forEach((item, index) => {
    const storeItem = document.createElement('li');
    
    storeItem.innerHTML = `
      <div class="store--item-icon">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <button onclick="addItemToCart(${index})">Add to Cart</button>
    `;

    itemList.appendChild(storeItem);
  });
};


function renderCart() {
  const cartItemList = document.querySelector('.item-list.cart--item-list');
  cartItemList.innerHTML = '';

  state.cart.forEach((item, index) => {
    const cartItem = document.createElement('li');

    cartItem.innerHTML = `
      <div class="store--item-icon">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <p>${item.name}</p>
      <button class="quantity-btn remove-btn center" onclick="removeItemFromCart(${index})">-</button>
      <span class="quantity-text center">${item.quantity}</span>
      <button class="quantity-btn add-btn center" onclick="addItemToCart(${index})">+</button>
    `;

    cartItemList.appendChild(cartItem);
  });
};


function updateTotal() {
  const totalPriceElement = document.getElementById('totalPrice');
  totalPriceElement.textContent = state.totalPrice.toFixed(2);
};



function main() {

  renderStoreItems();
  renderCart();
};

main();

