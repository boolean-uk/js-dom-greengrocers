const STORE_FRONT = document.querySelector('.store--item-list')

const STATE = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.15,
      type: "Vegetables"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.10,
      type: "Vegetables"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.30,
      type: "Fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.22,
      type: "Fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.18,
      type: "Vegetables"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.20,
      type: "Fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.23,
      type: "Vegetables"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.10,
      type: "Fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.40,
      type: "Fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 1,
      type: "Vegetables"
    }
  ],
  cart: []
}

function setupShop() {
  filterAndRender('all', 'Sorted alphabetically')
  prepareFilters()
  document.querySelector('#clearCart').addEventListener('click', clearCart)
}

function filterAndRender(filter, sorting) {
  let shopItems = STATE.items

  if (filter === 'Vegetables' || filter === 'Fruit') {
    shopItems = shopItems.filter(item => item.type === filter)
    document.querySelector('#filterStatus').innerText = filter
  } else {
    document.querySelector('#filterStatus').innerText = "Shows both fruit and vegetables"
  }

  if (sorting === 'Sorted by price') {
    shopItems = shopItems.sort((a, b) => { return a.price - b.price })
    document.querySelector('#sortStatus').innerText = sorting
  }

  if (sorting === 'Sorted alphabetically') {
    shopItems = shopItems.sort((a, b) => { return a.name.localeCompare(b.name) })
    document.querySelector('#sortStatus').innerText = sorting
  }

  renderStorefront(shopItems)
}

function renderStorefront(shopItems) {
  STORE_FRONT.innerHTML = ''

  shopItems.forEach(item => {
    const STORE_LIST_ITEM = document.createElement('li')
    
    const STORE_ITEM_DIV = document.createElement('div')
    STORE_ITEM_DIV.setAttribute('class', 'store--item-icon')

    const STORE_ITEM_NAME_PRICE = document.createElement('span')
    STORE_ITEM_NAME_PRICE.setAttribute('class', 'itemNamePrice')
    const STORE_ITEM_NAME_PRICE_TEXT_NODE = document.createTextNode(`${capitalizeFirstLetter(item.name)} £${item.price.toFixed(2)}`)
    STORE_ITEM_NAME_PRICE.appendChild(STORE_ITEM_NAME_PRICE_TEXT_NODE)

    const STORE_ITEM_NAME_BR = document.createElement('br')

    const STORE_ITEM_IMAGE = document.createElement('img')
    STORE_ITEM_IMAGE.setAttribute('src', 'assets/icons/' + item.id + '.svg')
    STORE_ITEM_IMAGE.setAttribute('alt', item.name)

    const STORE_ITEM_BUTTON = document.createElement('button')
    STORE_ITEM_BUTTON.setAttribute('id', item.id)
    const STORE_ITEM_BUTTON_TEXT_NODE = document.createTextNode('Add to cart')
    STORE_ITEM_BUTTON.appendChild(STORE_ITEM_BUTTON_TEXT_NODE)

    STORE_ITEM_DIV.appendChild(STORE_ITEM_NAME_PRICE)
    STORE_ITEM_DIV.appendChild(STORE_ITEM_NAME_BR)
    STORE_ITEM_DIV.appendChild(STORE_ITEM_IMAGE)
    STORE_ITEM_DIV.appendChild(STORE_ITEM_BUTTON)

    STORE_LIST_ITEM.appendChild(STORE_ITEM_DIV)

    STORE_FRONT.appendChild(STORE_LIST_ITEM)

    document.getElementById(item.id).addEventListener('click', function () {
      addItemToCart(this.id)
    })
  })
}

function prepareFilters() {
  document.getElementById('filterForVeggies').addEventListener('click', function () {
    filterAndRender('Vegetables', document.querySelector('#sortStatus').innerText)
  })
  document.getElementById('filterForFruit').addEventListener('click', function () {
    filterAndRender('Fruit', document.querySelector('#sortStatus').innerText)
  })
  document.getElementById('clearFilter').addEventListener('click', function () {
    filterAndRender('', document.querySelector('#sortStatus').innerText)
  })
  document.getElementById('sortByPrice').addEventListener('click', function () {
    filterAndRender(document.querySelector('#filterStatus').innerText, 'Sorted by price')
  })
  document.getElementById('sortAlphabetically').addEventListener('click', function () {
    filterAndRender(document.querySelector('#filterStatus').innerText, 'Sorted alphabetically')
  })
}

