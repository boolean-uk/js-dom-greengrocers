const state = {
  data: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.30
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.30
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.25
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 1800.0
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.20
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.1
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.1
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.40
    }
  ],
  storeDocumentObject: document.getElementsByClassName('store--item-list')[0],
  cartDocumentObject: document.getElementsByClassName('cart--item-list')[0],
  totalPriceDocumentObject: document.getElementsByClassName('total-number')[0],
  sortByDocumentObject: document.getElementById('sortBy'),
  storeItems: [],
  cartItems: [],
  totalPrice: 0
};

init()

function init() {
  insertStoreItems(state.data)
  addSortByEventListener()
}

function insertStoreItems(data) {
  data.forEach(item => {
    const storeItem = new StoreItem(item)
    state.storeDocumentObject.append(storeItem.getDocumentObject())
    storeItem.documentObjects.addButton.addEventListener('click', function() {addToCart(storeItem.id)})
    state.storeItems.push(storeItem)
  })
}

function rerenderStoreItems(data) {
  state.storeItems.forEach(item => {
    item.removeDocumentObject()
  })
  state.storeItems = []
  insertStoreItems(data)
}

function addToCart(id) {
  if (isInCart(id)) {
    getCartItemById(id).incrementQuantity()
  }
  else {
    insertCartItem(id)
  }
  updateTotalPrice()
}


function addSortByEventListener() {
  addSelectOptions(state.sortByDocumentObject, ['name', 'price'])
  state.sortByDocumentObject.addEventListener('change', function() {
    switch(state.sortByDocumentObject.value) {
      case 'name':
        rerenderStoreItems(state.data.sort((a, b) => a.name.localeCompare(b.name)))
        break
      case 'price':
        rerenderStoreItems(state.data.sort((a, b) => a.price - b.price))
        break
    }
  })
}

function addSelectOptions(selectObject, options) {
  let innerHTML = ""
  options.forEach(option => {
    innerHTML += "<option value=" + option + ">" + option + "</option>"
  })
  selectObject.innerHTML = selectObject.innerHTML + innerHTML
}

function insertCartItem(id) {
  const cartItem = new CartItem(getItemDataById(id))
  state.cartDocumentObject.append(cartItem.getDocumentObject())
  cartItem.documentObjects.decrementButton.addEventListener('click', function() {
    cartItem.decrementQuantity()
    if (cartItem.quantity === 0) {
      cartItem.removeDocumentObject()
      state.cartItems = state.cartItems.filter(item => item.id !== cartItem.id)
    }
    updateTotalPrice()
  })
  cartItem.documentObjects.incrementButton.addEventListener('click', function() {
    cartItem.incrementQuantity()
    updateTotalPrice()
  })
  state.cartItems.push(cartItem)
}

function updateTotalPrice() {
  state.totalPrice = 0
  state.cartItems.forEach(item => {
    state.totalPrice += item.getTotalPrice()
  })
  state.totalPriceDocumentObject.innerText = '£' + state.totalPrice.toFixed(2)
}

function isInCart(id) {
  return state.cartItems.find(element => element.id === id) !== undefined
}

function getCartItemById(id) {
  return state.cartItems.find(element => element.id === id)
}

function getItemDataById(id) {
  return state.data.find(element => element.id === id)
}