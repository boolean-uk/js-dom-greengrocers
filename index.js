const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.12,
      filter: "pink"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.09,
      filter: "orange"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.38,
      filter: "red"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.33,
      filter: "orange"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.65,
      filter: "green"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.40,
      filter: "yellow"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.10,
      filter: "green"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.23,
      filter: "red"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      filter: "blue"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.2,
      filter: "purple"
    }
  ],
  cart: []
};

const storeUl = document.querySelector(".store--item-list");
const cartUl = document.querySelector(".cart--item-list");
const priceSpan = document.querySelector('.total-number')
let totalPrice = 0

function RenderFilters(color) {
  storeUl.innerHTML = ''
  
  if (color === 'All') {

    // Creating the items for the store
    for (let i = 0; i < state.items.length; i++) {
      const itemList = document.createElement('li')
  
      const itemDiv = document.createElement('div')
      itemDiv.setAttribute('class', 'store--item-icon')
  
      const itemImage = document.createElement('img')
      itemImage.setAttribute('src', 'assets/icons/' + state.items[i].id + '.svg')
      itemImage.setAttribute('alt', state.items[i].name)

      const itemButton = document.createElement('button')
      itemButton.innerText = "Add to cart"
      itemButton.addEventListener('click', (event) => AddToCart(state.items[i]))
  
      itemDiv.appendChild(itemImage)
      itemList.appendChild(itemDiv)
      itemList.appendChild(itemButton)
      storeUl.appendChild(itemList)
    }
  }
  else {
    // Only creating the items that are filtered

    for (let i = 0; i < state.items.length; i++) {
      if (state.items[i].filter === color) {
        const itemList = document.createElement('li')
  
        const itemDiv = document.createElement('div')
        itemDiv.setAttribute('class', 'store--item-icon')
  
        const itemImage = document.createElement('img')
        itemImage.setAttribute('src', 'assets/icons/' + state.items[i].id + '.svg')
        itemImage.setAttribute('alt', state.items[i].name)

        const itemButton = document.createElement('button')
        itemButton.innerText = "Add to cart"
        itemButton.addEventListener('click', (event) => AddToCart(state.items[i]))
  
        itemDiv.appendChild(itemImage)
        itemList.appendChild(itemDiv)
        itemList.appendChild(itemButton)
        storeUl.appendChild(itemList)
      }
    }
  }
}

function RenderStore() {
  storeUl.innerHTML = ''

  RenderFilters('All')

  // Extension 1
  const pinkButton = document.createElement('button')
  pinkButton.innerText = "Pink"
  pinkButton.addEventListener('click', (event) => RenderFilters('pink'))

  const orangeButton = document.createElement('button')
  orangeButton.innerText = "Orange"
  orangeButton.addEventListener('click', (event) => RenderFilters('orange'))

  const redButton = document.createElement('button')
  redButton.innerText = "Red"
  redButton.addEventListener('click', (event) => RenderFilters('red'))

  const greenButton = document.createElement('button')
  greenButton.innerText = "Green"
  greenButton.addEventListener('click', (event) => RenderFilters('green'))

  const yellowButton = document.createElement('button')
  yellowButton.innerText = "Yellow"
  yellowButton.addEventListener('click', (event) => RenderFilters('yellow'))

  const blueButton = document.createElement('button')
  blueButton.innerText = "Blue"
  blueButton.addEventListener('click', (event) => RenderFilters('blue'))

  const purpleButton = document.createElement('button')
  purpleButton.innerText = "Purple"
  purpleButton.addEventListener('click', (event) => RenderFilters('purple'))

  // Appending the filter buttons
  storeUl.appendChild(pinkButton)
  storeUl.appendChild(orangeButton)
  storeUl.appendChild(redButton)
  storeUl.appendChild(greenButton)
  storeUl.appendChild(yellowButton)
  storeUl.appendChild(blueButton)
  storeUl.appendChild(purpleButton)
}

function AddToCart(item) {
  
  // Creates the cart
  if (state.items.cart === undefined) {
    state.items.cart = []
  }

  // Looks through the cart if item is already there
  let foundItem = false
  for (let i = 0; i < state.items.cart.length; i++) {
    if (state.items.cart[i].name === item.name) {
      state.items.cart[i].quantity += 1
      foundItem = true
    }
  }
  
  // Adds the item to cart
  if (foundItem === false) {
    
    let cartItem = item
    cartItem.quantity = 1
    state.items.cart.push(cartItem)
    RenderCart(cartItem)
  }
  // Increases the quantity by re-rendering everything
  else {
    RenderCart()
  }
}

function RenderCart() {
  cartUl.innerHTML = ''
  
  // Adds the total cost of the items
  totalPrice = 0
  priceSpan.innerHTML = ''

  for (let i = 0; i < state.items.cart.length; i++) {
    const cartList = document.createElement('li')
    const cartImage = document.createElement('img')
    cartImage.setAttribute('class', 'cart--item-icon')
    cartImage.setAttribute('src', 'assets/icons/' + state.items.cart[i].id + '.svg')
    cartImage.setAttribute('alt', state.items.cart[i].name)

    const cartText = document.createElement('p')
    cartText.innerText = state.items.cart[i].name

    // Increase button
    const cartButton = document.createElement('button')
    cartButton.setAttribute('class', 'quantity-btn remove-btn center')
    cartButton.innerText = '-'
    cartButton.addEventListener('click', (event) => {
    state.items.cart[i].quantity -= 1
    totalPrice -= state.items.cart[i].price
    
    if (state.items.cart[i].quantity === 0) {
      state.items.cart.splice(i, 1)
    }

    RenderCart()
    })
  
    // Decrease button
    const cartButton2 = document.createElement('button')
    cartButton2.setAttribute('class', 'quantity-btn add-btn center')
    cartButton2.innerText = '+'
    cartButton2.addEventListener('click', (event) => {
      state.items.cart[i].quantity += 1
      totalPrice += state.items.cart[i].price
      RenderCart()
    })

    const cartSpan = document.createElement('span')
    cartSpan.setAttribute('class', 'quantity-text center')
    cartSpan.innerText = state.items.cart[i].quantity

    totalPrice += state.items.cart[i].price * state.items.cart[i].quantity

    cartList.appendChild(cartImage)
    cartList.appendChild(cartText)
    cartList.appendChild(cartButton)
    cartList.appendChild(cartSpan)
    cartList.appendChild(cartButton2)
    cartUl.appendChild(cartList)
  }

  priceSpan.innerText = '£' + totalPrice
}

function main() {
  RenderStore()
}

main()