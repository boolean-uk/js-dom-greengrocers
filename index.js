const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      image: "assets/icons/001-beetroot.svg",
      ifClicked: false
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      image: "assets/icons/002-carrot.svg",
      ifClicked: false
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      image: "assets/icons/003-apple.svg",
      ifClicked: false
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      image: "assets/icons/004-apricot.svg",
      ifClicked: false
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      image: "assets/icons/005-avocado.svg",
      ifClicked: false
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      image: "assets/icons/006-bananas.svg",
      ifClicked: false
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      image: "assets/icons/007-bell-pepper.svg",
      ifClicked: false
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      image: "assets/icons/008-berry.svg",
      ifClicked: false
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      image: "assets/icons/009-blueberry.svg",
      ifClicked: false
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      image: "assets/icons/010-eggplant.svg",
      ifClicked: false
    }
  ],
  cart: []
};
// Shows each object in the array above 
const items = state.items 
// Total of the basket price
let basketPrice = 0 
// Default quantity
let basketItemQuantity = 1 

const itemsUl = document.createElement('ul') 
itemsUl.setAttribute('class', 'item-list store--item-list')
itemsUl.setAttribute('style', 'list-style-type: none')
const header = document.querySelector('header')
header.append(itemsUl)

for (let i = 0; i < items.length; i++) {

  // Creates the store items
    const listItem = document.createElement('li')
    itemsUl.append(listItem)
    const divItems = document.createElement('div')
    divItems.setAttribute('class', 'store--item-icon')
    listItem.append(divItems)

    // Image for each store item
    const itemImage = document.createElement('img')
    itemImage.src = items[i].image
    divItems.append(itemImage)
    
    // store item button 
    const itemButton = document.createElement('button')
    itemButton.innerText = 'Add to cart'
    listItem.append(itemButton)

    // When "Add to cart" is clicked
    itemButton.addEventListener('click', () => {

      // If the item wasn't added to basket, create all elements in the basket
      if (items[i].ifClicked === false) {
      items[i].ifClicked = true
      const itemList = document.querySelector('.cart--item-list')
      const addItem = document.createElement('li')
      itemList.append(addItem)

      // Creates img element in the basket
      const cartImage = document.createElement('img')
      addItem.append(cartImage)
      cartImage.src = items[i].image

      //  Creates name of item in basket and capitalizes first letter
      const cartP = document.createElement('p')
      cartP.innerText = items[i].name
      cartP.style.textTransform = 'capitalize'
      addItem.append(cartP)

      // Creates remove from cart button
      const cartItemRemoveButton = document.createElement('button')
      cartItemRemoveButton.innerText = '-'
      cartItemRemoveButton.setAttribute('class', 'quantity-btn remove-btn center')
      addItem.append(cartItemRemoveButton)

      }})} 
