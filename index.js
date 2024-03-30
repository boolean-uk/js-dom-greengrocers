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
const listItemsInCart = document.querySelector('.item-list.cart--item-list')
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

    
  createItemImage(groceryItem)
  const imageOfItems = createItemImage(groceryItem)
  listItem.append(imageOfItems)
  
    
  const addToCartButton = document.createElement('button')
  addToCartButton.innerText = 'Add to cart'
  listItem.append(addToCartButton)

  addToCartButton.addEventListener('click', () => {createCartItems(groceryItem)})

  }  
}

creteItemsInHeader()



function createItemImage(groceryItem) {
  const itemImage = document.createElement('img')
  itemImage.alt = (`${groceryItem.name}`)
  itemImage.setAttribute('src', `assets/icons/${groceryItem.id}.svg`)
  return itemImage
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
  listItem.append(removeBtn)

  removeBtn.addEventListener('click', () => {countItems(groceryItem)})
  
  
  const quantityInCart = document.createElement('span')
  quantityInCart.classList = 'quantity-text center'

  const groceryTotal = cartTotal()
  totalNumber.innerText = `£${groceryTotal}`


  cart.push(groceryItem)
  const numOfItemsInCart = countItems(groceryItem)

  quantityInCart.innerText = numOfItemsInCart
  listItem.append(quantityInCart)

  

  const addBtn = document.createElement('button')
  addBtn.classList = 'quantity-btn add-btn center'
  addBtn.innerText = '+'
  listItem.append(addBtn)

  addBtn.addEventListener('click', () => {
    countItems(groceryItem)})
  

  listItemsInCart.append(listItem)
  cartContainer.append(listItemsInCart)
}


function countItems(groceryItem) {
  
  let totalOfEachItem = 0
  const groceryItemId = groceryItem.id

  const checkItemsInCart = cart.map((element) => {
    if (element.id === groceryItemId) {
      totalOfEachItem += 1
    }
    return totalOfEachItem
  })
  return totalOfEachItem
}


function cartTotal() {
  let groceryCartTotal = 0.35
  const checkItemPrices = cart.map((element) => {
    groceryCartTotal += element.price 
  })
  console.log(groceryCartTotal)
  return groceryCartTotal
}