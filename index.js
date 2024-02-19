//A user can view a selection of items in the store
//From the store, a user can add an item to their cart
//If the item is already in the cart, increase the item's quantity in the cart
//From the cart, a user can view and adjust the number of items in their cart
//If an item's quantity equals zero it is removed from the cart
//A user can view the current total in their cart

// SELECT EXISTING/FIXED DOM ELEMENTS
const storeUl = document.querySelector(".store--item-list")
const cartUl = document.querySelector(".cart--item-list")
const totalElement = document.querySelector(".total-number")
// DEFINE APPLICATION STATE (model)
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

// LOGIC (functions) TO UPDATE APP STATE (controller -> model -> view update)
function handleIncrease(span, item) {
  console.log('Increasing')
  span.innerText++
  //total++
}

function handleDecrease(span, item) {
  console.log(item.span)
  span.innerText--
  if (span.innerText >= 1) {
    console.log('Decreasing')
  }else {
    console.log('Removed')
    const element = document.getElementById(item.id)
    element.remove()
  }  
  //total--
}

// LOGIC (functions) TO HANDLE USER EVENTS (view -> controller interaction)
function handleAddItemToCart(item) {
  console.log('show item: ', item)
  const span = document.getElementsByTagName('span')
  //const span = document.getElementById(item.id)
  
  // get span from this item
  const cartli = renderCartData(item)
  if (!!document.getElementById(item.id)) {
    console.log('item already exists')
    // Increase amount in cart
    handleIncrease(span[0], item)
    //handleIncrease(span, item)
  }else {
    cartUl.appendChild(cartli)
  }  
}

// LOGIC (functions) TO HANDLE RENDERING / DISPLAY / CLEARING OF UI (view)
function renderCartData(item) {
  const li = document.createElement('li')
  li.setAttribute('id', item.id)

  const img = document.createElement('img')
  img.setAttribute('class', "cart--item-icon")
  img.setAttribute('src', `assets/icons/${item.id}.svg`, item.name)
  li.appendChild(img)

  const p = document.createElement('p')
  p.innerText = item.name
  li.appendChild(p)

  const span = document.createElement('span')
  span.setAttribute('class', "quantity-text center")
  span.innerText = 1

  const removeButton = document.createElement('button')
  removeButton.setAttribute('class', "quantity-btn remove-btn center")
  removeButton.innerText = '-'
  removeButton.addEventListener('click', () => handleDecrease(span, item))
  
  const addButton = document.createElement('button')
  addButton.setAttribute('class', "quantity-btn add-btn center")
  addButton.innerText = '+'
  addButton.addEventListener('click', () => handleIncrease(span, item))

  li.appendChild(removeButton)
  li.appendChild(span)
  li.appendChild(addButton)

  return li
}

function renderItemData(item) {
  // Create list item
  const li = document.createElement('li')
  // Create div to keep item-icon in
  const div = document.createElement('div')
  div.setAttribute('class', "store--item-icon")
  // Create and load item-icon
  const img = document.createElement('img')
  img.setAttribute('src', `assets/icons/${item.id}.svg`, `${item.name}`)
  // Add img to div and add div to li
  div.appendChild(img)
  li.appendChild(div)
  
  // Create button for item
  const button = document.createElement('button')
  button.innerText = "Add to cart"
  button.addEventListener('click', () => handleAddItemToCart(item))
  
  // Add button to li
  li.appendChild(button)

  // Return whole li
  return li
}

// INITIALISATION LOGIC
function initialise() {
  console.log("Initialising...");

  // perform any additional actions to load state
  
  // perfrom initial render
  state.items.forEach((item) => {
    // Call function to load this li
    const li = renderItemData(item)
    // Add li to the list
    storeUl.appendChild(li)
  })

  // setup event handlers
  console.log("Initialisation done.");
}

initialise();