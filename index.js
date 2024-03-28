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

const storeItemList = document.querySelector('.store--item-list')
const cartItemList = document.querySelector('.cart--item-list')
const total = document.querySelector('.total-number')

function addItemToStore() {
  
  state.items.forEach((item, index) => {
    
    const storeItem = document.createElement('li')
    const storeItemDiv = document.createElement('div')
    const storeItemImage = addImage(item, index)
    const addToCartButton = makeAddToCartButton(item, index)

    storeItemDiv.classList.add('store--item-icon')

    storeItem.append(storeItemDiv)
    storeItemDiv.append(storeItemImage)
    storeItem.append(addToCartButton)

    storeItemList.append(storeItem)
  })
}

function addImage(item) {
  const storeItemImage = document.createElement('img')
  storeItemImage.setAttribute('alt', item.name)
  storeItemImage.setAttribute('src', `./assets/icons/${item.id}.svg`)

  return storeItemImage
}

function makeAddToCartButton(item, index) {
  const addToCartButton = document.createElement('button')
  addToCartButton.innerText = 'Add to cart'
  addToCartButton.addEventListener('click', () => addItemToCart(item, index))

  return addToCartButton
}

function addItemToCart(item, index) {
  const containsItem = state.items.find(productItem => productItem.id === state.items[index].id)
  
  if (!state.cart.includes(containsItem)) {
    state.cart.push(item)
    state.cart[state.cart.length -1].quantity = 1
    
  } else {
    const containsItemInCart = state.cart.find(productItem => productItem.id === state.items[index].id)
    containsItemInCart.quantity += 1
  }
  
  updateCart()
  
}

function updateCart(item, index) {
  cartItemList.innerHTML = ''

  state.cart.forEach((product) => {
    const newItemInCart = createNewCartItem(product)
  })
}

function createNewCartItem(product) {
  const cartItem = document.createElement('li')
  const cartImage = document.createElement('img')
  const cartItemName = document.createElement('p')
  const minusButton = makeAddOrRemoveCartButton()
  const plusButton = makeAddOrRemoveCartButton()
  const quantity = document.createElement('span')

  cartImage.classList.add('cart--item-icon')
  cartItemName.innerText = product.name
  cartImage.setAttribute('alt', product.name)
  cartImage.setAttribute('src', `./assets/icons/${product.id}.svg`)
  minusButton.classList.add('remove-btn')
  minusButton.innerText = '-'
  plusButton.classList.add('add-btn')
  plusButton.innerText = '+'
  quantity.classList.add('quantity-text')
  quantity.classList.add('center')
  quantity.innerText = product.quantity 

  cartItem.append(cartImage)
  cartItem.append(cartItemName)
  cartItem.append(minusButton)
  cartItem.append(quantity)
  cartItem.append(plusButton)

  cartItemList.append(cartItem)

  plusButton.addEventListener('click', () => addMoreItems(product))
  minusButton.addEventListener('click', () => removeItems(product))

  return cartItem
}

function addMoreItems(product) {
  product.quantity += 1
  updateCart()
}

function removeItems(product) {
  product.quantity -= 1
  
  if (product.quantity === 0) {
    state.cart.splice(state.cart.findIndex(productItem => productItem.id === product.id), 1)
  }
  updateCart()
}

function makeAddOrRemoveCartButton() {
  const addButton = document.createElement('button')
  addButton.classList.add('quantity-btn')
  addButton.classList.add('center')

  return addButton
}

addItemToStore()