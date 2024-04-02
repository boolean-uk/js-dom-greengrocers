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

function capitalLetter(data){
  return `${data.at(0).toUpperCase() + data.slice(1)}`
}

// Create Store Item
function createStoreItem(data) {
  return `<li>
    <p>${capitalLetter(data.name)}</p>
    <div class="store--item-icon">
      <img src="assets/icons/${data.id}.svg" alt=${data.name} />
    </div>
    <button class="addToCart" onclick='eventAddItemToCart("${data.id}")'>Add to cart</button>
  </li>`;
}//<button class="addToCart" onclick='eventAddItemToCart("${data.id}")'>Add to cart</button>

function getStoreItems() {
  return state.items.map(x => createStoreItem(x))
}

// Create Cart Items
function createCartItem(data) {
  return `<li>
    <img
      class="cart--item-icon"
      src="assets/icons/${data.id}.svg"
      alt="${data.name}"
    />
    <p>${capitalLetter(data.name)}</p>
    <button class="quantity-btn remove-btn center" onclick='eventIncreaseCartItemQuantity("${data.id}", false)'>-</button>
    <span class="quantity-text center">${data.quantity}</span>
    <button class="quantity-btn add-btn center" onclick='eventIncreaseCartItemQuantity("${data.id}", true)'>+</button>
  </li>`; //onclick='eventIncreaseCartItemQuantity("${data.id}")  // onclick='eventIncreaseCartItemQuantity("${data.id}")
}

function calculateSum() {
  let sum = 0.0
  for(let i = 0; i < state.cart.length; i++) {
    sum += state.cart.at(i).price * state.cart.at(i).quantity;
  }
  return parseFloat(sum).toFixed(2)
}

function updateTotalCost(){
  document.getElementsByClassName("total-number")[0].innerHTML = `<p>£${calculateSum()}</p>`;
}

function getCartItems() {
  return state.cart.map(x => createCartItem(x))
}

function decreaseCartItemQuantity(itemID) {
  const item = state.cart.find(x => x.id === itemID);
  if(!item) return

  --item.quantity;

  // Remove item if 0 (or less)
  if(item.quantity <= 0) {
      const i = state.cart.findIndex(x => x.id === itemID)
      state.cart.splice(i, 1);
  }
}

function increaseCartItemQuantity(itemID) {
  const item = state.cart.find(x => x.id === itemID);
  if(!item) return

  item.quantity++;
}

// Button functions
function eventIncreaseCartItemQuantity(itemID, shouldIncrease = true) {
  if(shouldIncrease == true) {
    increaseCartItemQuantity(itemID)
  }
  else {
    decreaseCartItemQuantity(itemID)
  }
  
  // Update document
  document.getElementsByClassName("item-list cart--item-list")[0].innerHTML = getCartItems().join('')
 updateTotalCost();
}

function eventAddItemToCart(itemID) {
  console.log('Button clicked!');

  // Check if item with ID exists in cart. If not, add item to chart. Else update quantity
  const _item1 = state.cart.find(x => x.id === itemID);
  if(_item1) { 
    // Increase item count in cart
    increaseCartItemQuantity(itemID);
  } else {
    // Add new item to cart
    const _item = { ...state.items.find(x => x.id === itemID) }
    if(!_item.hasOwnProperty('quantity')) {
      _item.quantity = 1;
      state.cart.push(_item)
    }
  }

  // Update document
  document.getElementsByClassName("item-list cart--item-list")[0].innerHTML = getCartItems().join('');
  updateTotalCost();
}

// Init list of store items
document.getElementsByClassName("item-list store--item-list")[0].innerHTML = getStoreItems().join('');