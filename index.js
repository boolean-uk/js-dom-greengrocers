const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      
      price: 0.35,
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

const headerStore = document.querySelector('#store')
const storeItemList = document.querySelector('.store--item-list')
const mainCart = document.querySelector('#cart')
const cartItemListContainer = document.querySelector('.cart--item-list-container')
const cartItemList = document.querySelector('.cart--item-list')
const totalSection = document.querySelector('.total-section')
const totalNbr = document.querySelector('.total-number')

// for ul card and ul store
const itemList = document.querySelector('.item-list')

const itemsInCart = state.cart
function render() {
  showStoreItems()
  
}

function showStoreItems(){
  const items = state.items
  for(element in items) {
    const liItem = document.createElement('li')
    liItem.style.listStyleType = 'none'

    const divItem = document.createElement('div')
    divItem.classList.add('store--item-icon')

    const image = createStoreImage(items)
    const button = createStoreButton(items, element)

    divItem.append(image)
    liItem.append(divItem, button)
    storeItemList.append(liItem)
  };
}

function createStoreImage(items){
  const image = document.createElement('img')
    image.setAttribute('src',`./assets/icons/${items[element].id}.svg`)
    image.setAttribute('alt',`${items[element].name}`)
    
    return image
}

function createStoreButton(itemName, element){
  const button = document.createElement('button')
  button.innerText = 'Add to cart'
  button.addEventListener('click', () => addItem(itemName, element))
  return button
}

function addItem(itemName, element) {

  const newItem = itemName[element]
  console.log(itemsInCart)
  const existingItem = itemsInCart.find(item => {
    item.id === newItem.id
  })

  if(existingItem){
  } else {
    itemsInCart.push(itemName[element])
    showCartItems(itemName, element)
  }  
  // console.log(newItem)
}
function showCartItems(items, element){
  
  const pName = createCartPName (items, element) 
 
  const liItem = document.createElement('li')
  const image = createCartImage(items, element)
  const buttonMinus = createMinusButton()
  const span = createSpan()
  const buttonPlus = createPlusButton()

  liItem.append(image, pName, buttonMinus, span, buttonPlus)
  cartItemList.append(liItem)
}

function createCartImage(items, element) {
  const image = document.createElement('img')
  image.classList.add('cart--item-icon')
  image.setAttribute('src',`./assets/icons/${items[element].id}.svg`)
  image.setAttribute('alt',`${items[element].name}`)
  return image
}

function createCartPName (items, element) {
  const pName = document.createElement('p')
  pName.innerText = items[element].name
  return pName
}

function createSpan() {
  const span = document.createElement('span')
  span.innerText = 1
  span.classList.add('quantity-text')
  span.classList.add('center')
  return span
}

function createMinusButton(){
  const buttonMinus = document.createElement('button')
  buttonMinus.classList.add('quantity-btn')
  buttonMinus.classList.add('remove-btn')
  buttonMinus.classList.add('center')
  buttonMinus.innerText = '-'
  return buttonMinus
}

function createPlusButton(){
  const buttonPlus = document.createElement('button')
  buttonPlus.classList.add('quantity-btn')
  buttonPlus.classList.add('add-btn')
  buttonPlus.classList.add('center')
  buttonPlus.innerText = '+'
  return buttonPlus
}

function checkForItem(itemName,element){
  
}
render()