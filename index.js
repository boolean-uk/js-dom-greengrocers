const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      type: "Vegetable",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      type: "Vegetable",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      type : "Fruits",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      type : "Fruits",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      type: "Vegetable",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      type : "Fruits",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      type: "Vegetable",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      type : "Fruits",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      type : "Fruits",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      type: "Vegetable",
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

const objectNo = {
   number : 0
  }
tempItems = state.items

for(i in tempItems){
  tempItems[i] = Object.assign(tempItems[i], objectNo)
}

let itemsInCart = state.cart
const itemsList = state.items

function render() {
  const typeGreenGrocers = 'Greengrocers'
  
  seletType()
  showStoreItems(typeGreenGrocers)
}

function seletType(){
  headerStore.innerHTML = ''
  const h1Header = document.createElement('h1')
  h1Header.innerText = 'Greengrocers'
  const allBtn = document.createElement('Button')
  allBtn.innerText = 'Greengrocers'
  allBtn.addEventListener('click', () => {
    h1Header.innerText = 'Greengrocers'
    const typeSeleted = 'Greengrocers'
    showStoreItems(typeSeleted)
  })
  const vegetableBtn = document.createElement('Button')
    vegetableBtn.innerText = 'Vegetable'
    vegetableBtn.addEventListener('click', () => {
    const typeSeleted = 'Vegetable'
    h1Header.innerText = 'Vegetable'
    showStoreItems(typeSeleted)
  })
  const fruitBtn = document.createElement('Button')
  fruitBtn.innerText = 'Fruits'
  fruitBtn.addEventListener('click', () => {
    const typeSeleted = 'Fruits'
    h1Header.innerText = 'Fruits'
    showStoreItems(typeSeleted)
  })
  headerStore.append(allBtn,vegetableBtn,fruitBtn, h1Header, storeItemList)
}
function showStoreItems(type){

  storeItemList.innerHTML = ''
  for(element in itemsList) {
    
    if(itemsList[element].type === type) {
    const liItem = document.createElement('li')
    liItem.style.listStyleType = 'none'
    const divItem = document.createElement('div')
    divItem.classList.add('store--item-icon')
    const image = createStoreImage(itemsList)
    const button = createStoreButton(itemsList, element)
    divItem.append(image)
    liItem.append(divItem, button)
    storeItemList.append(liItem)
    } else if(type === 'Greengrocers'){
      const liItem = document.createElement('li')
    liItem.style.listStyleType = 'none'
    const divItem = document.createElement('div')
    divItem.classList.add('store--item-icon')
    const image = createStoreImage(itemsList)
    const button = createStoreButton(itemsList, element)
    divItem.append(image)
    liItem.append(divItem, button)
    storeItemList.append(liItem)
    }
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
  button.addEventListener('click', () =>
   addItem(itemName, element))
  return button
}

function addItem(itemName, element) {
  let newItem = itemName[element]
  const existingItem = itemsInCart.find(item => {
    if(item.name === newItem.name) {
      return true
    }
    else {
      return false
    }
  })
  
  if(existingItem){
    newItem.number++
    showCartItems(itemsInCart)
  } else {
    newItem.number++
    itemsInCart.push(newItem)
    showCartItems(itemsInCart)
  }  
}

function showCartItems(items){

  cartItemList.innerHTML = ''
  totalNbr.innerHTML = ''
  let totalPrice = 0
  for(element in items){
    if(items[element].number === 0 ){
      items.splice(element,1)

      if(items.length === 0){
      } else 
      {
        showCartItems(items)
        
      }
    } else {
      const pName = createCartPName(items[element]) 
      const liItem = document.createElement('li')
      const image = createCartImage(items[element])
      const buttonMinus = createMinusButton(items,element)
      const span = createSpan(items[element])
      const buttonPlus = createPlusButton(items , element)

      const value = items[element].price * items[element].number
      totalPrice +=value
      
      totalNbr.innerText = `£ : ${totalPrice.toFixed(2)}`
      liItem.append(image, pName, buttonMinus, span, buttonPlus)
      cartItemList.append(liItem)
    } 
  }
}

function createCartImage(items) {
  const image = document.createElement('img')
  image.classList.add('cart--item-icon')
  image.setAttribute('src',`./assets/icons/${items.id}.svg`)
  image.setAttribute('alt',`${items.name}`)
  return image
}

function createCartPName (items) {
  const pName = document.createElement('p')
  pName.innerText = items.name
  return pName
}

function createSpan(item) {
  const span = document.createElement('span')
  span.innerText = item.number
  span.classList.add('quantity-text')
  span.classList.add('center')
  return span
}

function createMinusButton(item,element){
  const buttonMinus = document.createElement('button')
  buttonMinus.classList.add('quantity-btn')
  buttonMinus.classList.add('remove-btn')
  buttonMinus.classList.add('center')
  buttonMinus.innerText = '-'
  buttonMinus.addEventListener('click', () =>{
    item[element].number--
    showCartItems(itemsInCart)
  })
  return buttonMinus
  
}

function createPlusButton(item,element){
  const buttonPlus = document.createElement('button')
  buttonPlus.classList.add('quantity-btn')
  buttonPlus.classList.add('add-btn')
  buttonPlus.classList.add('center')
  buttonPlus.innerText = '+'
  buttonPlus.addEventListener('click', () => {
    
    item[element].number++
    showCartItems(itemsInCart)
  })
  return buttonPlus
}

render()