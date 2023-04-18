// OVERALL Layout of code
    // SELECTING EXISTING ELEMENTS
    // STATE
    // EVENT LISTENERS
      // CONDITIONS LOGIC
    // RENDER LOGIC
    // FIRST PAGE LOAD LOGIC


/*
click add to cart button
--> check if in cart
    --YES-> update state
    --NO--> add to state
                        --BOTH--> Render Cart
*/




// SELECTING EXISTING ELEMENTS
  // store ul - class=store--item-list
const selectStoreUl = document.querySelector('.store--item-list')
  // cart ul - cart--item-list
const selectCartUl = document.querySelector('.cart--item-list')

// STATE
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


// EVENT LISTENERS

// From the store, a user can add an item to their cart

// listen for when add to cart button is clicked
function listenForAdd() {
// when called, waits for click event for any add to cart button
  console.log('called: listenForAdd')
// listen for add to cart button press
  const allAddButtons = document.querySelectorAll('.store-button')
  allAddButtons.forEach((allAddButtons) => {
  allAddButtons.addEventListener('click', (e) => {
// identify which button
    const whichItemName = e.target.id
    console.log('button clicked:', whichItemName)

    
  // check if already in cart
    checkCart(whichItemName)

    })
  })
}


// CONDITIONS LOGIC

// If the item is already in the cart, increase the item's quantity in the cart


// BEFORE adding to state cart - check if already there

// check cart 
function checkCart(checkedForItemName) {
  console.log('called: checkCart')
// does stateCart have the item name in it?
  if (stateCart.filter(e => e.name === checkedForItemName).length > 0) {
    // YES
    console.log('Already in cart, call XXXX')
  }
  else {
    // NO
    console.log('not there, call addToStateCart')
    addToStateCart(checkedForItemName)
  }
}

// UPDATE the num in cart for +/- or readded to cart

// function changeNumInCart(whichToEditNumName) {
//   console.log('can i see stateCart?', stateCart)
//   // access the stateCart
//   console.log('what is whichItemToChange...', whichToEditNumName)
//   // find the appropriate item in the array
//   stateCart.find(whichToEditNumName => {
//     console.log('i found this', whichToEditNumName.numInCart)
//   // update the numInCart
//     whichToEditNumName.numInCart = whichToEditNumName.numInCart + 1 
//   })
//   // re-render the cart with updated num
//   renderCart
  
// }
  // stateItems.forEach(element =>  {
  //   // for 
  //   // when matched, save that object to var
  //     if (element.name === addToCartItemName) {
  //     addToStateCart = element
  //     console.log('addToStateCart:', addToStateCart)
  //     // add the numInCart attribute, default 1
  //      addToStateCart.numInCart = 1
  //     return addToStateCart}


  // have numInCart saved in state
  // add as attribute when putting in state
  // default to 1

// function to find item by name from state
function stateFind(lookingFor) {
  console.log('calling: stateFind')
  stateItems.find(lookingFor => {
    console.log('i found this', lookingFor)
  })
  return
}

// *** updating stateCart with item clicked's info ***

// add the corresponding item's info to the cart
function addToStateCart(addToStateCart) {
  console.log('called: addToStateCart')
  //find the object with associated id 
  console.log('what is addToStateCart', addToStateCart)
  stateFind(addToStateCart)
  console.log('what did it find for addToStateCart?',addToStateCart)

  // push into the stateCartArray
  state.cart.push()
  console.log('updated state cart', stateCart)

   // call to render the cart 
   renderCart(addToStateCart)
}


// RENDER LOGIC

// A user can view a selection of items in the store
  // display state items in greengrocers section

// RENDER STORE

// make var to select store array in state
const stateItems = state.items

// function to render list of items in store
function renderStore() {
  // check if called
  console.log('called: renderStore')
  // clear the ul 
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

// make var to select cart array in state
const stateCart = state.cart

// function to store whole object being added to cart

// function to render cart
function renderCart(itemToRender) {
  console.log('called: renderCart')
  console.log('item to render:', itemToRender)

// find the itemToRender in stateItems
// *** could refactor this to use the id assigned to the add to cart buttons ***
  // var for the found object 
  let cartItemToRender
  // search through stateItems list
  stateItems.forEach(element =>  {
  // for each one - compare to itemToRender
    if (element.name === itemToRender) {
    cartItemToRender = element
    console.log('cartItemToRender:', cartItemToRender)
  // when matched, save that object to var
    return cartItemToRender
  }
  })

// use the found object to set for the new elements
  // make, edit, append cart Li 
  const makeCartLi = document.createElement('li')
  selectCartUl.appendChild(makeCartLi) 

    // make, edit, append cart img to li
    const makeCartImg = document.createElement('img')
    makeCartImg.setAttribute('class', 'cart--item-icon')
    cartImgSrc = cartItemToRender.id
    makeCartImg.setAttribute('src', `assets/icons/${cartImgSrc}.svg`)
    cartImgName = cartItemToRender.name
    makeCartImg.setAttribute('alt', `${cartImgName}`)
    makeCartLi.appendChild(makeCartImg)

  // make, edit append p to li
  const makeCartP = document.createElement('p')
  makeCartP.innerText = `${cartImgName}`
  makeCartLi.appendChild(makeCartP)

  // make, edit append button remove to li
  // <button class="quantity-btn remove-btn center">-</button>
  const cartRemoveButton = document.createElement('button')
  cartRemoveButton.setAttribute('class', 'quantity-btn remove-btn center')
  cartRemoveButton.innerText = '-'
  makeCartLi.append(cartRemoveButton)

  // make, edit append span to li
  // <span class="quantity-text center">1</span>
  const cartSpan = document.createElement('span')
  cartSpan.setAttribute('class', 'quantity-text center')
  cartSpan.innerHTML = `${cartItemToRender.numInCart}`
  makeCartLi.append(cartSpan)

  // make, edit append button add to li
  // <button class="quantity-btn add-btn center">+</button>
  const cartAddButton = document.createElement('button')
  cartAddButton.setAttribute('class', 'quantity-btn add-btn center')
  cartAddButton.innerText = '+'
  makeCartLi.append(cartAddButton)

  console.log('*** UPDATED STATE CART ***', state.cart)
}




// FIRST PAGE LOAD LOGIC
function init() {
  renderStore()
}
init()
