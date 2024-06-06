const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: 'veg',
      hidden: false,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: 'veg',
      hidden: false,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: 'fruit',
      hidden: false,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: 'fruit',
      hidden: false,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: 'fruit',
      hidden: false,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: 'fruit',
      hidden: false,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: 'veg',
      hidden: false,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: 'fruit',
      hidden: false,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: 'fruit',
      hidden: false,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: 'veg',
      hidden: false,
    }
  ],
  alphabetical: false,
  itemsCopied: [],
  cart: []
};

renderInv()

function renderInv() {
  let invList = document.querySelector('.store--item-list')
  invList.innerHTML = ""

  for (let i = 0; i < state.items.length; i++) {

    if (state.items[i].hidden === false) {
    let item = state.items[i]
    let itemID = item.id

    let invItem = document.createElement('li')
    let invIconDiv = document.createElement('div')
    invIconDiv.classList.add('store--item-icon')
    let invIconImg = document.createElement('img')
    invIconImg.setAttribute('src', `assets/icons/${itemID}.svg`)
    invIconDiv.appendChild(invIconImg)
    invItem.appendChild(invIconDiv)

    let invItemButton = document.createElement('button')
    invItemButton.textContent = 'Add to cart'
    invItem.appendChild(invItemButton)

    invItemButton.addEventListener('click', () => {
      const foundIndex = state.cart.findIndex(obj => obj['id'] === itemID)
      if (foundIndex < 0) {
        let newCartItem = item
        newCartItem.quantity = 1
        state.cart.push(newCartItem)
      } else {
        state.cart[foundIndex].quantity += 1
      }
      console.log(state.cart)
      renderCart() 
          })
    invList.appendChild(invItem)
        }
  }
}

function renderCart() {
  const cartState = state.cart
  const cartSection = document.querySelector('.cart--item-list')
  cartSection.innerHTML = ""
    
  for (let i = 0; i < cartState.length; i++) {
    const cartItem = document.createElement('li')

    const cartItemImg = document.createElement('img')
    cartItemImg.classList.add('cart--item-icon')
    cartItemImg.setAttribute('src', `assets/icons/${cartState[i].id}.svg`)
    cartItemImg.setAttribute('alt', cartState[i].name)
    cartItem.appendChild(cartItemImg)

    const cartItemText = document.createElement('p')
    cartItemText.textContent = cartState[i].name
    cartItem.appendChild(cartItemText)

    const cartItemMinus = document.createElement('button')
    cartItemMinus.classList.add('quantity-btn', 'remove-btn', 'center')
    cartItem.appendChild(cartItemMinus)
    cartItemMinus.addEventListener('click', () => {decrementCart(state.cart[i])})

    const cartItemQuant = document.createElement('span')
    cartItemQuant.classList.add('quantity-text', 'center')
    cartItemQuant.textContent = cartState[i].quantity
    cartItem.appendChild(cartItemQuant)

    const cartItemPlus = document.createElement('button')
    cartItemPlus.classList.add('quantity-btn', 'add-btn', 'center')
    cartItem.appendChild(cartItemPlus)
    cartItemPlus.addEventListener('click', () => {incrementCart(state.cart[i])}
  )

    cartSection.appendChild(cartItem)
  }
  calculateTotal()
}

function calculateTotal() {
  let totalCount = 0
      for (let i = 0; i < state.cart.length; i++) {
        let total = state.cart[i].price * state.cart[i].quantity
        let fixedTotal =  Math.round(total * 100) / 100
        totalCount += fixedTotal
      }
      totalCount = totalCount.toFixed(2)
      document.querySelector('.total-number').textContent = `£${totalCount}`
}

function incrementCart(cartObject) {
  cartObject.quantity += 1
  renderCart()
}

function decrementCart(cartObject) {
  cartObject.quantity -= 1
  for (let i = state.cart.length - 1; i >= 0; i--) {
    if (state.cart[i].quantity === 0) {
      state.cart.splice(i, 1)
    }
  }
  renderCart()
}

// extensions here

const extButtonsSection = document.createElement('div')
extButtonsSection.classList.add('extension-buttons')

const alphButton = document.createElement('button')
alphButton.textContent = 'Sort / Unsort Alphabetical'
extButtonsSection.appendChild(alphButton)
const filterFruit = document.createElement('button')
filterFruit.textContent = 'Hide / Show Fruit '
extButtonsSection.appendChild(filterFruit)
const filterVeg = document.createElement('button')
filterVeg.textContent = 'Hide / Show Veg'
extButtonsSection.appendChild(filterVeg)

document.querySelector('#store').appendChild(extButtonsSection)

alphButton.addEventListener('click', () => {
  if (state.alphabetical === false) {
  state.itemsCopied = Array.from(state.items)
  state.items = state.items.sort((a, b) => a.name.localeCompare(b.name))
  renderInv()
  state.alphabetical = true
} else {
  state.items = Array.from(state.itemsCopied)
  state.alphabetical = false
  renderInv()
}
})

filterFruit.addEventListener('click', () => {
  for (let i = 0; i < state.items.length; i++) {
    state.items[i].hidden === false
    if (state.items[i].type === 'fruit') {
      (state.items[i].hidden === false) ? state.items[i].hidden = true : state.items[i].hidden = false
    }
    renderInv()
  }
})

filterVeg.addEventListener('click', () => {
  for (let i = 0; i < state.items.length; i++) {
    state.items[i].hidden === false
    if (state.items[i].type === 'veg') {
      (state.items[i].hidden === false) ? state.items[i].hidden = true : state.items[i].hidden = false
    }
    renderInv()
  }
})