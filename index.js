const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.95,
      category: 'vegetable'
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.45,
      category: 'vegetable'
    },
    {
      id: "003-apple",
      name: "apple",
      price: 1.70,
      category: 'fruit'
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 1.00,
      category: 'fruit'
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.80,
      category: 'fruit'
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 1.35,
      category: 'fruit'
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 1.50,
      category: 'vegetable'
    },
    {
      id: "008-cherry",
      name: "cherry",
      price: 2.00,
      category: 'fruit'
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 2.30,
      category: 'fruit'
    },
    {
      id: "010-aubergine",
      name: "aubergine",
      price: 0.75,
      category: 'fruit'
    }
  ],
  cart: []
};

const storeItemList = document.querySelector('.store--item-list')
const cartItemList = document.querySelector('.cart--item-list')
const totalNumber = document.querySelector('.total-number')
const vegButton = document.querySelector('.vegButton')
const fruitButton = document.querySelector('.fruitButton')

// Create function for store items
function renderStore(items) {
  // Clear store-item--list
  storeItemList.innerHTML = ''

  
  items.forEach(item => {
    // Create an li for each object in state.items
    const li = document.createElement('li')

    // Create a div to contain the img with class 'store--item-icon'
    const div = document.createElement('div')
    div.setAttribute('class', 'store--item-icon')

    // Create food item img/svg for appending into the div
    const img = document.createElement('img')
    img.setAttribute('src', `assets/icons/${item.id}.svg`)
    img.setAttribute('alt', item.name)

    // Create button for appending into the li
    const button = document.createElement('button')
    button.innerText = 'Add to cart'
    // Append img to the div
    div.append(img)

    button.addEventListener('click', (event) => {
      // Event Listener for when the button is clicked
      // Pushes clicked item/object into state.cart
      state.cart.push(item)
      // Render cart on click to keep it up to date
      renderCart()
    })
    
    // Append everything else AFTER the event listener
    storeItemList.append(li)
    li.append(div, button)
  })
  // Function end
}

// Create function for cart
function renderCart() {
  // Clear cart--item-list-container
  cartItemList.innerHTML = ''

  const cartItemsDisplay = checkCartItems()
  cartItemsDisplay.forEach(itemDisplay => {
    // Create an li for each item/object in state.cart
    const li = document.createElement('li')

    // Add the item/object img within the li
    const img = document.createElement('img')
    img.setAttribute('class', 'cart--item-icon')
    img.setAttribute('src', `assets/icons/${itemDisplay.item.id}.svg`)
    img.setAttribute('alt', itemDisplay.item.name)

    // Create a p element within each li containing state.cart.name
    const p = document.createElement('p')
    p.innerText = itemDisplay.item.name

    // Create minus button within the lis with class 'quantity-btn remove-btn center'
    const minusButton = document.createElement('button')
    minusButton.setAttribute('class', 'quantity-btn remove-btn center')
    minusButton.innerText = '-'

    minusButton.addEventListener('click', (event) => {
      // Event listener for when minus button is clicked
      // Find the correct item/object within the cart
      const existingItem = state.cart.find(item => item.id === itemDisplay.item.id)
      // Minus one from the displayed amount
      state.cart.splice(state.cart.indexOf(existingItem), 1)
      // Render cart again after the change
      renderCart()
    })

    // Create amount number display within lis with class 'quantity-text center'
    const span = document.createElement('span')
    span.setAttribute('class', 'quantity-text center')
    span.innerText = itemDisplay.quantity

    // Create plus button within lis with class 'quantity-btn add-btn center'
    const plusButton = document.createElement('button')
    plusButton.setAttribute('class', 'quantity-btn add-btn center')
    plusButton.innerText = '+'


    plusButton.addEventListener('click', (event) => {
      // Event listener for when plus button is clicked
      // Add one to the displayed amount
      state.cart.push(itemDisplay.item)
      // Render cart again after the change
      renderCart()
    })
    
    //Append the elements to where they should be
    cartItemList.appendChild(li)
    li.append(img, p, minusButton, span, plusButton)
  })
  renderTotal()
  // Function end
}

function renderTotal() {
  // Create function for displaying total
  // Create sum of the cart item price * cart item quantity
  let total = state.cart.reduce(
    (sum, cartItem) => sum + cartItem.price, 0
  )
  // Append sum into span with class total-number
  totalNumber.innerText = `£${total.toFixed(2)}`
  

// Function end
}

function checkCartItems() {
  // Create a function for checking items that have been pushed into state.cart

  let display = []

  state.cart.forEach(item => {
    // For each item in the cart find a name, and check if it's already in the array
    const existingItem = display.find(itemDisplay => item.name === itemDisplay.item.name)
    
    // If the return is undefined (name not found)
    // then push the item into the array with a quantity of 1
    if (existingItem === undefined) {
      display.push({item: item, quantity: 1})
    } else {
      // If the name is found, then add 1 to the quantity
      existingItem.quantity++
    }
  })

  return display

  // Function end
}

// Extension 1
fruitButton.addEventListener('click', (event) => {
  //On the click event trigger the filter function 
  filter(event.target.click, 'fruit')
})

vegButton.addEventListener('click', (event) => {
  //On the click event trigger the filter function 
  filter(event.target.click, 'vegetable')
})

function filter(toggledOn, category) {
  let filtered
  // Pull the arguments from fruit/vegFilterToggle and check if the
  // category within the object matches vegetable or fruit, and depending upon
  // which is requested hide one or the other
  if (toggledOn) {
    filtered = state.items.filter(item => item.category === category)
    
  } else {
    filtered = state.items
  }
  // Render the store again giving the filtered state.items as the argument
  renderStore(filtered)
}

// Extension 2
function sort() {

}

// Call render functions
renderStore(state.items)