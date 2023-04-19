// *** PLAN ***

// OVERALL Layout of code
    // SELECTING EXISTING ELEMENTS
    // STATE
    // EVENT LISTENERS
      // CONDITIONS LOGIC
    // RENDER LOGIC
    // FIRST PAGE LOAD LOGIC


/*
Process flow:
click add to cart button
--> check if in cart
    --YES-> update state
    --NO--> add to state
                        --BOTH--> Render Cart
*/

// *** CODE ***


// * SELECTING EXISTING ELEMENTS
  // store ul - class=store--item-list
const selectStoreUl = document.querySelector('.store--item-list')
  // cart ul - cart--item-list
const selectCartUl = document.querySelector('.cart--item-list')

// * STATE
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


// * EVENT LISTENERS

// listen for when add to cart button is clicked
function listenForAdd() {
  console.log('called: listenForAdd')
  const allAddButtons = document.querySelectorAll('.store-button')
  allAddButtons.forEach((allAddButtons) => {
  allAddButtons.addEventListener('click', (e) => {
  const whichItemName = e.target.id
  console.log('button clicked:', whichItemName)
  // check if already in cart
  checkCart(whichItemName)
    })
  })
}

// * CONDITIONS LOGIC

// If the item is already in the cart, increase the item's quantity in the cart
// BEFORE adding to state cart - check if already there

// CHECK CART
function checkCart(checkedForItemName) {
  console.log('called: checkCart')
// does stateCart have the item in it already?
  if (stateCart.filter(e => e.name === checkedForItemName).length > 0) {
    // YES - increase quantity in state
    console.log('Already in cart, call increaseCartQuantity')
    console.log('what is chk itm name', checkedForItemName)
    increaseCartQuantity(checkedForItemName)
  }
  else {
    // NO - add to state
    console.log('not there, call addToStateCart')
    addToStateCart(checkedForItemName)
  }
}

// increase quantity in stateCart for selected item
function increaseCartQuantity(itemToIncrease) {
  console.log('called: increaseCartQuantity')
  for (let i = 0; i < stateCart.length; i++) {
    if (stateCart[i].name === itemToIncrease)
  stateCart[i].quantity++
  }
renderCart()
}

// updating stateCart with item clicked's info

// add the corresponding item's info to the stateCart
function addToStateCart(addToStateCart) {
  console.log('called: addToStateCart')
  //find the object with associated id 
  const found = stateItems.find(e => e.name === addToStateCart)
  console.log('what is found?', found)
  // add quantity to object
  found.quantity = 1
  // push into the stateCartArray
  state.cart.push(found)
  console.log('updated state cart', stateCart)
   // call to render the cart 
   renderCart(addToStateCart)
}

// * RENDER LOGIC

// RENDER STORE

// make var to select store array in state
const stateItems = state.items

// function to render list of items in store
function renderStore() {
  console.log('called: renderStore')
  selectStoreUl.innerHTML = ''

  // create all li based on state
  for (let i = 0; i < stateItems.length; i++) {
  // var to store the state item being looked at
    const storeItem = stateItems[i]
  // make new li
    const makeStoreLi = document.createElement('li')
  // append li to ul
    selectStoreUl.appendChild(makeStoreLi)

  // create a div, set class="store--item-icon", append to li
    const makeStoreDiv = document.createElement('div')
    makeStoreDiv.setAttribute('class', 'store--item-icon')
    makeStoreLi.appendChild(makeStoreDiv)

    // create an img, set src and alt, append to div
      const makeStoreImg = document.createElement('img')
      const storeImgSrc = storeItem.id
      makeStoreImg.setAttribute('src', `assets/icons/${storeImgSrc}.svg`)
      const storeImgName = storeItem.name
      makeStoreImg.setAttribute('alt', `${storeImgName}`)
      makeStoreDiv.appendChild(makeStoreImg)

    // create a button, set button text, append to li
    const cartRemoveButton = document.createElement('button')
    cartRemoveButton.setAttribute('class', 'store-button')
    cartRemoveButton.setAttribute('id', `${storeImgName}`)
    cartRemoveButton.innerText = 'Add to cart'
    makeStoreLi.append(cartRemoveButton)
  }

  listenForAdd()
}

// RENDER CART

// var to select cart array in state
const stateCart = state.cart

// function to render cart
function renderCart() {
  console.log('called: renderCart')
// ZERO in cart logic
    for (let i = 0; i < stateCart.length; i++) {
      const checkZeroQuantity = stateCart[i]
    // if quantity in basket = 0
      if (checkZeroQuantity.quantity < 1) {
        // remove from cart
        stateCart.splice(i, 1)
      }
    }
// clear the cart
  selectCartUl.innerHTML = ''

// LOOP stateCart
  for(let i = 0; i < stateCart.length; i++) {
  const cartItemToRender = stateCart[i]

// CREATE ELEMENTS
  // make, edit, append cart LI 
  const makeCartLi = document.createElement('li')
  selectCartUl.appendChild(makeCartLi) 

    // make, edit, append cart IMG to li
    const makeCartImg = document.createElement('img')
    makeCartImg.setAttribute('class', 'cart--item-icon')
    cartImgSrc = cartItemToRender.id
    console.log('********', cartImgSrc)
    makeCartImg.setAttribute('src', `assets/icons/${cartImgSrc}.svg`)
    cartImgName = cartItemToRender.name
    makeCartImg.setAttribute('alt', `${cartImgName}`)
    makeCartLi.appendChild(makeCartImg)

    // make, edit append P to li
    const makeCartP = document.createElement('p')
    makeCartP.innerText = `${cartImgName}`
    makeCartLi.appendChild(makeCartP)

    // make, edit append BUTTON REMOVE to li
    const cartRemoveButton = document.createElement('button')
    cartRemoveButton.setAttribute('class', 'quantity-btn remove-btn center')
    cartRemoveButton.innerText = '-'
    cartRemoveButton.addEventListener('click', () => {
      cartItemToRender.quantity--
      renderCart(cartItemToRender)
    })
    makeCartLi.append(cartRemoveButton)

    // make, edit append SPAN to li
    const cartSpan = document.createElement('span')
    cartSpan.setAttribute('class', 'quantity-text center')
    cartSpan.innerHTML = `${cartItemToRender.quantity}`
    makeCartLi.append(cartSpan)

    // make, edit append BUTTON ADD to li
    const cartAddButton = document.createElement('button')
    cartAddButton.setAttribute('class', 'quantity-btn add-btn center')
    cartAddButton.innerText = '+'
    cartAddButton.addEventListener('click', () => {
      cartItemToRender.quantity++
      renderCart(cartItemToRender)
    })
    makeCartLi.append(cartAddButton)

    console.log('*** UPDATED STATE CART ***', stateCart)
}
cartTotal()
}

// RENDER TOTAL

function cartTotal() {
  console.log('called: cartTotal')
  let currentTotal = 0.00
  for (let i = 0; i < stateCart.length; i++) {
    let currentItemTotal
    currentPrice = stateCart[i].price
    currentQuantity = stateCart[i].quantity
    currentItemTotal = currentQuantity * currentPrice
    currentTotal += currentItemTotal
  // render the total on the page
    findTotal = document.querySelector('.total-number')
    findTotal.innerHTML = ''
    findTotal.innerText = `£${currentTotal}`
    console.log('whats the currentTotal?', currentTotal)
  }
}

// * FIRST PAGE LOAD LOGIC
function init() {
  renderStore()
  cartTotal()
}
init()
