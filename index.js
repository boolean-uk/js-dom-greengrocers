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
  total: 0
};

const storeItems = document.querySelector('.store--item-list')
const cartItems = document.querySelector('.cart--item-list')
const button = document.querySelector('.filter-button')
button.addEventListener('click', filterCartAlphabetically)
state.items.forEach(item => {storeItems.append(renderStoreItem(item))})

function renderStoreItem(item) {
  const storeItem = document.createElement('li')
  storeItem.style.listStyle = 'none'

  let storeItemContainer = document.createElement('div')
  storeItemContainer.setAttribute('class', "store--item-icon")

  let storeItemImage = document.createElement('img')
  storeItemImage.setAttribute('src', 'assets/icons/' + item.id + '.svg')

  let storeButton = document.createElement('button')
  storeButton.innerText = 'Add to cart'
  storeButton.addEventListener('click', function() {
    addToCart(item)
  })

  storeItemContainer.append(storeItemImage)
  storeItem.append(storeItemContainer)
  storeItem.append(storeButton)
  return storeItem
}

function addToCart(item) {
  state.cart.push(item)
  let number = state.cart.filter(i => i.id === item.id).length
  DOMitem = renderCartItem(item, number)
  if(number === 1) {
    cartItems.append(DOMitem)
  } else {
    updateCartItem(DOMitem, number)
  }
  updateTotal()
}

function removeFromCart(item){
  let itemIndex = state.cart.findIndex(i => i.id === item.id)
  state.cart.splice(itemIndex, 1)
  let number = state.cart.filter(i => i.id === item.id).length
  if(number === 0){
    unrenderCartItem(item)
  }
  else {
    updateCartItem(item, number)
  }
  updateTotal()
}

function updateCartItem(item, number) {
  let itemId = document.getElementById(item.id)
  if(itemId) {
    itemId.querySelector('.quantity-text').innerText = number
  }
}

function unrenderCartItem(item) {
  let itemId = document.getElementById(item.id)
  itemId.remove()
}

function updateTotal() {
  let totalElement = document.querySelector('.total-number')
  let total = state.total
  for (let a = 0; a < state.cart.length; a++) {
    total += Number(state.cart[a].price)
  }
  totalElement.innerText = total
}
 
function renderCartItem(item, number){
  const cartItem = document.createElement('li')
  cartItem.setAttribute('id', item.id)
  cartItem.style.listStyle = 'none'

  let cartItemImg = document.createElement('img')
  cartItemImg.setAttribute('src', 'assets/icons/' + item.id +'.svg')

  let cartItemName = document.createElement('p')
  cartItemName.innerText = item.name

  let minusButton = document.createElement('button')
  minusButton.addEventListener('click', function() {
    removeFromCart(item)
  })
  let itemValue = document.createElement('span')
  let plusButton = document.createElement('button')
  plusButton.addEventListener('click', function() {
    addToCart(item)
  })

  minusButton.setAttribute('class', 'remove-btn')
  minusButton.innerText = '-'
  itemValue.setAttribute('class','quantity-text')
  itemValue.innerText = number
  plusButton.setAttribute('class', 'add-btn')
  plusButton.innerText = '+'

  cartItem.append(cartItemImg)
  cartItem.append(cartItemName)
  cartItem.append(minusButton)
  cartItem.append(itemValue)
  cartItem.append(plusButton)
  return cartItem
}

function filterCartAlphabetically() {
  state.cart.forEach(item => {unrenderCartItem(item)})
  state.cart.sort(function(a, b)  {
    let x = a.name.toLowerCase()
    let y = b.name.toLowerCase()
    if (x < y) {return -1}
    if (x > y) {return 1}
    return 0;
  })
  state.cart.forEach(item => {
    let number = state.cart.filter(x => x.id === item.id).length
    cartItem = renderCartItem(item, number)
    cartItems.append(cartItem)
  });
}