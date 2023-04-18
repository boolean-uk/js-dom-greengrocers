// HTML SELECTORS
const itemUl = document.querySelector('.store--item-list')
const cartUl = document.querySelector('.cart--item-list')
const totalSum = document.querySelector(`.total-number`)
const state = {
  items: [
    {
      id: '001-beetroot',
      name: 'beetroot',
      price: 0.35,
      quantity: 0
    },
    {
      id: '002-carrot',
      name: 'carrot',
      price: 0.35,
      quantity: 0
    },
    {
      id: '003-apple',
      name: 'apple',
      price: 0.35,
      quantity: 0
    },
    {
      id: '004-apricot',
      name: 'apricot',
      price: 0.35,
      quantity: 0
    },
    {
      id: '005-avocado',
      name: 'avocado',
      price: 0.35,
      quantity: 0
    },
    {
      id: '006-bananas',
      name: 'bananas',
      price: 0.35,
      quantity: 0
    },
    {
      id: '007-bell-pepper',
      name: 'bell pepper',
      price: 0.35,
      quantity: 0
    },
    {
      id: '008-berry',
      name: 'berry',
      price: 0.35,
      quantity: 0
    },
    {
      id: '009-blueberry',
      name: 'blueberry',
      price: 0.35,
      quantity: 0
    },
    {
      id: '010-eggplant',
      name: 'eggplant',
      price: 0.35,
      quantity: 0
    }
  ],

  cart: []
}
// Store Item render
function renderStoreItems() {
  // Lopping through the state array
  state.items.forEach((StoreItem) => {
    // console.log(StoreItem)
    const alt = StoreItem.name
    // Create a list element
    const StoreList = document.createElement('li')
    itemUl.append(StoreList)
    // create a div element
    const div = document.createElement('div')
    div.setAttribute('class', 'store--item-icon')
    StoreList.append(div)
    // create a img element
    const img = document.createElement('img')
    img.setAttribute('src', `assets/icons/${StoreItem.id}.svg`)
    img.setAttribute('alt', alt)
    div.append(img)
    // add to cart button
    const AddToCartButton = document.createElement('button')
    AddToCartButton.innerText = `Add To cart`
    StoreList.append(AddToCartButton)
    // event listener for add to cart button
    AddToCartButton.addEventListener('click', () => {
      console.log("I've been clicked")
      StoreItem.quantity += 1
      // look for dublicates in the cart
      const dublicate = state.cart.some((obj) => {
        if (obj.name === StoreItem.name) {
          return true
        } else {
          return false
        }
      })
      if (dublicate === true) {
        renderCartItems()
      } else {
        state.cart.push(StoreItem)
        renderCartItems()
      }
    })
  })
}
// render cart item
function renderCartItems() {
  // clearing ul
  cartUl.innerHTML = ''
  // looping through cart
  state.cart.forEach((cartItem) => {
    // create a list element
    const cartList = document.createElement('li')
    cartUl.append(cartList)
    // create a img element
    const cartImg = document.createElement('img')
    cartImg.setAttribute('class', 'cart--item-icon')
    cartImg.setAttribute('src', `assets/icons/${cartItem.id}.svg`)
    cartImg.setAttribute('alt', cartItem.name)
    cartList.append(cartImg)
    // create p element
    const name = document.createElement('p')
    name.innerText = cartItem.name
    cartList.append(name)
    // create minus button
    const minusButton = document.createElement('button')
    minusButton.setAttribute('class', 'quantity-btn remove-btn center')
    minusButton.innerText = '-'
    cartList.append(minusButton)
    // event listener for minus button
    minusButton.addEventListener('click', () => {
      cartItem.quantity--
      quantity.innerText = cartItem.quantity
      // if 0 remove from cart
      if (cartItem.quantity === 0) {
        const index = state.cart.indexOf(cartItem)
        if (index > -1) {
          state.cart.splice(index, 1)
          renderCartItems()
          total()
        } else {
          total()
        }
      }
      total()
    })
    // quantity of items
    const quantity = document.createElement('span')
    quantity.setAttribute('class', 'quantity-text center')
    quantity.innerText = cartItem.quantity

    cartList.append(quantity)
    // create plus button
    const plusButton = document.createElement('button')
    plusButton.setAttribute('class', 'quantity-btn add-btn center')
    plusButton.innerText = '+'
    cartList.append(plusButton)
    // event listener for plus button
    plusButton.addEventListener('click', () => {
      cartItem.quantity += 1
      renderCartItems()
    })
  })
  total()
}
// function to calculate the total sum
function total() {
  let totalAmount = 0
  state.cart.forEach((cartItem) => {
    totalAmount += cartItem.quantity * cartItem.price
  })
  totalSum.innerText = `฿${totalAmount.toFixed(2)}`
}
renderStoreItems()
