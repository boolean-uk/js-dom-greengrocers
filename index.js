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


//Setting up the starting state for the filter
state.selectedFilters = []
const filters = {
  vegtables: ['beetroot', 'carrot'],
  fruits: ['apple', 'apricot', 'avocado', 'bannanas', 'bell-pepper', 'berry', 'blueberry', 'eggplant']
}

//Setting up the default list style(needs to be map to create a seperate copy)
const defaultList = state.items.map(e => e)

// Element selection 

const storeList = document.querySelector('.store--item-list')
const cartList = document.querySelector('.cart--item-list')
const totalSpan = document.querySelector('.total-number')
const filterButton = document.querySelector('.filter-button')
const filterWindow = document.querySelector('.filter-window')
const listStyle = document.querySelector('#list-style')


// Display stores invetory
const displayInvetory = () => {
  //resets the store list (this is needed for the filter to update the store and show only the selected type)
  storeList.innerHTML = ''

  state.items.forEach(item => {
    //checks if no filters a applied if so draw all items (this is the default behavior)
    if (state.selectedFilters.length === 0) createStoreItem(item)
    //if a filter is applied it will check which ones and only display the correspondig items
    state.selectedFilters.forEach(filter => {
      if (filter.includes(item.name)) createStoreItem(item)
    })
  })
}

//Creates a specific item for the store list
const createStoreItem = (item) => {
  const li = document.createElement('li')

  const div = document.createElement('div')
  div.className = 'store--item-icon'

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
      img.className = 'cart--item-icon'
      img.src = `assets/icons/${item.id}.svg`
      img.alt = item.name

      const p = document.createElement('p')
      p.innerText = item.name

      const minusButton = document.createElement('button')
      minusButton.className = 'quantity-btn remove-btn center'
      minusButton.innerText = '-'
      minusButton.addEventListener('click', () => changeQuantity(item, 'decrease'))

      const span = document.createElement('span')
      span.className = 'quantity-text center'
      span.innerText = item.quantity

      const plusButton = document.createElement('button')
      plusButton.className = 'quantity-btn add-btn center'
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

//Show/Hide the filter window
filterButton.addEventListener('click', () => {
  filterWindow.style.display = filterWindow.style.display === 'none' ? '' : 'none'
})

// Create the filter list
const createFilterList = () => {
  //Set the filter window to none by default
  filterWindow.style.display = 'none'

  //create and append the ul to the filter window
  const ul = document.createElement('ul')
  ul.className = 'filter-list'

  filterWindow.append(ul)

  //creates and li and checkbox for each possible filter
  for (const [key] of Object.entries(filters)) {
    const li = document.createElement('li')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    //event that adds or removes a filter to the selected filter array
    checkbox.addEventListener('change', () => {
      if (state.selectedFilters.includes(filters[key])) state.selectedFilters = state.selectedFilters.filter(e => e !== filters[key])
      else state.selectedFilters.push(filters[key])
      //calls displayInventory to refresh the list of items acording to the new filter settings 
      displayInvetory()
    })

    li.append(checkbox)
    li.append(key)
    ul.append(li)
  }
}

//changes the items list to the corresponding list style and updates the Store inventory(explaination of the sort function at the bottom line:251)
const updateListStyle = () => {
  if (listStyle.value === 'default') {
    state.items = defaultList
  } else if (listStyle.value === 'AtoZ') {
    state.items.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0)
  } else if (listStyle.value === 'ZtoA') {
    state.items.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0).reverse()
  }
  displayInvetory()
}

//Add an event that triggers when a change in the selected list style happens 
listStyle.addEventListener('change', updateListStyle)

// Inital function call
displayInvetory()
createFilterList()

// state.items.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0) is the same as
// state.items.sort((a, b) => {
//   if (a.name < b.name) {
//     return -1
//   } else if (a.name > b.name) {
//     return 1
//   } else {
//     return 0
//   }
// })