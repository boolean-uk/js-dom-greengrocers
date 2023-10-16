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

// HIGH LEVEL VARIABLES
const storeList = document.querySelector('#store > ul')
const cartList = document.querySelector('#cart > div > ul')

// FULL PAGE RENDER FUNCTION
function render() {
  renderStore()
  // renderCart()
}

// STORE
// CREATE STORE FUNCTIONS
function renderStoreItemDiv(item) {
  const storeItemDiv = document.createElement('div')
  storeItemDiv.setAttribute('class', 'store--item-icon')
  storeItemDiv.append(renderStoreItemImage(item))
  return storeItemDiv
}

function renderStoreItemImage(item) {
  const storeItemImage = document.createElement('img')
  storeItemImage.src = `assets/icons/${item.id}.svg`
  storeItemImage.alt = item.name
  return storeItemImage
}

// RENDER STORE ITEMS ON THE PAGE
function renderStore() {
  state.items.forEach((item) => {
    const storeItem = document.createElement('li')
  
    storeItem.append(renderStoreItemDiv(item))  

    const storeItemButton = document.createElement('button')
    storeItemButton.innerText = "Add to cart"
    storeItem.append(storeItemButton)

    storeList.append(storeItem)

    storeItemButton.addEventListener('click', () => {
      const isItemInCart = state.cart.find((newItem) => newItem.name === item.name)

      if (isItemInCart) {
        isItemInCart.quantity += 1 
      } else {
        state.cart.push({id: item.id, name: item.name, price: item.price, quantity: 1})
        console.log(state.cart)
      }
      renderCart()
    })
  })
}


// CART
// CREATE INDIVIDUAL CART FUNCTIONS
function renderCartItemImage(item) {
  const cartItemImage = document.createElement('img')
  cartItemImage.setAttribute('class', 'cart--item-icon')
  cartItemImage.src = `assets/icons/${item.id}.svg`
  cartItemImage.alt = item.name
  return cartItemImage
}

function renderCartItemName(item) {
  const cartItemName = document.createElement('p')
  cartItemName.innerText = item.name
  return cartItemName
}

function renderDecreaseButton() {
  const cartItemDecreaseButton = document.createElement('button')
  cartItemDecreaseButton.classList.add('quantity-btn', 'remove-btn', 'center')
  cartItemDecreaseButton.innerText = '-'
  return cartItemDecreaseButton
}

function renderCounter(item) {
  const cartItemspan = document.createElement('span')
  cartItemspan.classList.add('quantity-text', 'center')
  cartItemspan.innerText = item.quantity
  console.log(item)
  return cartItemspan
}

function renderIncreaseButton() {
  const cartItemIncreaseButton = document.createElement('button')
  cartItemIncreaseButton.classList.add('quantity-btn', 'add-btn', 'center')
  cartItemIncreaseButton.innerText = '+'
  return cartItemIncreaseButton
}

// CART RENDER FUNCTION
function renderCart() {
  cartList.innerHTML = ''

  state.cart.forEach((item) => {
    // if (item.name) {
      const cartItem = document.createElement('li')
    
      cartItem.append(renderCartItemImage(item))
      cartItem.append(renderCartItemName(item))
      cartItem.append(renderDecreaseButton())
      cartItem.append(renderCounter(item))
      cartItem.append(renderIncreaseButton())
  
      cartList.append(cartItem)
    // }
  })
}

// CALL PAGE RENDER FUNCTION AT THE END
render()