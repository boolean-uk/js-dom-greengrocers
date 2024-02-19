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

document.getElementById("filter-by").addEventListener("change", filterByType);
document.getElementById("sort-by").addEventListener("change", sortAlphabetically);

let originalItems = state.items;
state.filteredItems = [...originalItems];

function filterByType() {
  const filterBy = this.value;
  if (filterBy === 'all') {
    state.filteredItems = [...originalItems];
  } else {
    const filteredItems = originalItems.filter(item => item.type === filterBy);
    state.filteredItems = filteredItems;
  }
  renderStoreItems();
}

function sortAlphabetically() {
  const sortBy = this.value;
  if (sortBy === 'ascending') {
    state.filteredItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'descending') {
    state.filteredItems.sort((a, b) => b.name.localeCompare(a.name));
  }
  renderStoreItems();
}


function createCartItem(item) {
  const li = document.createElement("li");

  const img = document.createElement("img");
  img.className = "cart--item-icon";
  img.src = `assets/icons/${item.id}.svg`;
  img.alt = item.name;
  li.appendChild(img);

  const p = document.createElement("p");
  p.textContent = item.name;
  li.appendChild(p);

  const removeButton = document.createElement("button");
  removeButton.className = "quantity-btn remove-btn center";
  removeButton.innerHTML = "-";
  removeButton.addEventListener("click", () => decreaseQuantity(li));
  li.appendChild(removeButton);

  const quantityText = document.createElement("span");
  quantityText.className = "quantity-text center";
  quantityText.textContent = item.quantity.toString();
  li.appendChild(quantityText);

  const addButton = document.createElement("button");
  addButton.className = "quantity-btn add-btn center";
  addButton.innerHTML = "+";
  addButton.addEventListener("click", () => increaseQuantity(li));
  li.appendChild(addButton);
  updateCartQuantity(li, item.quantity);
  return li;
}

function updateCartQuantity(li, quantity) {
  const itemId = li.querySelector("img").alt;
  const item = state.cart.find(item => item.name === itemId);

  if (item) {
    item.quantity = quantity;
  }

  const totalValueElement = document.querySelector(".total-number");
  const totalPrice = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  totalValueElement.textContent = `£${totalPrice.toFixed(2)}`;
}

function decreaseQuantity(li) {
  const quantityText = li.querySelector(".quantity-text");
  let quantity = parseInt(quantityText.textContent);
  if (quantity > 1) {
    quantity--;
    quantityText.textContent = quantity.toString();
    updateCartQuantity(li, quantity);
  } else {
    li.remove();
    removeFromCart(li);
    updateCartQuantity(li, 0);
  }
}

function removeFromCart(li) {
  const itemId = li.querySelector("img").alt;
  const itemIndex = state.cart.findIndex(item => item.name === itemId);
  if (itemIndex !== -1) {
    state.cart.splice(itemIndex, 1);
  }
}

function increaseQuantity(li) {
  const quantityText = li.querySelector(".quantity-text");
  let quantity = parseInt(quantityText.textContent);
  quantity++;
  quantityText.textContent = quantity.toString();
  updateCartQuantity(li, quantity);
}

function createStoreItems(item) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.className = "store--item-icon";
  const img = document.createElement("img");
  div.appendChild(img);
  img.src = `assets/icons/${item.id}.svg`;
  const button = document.createElement("button");
  button.innerHTML = "Add to cart";
  button.addEventListener("click", () => addToCart(item));
  li.appendChild(div);
  li.appendChild(button);
  return li;
}

function renderCartItems() {
  const cartItems = document.querySelector(".item-list.cart--item-list");
  cartItems.innerHTML = "";
  state.cart.forEach(item => {
    cartItems.appendChild(createCartItem(item));
  });
}

function renderStoreItems() {
  const storeItems = document.querySelector(".item-list.store--item-list");
  storeItems.innerHTML = "";
  state.filteredItems.forEach(item => {
    storeItems.appendChild(createStoreItems(item));
  });
}
function addToCart(item) {
  const cartItem = state.cart.find(cartItem => cartItem.id === item.id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    const newCartItem = { ...item, quantity: 1 };
    state.cart.push(newCartItem);
  }

  console.log(state.cart);
  renderCartItems();
}

renderStoreItems();

