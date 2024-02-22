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

// Get lists from html
const storeList = document.querySelector('.store--item-list')
const cartList = document.querySelector('.cart--item-list')

// Get total from html
let total = document.querySelector('.total-number')


function makeImageElement(item) {
  // Make element
  const itemImage = document.createElement('img')
  // Set image path
  const imagePath = 'assets/icons/' + item.id + '.svg'
  itemImage.setAttribute('src', imagePath)
  // Set item name to alt
  itemImage.setAttribute('alt', item.name)
  return itemImage
}

function makeAddToCartButton() {
  const itemButton = document.createElement('button')
  itemButton.innerText = 'Add to cart'
  return itemButton
}

function registerAddToCartButtonClicked(itemClicked, button) {
  button.addEventListener('click', () => {
      const cartItem = state.cart.find(c => c.id === itemClicked.id)
      if (cartItem) {
        // Update quantity
        cartItem.quantity ++
      }
      else {
        // Add item to cart
        const newCartItem = itemClicked
        newCartItem.quantity = 1
        state.cart.push(newCartItem)
      }
      renderCartItems()
      renderTotalCost()
  })
}

function makeRemoveQuantityButton(item) {
  const button = document.createElement('button')
  button.setAttribute('class', 'quantity-btn')
  button.setAttribute('class', 'remove-btn')
  button.setAttribute('class', 'center')
  button.innerText = '-'
  registerRemoveQuantityButtonClicked(item, button)
  return button
}

function registerRemoveQuantityButtonClicked(itemClicked, button) {
  button.addEventListener('click', () => {
      // Update quantity
      if (itemClicked.quantity === 1) {
        const indexOfClicked = state.cart.findIndex(item => item === itemClicked)
        state.cart.splice(indexOfClicked, 1)
      }
      else {
        itemClicked.quantity --
      }
      renderCartItems()
      renderTotalCost()
  })
}

function makeAddQuantityButton(item) {
  const button = document.createElement('button')
  button.setAttribute('class', 'quantity-btn')
  button.setAttribute('class', 'add-btn')
  button.setAttribute('class', 'center')
  button.innerText = '+'
  registerAddQuantityButtonClicked(item, button)
  return button
}

function registerAddQuantityButtonClicked(itemClicked, button) {
  button.addEventListener('click', () => {
      // Update quantity
      itemClicked.quantity ++
      renderCartItems()
      renderTotalCost()
  })
}

function makeSpanElement(quantity) {
  const spanElement = document.createElement('span')
  spanElement.setAttribute('class', 'quantity-text')
  spanElement.setAttribute('class', 'center')
  spanElement.innerText = quantity
  return spanElement
}

function renderStoreItems() {
  storeList.innerHTML = ''
  for (let i = 0; i < state.items.length; i++) {
    // Get item
    const item = state.items[i]
    // Make list item
    const itemLi = document.createElement('li')
    // Add div with image
    const itemDiv = document.createElement('div')
    itemDiv.setAttribute('class', 'store--item-icon')
    itemDiv.appendChild(makeImageElement(item))
    itemLi.appendChild(itemDiv)
    // Add 'Add to cart' button
    const button = makeAddToCartButton()
    registerAddToCartButtonClicked(item, button)
    itemLi.appendChild(button)
    // Add list item to store list
    storeList.appendChild(itemLi)
  }
  
}

function renderCartItems() {
  cartList.innerHTML = ''
  for (let i = 0; i < state.cart.length; i++) {
    // Get item
    const item = state.cart[i]
    // Make list item
    const cartLi = document.createElement('li')
    // Add image
    const cartImage = makeImageElement(item)
    cartImage.setAttribute('class', 'cart--item-icon')
    cartLi.appendChild(cartImage)
    // Add paragraph element
    const cartPara = document.createElement('p')
    cartPara.innerText = item.name
    cartLi.appendChild(cartPara)
    // Add remove button
    cartLi.appendChild(makeRemoveQuantityButton(item))
    // Display quantity
    cartLi.appendChild(makeSpanElement(item.quantity))
    // Add add button
    cartLi.appendChild(makeAddQuantityButton(item))
    // Add list item to cart list
    cartList.appendChild(cartLi)
  }
}

function renderTotalCost() {
  total.innerText = '£0.00'
  let totalNumber = 0
  for (let i = 0; i < state.cart.length; i++) {
    const item = state.cart[i]
    totalNumber += item.quantity * item.price
  }
  total.innerText = '£' + totalNumber.toFixed(2)
}

function main() {
  renderStoreItems()
  renderCartItems()
  renderTotalCost()
}

main()
