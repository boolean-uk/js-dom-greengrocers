const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      quantity: 0,
      price: 0.35,
      total: 0
    },
    {
      id: "002-carrot",
      name: "carrot",
      quantity: 0,
      price: 0.35,
      total: 0
    },
    {
      id: "003-apple",
      name: "apple",
      quantity: 0,
      price: 0.35,
      total: 0
    },
    {
      id: "004-apricot",
      name: "apricot",
      quantity: 0,
      price: 0.35,
      total: 0
    },
    {
      id: "005-avocado",
      name: "avocado",
      quantity: 0,
      price: 0.35,
      total: 0
    },
    {
      id: "006-bananas",
      name: "bananas",
      quantity: 0,
      price: 0.35,
      total: 0
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      quantity: 0,
      price: 0.35,
      total: 0
    },
    {
      id: "008-berry",
      name: "berry",
      quantity: 0,
      price: 0.35,
      total: 0
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      quantity: 0,
      price: 0.35,
      total: 0
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      quantity: 0,
      price: 0.35,
      total: 0
    }
  ],
  cart: []
};

const storeList = document.querySelector('ul')
const cartList = document.querySelector('.cart--item-list')
const cartPrice = document.querySelector('.total-number')

function renderShopList() {
  for (i = 0; i < state.items.length; i++) {
    let item = state.items[i]

    //creates list element and img element
    const shopItem = document.createElement('li')
    shopItem.setAttribute('id', state.items[i].id)
    const itemImage = document.createElement('img')

    // uses string interpolation within the loop to retrieve all images
    itemImage.setAttribute('src', `/assets/icons/${state.items[i].id}.svg`)
    itemImage.setAttribute('alt', '')
    itemImage.setAttribute('height', '100')
    itemImage.style.objectFit = 'cover'

    // adds a purchase button as a child so it does not count as its own element
    const purchaseButton = document.createElement('button')

    purchaseButton.innerText = "Add to Cart"

    // assigns an id to each button to give them individual uses
    purchaseButton.setAttribute('id', state.items[i].id)

    // listens for a click event
    purchaseButton.addEventListener('click', () => {
    item.quantity++    // adds 1 to the quantity
    item.total = item.quantity * item.price
    if(state.cart.includes(item)) {     // checks to see if the item already exists within the array 
      renderCart()
      return
    }
    state.cart.push(item)
    renderCart()
    })

    shopItem.append(itemImage, purchaseButton)
    storeList.append(shopItem)
  }
}

function renderCart() {

  cartList.innerHTML = ''

for (i = 0; i < state.cart.length; i++) {
  let item = state.cart[i]
  console.log(item)

  const cartItem = document.createElement('li')

  const itemImage = document.createElement('img')
  itemImage.setAttribute('src', `/assets/icons/${state.cart[i].id}.svg`)
  itemImage.setAttribute('alt', '')
  itemImage.setAttribute('height', '22')
  itemImage.style.objectFit = 'cover'

  const itemName = document.createElement('p')
  itemName.innerText = state.cart[i].name

  const removeButton = document.createElement('button')
  removeButton.innerText = '-'

  removeButton.addEventListener('click', () => {
    item.quantity --
    item.total = item.quantity * item.price
    for (k = 0; k < state.cart.length; k++) // loops through the whole array to spot 0 values and remove them
    if(state.cart[k].quantity === 0) {
      state.cart.splice(k, 1) // splices items from the array
      renderCart()
      return
    }
    renderCart()
  })

  const quantityCounter = document.createElement('span')
  quantityCounter.innerText = item.quantity

  const addButton = document.createElement('button')
  addButton.innerText = '+'
  addButton.addEventListener('click', () => {
    item.quantity ++
    item.total = item.quantity * item.price

    renderCart()
   })
  cartItem.append(itemImage, itemName, removeButton, quantityCounter, addButton)
  cartList.append(cartItem)}
  updatePrice()
}

function updatePrice() {
  let price = 0
  console.log(state.cart)
  for (let i = 0; i < state.cart.length; i++) {
    console.log(state.cart[i])
    price += state.cart[i].total
    console.log(price)
    
  }
  cartPrice.innerText = `£${price.toFixed(2)}`
}



renderShopList(state)