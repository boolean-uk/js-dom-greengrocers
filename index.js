// STATE
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

// SELECTORS
const storeItemList = document.querySelector('.store--item-list')
const cartItemList = document.querySelector('.cart--item-list')
const totalNumber = document.querySelector('.total-number')


const clearStorePage = () => {
  storeItemList.innerHTML = ""
}

const clearCart = () => {
  cartItemList.innerHTML = ""
}

const renderAllTheItemsInTheStore = () => {
  clearStorePage()
  for (let i = 0; i < state.items.length; i++) {
    const currentItem = state.items[i]
    const newItem = document.createElement('li')
    storeItemList.append(newItem)

    const iconDiv = document.createElement('div')
    iconDiv.setAttribute('class', 'store--item-icon')
    storeItemList.append(iconDiv)

    const img = document.createElement('img')
    img.setAttribute('src', `assets/icons/${currentItem.id}.svg`)
    img.setAttribute('alt', currentItem.name)
    iconDiv.append(img)

    const addToCartButton = document.createElement('button')
    addToCartButton.innerText = 'Add to cart'
    newItem.append(addToCartButton)

    addToCartButton.addEventListener('click', () => {
      addItemToCart(currentItem)
      renderAllTheItemsInTheCart()
      sumOfCart()
    })
  }
}

let alreadyInCart = false
const checkIfItemIsInCart = (item) => {
    for (i = 0; i < state.cart.length; i++) {
      if (state.cart[i].name === item.name) {
        alreadyInCart = true
        state.cart[i].quantity += 1
        break
      } else {
        alreadyInCart = false
      }
    }
}

const addItemToCart = (product) => {
  const newItemObj = {
    name: product.name,
    price: product.price,
    img: `assets/icons/${product.id}.svg`,
    quantity: 1
  }
  checkIfItemIsInCart(product)
  if (!alreadyInCart) {
    state.cart.push(newItemObj)
  }
}

const renderAllTheItemsInTheCart = () => {
  clearCart()
  for (let i = 0; i < state.cart.length; i++) {
    const cartItem = state.cart[i]
    const newCartItem = document.createElement('li')
    cartItemList.append(newCartItem)

    const img = document.createElement('img')
    img.setAttribute('class', 'cart--item-icon')
    img.setAttribute('src', cartItem.img)
    img.setAttribute('alt', cartItem.name)
    newCartItem.append(img)

    const name = document.createElement('p')
    name.innerText = cartItem.name
    newCartItem.append(name)

    const removeAndDecreaseButton = document.createElement('button')
    removeAndDecreaseButton.setAttribute('class', 'quantity-btn remove-btn center')
    removeAndDecreaseButton.innerText = "-"
    newCartItem.append(removeAndDecreaseButton)

    removeAndDecreaseButton.addEventListener('click', () => {
      indexOfTheItemToRemove = state.cart.indexOf(cartItem)
      if (cartItem.quantity === 1) {
        state.cart.splice(indexOfTheItemToRemove, 1)
      } else {
        cartItem.quantity -= 1
      }
      renderAllTheItemsInTheCart()
      sumOfCart()
    })

    const quantityCounter = document.createElement('span')
    quantityCounter.setAttribute('class', 'quantity-text center')
    quantityCounter.innerText = cartItem.quantity
    newCartItem.append(quantityCounter)

    const addAndIncreaseButton = document.createElement('button')
    addAndIncreaseButton.setAttribute('class', 'quantity-btn add-btn center')
    addAndIncreaseButton.innerText = "+"
    newCartItem.append(addAndIncreaseButton)

    addAndIncreaseButton.addEventListener('click', () => {
      cartItem.quantity++
      renderAllTheItemsInTheCart()
      sumOfCart()
    })
  }
}

const currencyConvert = (x) => {
  return Number.parseFloat(x).toFixed(2);
}

let total = 0
const sumOfCart = () => {
  for (let i = 0; i < state.cart.length; i++) {
    const cartItem = state.cart[i]
    total += cartItem.price * cartItem.quantity
  }
  totalNumber.innerText = `£${currencyConvert(total)}`
}

renderAllTheItemsInTheStore()