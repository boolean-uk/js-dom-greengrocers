const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: 'vegetable'
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.32,
      type: 'vegetable'
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.30,
      type: 'fruit'
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.33,
      type: 'fruit'
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.37,
      type: 'fruit'
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.29,
      type: 'fruit'
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.39,
      type: 'vegetable'
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.31,
      type: 'fruit'
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.33,
      type: 'fruit'
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.40,
      type: 'fruit'
    }
  ],
  cart: []
};

let currentFilter = 'none'

function updateTotal() {
  const total = document.querySelector('.total-number')
  let sum = 0
  for (let i = 0; i < state.cart.length; i++) {
    sum += state.items.find(item => item.id == state.cart[i].id).price * state.cart[i].quantity
  }
  total.textContent = `£${sum.toFixed(2)}`
}

function incrementQuantity(item, listItem) {
  const cartItem = state.cart.find(i => i.id == item.id)
  cartItem.quantity += 1
  const span = listItem.querySelector('span')
  span.textContent = cartItem.quantity
  updateTotal()
}

function decrementQuantity(item, listItem) {
  const cartItem = state.cart.find(i => i.id == item.id)
  cartItem.quantity -= 1
  if (cartItem.quantity == 0) {
    state.cart.splice(state.cart.indexOf(cartItem), 1)
    listItem.remove()
  } else {
    const span = listItem.querySelector('span')
    span.textContent = cartItem.quantity
  }
  updateTotal()
}

function createCartItem(item) {
  const cart = document.querySelector('.cart--item-list')
  const cartItem = state.cart.find(x => x.id == item.id)

  if (cartItem == undefined) {
    state.cart.push({
      id: item.id,
      quantity: 1
    })

    const listItem = document.createElement('li')
    listItem.classList.add(item.name.replace(" ", ""))

    const image = document.createElement('img')
    image.classList.add('cart--item-icon')
    image.setAttribute('src', 'assets/icons/' + item.id + '.svg')
    image.setAttribute('alt', item.name)
    listItem.append(image)
  
    const text = document.createElement('p')
    text.textContent = item.name
    listItem.append(text)
  
    const removeButton = document.createElement('button')
    removeButton.classList.add('quantity-btn', 'remove-btn', 'center')
    removeButton.textContent = '-'
    removeButton.addEventListener('click', () => decrementQuantity(item, listItem))
    listItem.append(removeButton)
  
    const span = document.createElement('span')
    span.classList.add('quantity-text', 'center')
    span.textContent = state.cart.find(x => x.id == item.id).quantity
    listItem.append(span)
    
    const addButton = document.createElement('button')
    addButton.classList.add('quantity-btn', 'add-btn', 'center')
    addButton.textContent = '+'
    addButton.addEventListener('click', () => incrementQuantity(item, listItem))
    listItem.append(addButton)
  
    cart.append(listItem)
    updateTotal()
  } else {
    const listItem = cart.querySelector(`.${item.name.replace(" ", "")}`)
    incrementQuantity(cartItem, listItem)
  }
}

function createItem(item) {
  const listItem = document.createElement('li')
  const div = document.createElement('div')
  div.classList.add('store--item-icon')

  const image = document.createElement('img')
  image.setAttribute('src', 'assets/icons/' + item.id + '.svg')
  image.setAttribute('alt', item.name)
  div.append(image)
  listItem.append(div)

  const button = document.createElement('button')
  button.textContent = 'Add to cart'
  button.addEventListener('click', () => createCartItem(item))
  listItem.append(button)

  return listItem
}

function createStoreItems(filter, sorting) {
  const storeItems = document.querySelector('.store--item-list')

  if (storeItems.children.length > 0) {
    storeItems.innerHTML = ""
  }

  if (sorting == 'alpha') {
    sort = sorting
    state.items.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sorting == 'price') {
    sort = sorting
    state.items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
  }

  if (filter == 'none') {
    currentFilter = filter
    state.items.forEach((item) => {
      storeItems.append(createItem(item))
    })
  } else if (filter == 'vegetable') {
    state.items.filter(i => i.type == filter).forEach((item) => {
      currentFilter = filter
      storeItems.append(createItem(item))
    })
  } else if (filter == 'fruit') {
    state.items.filter(i => i.type == filter).forEach((item) => {
      currentFilter = filter
      storeItems.append(createItem(item))
    })
  }
}

function createSortingButtons() {
  const storeSorts = document.querySelector('.store--sort-buttons')

  const alphaSort = document.createElement('li')
  const alphaButton = document.createElement('button')
  alphaButton.textContent = 'Alphabetically'
  alphaButton.addEventListener('click', () => createStoreItems(currentFilter, 'alpha'))
  alphaSort.append(alphaButton)

  const priceSort = document.createElement('li')
  const priceButton = document.createElement('button')
  priceButton.textContent = 'Price'
  priceButton.addEventListener('click', () => createStoreItems(currentFilter, 'price'))
  priceSort.append(priceButton)

  storeSorts.append(alphaSort)
  storeSorts.append(priceSort)
}

function createFilterButtons() {
  const storeFilters = document.querySelector('.store--filter-buttons')

  const vegFilter = document.createElement('li')
  const vegButton = document.createElement('button')
  vegButton.textContent = 'Vegetables'
  vegButton.addEventListener('click', () => createStoreItems('vegetable'))
  vegFilter.append(vegButton)

  const fruitFilter = document.createElement('li')
  const fruitButton = document.createElement('button')
  fruitButton.textContent = 'Fruits'
  fruitButton.addEventListener('click', () => createStoreItems('fruit'))
  fruitFilter.append(fruitButton)

  const noneFilter = document.createElement('li')
  const noneButton = document.createElement('button')
  noneButton.textContent = 'All'
  noneButton.addEventListener('click', () => createStoreItems('none'))
  noneFilter.append(noneButton)

  storeFilters.append(vegFilter)
  storeFilters.append(fruitFilter)
  storeFilters.append(noneFilter)
}

createFilterButtons()
createSortingButtons()
createStoreItems(currentFilter)