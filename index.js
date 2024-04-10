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



const pageHeader = document.querySelector('#store')
const listOfItemsToBuy = document.querySelector('.item-list.store--item-list')
const main = document.querySelector('#cart')
const cartContainer = document.querySelector('.cart--item-list-container')
// const listItemsInCart = document.querySelector('.item-list cart--item-list')
const totalSection = document.querySelector('.total-section')
const totalNumber = document.querySelector('.total-number')
const cart = state.cart


function creteItemsInHeader() {
  for(let i = 0; i < state.items.length; i++) {
  const groceryItem = state.items[i]

  
  const listItem = document.createElement('li');
  listOfItemsToBuy.append(listItem)
  
  const itemIconContainer = document.createElement('div');itemIconContainer.classList.add('store--item-icon')
  listItem.append(itemIconContainer)

    
  const imageOfItems = createItemImage(groceryItem)
  listItem.append(imageOfItems)
  
    
  const addToCartButton = document.createElement('button')
  addToCartButton.innerText = 'Add to cart'
  // addToCartButton.addEventListener('click', () =>{addItemsToCart(groceryItem)})
  addToCartButton.addEventListener('click', () =>{
    const checkItemsInCart = cart.find((item) => item.id === groceryItem.id)
  if (checkItemsInCart) {
    checkItemsInCart.quantity++
  } else {
    const increaseQuantity = { ...groceryItem }
    increaseQuantity.quantity = 1
    cart.push(increaseQuantity)
  }
  renderCart()})

  listItem.append(addToCartButton)
  }  
}

creteItemsInHeader()

function createItemImage(groceryItem) {
  const itemImage = document.createElement('img')
  itemImage.alt = (`${groceryItem.name}`)
  itemImage.setAttribute('src', `assets/icons/${groceryItem.id}.svg`)
  return itemImage
}

function renderCart() {
  const listItemsInCart = document.querySelector('.cart--item-list')
  listItemsInCart.innerHTML =''

  for (let i = 0; i < cart.length; i++) {
    const cartListItem = createCartItems(cart[i])
    listItemsInCart.append(cartListItem)
  }
  cartTotal()
}

function createCartItems(groceryItem) {
    const listItem = document.createElement('li')
    
    createItemImage(groceryItem)
    const imageOfItems = createItemImage(groceryItem)
    listItem.append(imageOfItems)
  
    const itemName = document.createElement('p')
    itemName.innerText = groceryItem.name
    listItem.append(itemName)
  
    const removeBtn = document.createElement('button')
    removeBtn.classList = 'quantity-btn remove-btn center'
    removeBtn.innerText = '-'
    removeBtn.addEventListener('click', () => {
      if (groceryItem.quantity === 1) {
      const itemIndex = cart.findIndex(item => item.id === groceryItem.id)
      cart.splice(itemIndex, 1)
      renderCart()
      return
    }
    groceryItem.quantity--
    renderCart()})

    listItem.append(removeBtn)
    
    const quantityInCart = document.createElement('span')
    quantityInCart.classList = 'quantity-text center'
  
    const groceryTotal = cartTotal()
    totalNumber.innerHTML = groceryTotal
  
    const numOfItemsInCart = groceryItem.quantity
  
    quantityInCart.innerText = numOfItemsInCart
    listItem.append(quantityInCart)
  
    const addBtn = document.createElement('button')
    addBtn.classList = 'quantity-btn add-btn center'
    addBtn.innerText = '+'
    addBtn.addEventListener('click', () => {const checkItemsInCart = cart.find((item) => item.id === groceryItem.id)
      if (checkItemsInCart) {
        checkItemsInCart.quantity++
      }
      renderCart()
      })
    
    listItem.append(addBtn)
    console.log(cart)
    return listItem
  }

function cartTotal() {
  const cartTotal = cart.reduce((cartTotal, groceryItem) => cartTotal += groceryItem.quantity * groceryItem.price, 0)
  return `£${cartTotal.toFixed(2)}`
}

function subtractItemFromCart() {

    if (groceryItem.quantity === 1) {
      const itemIndex = cart.findIndex(item => item.id === groceryItem.id)
      cart.splice(itemIndex, 1)
      renderCart()
      return
    }
    groceryItem.quantity--
    renderCart()
} 

