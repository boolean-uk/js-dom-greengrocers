const STORE_FRONT = document.querySelector('.store--item-list')
let filterSetting = 'all'
let sortSetting = 'Sorted alphabetically'

const STATE = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.15,
      type: "Vegetables",
      inStock: 3
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.10,
      type: "Vegetables",
      inStock: 34
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.30,
      type: "Fruit",
      inStock: 4
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.22,
      type: "Fruit",
      inStock: 17
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.18,
      type: "Vegetables",
      inStock: 6
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.20,
      type: "Fruit",
      inStock: 43
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.23,
      type: "Vegetables",
      inStock: 12
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.10,
      type: "Fruit",
      inStock: 34
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.40,
      type: "Fruit",
      inStock: 28
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 1,
      type: "Vegetables",
      inStock: 19
    }
  ],
  cart: []
}

function setupShop() {
  filterAndRender(filterSetting, sortSetting)
  prepareFilters()
  document.querySelector('#clearCart').addEventListener('click', clearCart)
}

setupShop()

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

    STORE_ITEM_DIV.appendChild(generateStoreItemNamePrice(item.name, item.price))
    STORE_ITEM_DIV.appendChild(generateStoreQuantityIndicator(item.inStock))
    STORE_ITEM_DIV.appendChild(generateStoreImage(item.id, item.name))
    STORE_ITEM_DIV.appendChild(createStoreItemButton(item.id))

    STORE_LIST_ITEM.appendChild(STORE_ITEM_DIV)

    STORE_FRONT.appendChild(STORE_LIST_ITEM)
  })
}

function prepareFilters() {
  document.getElementById('filterForVeggies').addEventListener('click', function () {
    filterSetting = 'Vegetables'
    filterAndRender('Vegetables', sortSetting)
  })
  document.getElementById('filterForFruit').addEventListener('click', function () {
    filterSetting = 'Fruit'
    filterAndRender('Fruit', sortSetting)
  })
  document.getElementById('clearFilter').addEventListener('click', function () {
    filterAndRender('all', sortSetting)
  })
  document.getElementById('sortByPrice').addEventListener('click', function () {
    sortSetting = 'Sorted by price'
    filterAndRender(filterSetting, 'Sorted by price')
  })
  document.getElementById('sortAlphabetically').addEventListener('click', function () {
    sortSetting = 'Sorted alphabetically'
    filterAndRender(filterSetting, 'Sorted alphabetically')
  })
}

function addItemToCart(itemId) {
  const shoppingItem = STATE.items.find(({ id }) => id === itemId)

  if (checkOutOfStock(shoppingItem)) {
    return
  }

  if (STATE.cart.find(({ id }) => id === itemId)) {
    shoppingItem.amount++
    shoppingItem.inStock--
    filterAndRender(filterSetting, sortSetting)
  } else {
    shoppingItem.amount = 1
    shoppingItem.inStock--
    STATE.cart = [...STATE.cart, shoppingItem]
    filterAndRender(filterSetting, sortSetting)
  }
  renderCartView()
}

function checkOutOfStock(shoppingItem) {
  if (shoppingItem.inStock <= 0) {
    let stockWarning = document.querySelector('#outOfStock_' + shoppingItem.id)
    stockWarning.innerText = 'No more items left in stock'
    return true
  }

  return false
}

function renderCartView() {
  const CART_LIST = document.querySelector('.cart--item-list')
  CART_LIST.innerHTML = ''

  let totalCartValue = 0

  STATE.cart.forEach(item => {
    const CART_ITEM = document.createElement('li')

    const ITEM_TOTAL_PRICE = Number(item.amount) * Number(item.price)
    totalCartValue += ITEM_TOTAL_PRICE

    CART_ITEM.appendChild(createImageElement(item.id))
    CART_ITEM.appendChild(createNameElement(item.name, item.id, item.price, item.amount, ITEM_TOTAL_PRICE))
    CART_ITEM.appendChild(createDecreaseButton(item.id))
    CART_ITEM.appendChild(createCartQuantityField(item.id, item.amount))
    CART_ITEM.appendChild(createIncreaseButton(item.id))

    CART_LIST.appendChild(CART_ITEM)

  })

  updateTotalNumber(totalCartValue)
}

function clearCart() {
  STATE.cart.forEach(cartItem => {
    const foundStoreItem = STATE.items.find(({ id }) => id === cartItem.id)
    foundStoreItem.inStock += cartItem.amount
  })
  STATE.cart = []
  renderCartView()
  filterAndRender(filterSetting, sortSetting)
}

function decreaseAmountInCart(id) {
  const PURE_ID = id.split('_')
  const foundCartItem = STATE.cart.find(({ id }) => id === PURE_ID[1])
  const foundStoreItem = STATE.items.find(({ id }) => id === PURE_ID[1])

  if (foundCartItem.amount > 0) {
    foundCartItem.amount--
    foundStoreItem.inStock++
    filterAndRender(filterSetting, sortSetting)
  }
  if (foundCartItem.amount <= 0) {
    STATE.cart = STATE.cart.filter(item => item.id != PURE_ID[1])
  }

  renderCartView()
}

