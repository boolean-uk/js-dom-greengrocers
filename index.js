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



function creteItemsInHeader() {
  for(let i = 0; i < state.items.length; i++) {
  const loopItems = state.items[i]

  
  const listItem = document.createElement('li');
  listOfItemsToBuy.append(listItem)
  
  const itemIconContainer = document.createElement('div');itemIconContainer.classList.add('store--item-icon')
  listItem.append(itemIconContainer)

    
  createItemImage(loopItems)
  const imageOfItems = createItemImage(loopItems)
  listItem.append(imageOfItems)
  
    
  const addToCartButton = document.createElement('button')
  addToCartButton.innerText = 'Add to cart'
  listItem.append(addToCartButton)

  addToCartButton.addEventListener('click', () => {createCartItems(loopItems)})

  }  
}

creteItemsInHeader()



function createItemImage(loopItems) {
  const itemImage = document.createElement('img')
  itemImage.alt = (`${loopItems.name}`)
  itemImage.setAttribute('src', `assets/icons/${loopItems.id}.svg`)
  return itemImage
}




function createCartItems(loopItems) {
  const listItem = document.createElement('li')
  
  createItemImage(loopItems)
  const imageOfItems = createItemImage(loopItems)
  listItem.append(imageOfItems)



  const itemName = document.createElement('p')
  itemName.innerText = loopItems.name
  listItem.append(itemName)



  const removeBtn = document.createElement('button')
  removeBtn.classList = 'quantity-btn remove-btn center'
  listItem.append(removeBtn)

  const addBtn = document.createElement('button')
  addBtn.classList = 'quantity-btn add-btn center'
  listItem.append(addBtn)



  const quantityInCart = document.createElement('span')
  quantityInCart.classList = 'quantity-text center'

  const itemsInCart = state.cart.push(loopItems.name)
  const numOfItemsInCart = countItems(loopItems)
  
  quantityInCart.innerText = numOfItemsInCart
  console.log(itemsInCart)
  console.log(numOfItemsInCart)
  listItem.append(quantityInCart)


  
  listItemsInCart.append(listItem)
  cartContainer.append(listItemsInCart)
}


function countItems(loopItems) {
  const totalItems = 0
  for (let i = 0; i < state.cart.length; i++) {
    if (loopItems === state.cart[i]) {
      totalItems += 1
      return totalItems
  
    }
    
  }
  
}