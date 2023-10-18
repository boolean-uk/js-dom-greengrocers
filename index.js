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
const total = document.querySelector('.total-number')

// FULL PAGE RENDER FUNCTION
function render() {
  renderStore()
  renderFilter()
  renderSort()
}

// CALCULATE RUNNING TOTAL
function runningTotal() {
  const cartValues = state.cart.map((cartItems) => {
    let sum = 0
    const value = cartItems.price
    const number = cartItems.quantity
    return sum = value * number
  })
  const newTotal = cartValues.reduce((acc, curr) => acc + curr, 0)
  total.innerText = `£${newTotal.toFixed(2)}`
}

// STATE UPDATE TO CREATE FILTERS
state.items.forEach((item) => 
  {if (item.name === 'beetroot' || item.name === 'carrot') {
    item.filter = 'vegetable'
  } else {
    item.filter = 'fruit'
  }
}) 

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

// ADD ITEM TO CART BUTTON FUNCTION
function addItemToCart(item) {
  const isItemInCart = state.cart.find((newItem) => newItem.name === item.name)

  if (isItemInCart) {
    isItemInCart.quantity += 1
  } else {
    state.cart.push({id: item.id, name: item.name, price: item.price, quantity: 1})
  }
  runningTotal()
  renderCart()
}

// RENDER STORE FUNCTION
function createStore(item) {
  const storeItemVeg = document.createElement('li')
  storeItemVeg.append(renderStoreItemDiv(item))  

  const storeItemButton = document.createElement('button')
  storeItemButton.innerText = "Add to cart"
  storeItemVeg.append(storeItemButton)

  storeList.append(storeItemVeg)

  storeItemButton.addEventListener('click', () => addItemToCart(item))
} 

// INITIAL STORE RENDER
function renderStore() {
  state.items.forEach((item) => {
    createStore(item)
  })
}

// CLEAR STORE
function clearStore() {
  storeList.innerHTML = ''
}

// FILTERS
// CREATE FILTER LIST AND APPEND TO HEADER
function renderFilter() {
  const filterDiv = document.querySelector('.filters')
  const filterHeader = document.createElement('h2')
  filterHeader.innerText = 'Filters'
  const filterList = document.createElement('ul')
  filterDiv.append(filterHeader, filterList)
  filterList.append(showAllRender(), vegetableRender(), fruitRender())
}

// SHOW ALL/NO FILTER
function showAllRender() {
  const showAll = document.createElement('li')
  const showAllButton = document.createElement('button')
  showAllButton.innerText = 'Show All'
  
  showAllButton.addEventListener('click', () => {
    clearStore()
    renderStore()
  })
  showAll.append(showAllButton)
  return showAll
}

// VEG FILTER
function vegetableRender() {
  const vegetable = document.createElement('li')
  const vegetableButton = document.createElement('button')
  
  vegetableButton.innerText = 'Vegetables'
  vegetableButton.addEventListener('click', () => {
    clearStore()
    state.items.forEach((item) => {
      if (item.filter === 'vegetable') {
        createStore(item)
      }
    }) 
  })
  vegetable.append(vegetableButton)
  return vegetable
}

// FRUIT FILTER
function fruitRender() {
  const fruit = document.createElement('li')
  const fruitButton = document.createElement('button')
  
  fruitButton.innerText ='Fruit'
  
  fruitButton.addEventListener('click', () => {
    clearStore()
    state.items.forEach((item) => {
      if (item.filter === 'fruit') {
        createStore(item)
      }
    })
  })
  fruit.append(fruitButton)
  return fruit
}

// SORTING
// CREATE SORTING LIST AND APPEND TO HEADER
function renderSort() {
  const sort = document.querySelector('.sort')
  const sortHeader = document.createElement('h2')
  sortHeader.innerText = 'Sort'
  const sortList = document.createElement('ul')
  sort.append(sortHeader, sortList)
  sortList.append(defaultSort(), sortAlphabetically(), sortReverseAlphabetically())
}

// NO SORTING
function defaultSort() {
  const noSort = document.createElement('li')
  const noSortButton = document.createElement('button')
  noSortButton.innerText = 'Default'

  noSortButton.addEventListener('click', () => {
    clearStore()
    renderStore()
  })

  noSort.append(noSortButton)
  return noSort
}

// SORT A-Z
function sortAlphabetically() {
  const sortAToZ = document.createElement('li')
  const sortAToZButton = document.createElement('button')
  sortAToZButton.innerText = 'A-Z'

  sortAToZButton.addEventListener('click', () => {
    clearStore()
    const sortedAToZ = state.items.toSorted((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
      return 0
  }) 
  sortedAToZ.forEach((item) => {
    createStore(item)
  })
  })
  sortAToZ.append(sortAToZButton)
  return sortAToZ
}

// SORT Z-A
function sortReverseAlphabetically() {
  const sortZToA = document.createElement('li')
  const sortZToAButton = document.createElement('button')
  sortZToAButton.innerText = 'Z-A'

  sortZToAButton.addEventListener('click', () => {
    clearStore()
    const sortedZToA = state.items.toSorted((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      if (nameB < nameA) {
        return -1
      }
      if (nameB > nameA) {
        return 1
      }
        return 0
    }) 
    sortedZToA.forEach((item) => {
      createStore(item)
    })
  })
  sortZToA.append(sortZToAButton)
  return sortZToA
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

function renderDecreaseButton(item) {
  const cartItemDecreaseButton = document.createElement('button')
  cartItemDecreaseButton.classList.add('quantity-btn', 'remove-btn', 'center')
  cartItemDecreaseButton.innerText = '-'

  cartItemDecreaseButton.addEventListener('click', () => decreaseCartItem(item))
  return cartItemDecreaseButton
}

function renderCounter(item) {
  const cartItemspan = document.createElement('span')
  cartItemspan.classList.add('quantity-text', 'center')
  cartItemspan.innerText = item.quantity
  return cartItemspan
}

function renderIncreaseButton(item) {
  const cartItemIncreaseButton = document.createElement('button')
  cartItemIncreaseButton.classList.add('quantity-btn', 'add-btn', 'center')
  cartItemIncreaseButton.innerText = '+'

  cartItemIncreaseButton.addEventListener('click', () => increaseCartItem(item))
  return cartItemIncreaseButton
}

// INCREASE/DECREASE BUTTON FUNCTIONS
function decreaseCartItem(item) {
  if (item.quantity > 1) {
    item.quantity -= 1
  }
  else {
    const itemToRemove = state.cart.indexOf(item)
      state.cart.splice(itemToRemove, 1)
  }
  runningTotal()
  renderCart()
}

function increaseCartItem(item) {
  item.quantity += 1
  runningTotal()
  renderCart()
}

// CART RENDER FUNCTION
function renderCart() {
  cartList.innerHTML = ''

  state.cart.forEach((item) => {
      const cartItem = document.createElement('li')
    
      cartItem.append(renderCartItemImage(item))
      cartItem.append(renderCartItemName(item))
      cartItem.append(renderDecreaseButton(item))
      cartItem.append(renderCounter(item))
      cartItem.append(renderIncreaseButton(item))
  
      cartList.append(cartItem)
  })
}

// CALL PAGE RENDER FUNCTION AT THE END
render()