const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      type: "vegetable",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      type: "vegetable",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      type: "fruit",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      type: "fruit",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      type: "fruit",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      type: "fruit",
      price: 0.25 //changed in order to show the sorting is working for fruit
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      type: "vegetable",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      type: "fruit",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      type: "fruit",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      type: "vegetable",
      price: 0.35
    }
  ],
  cart: [],
  storeOrdering: {
    filter: 'all',
    sorting: 'default'
  },
  theDosh: 0
};


const storeItems = document.querySelector('.store--item-list')
const cartItems = document.querySelector('.cart--item-list')
const totalPrice = document.querySelector('.total-number')
const filters = document.querySelector('.filterButtons')
const sort = document.querySelector('.sortButtons')

function drawStoreItems() {
  storeItems.innerHTML = "";

  // Create a new array to hold the filtered and sorted items
  let itemsToDisplay = [...state.items]

  // Apply filtering logic
  if (state.storeOrdering.filter !== 'all') {
    itemsToDisplay = itemsToDisplay.filter(item => item.type === state.storeOrdering.filter)
  }

  // Apply sorting logic
  if (state.storeOrdering.sorting === 'alphabetically') {
    itemsToDisplay.sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.storeOrdering.sorting === 'price') {
    itemsToDisplay.sort((a, b) => a.price - b.price)
  }

  for (const item of itemsToDisplay) {
    const foodItem = document.createElement('li')
    // foodItem.classList.Add('somekindaCSSclass');

    //Children of FoodItem:
    //Item image div
    const imgDiv = document.createElement('div')
    imgDiv.classList.add('store--item-icon')

    //Item image
    const image = document.createElement('img')
    image.setAttribute('src', `assets/icons/${item.id}.svg`)
    image.setAttribute('alt', item.name)

    imgDiv.appendChild(image);

    //Item remove button
    const addButton = document.createElement('button');
    addButton.innerText = 'Add to cart'
    addButton.addEventListener('click', () => addToCart(item))

    foodItem.appendChild(imgDiv)
    foodItem.appendChild(addButton)
    storeItems.appendChild(foodItem)
  }
}


function drawCartItems()
{
  cartItems.innerHTML = ""

  for (const item of state.cart)
  {
    const foodItem = document.createElement('li')
    // foodItem.classList.Add('somekindaCSSclass')

    //Children of FoodItem:
      //Item image
      const image = document.createElement('img')
      image.classList.add('cart--item-icon')
      image.setAttribute('src', `assets/icons/${item.id}.svg`)
      image.setAttribute('alt', item.name)

      //Item name
      const name = document.createElement('p')
      //name.classList.Add('somekindaCSSclass')
      name.innerText = item.name
      
      //Item remove button
      const buttonRemove = document.createElement('button')
      buttonRemove.classList.add('quantity-btn')
      buttonRemove.classList.add('remove-btn')
      buttonRemove.classList.add('center')
      buttonRemove.innerText = '-'
      buttonRemove.addEventListener('click', () => decreaseQuantity(item))

      const itemQuantity = document.createElement('span')
      itemQuantity.classList.add('quantity-text')
      itemQuantity.classList.add('center')
      itemQuantity.innerText = item.quantity


      //Item add button
      const buttonAdd = document.createElement('button')
      buttonAdd.classList.add('quantity-btn')
      buttonAdd.classList.add('add-btn')
      buttonAdd.classList.add('center')
      buttonAdd.innerText = '+'
      buttonAdd.addEventListener('click', () => increaseQuantity(item))

    foodItem.appendChild(image)
    foodItem.appendChild(name)
    foodItem.appendChild(buttonRemove)
    foodItem.appendChild(itemQuantity)
    foodItem.appendChild(buttonAdd)
    cartItems.appendChild(foodItem)
  }
}

function drawFilters() {
  const bFruits = document.createElement('button')
  bFruits.innerText = 'only fruits'
  bFruits.addEventListener('click', () => filterer('fruit'))

  const bVeggies = document.createElement('button')
  bVeggies.innerText = 'only vegetables'
  bVeggies.addEventListener('click', () => filterer('vegetable'))

  const bAll = document.createElement('button') //funny name
  bAll.innerText = 'All'
  bAll.addEventListener('click', () => filterer('all'))

  filters.appendChild(bFruits)
  filters.appendChild(bVeggies)
  filters.appendChild(bAll)
}

function drawSorting() {
  const sortPrice = document.createElement('button')
  sortPrice.innerText = 'sort by price'
  sortPrice.addEventListener('click', () => sorter('price'))

  const sortAlphabetically = document.createElement('button')
  sortAlphabetically.innerText = 'sort alphabetically'
  sortAlphabetically.addEventListener('click', () => sorter('alphabetically'))

  sort.appendChild(sortPrice)
  sort.appendChild(sortAlphabetically)
}

function sorter(newSort) {

    state.storeOrdering.sorting = newSort;
    drawStoreItems();
    drawCartItems();
}

function filterer(newFilter) {
  state.storeOrdering.filter = newFilter
  drawStoreItems()
  drawCartItems()
}

function drawTotal() {
  const total = document.createElement('p')
  total.innerText = '£ '+ Math.round((state.theDosh + Number.EPSILON) * 100) / 100
  totalPrice.appendChild(total)
}

function calculateTotal(add, price) {
  if(add) {
    state.theDosh += price
  } else {
    state.theDosh -= price
  }
}

drawFilters()
drawSorting()
drawStoreItems()
drawCartItems()
drawTotal()

function addToCart(item) {
  const index = state.cart.findIndex(cartItem => cartItem.id === item.id);

  if (index === -1) {
    // Item not in cart, add it with quantity 1
    item.quantity = 1
    state.cart.push(item)
    calculateTotal(true, item.price)
  } else {
    // Item already in cart, increase its quantity
    increaseQuantity(item)
  }
  drawStoreItems()
  drawCartItems()
  redrawCartItems()
}

function increaseQuantity(item) {
  // Find the index of the item in the cart
  const index = state.cart.findIndex(cartItem => cartItem.id === item.id)

  // If the item is found in the cart
  if (index !== -1) {
    // Increase the quantity of the item
    state.cart[index].quantity++
    // Redraw the cart items to reflect the changes
    calculateTotal(true, item.price)
    drawStoreItems()
    drawCartItems()
    redrawCartItems()
  }
  console.log(state)
}

function decreaseQuantity(item) {
    const index = state.cart.findIndex(cartItem => cartItem.id === item.id)

    // If the item is found in the cart
    if (index !== -1) {
      // Increase the quantity of the item
      state.cart[index].quantity--
      // Redraw the cart items to reflect the changes
      if(state.cart[index].quantity === 0) {
        state.cart.splice(index,1)
      }
      calculateTotal(false, item.price)
      drawStoreItems()
      drawCartItems()
      redrawCartItems()
    }
}

function redrawCartItems() {
  cartItems.innerHTML = ""
  totalPrice.innerHTML = ""
  drawTotal()
  drawCartItems()
}