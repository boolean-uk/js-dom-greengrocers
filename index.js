const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "vegetable"
    }
  ],
  cart: [],
  showFruits: true,
  showVegetables: true
};

const bodyEl = document.querySelector('body')

function renderAvailableProducts() {
  const storeItemListEl = document.querySelector('.store--item-list')
  storeItemListEl.innerHTML = ''

  for (let i = 0; i < state.items.length; i++) {
    const productItem = state.items[i]
    console.log(productItem.type === 'fruit' && !state.showFruits)
    if (productItem.type === 'fruit' && !state.showFruits) continue
    if (productItem.type === 'vegetable' && !state.showVegetables) continue

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
      renderAvailableProducts()
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

function toggleFruitFilter() {
  state.showFruits = !state.showFruits
  renderFilters()
  renderAvailableProducts()
}

function toggleVegetableFilter() {
  state.showVegetables = !state.showVegetables
  renderFilters()
  renderAvailableProducts()
}

function renderFilters() {
  const prevFilter = document.querySelector('.filter-container')
  if (prevFilter !== null) prevFilter.remove()

  const filterDivEl = document.createElement('div')
  filterDivEl.classList.add('filter-container')

  const fruitFilterButtonEl = document.createElement('button')
  fruitFilterButtonEl.classList.add('filter-button')
  fruitFilterButtonEl.innerText = 'hide fruits'
  fruitFilterButtonEl.addEventListener('click', toggleFruitFilter)
  if (!state.showFruits) fruitFilterButtonEl.style.color = 'grey'
  if (!state.showFruits) fruitFilterButtonEl.innerText = 'show fruits'

  const vegetableFilterButtonEl = document.createElement('button')
  vegetableFilterButtonEl.classList.add('filter-button')
  vegetableFilterButtonEl.innerText = 'hide vegetables'
  vegetableFilterButtonEl.addEventListener('click', toggleVegetableFilter)
  if (!state.showVegetables) vegetableFilterButtonEl.style.color = 'grey'
  if (!state.showVegetables) vegetableFilterButtonEl.innerText = 'show vegetables'

  filterDivEl.append(fruitFilterButtonEl, vegetableFilterButtonEl)
  bodyEl.append(filterDivEl)
}

function pageInit() {
  renderAvailableProducts()
  renderCartItems()
  renderFilters()
}

pageInit()
