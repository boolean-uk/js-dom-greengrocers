const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      image: "assets/icons/001-beetroot.svg",
      wasClicked: false
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      image: "assets/icons/002-carrot.svg",
      wasClicked: false
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      image: "assets/icons/003-apple.svg",
      wasClicked: false
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      image: "assets/icons/004-apricot.svg",
      wasClicked: false
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      image: "assets/icons/005-avocado.svg",
      wasClicked: false
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      image: "assets/icons/006-bananas.svg",
      wasClicked: false
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      image: "assets/icons/007-bell-pepper.svg",
            wasClicked: false
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      image: "assets/icons/008-berry.svg",
      wasClicked: false
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      image: "assets/icons/009-blueberry.svg",
      wasClicked: false
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      image: "assets/icons/010-eggplant.svg",
      wasClicked: false
    }
  ],
  cart: []
};

const items = state.items // Defines each object in the array
let basketPrice = 0 // Running total of the basket value
let cartItemQuantity = 1 // Default quantity of items when added to basket
const itemsUl = document.createElement('ul') // Creates list container for items
itemsUl.setAttribute('class', 'item-list store--item-list')
itemsUl.setAttribute('style', 'list-style-type: none')
const header = document.querySelector('header')
header.append(itemsUl)

for (let i = 0; i < items.length; i++) {

  // Create items
    const listItem = document.createElement('li')
    itemsUl.append(listItem)
    const itemDiv = document.createElement('div')
    itemDiv.setAttribute('class', 'store--item-icon')
    listItem.append(itemDiv)

    // Create image for store items
    
    const itemImage = document.createElement('img')
    itemImage.src = items[i].image
    itemDiv.append(itemImage)
    
    // Create store item button (name)
    
    const itemButton = document.createElement('button')
    itemButton.innerText = 'Add to cart'
    listItem.append(itemButton)

    // Create list item in basket when "Add to cart" is clicked

    itemButton.addEventListener('click', () => {
      console.log('button clicked')

      // If the item wasn't added to basket, create all elements in the basket
      if (items[i].wasClicked === false) {
        items[i].wasClicked = true
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

      const cartRemoveBtn = document.createElement('button')
      cartRemoveBtn.innerText = '-'
      cartRemoveBtn.setAttribute('class', 'quantity-btn remove-btn center')
      addItem.append(cartRemoveBtn)

      // Removes from total

      cartRemoveBtn.addEventListener('click', () => {
        console.log('remove button clicked')
        cartItemQuantity -= 1
        basketPrice -= .35
        cartSpan.innerText = cartItemQuantity
        basketPriceSelector.innerText = '£' + basketPrice.toFixed(2)

        // If basketPrice goes below 0, don't show a '-' I had an issue where it would display '£-0.00'
        if (basketPrice <= 0) {
          basketPriceSelector.innerText = '£0.00'
        }

        // If quantity reaches 0, remove item totally from the basket
        if (cartItemQuantity === 0) {
          addItem.remove()
          items[i].wasClicked = false
          console.log(items[i].wasClicked)
        }
      })

      // Create span (quantity of each item in basket)
      const cartSpan = document.createElement('span')
      let cartItemQuantity = 1
      cartSpan.innerText = cartItemQuantity
      cartSpan.setAttribute('class', 'quantity-text center')
      addItem.append(cartSpan)


      // Create button (add more of each item already in basket)
      const cartAddBtn = document.createElement('button')
      cartAddBtn.innerText = '+'
      cartAddBtn.setAttribute('class', 'quantity-btn add-btn center')
      addItem.append(cartAddBtn)

      // Add to total

      basketPrice += 0.35
      console.log(basketPrice)
      const basketPriceSelector = document.querySelector('.total-number')
      basketPriceSelector.innerText = '£' + basketPrice.toFixed(2)

      cartAddBtn.addEventListener('click', () => {
        console.log('add button clicked')
        cartItemQuantity += 1
        basketPrice += 0.35
        cartSpan.innerText = cartItemQuantity
        basketPriceSelector.innerText = '£' + basketPrice.toFixed(2)
    })

    // Add to total when quantity is updated

    itemButton.addEventListener('click', () => {
      console.log('button clicked')
      cartItemQuantity += 1
      basketPrice += 0.35
      cartSpan.innerText = cartItemQuantity
      basketPriceSelector.innerText = '£' + basketPrice.toFixed(2)
  })
  }})}