// OVERALL Layout of code
    // SELECTING EXISTING ELEMENTS
    // STATE
    // EVENT LISTENERS
    // RENDER LOGIC
    // FIRST PAGE LOAD LOGIC

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

function test() {
  console.log('test')
}

function listenForAdd() {
// when button is clicked, adds the item to the cart in the state
  console.log('called: listenForAdd')
// listen for add to cart button press
  const allAddButtons = document.querySelectorAll('.store-button')
  allAddButtons.forEach((allAddButtons) => {
  allAddButtons.addEventListener('click', (e) => {
// identify which button
    const whichItem = e.target.id
    console.log('button clicked:', whichItem)
// call function to add to cart
    addToCart(whichItem)
    })
  })
}

// push item clicked info to cart
function addToCart(addToCartItem) {
  console.log('called: addToCart')
  // cart location = state.cart = []
  state.cart.push(addToCartItem)
  console.log('updated state', state)
  renderCart(addToCartItem)
}




// RENDER LOGIC

// A user can view a selection of items in the store
  // display state items in greengrocers section

// RENDER STORE
// make var to select store array in state
const stateItems = state.items
// console.log('stateItems', stateItems)

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
    const storeButton = document.createElement('button')
    storeButton.setAttribute('class', 'store-button')
    storeButton.setAttribute('id', `${storeImgName}`)
    storeButton.innerText = 'Add to cart'
    makeStoreLi.append(storeButton)
  }

  listenForAdd()
}


// RENDER CART

// make var to select cart array in state
const stateCart = state.cart

// function to render cart
function renderCart(itemToRender) {
  console.log('called: renderCart')
  console.log('item to render:', itemToRender)

// find the itemToRender in the state
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
  console.log('is this right?', cartItemToRender)

// find where added item should go (cart--item-list)
  // make, edit, append cart Li 
  const makeCartLi = document.createElement('li')
  selectCartUl.appendChild(makeCartLi) 

    // make, edit, append cart img to li
    const makeCartImg = document.createElement('img')
    makeCartImg.setAttribute('class', 'cart--item-icon')
    cartImgSrc = cartItemToRender.id
    makeCartImg.setAttribute('src', `assets/icons/${cartImgSrc}.svg`)
    makeCartLi.appendChild(makeCartImg)
    const cartImgName = cartItemtoRender.name
    makeStoreImg.setAttribute('alt', `${cartImgName}`)

  // make, edit append p to li
  const makeCartP = document.createElement('p')
  makeCartP.innerText = `${cartImgName}`
  makeCartLi.appendChild(makeCartP)
}

    // gets called once item addToCart is called
  




// Cart template:

{/* <li>
      <img
        class="cart--item-icon"
        src="assets/icons/001-beetroot.svg"
        alt="beetroot"
      />
      <p>beetroot</p>
      <button class="quantity-btn remove-btn center">-</button>
      <span class="quantity-text center">1</span>
      <button class="quantity-btn add-btn center">+</button>
    </li> */}



// FIRST PAGE LOAD LOGIC
function init() {
  renderStore()
}
init()
