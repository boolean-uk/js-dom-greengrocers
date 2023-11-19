// HTML SELECTORS
const itemUl = document.querySelector('.store--item-list')
const cartUl = document.querySelector('.cart--item-list')
const totalSum = document.querySelector(`.total-number`)
const sortSelect = document.querySelector('#sort-select')
const filterSelect = document.getElementById('filter-select')
const state = {
  items: [
    {
      id: '001-beetroot',
      name: 'beetroot',
      price: 0.35,
      quantity: 0,
      type: 'veggie'
    },
    {
      id: '002-carrot',
      name: 'carrot',
      price: 0.35,
      quantity: 0,
      type: 'veggie'
    },
    {
      id: '003-apple',
      name: 'apple',
      price: 0.35,
      quantity: 0,
      type: 'fruit'
    },
    {
      id: '004-apricot',
      name: 'apricot',
      price: 0.35,
      quantity: 0,
      type: 'fruit'
    },
    {
      id: '005-avocado',
      name: 'avocado',
      price: 0.35,
      quantity: 0,
      type: 'fruit'
    },
    {
      id: '006-bananas',
      name: 'bananas',
      price: 0.35,
      quantity: 0,
      type: 'fruit'
    },
    {
      id: '007-bell-pepper',
      name: 'bell pepper',
      price: 0.35,
      quantity: 0,
      type: 'veggie'
    },
    {
      id: '008-berry',
      name: 'berry',
      price: 0.35,
      quantity: 0,
      type: 'fruit'
    },
    {
      id: '009-blueberry',
      name: 'blueberry',
      price: 0.35,
      quantity: 0,
      type: 'fruit'
    },
    {
      id: '010-eggplant',
      name: 'eggplant',
      price: 0.35,
      quantity: 0,
      type: 'veggie'
    }
  ],
  sortedAToZ: false,
  filter: false,
  cart: []
}
// Store Item render
function renderStoreItems() {
  itemUl.innerHTML = ''
  if (!state.sortedAToZ) {
    state.items.sort((a, b) => a.id.localeCompare(b.id))
  }
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

sortSelect.addEventListener('change', () => {
  const sortValue = sortSelect.value
  if (sortValue === 'a-z') {
    // Sorting A-Z
    state.items.sort((a, b) => a.name.localeCompare(b.name))
    state.sortedAToZ = true
    renderStoreItems()
  } else if (sortValue === 'z-a') {
    // Sorting Z-A
    state.items.sort((a, b) => b.name.localeCompare(a.name))
    state.sortedAToZ = true
    renderStoreItems()
  } else {
    state.sortedAToZ = false
    renderStoreItems()
  }
})
// render fruit only
function fruitFilter() {
  itemUl.innerHTML = ''
  if (!state.sortedAToZ) {
    state.items.sort((a, b) => a.id.localeCompare(b.id))
  }
  // Lopping through the state array

  state.items.forEach((StoreItem) => {
    if (StoreItem.type === 'fruit') {
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
    }
  })
}

// Renders veg only
function veggieFilter() {
  itemUl.innerHTML = ''
  if (!state.sortedAToZ) {
    state.items.sort((a, b) => a.id.localeCompare(b.id))
  }
  // Lopping through the state array

  state.items.forEach((StoreItem) => {
    if (StoreItem.type === 'veggie') {
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
    }
  })
}
// filter event listener
filterSelect.addEventListener('change', () => {
  const selectedOption = filterSelect.value

  if (selectedOption === 'fruit') {
    fruitFilter()
  } else if (selectedOption === 'veggies') {
    veggieFilter()
  } else {
    renderStoreItems()
  }
})
renderStoreItems()
