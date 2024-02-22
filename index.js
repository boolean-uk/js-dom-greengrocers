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

const cartItems = {};

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
  itemButton.addEventListener('click', () => {addItemToCart(itemLI, item)})
  itemLI.appendChild(itemButton)
}

function addItemToCart(itemLI, item) {
  if (cartItems.hasOwnProperty(item.name)) {
    cartItems[item.name] += 1
  } else {
    cartItems[item.name] = 1
    createCartItem(item)
  }
  console.log(cartItems)
}

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
  quantityDisplayer.textContent = cartItems[item.name]
  quantityDisplayer.addEventListener('')

  const buttonMinus = document.createElement('button')
  //buttonMinus.setAttribute('type', 'button')
  buttonMinus.setAttribute('class', 'quantity-btn remove-btn center')
  buttonMinus.textContent = '-'
  buttonMinus.addEventListener('click', () => {increaseItemAmount(item, quantityDisplayer)})
  
  const buttonPlus = document.createElement('button')
  //buttonPlus.setAttribute('type', 'button')
  buttonPlus.setAttribute('class', 'quantity-btn add-btn center')
  buttonPlus.textContent = '+'
  buttonPlus.addEventListener('click', () => {increaseItemAmount(item)})
  
  itemLI.appendChild(buttonMinus)
  itemLI.appendChild(quantityDisplayer)
  itemLI.appendChild(buttonPlus)
}

function increaseItemAmount(item, quantityDisplayer) {
  quantityDisplayer.textContent = 5
}

function decreaseItemAmount(item) {

}

function createOrUpdateQuantityDisplay(itemLI, item, quantity) {
  if (quantity === 1) {
    const quantityDisplayer = document.createElement('span')
    quantityDisplayer.setAttribute('class', 'quantity-text center')
    quantityDisplayer.textContent = cartItems[item.name]
    itemLI.appendChild(quantityDisplayer)
  }
}

function main() {
  renderStoreItems()
}

main()