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

const storeUl = document.querySelector(".store--item-list");
const cartUl = document.querySelector(".cart--item-list");
const priceSpan = document.querySelector('.total-number')
let totalPrice = 0

function RenderStore() {

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
    if (state.items.cart[i].quantity === 0) {
      state.items.cart.splice(i, 1)
    }

    totalPrice -= state.items.cart[i].price
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