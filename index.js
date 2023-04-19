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

function createStoreListItem(item) {
  const ul = document.querySelector('.store--item-list')
  const li = document.createElement('li')
  const div = document.createElement('div')
  const img = document.createElement('img')
  const button = document.createElement('button')

  div.setAttribute('class', 'store--item-icon')
  img.setAttribute('src', `assets/icons/${item.id}.svg`)
  img.setAttribute('alt', `${item.name}`)
  button.innerText = 'Add to Cart'
  button.addEventListener('click', () => {
    item.quantity++
    if(state.cart.includes(item)) {
      render()
      return
    } 
    state.cart.push(item)
    render()
  })

  div.append(img)
  li.append(div, button)
  ul.append(li)
}

function createCartListItem(item) {
  const ul = document.querySelector('.cart--item-list')
  const li = document.createElement('li')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const removeButton = document.createElement('button')
  const span = document.createElement('span')
  const addButton = document.createElement('button')
  
  img.setAttribute('class', 'cart--item-icon')
  img.setAttribute('src', `assets/icons/${item.id}.svg`)
  img.setAttribute('alt', `${item.name}`)

  p.innerText = item.name

  removeButton.setAttribute('class', 'quantity-btn remove-btn center')
  removeButton.innerText = '-'
  removeButton.addEventListener('click', () => {
    item.quantity--
    render()
    })
  span.setAttribute('class', 'quantity-text center')
  span.innerText = item.quantity
  
  addButton.setAttribute('class', 'quantity-btn add-btn center')
  addButton.innerText = '+'
  addButton.addEventListener('click', () => {
    item.quantity++
    render()
    })
  li.append(img, p, removeButton, span, addButton)
  ul.append(li)
}

function createFilterButtons() {
  
}
function render() {
  const storeList = document.querySelector('.store--item-list')
  const cartList = document.querySelector('.cart--item-list')
  const total = document.querySelector('.total-section > div > .total-number')

  total.innerText = '0.00'
  storeList.innerHTML = ''
  cartList.innerHTML = ''
  state.items.forEach(item => {
    createStoreListItem(item)
  });
  state.cart.forEach(item => {
    console.log('quantity of', item.name, '=', item.quantity)
    total.innerText = (parseFloat(total.innerText) + (item.price * item.quantity)).toFixed(2)
    if(item.quantity <= 0) {
      return
    }
    createCartListItem(item)
  })
  
}

function sortAtoZ() {
  state.items.sort()
}
function init() {
  state.items.forEach(item => item.quantity = 0)
  render()
}

init()
