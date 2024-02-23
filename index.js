const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "berry"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "berry"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "berry"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "vegetable"
    }
  ],
  cart: [],
  types: []
};

function capitalize(word){
  return word[0].toUpperCase() + word.slice(1)
}

function updateTypeList(){
  state.types = ['all']
  state.items.forEach(item => {
    if (!state.types.some(i => i === item.type)){
      state.types.push(item.type)
    }
  })
}

function populateStore(item) {
  return `
  <li class="store--item" store--item-id="${item.id}"> 
    <img src="assets/icons/${item.id}.svg" alt="${item.name}"/>
    ${capitalize(item.name)}
    <button class="store--add-item-button">
      Add to cart
    </button>
  </li>
  `
}

function populateCart(item) {
  return `
  <li class="cart--item" cart--item-id="${item.id}"> 
    <img src="assets/icons/${item.id}.svg" alt="${item.name}"/> 
    ${capitalize(item.name)}
    <button class="cart--remove-item-button">-</button>
    <span>${item.quantity}</span>
    <button class="cart--add-item-button">+</button>
  </li>
  `
}

function populateStoreSelect(type){
  return `
  <option value="${type}">${capitalize(type)}</option>
  `
}

function createStore() {
  const filterElement = document.getElementsByClassName('store-select store--filter-select')[0]
  return state.items
            .filter(item => item.type === filterElement.value || filterElement.value === 'all')
            .map(i => populateStore(i))
}

function createCart() {
  return state.cart.map(i => populateCart(i))
}

function createStoreSelect(){
  return state.types.map(t => populateStoreSelect(t))
}

function updateStore(){
  document.getElementsByClassName('item-list store--item-list')[0].innerHTML = createStore().join('')
  initStoreButtons()
}

function updateCart(){
  document.getElementsByClassName('item-list cart--item-list')[0].innerHTML = createCart().join('')
  initCartButtons()
  calculateSum()
}

function updateSelectFilter(){
  updateTypeList()
  document.getElementsByClassName('store-select store--filter-select')[0].innerHTML = createStoreSelect().join('')
}

function calculateSum(){
  let sum = 0
  const sumElement = document.querySelector('.total-number')
  state.cart.forEach(item => {
    sum += item.price * item.quantity
  })
  sumElement.textContent = "£" + (Math.round(sum * 100) / 100).toFixed(2)
}

function initStoreButtons(){
  productElements = document.querySelectorAll('.store--item')
  productElements.forEach(element => {
    element.querySelector('.store--add-item-button').addEventListener('click', () => {
      const itemId = element.getAttribute('store--item-id')
      if (state.cart.some(i => i.id === itemId)){
        state.cart.find(i => i.id === itemId).quantity++
      }else{
        const newItem = state.items.find(i => i.id === itemId)
        newItem.quantity = 1
        state.cart.push(newItem)
      }
      updateCart()
    })
  });
}

function initCartButtons(){
  cartElement = document.querySelectorAll('.cart--item')
  cartElement.forEach(element => {
    element.querySelector('.cart--remove-item-button').addEventListener('click', () => {
      const itemId = element.getAttribute('cart--item-id')
      if (state.cart.find(i => i.id === itemId).quantity <= 1){
        state.cart.splice(state.cart.indexOf(state.cart.find(i => i.id === itemId)), 1)
      }
      else {
        state.cart.find(i => i.id === itemId).quantity--
      }
      updateCart()
    })
    element.querySelector('.cart--add-item-button').addEventListener('click', () => {
      const itemId = element.getAttribute('cart--item-id')
      state.cart.find(i => i.id === itemId).quantity++
      updateCart()
    })
  })
}

function storeSelectChange(){
  updateStore()
}



updateSelectFilter()
updateStore()