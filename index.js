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
// defining my variables from html
const itemListStore = document.querySelector('.store--item-list')
const itemListCart = document.querySelector('.cart--item-list')
const totalNumber = document.querySelector('.total-number')

function renderStoreItems() {
  // make my list of stores of fruits and display on greengrocers page
  for (let i = 0; i < state.items.length; i++) {
    const storeItem = state.items[i]
    // each index will have its own name, image, button
    const storeItemName = document.createElement('li')
    const storeItemDiv = document.createElement('div')
    const storeItemImage = document.createElement('img')
    const storeItemButton = document.createElement('button')
    // make these index correspond to the state.items information
    storeItemName.innerText = state.items[i].name
    storeItemDiv.setAttribute('class', '.store--item-icon')
    const imageValue = state.items[i].id
    storeItemImage.setAttribute('src', `assets/icons/${imageValue}.svg`) // need the corresponding state image to show - can do back ticks with string
    storeItemButton.innerText = 'Add to cart'
    // append as per in the html template
    storeItemDiv.append(storeItemImage)
    storeItemName.append(storeItemDiv)
    storeItemName.append(storeItemButton)
    itemListStore.append(storeItemName)

    // 1: add event listener for click event on the "add item" button
    storeItemButton.addEventListener('click', function addingItemToCart() {
      // 2: on click, take the current store item and check if the cart contains this item
      // state.cart.find((element) => {
      //   if ()
      // })
      // 2a: if cart contains the item, increase the quantity by 1, then re-render cart


      // 2b: if cart doesnt contain the item, then:
      // if (itemListCart === state.items) {
      // 3: make a deep copy of the store item js object
      const cartObject = {
        id: state.items[i].id,
        name: state.items[i].name,
        price: state.items[i].price,
        quantity: 1, // 4: add a quantity property to the newly created object and set that quantity to = 1
      }
      state.cart.push(cartObject) // 5: add the cart item new object to the state cart array
      // }
      // 6: re-render cart
      renderCartItems() // display the cart item when the item in the store is clicked 
    })
  }
}
renderStoreItems()

function renderCartItems() {
  itemListCart.innerHTML = '' // throw away everyhting inside cartUL so that we can draw everything again
  for (let i = 0; i < state.cart.length; i++) { // iterate over each item in the state.cart and convert that into the HTML template
    // Requirement: From the store, a user can add an item to their cart
    // items in the cart list
    const cartList = document.createElement('li')
    // item image in cart from html element
    const cartImage = document.createElement('img')
    cartImage.setAttribute('class', 'cart--item-icon')
    const imageValue = state.cart[i].id
    cartImage.setAttribute('src', `assets/icons/${imageValue}.svg`)
    cartImage.setAttribute('alt', state.cart[i].name)
    // item name in cart from html element
    const cartName = document.createElement('p')
    cartName.innerText = state.cart[i].name
    // remove button from html element
    const cartRemoveButton = document.createElement('button')
    cartRemoveButton.setAttribute('class', 'remove-btn')
    cartRemoveButton.innerText = '-'
    // quantity button from html element
    const cartQuantityCenter = document.createElement('span')
    cartQuantityCenter.setAttribute('class', 'quantity-text')
    cartQuantityCenter.innerText = '1'
    // add button
    cartAddButton = document.createElement('button')
    cartAddButton.setAttribute('class', 'add-btn')
    cartAddButton.innerText = '+'

    // append all these inside the li element then append that li button to the ul cart
    cartList.append(cartImage)
    cartList.append(cartName)
    cartList.append(cartRemoveButton)
    cartList.append(cartQuantityCenter)
    cartList.append(cartAddButton)
    
    const cartItem = state.cart[i]
    console.log('problem:', cartItem)
    itemListCart.append(cartList) //  add the newly generated html to the cartUL

    // itemListCart.append(cartItem)  // this gives me object Object

  }
}