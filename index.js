const state = {
  items: [
    {
      id: '001-beetroot',
      name: 'beetroot',
      price: 0.35
    },
    {
      id: '002-carrot',
      name: 'carrot',
      price: 0.35
    },
    {
      id: '003-apple',
      name: 'apple',
      price: 0.35
    },
    {
      id: '004-apricot',
      name: 'apricot',
      price: 0.35
    },
    {
      id: '005-avocado',
      name: 'avocado',
      price: 0.35
    },
    {
      id: '006-bananas',
      name: 'bananas',
      price: 0.35
    },
    {
      id: '007-bell-pepper',
      name: 'bell pepper',
      price: 0.35
    },
    {
      id: '008-berry',
      name: 'berry',
      price: 0.35
    },
    {
      id: '009-blueberry',
      name: 'blueberry',
      price: 0.35
    },
    {
      id: '010-eggplant',
      name: 'eggplant',
      price: 0.35
    }
  ],
  cart: []
}
// q: what would a good first objective be?
// obj: get the shop items displayed at the top of the page
// - 1) create some variables to store HTML elements from the page
// (querySelector to get store <ul>), so that I can add elements onto the page
// - 2) figure out how to construct each shop HTML element
// (image, button, etc) and add each one onto the <ul> on the page
// - for each item in the state.items, I will do the following steps:
// - CREATE store item HTML -> use the exact template from templates/store-item.html
//  -> document.createElement ; element.appendChild(otherElement) ; element.setAttribute(...)
// - for the img src attribute; create a string using the item's ID that matches
// `assets/icons/${item.id}.svg` // "assets/icons" + item.id + ".svg"
// - add the item HTML to the store <ul> selected earlier

// - A user can view a selection of items in the store

const itemList = document.querySelector('.store--item-list')
const cartItemList = document.querySelector('.cart--item-list')

function fruitAndVeg() {
  itemList.innerHTML = ''

  state.items.forEach((item) => {
    const li = document.createElement('li')
    itemList.appendChild(li)

    const div = document.createElement('div')
    div.setAttribute('class', 'store--item-icon')
    li.appendChild(div)

    const image = document.createElement('img')
    image.src = `assets/icons/${item.id}.svg`
    image.alt = `${item.id}`
    div.appendChild(image)
    // 2: From the store, a user can add an item to their cart
    const buttonAddToCart = document.createElement('button')
    buttonAddToCart.innerText = 'Add to Cart'
    li.appendChild(buttonAddToCart)
    buttonAddToCart.setAttribute('style', 'color: blue')
    buttonAddToCart.addEventListener('click', (event) => {
      cartItemsToBuy()
      itemsInTheCart(item)
      fruitAndVeg()
      total()
      // calling this function here in the addToCartListener tell the addToCartListener to run the fucntion when the click event is taking place.
    })

    cartItemsToBuy(item)
  })
}

// 2.1: add on click even to add the item and move from store data array to cart data array.

// below i am trying to copy the format given to me from the car-item.html
//
// the cartItemsToBuy is the function that holds the items that a user would purchase.

function cartItemsToBuy() {
  cartItemList.innerText = ''

  state.cart.forEach((item) => {
    // 2.2: create a li in the cart area to push the slected items to.
    const li = document.createElement('li')
    cartItemList.appendChild(li)

    const imageCart = document.createElement('img')
    imageCart.src = `assets/icons/${item.id}.svg`
    imageCart.alt = `${item.id}`
    console.log(item) // helps me gain the visibility needed

    imageCart.setAttribute('class', 'cart--item-icon')
    li.appendChild(imageCart)

    const p = document.createElement('p')
    p.innerText = item.name
    li.appendChild(p)

    const removeButton = document.createElement('button')
    const span = document.createElement('span')
    const addButton = document.createElement('button')

    addButton.setAttribute('class', 'quantity-btn add-btn center')
    span.setAttribute('class', 'quantity-text center')
    removeButton.setAttribute('class', 'quantity-btn remove-btn center')
    removeButton.innerText = '-'
    span.innerText = `${item.quantity}`
    addButton.innerText = '+'
    li.appendChild(addButton)
    li.appendChild(span)
    li.appendChild(removeButton)

    // below i am trying to write the fucntion that will help me change the quantity of the item in the cart

    //   3:If the item is already in the cart, increase the item's quantity in the cart or decrease

    //   4: From the cart, a user can view and adjust the number of items in their cart
    addButton.addEventListener('click', (event) => {
      item.quantity += 1
      cartItemsToBuy()
      total()
    })

    removeButton.addEventListener('click', (event) => {
      item.quantity -= 1
      cartItemsToBuy()
      // 5.1: for loop and an onclick event -> if data index = 0 then remove from cart data array
      if (item.quantity === 0) {
        const i = state.cart.indexOf(item)
        state.cart.splice(i, 1)
      }
      cartItemsToBuy()
      total()
    })
  })
}

function itemsInTheCart(item) {
  console.log(state.cart)
  //   5: If an item's quantity equals zero it is removed from the cart
  if (state.cart.find((product) => product.name === item.name) === undefined) {
    item.quantity = 1
    state.cart.push(item)
  } else {
    item.quantity += 1
  }
  console.log(item)
}

// 6: A user can view the current total in their cart
function total() {
  const cartTotal = document.querySelector('.total-number')

  let price = 0

  state.cart.forEach((item) => {
    price += item.price * item.quantity
  })

  cartTotal.innerText = `£${price}`

  // direct coorelation with quantity and times the
  // state.cart.items.price
}

fruitAndVeg()
