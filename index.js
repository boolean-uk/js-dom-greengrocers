
const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "red"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "orange"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "red"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.45,
      type: "orange"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.75,
      type: "green"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.25,
      type: "yellow"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.45,
      type: "green"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.65,
      type: "red"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "blue"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "blue"
    }
  ],
  cart: [],
  updatedState: []
};

let activeFilter = ""

// Render a item

function renderItem(item) {
  if (activeFilter !== "" && !item.type.includes(activeFilter)) {
    return null
  }

  const itemUl = document.querySelector('.store--item-list')
  const itemLi = document.createElement('li')
  const itemDiv = document.createElement('div')
  itemDiv.setAttribute('class', 'store--item-icon')
  const itemImg = document.createElement('img')
  itemImg.setAttribute('src', ('./assets/icons/' + item.id + '.svg'))
  const itemButton = document.createElement('button')
  itemButton.addEventListener('click', () => {
    addToCart(item)
  })
  itemButton.textContent = 'Add to cart'
  itemDiv.appendChild(itemImg)
  itemLi.appendChild(itemDiv)
  itemLi.appendChild(itemButton)
  itemUl.appendChild(itemLi)
  return itemUl
}


// Render all items
function renderAllItems(items) {
  const itemUl = document.querySelector('.store--item-list')
  itemUl.innerHTML = ""
  items.forEach(element => {
    renderItem(element)
  })
}

function createSortingButtons() {
  // Creates buttons for sorting
  const sortDiv = document.createElement('div')
  const sortPriceButton = document.createElement('button')
  sortPriceButton.addEventListener('click', () => {
    sortByPrice()
    renderAllItems(updatedState)
  })
  sortPriceButton.textContent = 'Sort price'

  const sortAlphabetButton = document.createElement('button')
  sortAlphabetButton.addEventListener('click', () => {
    sortAlphabetically()
    renderAllItems(updatedState)
  })
  sortAlphabetButton.textContent = 'Sort alphabetically'

  const h1tag = document.querySelector('h1')
  sortDiv.appendChild(sortPriceButton)
  sortDiv.appendChild(sortAlphabetButton)
  h1tag.appendChild(sortDiv)
}


// Update Cart
function addToCart(item) {
  // If cart contains the same item, increment count
  if(state.cart.includes(item)) {
      const itemInList = state.cart.find(x => x.id === item.id)
      itemInList.count++
  } else {
    // If not, create count property and push it to cart
    item.count = 1
    state.cart.push(item)
  }
  renderCart()
}

// Render Cart
function renderCart() {
  // Clear the cart of html
  const cartUl = document.querySelector('.cart--item-list')
  cartUl.innerHTML = ""

  // update the total before touching the cart
  const total = calculateTotal()
  const totalElement = document.querySelector(".total-number")
    if(state.cart.length === 0) {
      totalElement.textContent = "£" + 0
    } else {
      totalElement.textContent = "£" + total
    }

  // Create a list element for every item in cart
  state.cart.forEach(element => {
    const itemLi = document.createElement('li')
    const itemImg = document.createElement('img')
    itemImg.setAttribute('class', 'cart--item-icon')
    itemImg.setAttribute('src', ('./assets/icons/'+ element.id + '.svg'))
    itemImg.setAttribute('alt', element.name)
    const itemPara = document.createElement('p')
    itemPara.innerText = element.name
    const itemRemove = document.createElement('button')
    itemRemove.setAttribute('class', 'quantity-btn, remove-btn center')
    itemRemove.textContent = '-'
    itemRemove.addEventListener('click', () => {
      if(element.count === 1) {
        element.count--
        state.cart.splice(state.cart.indexOf(element), 1)
      } else {
        element.count--
      }
      renderCart()
    })
    const itemQuantity = document.createElement('span')
    itemQuantity.setAttribute('class', 'quantity-text center')
    itemQuantity.textContent = element.count
    const itemAdd = document.createElement('button')
    itemAdd.setAttribute('class', 'quantity-btn add-btn center')
    itemAdd.textContent = '+'
    itemAdd.addEventListener('click', () => {
      element.count++
      renderCart()
    })

    itemLi.appendChild(itemImg)
    itemLi.appendChild(itemPara)
    itemLi.appendChild(itemRemove)
    itemLi.appendChild(itemQuantity)
    itemLi.appendChild(itemAdd)
    cartUl.appendChild(itemLi)

  })
}
// Calculate total
function calculateTotal() {
  let total = 0
  if(state.cart.length === 0) {
    return 0
  }
  state.cart.forEach(element => {
    total += (element.price * element.count)
  })
  return total.toFixed(2)
}


function sortByPrice() {
  updatedState = state.items.sort((a, b) => a.price - b.price)
}

function sortAlphabetically() {
  updatedState = state.items.sort((a, b) => a.name.localeCompare(b.name))
}

function createFilterButtons() {
  // Creates buttons for sorting

  const filterDiv = document.createElement('div')

  const allFilterButton = document.createElement('button')
  allFilterButton.addEventListener('click', () => {
    activeFilter = ''
    renderAllItems(state.items)
  })
  allFilterButton.textContent = 'Show all'

  const redFilterButton = document.createElement('button')
  redFilterButton.addEventListener('click', () => {
    activeFilter = "red"
    renderAllItems(state.items)
  })
  redFilterButton.textContent = 'Only red'

  const orangeFilterButton = document.createElement('button')
  orangeFilterButton.addEventListener('click', () => {
    activeFilter = "orange"
    renderAllItems(state.items)
  })
  orangeFilterButton.textContent = 'Only orange'

  const greenFilterButton = document.createElement('button')
  greenFilterButton.addEventListener('click', () => {
    activeFilter = "green"
    renderAllItems(state.items)
  })
  greenFilterButton.textContent = 'Only green'

  const blueFilterButton = document.createElement('button')
  blueFilterButton.addEventListener('click', () => {
    activeFilter = "blue"
    renderAllItems(state.items)
  })
  blueFilterButton.textContent = 'Only blue'

  const yellowFilterButton = document.createElement('button')
  yellowFilterButton.addEventListener('click', () => {
    activeFilter = "yellow"
    renderAllItems(state.items)
  })
  yellowFilterButton.textContent = 'Only yellow'

  const h1tag = document.querySelector('h1')
  filterDiv.appendChild(allFilterButton)
  filterDiv.appendChild(redFilterButton)
  filterDiv.appendChild(orangeFilterButton)
  filterDiv.appendChild(blueFilterButton)
  filterDiv.appendChild(yellowFilterButton)
  filterDiv.appendChild(greenFilterButton)
  
  h1tag.appendChild(filterDiv)
}


// main
function main() {
  renderAllItems(state.items)
  renderCart()
  createSortingButtons()
  createFilterButtons()
}

main()