function increaseAmountInCart(id) {
  const PURE_ID = id.split('_')
  const foundCartItem = STATE.cart.find(({ id }) => id === PURE_ID[1])
  const foundStoreItem = STATE.items.find(({ id }) => id === PURE_ID[1])
  if (checkOutOfStock(foundStoreItem)) {
    return
  }
  foundCartItem.amount++
  foundStoreItem.inStock--
  renderCartView()
  filterAndRender(filterSetting, sortSetting)
}

function updateTotalNumber(totalCartValue) {
  const totalPriceInView = document.querySelector('.total-number')
  totalPriceInView.innerText = "£" + totalCartValue.toFixed(2)
}

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}


/* Generate Store Elements */

function generateStoreItemNamePrice(itemName, itemPrice) {
  const STORE_ITEM_NAME_PRICE = document.createElement('p')
  STORE_ITEM_NAME_PRICE.setAttribute('class', 'itemNamePrice')
  STORE_ITEM_NAME_PRICE.innerText = capitalizeFirstLetter(itemName) + ' £' + itemPrice.toFixed(2)

  return STORE_ITEM_NAME_PRICE
}

function generateStoreQuantityIndicator(itemsInStock) {
  const STORE_ITEM_REMAINING = document.createElement('p')
  STORE_ITEM_REMAINING.setAttribute('class', 'inStock')
  STORE_ITEM_REMAINING.innerText = '(' + itemsInStock + ' left in stock)'
  return STORE_ITEM_REMAINING
}

function generateStoreImage(itemId, itemName) {
  const STORE_ITEM_IMAGE = document.createElement('img')
  STORE_ITEM_IMAGE.setAttribute('src', 'assets/icons/' + itemId + '.svg')
  STORE_ITEM_IMAGE.setAttribute('alt', itemName)

  return STORE_ITEM_IMAGE
}

function createStoreItemButton(itemId) {
  const STORE_ITEM_BUTTON = document.createElement('button')
  STORE_ITEM_BUTTON.setAttribute('id', itemId)
  STORE_ITEM_BUTTON.innerText = 'Add to cart'
  STORE_ITEM_BUTTON.addEventListener('click', function () {
    addItemToCart(this.id)
  })

  return STORE_ITEM_BUTTON
}

/* Generate Cart Elements */

function createImageElement(itemId) {
  const ITEM_IMG = document.createElement('img')
  ITEM_IMG.setAttribute('class', 'cart--item-icon')
  ITEM_IMG.setAttribute('src', 'assets/icons/' + itemId + '.svg')

  return ITEM_IMG
}

function createNameElement(itemName, itemId, itemPrice, itemAmount, itemTotalPrice) {
  const CART_ITEM_NAME = document.createElement('p')
  CART_ITEM_NAME.innerText = capitalizeFirstLetter(itemName)

  const OUT_OF_STOCK = document.createElement('span')
  OUT_OF_STOCK.setAttribute('class', 'outOfStock')
  OUT_OF_STOCK.setAttribute('id', 'outOfStock_' + itemId)
  CART_ITEM_NAME.appendChild(OUT_OF_STOCK)

  const TOTALS = document.createElement('p')
  TOTALS.setAttribute('class', 'totalsPriceEachItemInCart')
  TOTALS.innerText = ' (£' + itemPrice.toFixed(2) + ' each - £' + itemTotalPrice.toFixed(2) + ' for ' + itemAmount + ')'
  CART_ITEM_NAME.appendChild(TOTALS)

  return CART_ITEM_NAME
}

function createDecreaseButton(itemId) {
  const CART_DECREASE_BUTTON = document.createElement('button')
  CART_DECREASE_BUTTON.innerText = '-'
  CART_DECREASE_BUTTON.setAttribute('id', 'decrease_' + itemId)
  CART_DECREASE_BUTTON.setAttribute('class', 'quantity-btn remove-btn center')
  CART_DECREASE_BUTTON.addEventListener('click', function (event) {
    decreaseAmountInCart(this.id)
  })
  return CART_DECREASE_BUTTON
}

function createCartQuantityField(itemId, itemAmount) {
  const CART_QUANTITY_FIELD = document.createElement('span')
  CART_QUANTITY_FIELD.setAttribute('class', 'quantity-text center')
  CART_QUANTITY_FIELD.setAttribute('id', 'amount_' + itemId)
  CART_QUANTITY_FIELD.innerText = itemAmount

  return CART_QUANTITY_FIELD
}

function createIncreaseButton(itemId) {
  const CART_INCREASE_BUTTON = document.createElement('button')
  CART_INCREASE_BUTTON.innerText = '+'
  CART_INCREASE_BUTTON.setAttribute('id', 'increase_' + itemId)
  CART_INCREASE_BUTTON.setAttribute('class', 'quantity-btn add-btn center')
  CART_INCREASE_BUTTON.addEventListener('click', function (event) {
    increaseAmountInCart(this.id)
  })

  return CART_INCREASE_BUTTON
}