function addItemToCart(itemId) {
  const shoppingItem = STATE.items.find(({ id }) => id === itemId)
  if(STATE.cart.find(({ id }) => id === itemId)) {
    shoppingItem.amount++
  } else {
    shoppingItem.amount = 1
    STATE.cart = [...STATE.cart, shoppingItem]
  }
  renderCartView()
}

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function renderCartView() {
  const CART_LIST = document.querySelector('.cart--item-list')
  CART_LIST.innerHTML = ''

  let totalCartValue = 0

  STATE.cart.forEach(item => {
    const CART_ITEM = document.createElement('li')

    const ITEM_IMG = document.createElement('img')
    ITEM_IMG.setAttribute('class', 'cart--item-icon')
    ITEM_IMG.setAttribute('src', 'assets/icons/' + item.id + '.svg')

    const CART_NAME = document.createElement('p')
    const CART_NAME_TEXT_NODE = document.createTextNode(capitalizeFirstLetter(item.name))
    CART_NAME.appendChild(CART_NAME_TEXT_NODE)

    const CART_DECREASE_BUTTON = document.createElement('button')
    const CART_DECREASE_BUTTON_TEXT_NODE = document.createTextNode('-')
    CART_DECREASE_BUTTON.appendChild(CART_DECREASE_BUTTON_TEXT_NODE)
    CART_DECREASE_BUTTON.setAttribute('id', 'decrease_' + item.id)
    CART_DECREASE_BUTTON.setAttribute('class', 'quantity-btn remove-btn center')

    const CART_INPUT_FIELD = document.createElement('input')
    CART_INPUT_FIELD.setAttribute('type', 'number')
    CART_INPUT_FIELD.setAttribute('class', 'cart-amount center')
    CART_INPUT_FIELD.setAttribute('id', 'amount_' + item.id)
    CART_INPUT_FIELD.setAttribute('value', item.amount)
  
    const CART_INCREASE_BUTTON = document.createElement('button')
    const CART_INCREASE_BUTTON_TEXT_NODE = document.createTextNode('+')
    CART_INCREASE_BUTTON.appendChild(CART_INCREASE_BUTTON_TEXT_NODE)
    CART_INCREASE_BUTTON.setAttribute('id', 'increase_' + item.id)
    CART_INCREASE_BUTTON.setAttribute('class', 'quantity-btn add-btn center')

    CART_ITEM.appendChild(ITEM_IMG)
    CART_ITEM.appendChild(CART_NAME)
    CART_ITEM.appendChild(CART_DECREASE_BUTTON)
    CART_ITEM.appendChild(CART_INPUT_FIELD)
    CART_ITEM.appendChild(CART_INCREASE_BUTTON)

    CART_LIST.appendChild(CART_ITEM)

    totalCartValue += Number(item.amount) * Number(item.price)

    document.querySelector('#decrease_' + item.id).addEventListener('click', function (event) {
      decreaseAmountInCart(this.id)
    })
    document.querySelector('#increase_' + item.id).addEventListener('click', function (event) {
      increaseAmountInCart(this.id)
    })
    document.querySelector('#amount_' + item.id).addEventListener('change', function (event) {
      changeAmountInCart(this.id, this.value)
    })
  })

  const totalPriceInView = document.querySelector('.total-number')
  totalPriceInView.innerText = "£" + totalCartValue.toFixed(2)
}

function clearCart() {
  STATE.cart = []
  renderCartView()
}

function decreaseAmountInCart(id) {
  const PURE_ID = id.split('_')
  const foundItem = STATE.cart.find(({ id }) => id === PURE_ID[1])

  if (foundItem.amount > 0) {
    foundItem.amount--
  }
  if (foundItem.amount <= 0) {
    STATE.cart = STATE.cart.filter(item => item.id != PURE_ID[1])
  }

  renderCartView()
}

function increaseAmountInCart(id) {
  const PURE_ID = id.split('_')
  const foundItem = STATE.cart.find(({ id }) => id === PURE_ID[1])
  foundItem.amount++
  renderCartView()
}

function changeAmountInCart(id, newAmount) {
  const PURE_ID = id.split('_')
  const foundItem = STATE.cart.find(({ id }) => id === PURE_ID[1])
  foundItem.amount = newAmount
  if (foundItem.amount <= 0) {
    STATE.cart = STATE.cart.filter(item => item.id != PURE_ID[1])
  }
  renderCartView()
}

setupShop()