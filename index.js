const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.10,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.25,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.15,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.40,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.30,
      type: "fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.60,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.05,
      type: "fruit"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.20,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.45,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "fruit"
    }
  ],
  cart: []
};

// Filtered Table
const filteredTable = {fruits: [], vegetables: []}
for (let item of state.items) {
  if (item.type === 'fruit') {
  filteredTable.fruits.push(item) 
  } else {
    filteredTable.vegetables.push(item)
  }
} 

window.onload = function() {
  
  const items = document.querySelector('.store--item-list')
  const cart = document.querySelector('.cart--item-list')
  const price = document.querySelector('.total-number')

  function store() {
    loadImages(state.items)
    cartDisplay()
  }

  // Function for creating HTML elements
  function createAnElement(htmlTag, className = [], innerHTML = '') {
    const element = document.createElement(htmlTag)
    element.innerHTML = innerHTML
    if (className.length) element.classList.add(className)
    return element
}

// Function for loading items' images
  function loadImages(table) {
    items.innerHTML = ('')
    for (let i = 0; i < table.length; i++) {

      const listItem = document.createElement('li')

      const divIcon = createAnElement('div','store--item-icon')

      const image = createAnElement('img', '')
      image.src = `assets/icons/${table[i].id}.svg`
      image.alt = table[i].name

      const button = createAnElement('button', '', 'Add to cart')
      button.addEventListener('click',() => addToCart(table[i]))
      
    divIcon.appendChild(image)
    listItem.appendChild(divIcon)
    listItem.appendChild(button)

    items.appendChild(listItem)
    }
  }

  // Add to cart function
  function addToCart(item) {
    const existedItem = state.cart.find(existedItem => existedItem.item.name === item.name)
    if (!existedItem) {
    state.cart.push({item, quantity: 1})

    } else {
      existedItem.quantity++
    }
    cartDisplay()
  }

  // Display the items in the cart section
  function cartDisplay() {
    cart.innerHTML = ''
    for (let i = 0; i < state.cart.length; i++) {
      const cartItem = createAnElement('li', '')

      const image = createAnElement('img', 'cart--item-icon')
      image.src = `assets/icons/${state.cart[i].item.id}.svg`
      image.alt = state.cart[i].item.name

      const name = createAnElement('p', '', state.cart[i].item.name)

      const decreaseQuantity = createAnElement('button', ['quantity-btn', 'remove-btn', 'center'], '-')
      decreaseQuantity.addEventListener('click', function() {
        if (state.cart[i].quantity > 1) {
          quantity.innerHTML = --state.cart[i].quantity
          totalPrice()
        } else {
          state.cart.splice(i, 1)
          cartDisplay()
          totalPrice()
        }
      })

      const quantity = createAnElement('span', ['quantity-text', 'center'], state.cart[i].quantity)

      const increaseQuantity = createAnElement('button', ['quantity-btn', 'add-btn', 'center'], '+')
      increaseQuantity.addEventListener('click', function() {
        quantity.innerHTML = ++state.cart[i].quantity
        totalPrice()
      })

      totalPrice()

      cartItem.appendChild(image)
      cartItem.appendChild(name)
      cartItem.appendChild(decreaseQuantity)
      cartItem.appendChild(quantity)
      cartItem.appendChild(increaseQuantity)

      cart.appendChild(cartItem)
    }
  }

  // Calculate Total Price
  function totalPrice() {
    price.innerHTML = '£0.00'
    let finalPrice = 0
    for (let i = 0; i < state.cart.length; i++) {
      finalPrice += state.cart[i].item.price * state.cart[i].quantity
    }
    finalPrice = finalPrice.toFixed(2)
    price.innerHTML = '£' + finalPrice
  }

  // Filters
  const filterFruits = createAnElement('button', 'my-fruit-button', 'Filter by fruits')
  filterFruits.addEventListener('click', function() {
    loadImages(filteredTable.fruits)
  })
  document.body.appendChild(filterFruits)

  const filterVegetables = createAnElement('button', 'my-vegetable-button', 'Filter by vegetables')
  filterVegetables.addEventListener('click', function() {
    loadImages(filteredTable.vegetables)
  })
  document.body.appendChild(filterVegetables)

  // Sorting
  const sortByPrice = createAnElement('button', 'sort-by-price-button', 'Sort By Price')
  sortByPrice.addEventListener('click', function() {
    const sortedByPriceItems = sortedByPriceFunction()
    loadImages(sortedByPriceItems)
  })
  document.body.appendChild(sortByPrice)

  function sortedByPriceFunction() {
    return state.items.slice().sort((a,b) => a.price - b.price)  
  }

  store()

}