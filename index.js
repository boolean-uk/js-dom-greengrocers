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

function renderAvailableProducts() {
  const storeItemListEl = document.querySelector('.store--item-list')
  storeItemListEl.innerHTML = ''

  for (let i = 0; i < state.items.length; i++) {
    const productItem = state.items[i]

    const liEl = document.createElement('li')

    const divEl = document.createElement('div')
    divEl.classList.add('store--item-icon')

    const imgEl = document.createElement('img')
    const imgSource = `assets/icons/${productItem.id}.svg`
    imgEl.src = imgSource

    const buttonEl = document.createElement('button')
    buttonEl.addEventListener('click', () => {
      let productItemIsInCart = state.cart.find(({id}) => id === productItem.id)
      
      if (productItemIsInCart !== undefined){
        productItemIsInCart.quantity++
      } else {
        const itemToAddToCart = Object.assign(productItem)
        itemToAddToCart.quantity = 1
        state.cart.push(itemToAddToCart)
      }
        renderCartItems()
    })
    buttonEl.innerText = 'Add to cart'

    divEl.append(imgEl)
    liEl.append(divEl, buttonEl)
    storeItemListEl.append(liEl)

  }
}

function removeZeroQuantityItemsFromCart() {
  for (let i = 0; i < state.cart.length; i++){
    const cartItem = state.cart[i]
    if (cartItem.quantity < 1) {
      state.cart.splice(i, 1)
    }
  }
}


function renderCartItems() {
  const cartItemListEl = document.querySelector('.cart--item-list')
  cartItemListEl.innerHTML = ''
  let cartTotal = 0
  removeZeroQuantityItemsFromCart()

  for (let i = 0; i < state.cart.length; i++) {
    const cartItem = state.cart[i]
    cartTotal += cartItem.price * cartItem.quantity
    const liEl = document.createElement('li')

    const imgEl = document.createElement('img')
    const imgSource = `assets/icons/${cartItem.id}.svg`
    imgEl.src = imgSource

    const pEl = document.createElement('p')
    pEl.innerText = cartItem.name

    const buttonMinusEl = document.createElement('button')
    buttonMinusEl.classList.add('quantity-btn')
    buttonMinusEl.classList.add('center')
    buttonMinusEl.classList.add('remove-btn')
    buttonMinusEl.innerText = '-'
    buttonMinusEl.addEventListener('click', () => {
      cartItem.quantity--
      renderCartItems()
    })

    let spanEl = document.createElement('span')
    spanEl.innerText = cartItem.quantity

    const buttonPlusEl = document.createElement('button')
    buttonPlusEl.classList.add('quantity-btn')
    buttonPlusEl.classList.add('center')
    buttonPlusEl.classList.add('add-btn')
    buttonPlusEl.innerText = '+'
    buttonPlusEl.addEventListener('click', () => {
      cartItem.quantity++
      renderCartItems()
    })

    liEl.append(imgEl, pEl, buttonMinusEl, spanEl, buttonPlusEl)
    cartItemListEl.append(liEl)
  }

  let totalNumber = document.querySelector('.total-number')

  const formatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
  });

  totalNumber.innerText = `${formatter.format(cartTotal)}`
}

function pageInit() {
  renderAvailableProducts()
  renderCartItems()
}

pageInit()
