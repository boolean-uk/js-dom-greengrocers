// Starting State
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

// Element selection 

const storeList = document.querySelector('.store--item-list')
const cartList = document.querySelector('.cart--item-list')
const totalSpan = document.querySelector('.total-number')


// Display stores invetory
const displayInvetory = () => {
  state.items.forEach(item => {
    createStoreItem(item)
  })
}

//Creates a specific item for the store list
const createStoreItem = (item) => {
  const li = document.createElement('li')

  const div = document.createElement('div')
  div.class = 'store--item-icon'

  const img = document.createElement('img')
  img.src = `assets/icons/${item.id}.svg`
  img.alt = item.name

  const button = document.createElement('button')
  button.innerText = 'Add to cart'
  button.addEventListener('click', () => addToCart(item))

  div.append(img)
  li.append(div)
  li.append(button)
  storeList.append(li)
}

//Adds items to the cart
const addToCart = (item) => {
  //Checks if an item does not exists in the cart
  if (!state.cart.includes(item)) {   //if so call addToCart to add to the list
    item.quantity = 1
    state.cart.push(item)
  } else {                            //else increase quantity by 1
    item.quantity++
  }
  //then call updateCart to display the newest state
  updateCart()
}

// Create/Update the cart list
const updateCart = () => {

  //clears the list
  cartList.innerHTML = ''

  //keeps track of the carts total value
  let cartTotal = 0

  //for each item checks if quantity is > 0 
  state.cart.forEach(item => {
    if (item.quantity > 0) {
      //create the element and append it to the list
      const li = document.createElement('li')

      const img = document.createElement('img')
      img.class = 'cart--item-icon'
      img.src = `assets/icons/${item.id}.svg`
      img.alt = item.name

      const p = document.createElement('p')
      p.innerText = item.name

      const minusButton = document.createElement('button')
      minusButton.class = 'quantity-btn remove-btn center'
      minusButton.innerText = '-'
      minusButton.addEventListener('click', () => changeQuantity(item, 'decrease'))

      const span = document.createElement('span')
      span.class = 'quantity-text center'
      span.innerText = item.quantity

      const plusButton = document.createElement('button')
      plusButton.class = 'quantity-btn add-btn center'
      plusButton.innerText = '+'
      plusButton.addEventListener('click', () => changeQuantity(item, 'increase'))

      li.append(img)
      li.append(p)
      li.append(minusButton)
      li.append(span)
      li.append(plusButton)

      cartList.append(li)

      //Takes items price and multiplies it by the quantity then adds to the totalvalue
      cartTotal += item.price * item.quantity
    }
  })

  //Sets the total text = total value
  //using parseFloat().toFixed(2) to round to 2 decimal numbers
  totalSpan.innerText = `£${parseFloat(cartTotal).toFixed(2)}`
}

//update the quantity based on the button pressed
const changeQuantity = (item, operation) => {

  //if the plusButton was pressed increase by 1
  if (operation === 'increase') item.quantity++

  //if the minusButton was pressed decrease by 1
  else if (operation === 'decrease') item.quantity--

  //update the cart to reflect the new state
  updateCart()
}


// Inital function call
displayInvetory()