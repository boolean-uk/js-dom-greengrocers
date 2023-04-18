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
    const whichAddButton = e.target.id
    console.log('button clicked:', whichAddButton)
  })
})

  
  // push that info to cart
    // cart location = state.cart = []



}







  // identify which button has been clicked
  // use that info to copy the relevant item into the cart







// RENDER LOGIC

// A user can view a selection of items in the store
  // display state items in greengrocers section

// RENDER STORE
// make var to select array in state
const stateItems = state.items
console.log('stateItems', stateItems)

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
      const storeImgAlt = storeItem.name
      makeStoreImg.setAttribute('alt', `${storeImgAlt}`)
      makeStoreDiv.appendChild(makeStoreImg)

    // create a button, set button text, append to li
    const storeButton = document.createElement('button')
    storeButton.setAttribute('class', 'store-button')
    storeButton.setAttribute('id', `${storeImgAlt}`)
    storeButton.innerText = 'Add to cart'
    makeStoreLi.append(storeButton)
  }

  listenForAdd()
}


// RENDER CART
    // find where added item should go (cart--item-list)

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
