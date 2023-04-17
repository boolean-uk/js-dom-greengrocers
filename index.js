// OVERALL Layout of code
    // SELECTING EXISTING ELEMENTS
    // STATE
    // EVENT LISTENERS
    // RENDER LOGIC
    // FIRST PAGE LOAD LOGIC
      // function init() {render()}
        // init()

// SELECTING EXISTING ELEMENTS
// be able to select:

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

/* item template: 
  {
    id: "000-name",
    name: "name",
    price: 0.35
  }
*/ 

// EVENT LISTENERS


// RENDER LOGIC


// A user can view a selection of items in the store

// 1 - display state items in greengrocers section

    // find where in html this displays
    // target this to add li
      // create li
      // edit li
      // append li to ul class=store--item-list


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
  // add stockItem to innerText
    makeStoreStockLi.innertext = stockItem
  // append li to ul
    selectStoreStockUl.appendChild(makeStoreStockLi)

  // each li - create a div, set class="store--item-icon", append div to li
    const makeStoreStockDiv = document.createElement('div')
    makeStoreStockDiv.setAttribute('class', 'store--item-icon')
    makeStoreStockLi.appendChild(makeStoreStockDiv)

  // each div - creat an img, set src and alt, append to div
    // create an img
      const makeStoreStockImg = document.createElement('img')
    // var to store location to find the id for each item
      const stockImgSrc = stockItem.id
    // set src - change to where the svg is(string interpolate)
      makeStoreStockImg.setAttribute('src', `assets/icons/${stockImgSrc}.svg`)
    // var to store location to find the name for each item
      const stockImgAlt = stockItem.name
    // set alt as name
      makeStoreStockImg.setAttribute('alt', `${stockImgAlt}`)
    // append as child of div
      makeStoreStockDiv.appendChild(makeStoreStockImg)

  // each li - create a button, set button innertext, append to li
  // const storeStockButton = document.createElement('button')
  // storeStockButton.innerText('Add to cart')
  // makeStoreStockDiv.append(storeStockButton)

  }
}






// display template:
  // <li>
  //   <div class="store--item-icon">
  //     <img src="assets/icons/001-beetroot.svg" 
  //           ^This is where to replace string with the 
  //         correct svg id = state id
  //     alt="beetroot" /> 
  //   </div>
  //   <button>Add to cart</button>
  // </li>





// FIRST PAGE LOAD LOGIC
function init() {
  renderStore()
}
init()
