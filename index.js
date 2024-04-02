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
  cart: []
};

// Create all global variables
const storeItemList = document.querySelector('.store--item-list')
const cartItemList = document.querySelector('.cart--item-list')
const total = document.querySelector('.total-number')
const store = document.querySelector('#store')
const body = document.querySelector('body')
let totalCost = 0

//  Create the store items
function addItemToStore(products) {
  storeItemList.innerHTML = ''

  products.forEach((item, index) => {
    
    const storeItem = document.createElement('li')
    const storeItemDiv = document.createElement('div')
    const storeItemImage = addImage(item)
    const addToCartButton = makeAddToCartButton(products, item, index)

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

function makeAddToCartButton(products, item, index) {
  const addToCartButton = document.createElement('button')
  addToCartButton.innerText = 'Add to cart'
  addToCartButton.addEventListener('click', () => addItemToCart(products, item, index))

  updateCart()

  return addToCartButton
}

function addItemToCart(products, item, index) {
  const containsItem = products.find(productItem => productItem.id === products[index].id)
  
  if (!state.cart.includes(containsItem)) {
    state.cart.push(item)
    state.cart[state.cart.length -1].quantity = 1
    
  } else {
    const containsItemInCart = state.cart.find(productItem => productItem.id === products[index].id)
    containsItemInCart.quantity += 1
  }
  
  updateCart()
}

// Create cart items
function updateCart() {
  cartItemList.innerHTML = ''
  
  totalCost = 0
  state.cart.forEach((product) => {
    const newItemInCart = createNewCartItem(product)
    const totalProductCost = calculateTotal(product)
  })
  total.innerText = '£' + Math.round((totalCost) * 100) / 100
}

function calculateTotal(product) {
  totalCost += product.quantity * product.price
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

// Filter store items
function makeFilter() {
  const div = document.createElement('div')
  const filterLabel = document.createElement('label')
  const createFilterButton = createStoreFilter()

  filterLabel.innerText = 'Filter'

  div.append(filterLabel)
  div.append(createFilterButton)

  store.prepend(div)
}

function createStoreFilter() {
  const selectFilter = document.createElement('select')
  const defaultFilter = document.createElement('option')
  const filterOnVegetable = document.createElement('option')
  const filterOnFruit = document.createElement('option')
  
  defaultFilter.setAttribute('value', 'default')
  defaultFilter.innerText = ' '
  filterOnVegetable.setAttribute('value', 'vegetable')
  filterOnVegetable.innerText = 'Vegetable'
  filterOnFruit.setAttribute('value', 'fruit')
  filterOnFruit.innerText = 'Fruit'

  selectFilter.append(defaultFilter)
  selectFilter.append(filterOnVegetable)
  selectFilter.append(filterOnFruit)

  selectFilter.addEventListener('change', () => filterStoreItems(selectFilter.value))

  return selectFilter
}

function filterStoreItems(value) {
  if (value === 'vegetable') {
    const vegetables = state.items.filter((item) => item.type === 'vegetable')
    addItemToStore(vegetables)
  } else if (value === 'fruit') {
    const fruits = state.items.filter((item) => item.type === 'fruit')
    addItemToStore(fruits)
  } else {
    addItemToStore(state.items)
  }
}

// Sort store items
function makeSorting() {
  const div = document.createElement('div')
  const sortingLabel = document.createElement('label')
  const createSortingButton = createStoreSorting()

  sortingLabel.innerText = 'Sort'

  div.append(sortingLabel)
  div.append(createSortingButton)

  store.prepend(div)
}

function createStoreSorting() {
  const selectSorting = document.createElement('select')
  const defaultSorting = document.createElement('option')
  const sortAlphabetically = document.createElement('option')
  
  defaultSorting.setAttribute('value', 'default')
  defaultSorting.innerText = ' '
  sortAlphabetically.setAttribute('value', 'alphabetically')
  sortAlphabetically.innerText = 'Alphabetically'

  selectSorting.append(defaultSorting)
  selectSorting.append(sortAlphabetically)

  selectSorting.addEventListener('change', () => sortStoreItems(selectSorting.value))

  return selectSorting
}

function sortStoreItems(value) {
  if (value === 'alphabetically') {
    state.items.sort(function(a, b) {
      return a.name.localeCompare(b.name)
    })
    addItemToStore(state.items)
  }
}

// Create form
function addNewItem() {
  const newItemButton = document.createElement('button')

  newItemButton.innerText = 'Add item'

  store.prepend(newItemButton)

  newItemButton.addEventListener('click', () => createForm())
}

function createForm() {
  const form = document.createElement('form')
  const addItemButton = document.createElement('button')
  const itemIdLabel = document.createElement('label')
  const itemNameLabel = document.createElement('label')
  const itemPriceLabel = document.createElement('label')
  const itemTypeLabel = document.createElement('label')
  const itemIdInput = document.createElement('input')
  const itemNameInput = document.createElement('input')
  const itemPriceInput = document.createElement('input')
  const itemTypeSelect = document.createElement('select')
  const itemTypeVegetable =  document.createElement('option')
  const itemTypeFruit =  document.createElement('option')

  form.classList.add('form')
  addItemButton.innerText = 'Add'
  itemIdLabel.innerText = 'Item ID'
  itemIdLabel.classList.add('label')
  itemNameLabel.innerText = 'Item name'
  itemNameLabel.classList.add('label')
  itemPriceLabel.innerText = 'Item price'
  itemPriceLabel.classList.add('label')
  itemTypeLabel.innerText = 'Item type'
  itemTypeLabel.classList.add('label')
  itemIdInput.setAttribute('type', 'text')
  itemIdInput.required = true
  itemNameInput.setAttribute('type', 'text')
  itemNameInput.required = true
  itemPriceInput.setAttribute('type', 'number')
  itemPriceInput.required = true
  itemTypeSelect.classList.add('form-select')
  itemTypeVegetable.setAttribute('value', 'vegetable')
  itemTypeVegetable.innerText = 'Vegetable'
  itemTypeFruit.setAttribute('value', 'fruit')
  itemTypeFruit.innerText = 'Fruit'

  form.append(itemIdLabel)
  form.append(itemIdInput)
  form.append(itemNameLabel)
  form.append(itemNameInput)
  form.append(itemPriceLabel)
  form.append(itemPriceInput)
  form.append(itemTypeLabel)
  form.append(itemTypeSelect)
  itemTypeSelect.append(itemTypeVegetable)
  itemTypeSelect.append(itemTypeFruit)
  form.append(addItemButton)

  body.append(form)
}


// Call functions
addNewItem()
makeSorting()
makeFilter()
addItemToStore(state.items)

