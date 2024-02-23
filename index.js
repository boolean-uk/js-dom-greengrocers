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
  ]
};

const cartItems = {};

let totalPrice = 0.00

// Selected Root Element
const storeItemListUL = document.querySelector(".store--item-list")
const cartItemListUL = document.querySelector(".cart--item-list")

function renderStoreItems() {
  storeItemListUL.innerHTML = ""
  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i]

    const itemLI = document.createElement('li')

    const itemDIV = document.createElement('div')
    itemDIV.setAttribute('class', 'store--item-icon')
    createImageForStoreItem(itemDIV, item, "assets/icons/" + item.id + ".svg")

    itemLI.appendChild(itemDIV)

    createButtonForItem(itemLI, item)

    storeItemListUL.appendChild(itemLI)
  }
}

function createImageForStoreItem(itemDIV, item, imageSrc) {
  const itemIMG = document.createElement('img')
  itemIMG.src = imageSrc
  itemIMG.alt = item.name
  itemDIV.appendChild(itemIMG)
}

function createButtonForItem(itemLI, item) {
  const itemButton = document.createElement('button')
  itemButton.setAttribute('type', 'button')
  itemButton.textContent = 'ADD TO CART'
  itemButton.addEventListener('click', () => {addItemToCart(item)})
  itemLI.appendChild(itemButton)
}

/** ------------------- Cart Items ------------------- **/

function addItemToCart(item) {
  if (cartItems.hasOwnProperty(item.name)) {
    increaseItemAmount(item)
  } else {
    cartItems[item.name] = { quantity : 1 } 
    increasePrice(item)
    createCartItem(item)
  }
}


/** --------------------------- Start -------------------------- **/
/** --------------------- Updating the Cart -------------------- **/

function increaseItemAmount(item) {
  updateQuantityDisplay(item, 1)
  increasePrice(item)
}

function decreaseItemAmount(item) {
  if (cartItems[item.name].quantity - 1 === 0) {
    cartItemListUL.removeChild(cartItems[item.name].listItem)
    delete cartItems[item.name]
  } else {
    updateQuantityDisplay(item, -1)
  }
  decreasePrice(item)
}

function updateQuantityDisplay(item, number) {
  const newQuantity = cartItems[item.name].quantity + number
  cartItems[item.name].quantity = newQuantity
  cartItems[item.name].displayer.textContent = newQuantity
}

function increasePrice(item) {
  totalPrice += item.price
  totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100
  document.querySelector('.total-number').textContent = '£' + totalPrice
}

function decreasePrice(item) {
  totalPrice -= item.price
  totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100
  document.querySelector('.total-number').textContent = '£' + totalPrice
}
/** --------------------- Updating the Cart -------------------- **/
/** --------------------------- End ---------------------------- **/


/** --------------------------- Start -------------------------- **/
/** ------------------- Create new Cart Item ------------------- **/
function createCartItem(item) {
  const itemLI = document.createElement('li')

  createImageForCartItem(itemLI, item, "assets/icons/" + item.id + ".svg")
  
  const itemP = document.createElement('p')
  itemP.innerText = item.name
  itemLI.appendChild(itemP)

  createButtonsForCartItem(itemLI, item)

  cartItemListUL.appendChild(itemLI)
}

function createImageForCartItem(itemLI, item, imageSrc) {
  const itemIMG = document.createElement('img')
  itemIMG.setAttribute('class', 'cart--item-icon')
  itemIMG.src = imageSrc
  itemIMG.alt = item.name
  itemLI.appendChild(itemIMG)
}

function createButtonsForCartItem(itemLI, item) {
  const quantityDisplayer = document.createElement('span')
  quantityDisplayer.setAttribute('class', 'quantity-text center')
  quantityDisplayer.textContent = 1

  const buttonMinus = document.createElement('button')
  buttonMinus.setAttribute('class', 'quantity-btn remove-btn center')
  buttonMinus.textContent = '-'
  buttonMinus.addEventListener('click', () => {decreaseItemAmount(item)})
  
  const buttonPlus = document.createElement('button')
  buttonPlus.setAttribute('class', 'quantity-btn add-btn center')
  buttonPlus.textContent = '+'
  buttonPlus.addEventListener('click', () => {increaseItemAmount(item)})
  
  itemLI.appendChild(buttonMinus)
  itemLI.appendChild(quantityDisplayer)
  itemLI.appendChild(buttonPlus)

  cartItems[item.name].displayer = quantityDisplayer
  cartItems[item.name].listItem = itemLI
}
/** ------------------- Create new Cart Item ------------------- **/
/** ------------------------- End ------------------------------ **/

function main() {
  renderStoreItems()
}

main()