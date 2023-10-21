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

const header = document.querySelector('header')
const itemsUl = document.createElement('ul') 
itemsUl.setAttribute('class', 'item-list store--item-list')
header.append(itemsUl)

for (let i = 0; i < items.length; i++) {

  
  // Creates the store items
    const listItem = document.createElement('li')
    itemsUl.append(listItem)
    const divItems = document.createElement('div')
    divItems.setAttribute('class', 'store--item-icon')
    listItem.append(divItems)

    // Image for each item
    const itemImage = document.createElement('img')
    itemImage.src = items[i].image
    divItems.append(itemImage)
    
    // store item button 
    const itemButton = document.createElement('button')
    itemButton.innerText = 'Add to cart'
    listItem.append(itemButton)

    // When add to cart is clicked
    itemButton.addEventListener('click', () => {

      // If the item wasn't added to basket
      if (items[i].ifClicked === false) {

      if (items[i].ifClicked = true){
      const itemList = document.querySelector('.cart--item-list')
      const addItem = document.createElement('li')
      itemList.append(addItem)
      
      // This will create the image element in the basket
      const cartImage = document.createElement('img')
      addItem.append(cartImage)
      cartImage.src = items[i].image
      
      //  First letter will be a capital
      const cartP = document.createElement('p')
      cartP.innerText = items[i].name
      cartP.style.textTransform = 'capitalize'
      addItem.append(cartP)

      // remove from cart 
      const cartItemRemoveButton = document.createElement('button')
      cartItemRemoveButton.innerText = '-'
      cartItemRemoveButton.setAttribute('class', 'quantity-btn remove-btn center')
      addItem.append(cartItemRemoveButton)
      
      // Removes from total amount 
      cartItemRemoveButton.addEventListener('click', (event) => {
        event.preventDefault()
        basketItemQuantity -= 1
        basketPrice -= 0.35
        cartSpan.innerText = basketItemQuantity
        basketTotalNumberSelector.innerText = '£' + basketPrice.toFixed(2)

        // This will stop the price going below £0.00 
        if (basketPrice <= 0) {
          basketTotalNumberSelector.innerText = '£0.00'
        }

        // If item quantity hits 0, then remove from the basket.
        if (basketItemQuantity === 0) {
          addItem.remove()
        }
      })
          // Quantity of each item 
      let basketItemQuantity = 1
      const cartSpan = document.createElement('span')
      cartSpan.innerText = basketItemQuantity
      cartSpan.setAttribute('class', 'quantity-text center')
      addItem.append(cartSpan)

      // Create button 
      const cartAddButton = document.createElement('button')
      cartAddButton.innerText = '+'
      cartAddButton.setAttribute('class', 'quantity-btn add-btn center')
      addItem.append(cartAddButton)

      // Adding to total price per item
      const basketTotalNumberSelector = document.querySelector('.total-number')
      basketPrice += 0.35
      basketTotalNumberSelector.innerText = '£' + basketPrice.toFixed(2)

      cartAddButton.addEventListener('click', (event) => {
        event.preventDefault()
        basketItemQuantity += 1
        basketPrice += 0.35
        cartSpan.innerText = basketItemQuantity
        basketTotalNumberSelector.innerText = '£' + basketPrice.toFixed(2)
    })

    // Adding to total when quantity is updated at the bottom section
    itemButton.addEventListener('click', (event) => {
      event.preventDefault()
      basketItemQuantity += 1
      basketPrice += 0.35
      cartSpan.innerText = basketItemQuantity
      basketTotalNumberSelector.innerText = '£' + basketPrice.toFixed(2)
  }
  )
      }
    }
    }
    )
  }

