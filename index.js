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


// Select the store ul, cart ul and total cost elements
const storeUl = document.querySelector('.store--item-list')
const cartUl = document.querySelector('.cart--item-list')
const totalNum = document.querySelector('.total-number')

// Use a for loop to cycle through the state item
// and create the icons and buttons for each.

for (let i = 0; i < state.items.length; i++) {

  // create elements
  const storeLi = document.createElement('li')
  const storeImg = document.createElement('img')
  const storeBtn = document.createElement('button')

  // add a source to the img using the created variable
  // add a class to the img to apply correct styling
  storeImg.setAttribute('src', `assets/icons/${state.items[i].id}.svg`)
  storeImg.setAttribute('class', '.store--item-icon')

  // add the text to the button
  storeBtn.innerText = 'Add to cart'

  // add event listener to button which checks if
  // the item is not in the cart ! (bang). If not then
  // it will add the item while giving it a quantity
  // of one. If it is already in the cart then
  // the item quantity will increase by 1
  storeBtn.addEventListener('click', () => {
    if (!state.cart.includes(state.items[i])) {
      state.items[i].quantity = 1
      state.cart.push(state.items[i])
    } else {
    state.items[i].quantity++
  }
  generateCart()
  })

  // append the icon, button and list item to the unordered list
  storeLi.append(storeImg, storeBtn)
  storeUl.append(storeLi)
}

function generateCart() {
  // clear cart html
  cartUl.innerHTML = ''

  // for loop to generate cart
  for (let i = 0; i < state.cart.length; i++) {

    // create elements
    const cartLi = document.createElement('li')
    const cartItemImg = document.createElement('img')
    const cartItemName = document.createElement('p')
    const removeBtn = document.createElement('button')
    const cartQuantity = document.createElement('span')
    const addBtn = document.createElement('button')

    // add a source to the img using string interpolation
    // add a class to the img to apply correct styling
    cartItemImg.setAttribute('src', `assets/icons/${state.cart[i].id}.svg`)
    cartItemImg.setAttribute('class', '.cart--item-icon')

    // add text to paragraph(name of item)
    cartItemName.innerText = `${state.cart[i].name}`

    // remove button add classes and text
    removeBtn.setAttribute('class', 'center quantity-btn remove-btn')
    removeBtn.innerText = '-'
  
    // add button add classes and text
    addBtn.setAttribute('class', 'center quantity-btn add-btn')
    addBtn.innerText = '+'


    // show quantity for each cart item
    cartQuantity.innerText = `${state.cart[i].quantity}`
    
    // add an event listener to the minus button
    // to take off 1 per click. if the value hits
    // 0 then the item will be removed
    removeBtn.addEventListener('click', () => {
      if (state.cart[i].quantity > 1) {
        state.cart[i].quantity--
      } else {
        state.cart.splice(i, 1)
      }
      generateCart()
    })

    // add an event listener to increase the quantity
    // every time the button has been clicked
    addBtn.addEventListener('click', () => {
      state.cart[i].quantity++
      generateCart()
    })

    // append all the elements to the list item then append
    // the list item to the unordered list
    cartLi.append(cartItemImg, cartItemName, removeBtn, cartQuantity, addBtn)
    cartUl.append(cartLi)
  }

  // generate the total cost for the cart
  // using the reduce method
  // !for some reason having this nested in the for loop
  // worked apart from the fact that if the cart became
  // empty it wouldn't reset to 0.
  const totalCost = state.cart.reduce((accumulator, object) => {
    return accumulator + (object.quantity * object.price)
  }, 0)

  // format the total so that it always has 2
  // decimal places. Getting some crazy numbers
  // otherwise! Could have done in one by adding
  // it to the end of totalCost but this makes
  // it easier to understand
  const formattedCost = totalCost.toFixed(2);

  // Update the total to the page
  totalNum.innerText = `£${formattedCost}`

}
