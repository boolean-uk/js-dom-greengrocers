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
const render = () => {
  renderStore()
  renderCart()
}

// STORE
// CREATE STORE FUNCTIONS
const renderStoreItemDiv = (item) => {
  const storeItemDiv = document.createElement('div')
  storeItemDiv.setAttribute('class', 'store--item-icon')
  storeItemDiv.append(renderStoreItemImage(item))
  return storeItemDiv
}

const renderStoreItemImage = (item) => {
  const storeItemImage = document.createElement('img')
  storeItemImage.src = `assets/icons/${item.id}.svg`
  storeItemImage.alt = item.name
  return storeItemImage
}

const renderStoreItemButton = (item) => {
  const storeItemButton = document.createElement('button')
  storeItemButton.innerText = "Add to cart"

  storeItemButton.addEventListener('click', (e) => {

    renderCart()

    // state.cart.push(newCartInfo)
    // console.log(state.cart)

    // state.items.forEach((item) => {
      // const cartItem = document.renderElement('li')
      // console.log(e.target)
      // if ()
      // cartItem.innerText = item.name
      // console.log(item.name)

      // cartList.append(cartItem)

    // })
  })

  return storeItemButton
}

// DISPLAY EACH OF THE STORE ITEMS ON THE PAGE

const renderStore = () => {
  state.items.forEach((item) => {
    const storeItem = document.createElement('li')
  
    storeItem.append(renderStoreItemDiv(item))  
    storeItem.append(renderStoreItemButton())
    
    storeList.append(storeItem)
  })
}

// CART
// CREATE CART FUNCTIONS
const renderCartItemImage = (item) => {
  const cartItemImage = document.createElement('img')
  cartItemImage.setAttribute('class', 'cart--item-icon')
  cartItemImage.src = `assets/icons/${item.id}.svg`
  cartItemImage.alt = item.name
  return cartItemImage
}

const renderCartItemName = (item) => {
  const cartItemName = document.createElement('p')
  cartItemName.innerText = item.name
  return cartItemName
}

const renderDecreaseButton = () => {
  const cartItemDecreaseButton = document.createElement('button')
  cartItemDecreaseButton.classList.add('quantity-btn', 'remove-btn', 'center')
  cartItemDecreaseButton.innerText = '-'
  return cartItemDecreaseButton
}

const renderCounter = () => {
  const cartItemspan = document.createElement('span')
  cartItemspan.classList.add('quantity-text', 'center')
  return cartItemspan
}

const renderIncreaseButton = () => {
  const cartItemIncreaseButton = document.createElement('button')
  cartItemIncreaseButton.classList.add('quantity-btn', 'add-btn', 'center')
  cartItemIncreaseButton.innerText = '+'
  return cartItemIncreaseButton
}

const renderCart = () => {
  state.items.forEach((item) => {
    const cartItem = document.createElement('li')
    
    cartItem.append(renderCartItemImage(item))
    cartItem.append(renderCartItemName(item))
    cartItem.append(renderDecreaseButton())
    cartItem.append(renderCounter())
    cartItem.append(renderIncreaseButton())

    cartList.append(cartItem)
  })
}

render()