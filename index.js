function createStoreItem(item) {

  return `
  <li class='store-item' store-item-id=${item.id}>
    <div class="store--item-icon">
      <img src="assets/icons/${item.id}.svg" alt=${item.name} />
    </div>
    <button class="store-item-button">Add to cart</button>
  </li>`;
}
function createCartItem(item) {
  return `
  <li class='cart-item' cart-item-id=${item.id}>
    <img
      class="cart--item-icon"
      src="assets/icons/${item.id}.svg"
      alt=${item.name}
    />
    <p>${item.name}</p>
    <button class="quantity-btn remove-btn center">-</button>
    <span class="quantity-text center">${item.quantity}</span>
    <button class="quantity-btn add-btn center">+</button>
  </li>`;
}
function sortItems(){
  if (state.sortby === "alpha") {
    return state.items.sort((a, b) => a.name.localeCompare(b.name));
  }
  else if (state.sortby === "price-asc") {
    return state.items.sort((a, b) => a.price - b.price);
  }
  else{
    return state.items.sort((a, b) => b.price - a.price);
  }
}

function renderCart() {
  const cartList = document.getElementsByClassName("item-list cart--item-list")[0];
  const totalElement = document.querySelector(".total-number");
  let totalSum = 0.0;
  cartList.innerHTML = ''; // Clear the existing content

  state.cart.forEach(cartItem => {
    const cartItemElement = document.createElement('li');
    cartItemElement.innerHTML = createCartItem(cartItem);
    cartList.appendChild(cartItemElement);
    createCartButtons(cartItemElement, cartItem);
    totalSum += cartItem.price * cartItem.quantity;
  });
  // Update the total element with the calculated totalSum
  totalElement.innerText = `£${totalSum.toFixed(2)}`;
}
// Function to create buttons for a given cart item element
function createCartButtons(cartItemElement, cartItem) {
  const addButton = cartItemElement.querySelector(".quantity-btn.add-btn.center");
  const removeButton = cartItemElement.querySelector(".quantity-btn.remove-btn.center");
  const itemId = cartItem.id;

  addButton.addEventListener('click', () => {
    cartItem.quantity++;
    renderCart();
  });

  removeButton.addEventListener('click', () => {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      // Remove the item from the cart if its quantity is zero
      state.cart = state.cart.filter(item => item.id !== itemId);
    }
    renderCart();
  });
}

function RenderStoreButtons(storeElement, storeItem) {
  const addButton = storeElement.querySelector(".store-item-button");
  const itemId = storeItem.id;
  addButton.addEventListener('click', () => {
    // Check if the item is already in the cart
    const existingCartItem = state.cart.find(item => item.id === itemId);

    if (existingCartItem) {
      // Item already in the cart, update quantity
      existingCartItem.quantity++;
    } else {
      const storeItem = state.items.find(item => item.id === itemId);
      // Item not in the cart, add a new cartItem
      const newCartItem = {
        id: itemId,
        name: storeItem.name,
        price: storeItem.price,
        quantity: 1 // Initial quantity is 1 when adding to the cart
      };
      state.cart.push(newCartItem);
    }
    renderCart();
    //Is it bad practice to render the entire cart when only changing one value?
  });
}
function renderStore(){
  const storeList = document.getElementsByClassName("item-list store--item-list")[0];
  //Clear exisiting data
  storeList.innerHTML='';
  state.items.forEach(storeItem => {
    if(storeItem.type===state.filter || state.filter ==="all"){
      const storeItemElement = document.createElement('li');
    storeItemElement.innerHTML = createStoreItem(storeItem);
    storeList.appendChild(storeItemElement);
    RenderStoreButtons(storeItemElement, storeItem);
    }
  });
}

const itemFilterDropdown = document.querySelector(".item-filter");
itemFilterDropdown.addEventListener("change", () => {
  const filter = itemFilterDropdown.value.toLowerCase();
  state.filter = filter;
  renderStore();
});

const sortByDropdown = document.querySelector(".item-sort");
sortByDropdown.addEventListener("change", () => {
  const sortby = sortByDropdown.value.toLowerCase();
  state.sortby = sortby;
  sortItems()
  renderStore();
});

function createStoreArray(items) {
  return items.map(i => createStoreItem(i));
}

function createCartArray(items) {
  return items.map(i => createCartItem(i));
}

//Call the store items from Index.html, fill it with item data
document.getElementsByClassName("item-list store--item-list")[0].innerHTML = createStoreArray(state.items).join('');

//Call the cart items from Index.html, fill it with item data
document.getElementsByClassName("item-list cart--item-list")[0].innerHTML = createCartArray(state.cart).join('');

renderStore()