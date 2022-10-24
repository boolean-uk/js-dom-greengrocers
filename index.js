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

    const button = document.createElement('button')
    button.innerText = 'Add to Cart'
    li.appendChild(button)
  })
}

fruitAndVeg()

// - From the store, a user can add an item to their cart
// add on click even to add the item

//   - If the item is already in the cart, increase the item's quantity in the cart

//   - From the cart, a user can view and adjust the number of items in their cart

//   - If an item's quantity equals zero it is removed from the cart

// - A user can view the current total in their cart
