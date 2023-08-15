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
  cart: [],
  total: 0.00
};

function drawStoreItem(item) {
  // get to unordered list of store items
  const container = document.querySelector('.store--item-list')
  const listItem = document.createElement('li')
  const itemDiv = document.createElement('div')
  itemDiv.classList.add('store--item-icon')
  // create image element
  const itemName = item.name
  const itemImg = document.createElement('img')
  itemImg.src = `./assets/icons/${item.id}.svg`
  itemImg.alt = itemName
  itemDiv.append(itemImg)
  // create button
  const button = document.createElement('button')
  button.innerHTML = 'Add to cart'
  button.onclick = () => addToCart(item)
  itemDiv.append(button)
  listItem.append(itemDiv)
  container.append(listItem)
}

function drawStoreItems(items) {
  items.forEach(item => drawStoreItem(item))
}

function addToCart(item) {
  const itemId = item.id
  if (state.cart.length === 0) {
    state.cart.push([])  // list of item ids
    state.cart.push([])  // list of quantities of items
  }
  const itemIndex = state.cart[0].indexOf(itemId)
  if (itemIndex === -1) {
    // add item to the cart
    state.cart[0].push(itemId)
    state.cart[1].push(1)
    drawCardItem(item, 1)
    updateTotal(itemId, 1)
  } else {
    // increment item's quantity in the cart
    incrementCardItem(itemId)
  }
}

function drawCardItem(item, quantity) {
  const itemId = item.id
  const container = document.querySelector('.cart--item-list')
  // console.log(container)
  const listItem = document.createElement('li')
  // create image element
  const itemName = item.name
  const itemImg = document.createElement('img')
  itemImg.classList.add('cart--item-icon')
  itemImg.src = `./assets/icons/${itemId}.svg`
  itemImg.alt = itemName
  listItem.append(itemImg)
  // create paragraph element
  const paragraph = document.createElement('p')
  paragraph.innerHTML = itemName
  listItem.append(paragraph)
  // create remove button element
  let button = document.createElement('button')
  button.innerHTML = '-'
  button.classList.add('quantity-btn', 'remove-btn', 'center')
  listItem.append(button)
  // TODO: button.onclick = () => decrementCardItem(...)
  // create span element
  const span = document.createElement('span')
  span.id = `${itemId}-quantity`
  span.classList.add('quantity-text', 'center')
  span.innerHTML = quantity
  listItem.append(span)
  // create add button element
  button = document.createElement('button')
  button.innerHTML = '+'
  button.classList.add('quantity-btn', 'add-btn', 'center')
  button.onclick = () => incrementCardItem(itemId)
  listItem.append(button)
  container.append(listItem)
}

function incrementCardItem(itemId) {
  const quantity = document.getElementById(`${itemId}-quantity`)
  const itemIndex = state.cart[0].indexOf(itemId)
  quantity.innerHTML = ++(state.cart[1][itemIndex])
  updateTotal(itemId, 1)
}

function decrementCardItem(item) {
  // TODO: decrement quantity of item
  // TODO: if new quantity is 0, then remove item from cart
  
}

function updateTotal(itemId, quantity) {
  // NOTE: keep track of the current total in the cart
  // retrieve price of item with itemId
  const item = state.items.find(item => item.id === itemId)
  state.total += quantity * item.price
  const totalElem = document.querySelector('.total-number')
  totalElem.innerHTML = `£${state.total.toFixed(2)}`
}

// display the selection of items in the store
drawStoreItems(state.items)