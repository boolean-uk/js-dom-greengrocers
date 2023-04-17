// OVERALL Layout of code
    // SELECTING EXISTING ELEMENTS
    // STATE
    // EVENT LISTENERS
    // RENDER LOGIC
    // FIRST PAGE LOAD LOGIC

// SELECTING EXISTING ELEMENTS
  // store ul - class=store--item-list
const selectStoreStockUl = document.querySelector('.store--item-list')
  // cart ul - cart--item-list


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


// RENDER LOGIC

// A user can view a selection of items in the store
  // display state items in greengrocers section

// make var to select array in state
const stateItems = state.items
console.log('stateItems', stateItems)

// function to render list of items in store
function renderStore() {
  // check if called
  console.log('called: renderStore')
  // clear the ul 
  selectStoreStockUl.innerHTML = ''

  // create all li based on state
  for (let i = 0; i < stateItems.length; i++) {
  // var to store the state item being looked at
    const stockItem = stateItems[i]
  // make new li
    const makeStoreStockLi = document.createElement('li')
  // append li to ul
    selectStoreStockUl.appendChild(makeStoreStockLi)

  // create a div, set class="store--item-icon", append to li
    const makeStoreStockDiv = document.createElement('div')
    makeStoreStockDiv.setAttribute('class', 'store--item-icon')
    makeStoreStockLi.appendChild(makeStoreStockDiv)

    // create an img, set src and alt, append to div
      const makeStoreStockImg = document.createElement('img')
      const stockImgSrc = stockItem.id
      makeStoreStockImg.setAttribute('src', `assets/icons/${stockImgSrc}.svg`)
      const stockImgAlt = stockItem.name
      makeStoreStockImg.setAttribute('alt', `${stockImgAlt}`)
      makeStoreStockDiv.appendChild(makeStoreStockImg)

    // create a button, set button text, append to li
    const storeStockButton = document.createElement('button')
    storeStockButton.innerText = 'Add to cart'
    makeStoreStockLi.append(storeStockButton)
 
  }
}

// FIRST PAGE LOAD LOGIC
function init() {
  renderStore()
}
init()
