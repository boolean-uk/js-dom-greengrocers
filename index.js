const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegtable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "vegtable"
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
      type: "vegtable"
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
      type: "vegtable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "vegtable"
    }
  ],
  cart: []
};

const storeListUL = document.querySelector(".store--item-list");
const cartListUL = document.querySelector(".cart--item-list");
const sortListUL = document.querySelector(".button")

const sortByDiv = document.createElement('div')

const allTypesButton = document.createElement('button')
allTypesButton.addEventListener('click', function(){
  storeListUL.innerHTML =""
  renderStore()
})
allTypesButton.textContent = 'All'
allTypesButton.classList.add('button')
sortByDiv.appendChild(allTypesButton)


const vegtableButton = document.createElement('button')
vegtableButton.addEventListener('click', function(){
  storeListUL.innerHTML =""
  renderVegtableStore()
})
vegtableButton.textContent = 'Vegtables'
vegtableButton.classList.add('button')
sortByDiv.appendChild(vegtableButton)

const fruitButton = document.createElement('button')
fruitButton.addEventListener('click', function(){
  storeListUL.innerHTML = ""
  renderFruitStore()
})
fruitButton.textContent = 'Fruits'
fruitButton.classList.add('button')
sortByDiv.appendChild(fruitButton)

sortListUL.appendChild(sortByDiv)



function renderStore(){
  for(let i = 0; i < state.items.length; i++){
    const storeLi = document.createElement('li')
    const storeDiv = document.createElement('div')
    storeDiv.classList.add('store--item-icon')

    const image = document.createElement('img')
    image.setAttribute('src', `assets/icons/${state.items[i].id}.svg`)

    const button = document.createElement('button')
    button.addEventListener('click',function(){
      addToCart(state.items[i])
    })

    button.textContent = "Add to cart"
    button.classList.add('button')

    storeDiv.appendChild(image)
    storeLi.appendChild(storeDiv)
    storeLi.appendChild(button)
    storeListUL.appendChild(storeLi)
  }
}


function renderVegtableStore(){
  for(let i = 0; i < state.items.length; i++){
    if(state.items[i].type === 'vegtable'){
      const storeLi = document.createElement('li')
      const storeDiv = document.createElement('div')
      storeDiv.classList.add('store--item-icon')

      const image = document.createElement('img')
      image.setAttribute('src', `assets/icons/${state.items[i].id}.svg`)

      const button = document.createElement('button')
      button.addEventListener('click',function(){
        addToCart(state.items[i])
      })

      button.textContent = "Add to cart"
      button.classList.add('button')

      storeDiv.appendChild(image)
      storeLi.appendChild(storeDiv)
      storeLi.appendChild(button)
      storeListUL.appendChild(storeLi)
    }
    
  }
}


function renderFruitStore(){
  for(let i = 0; i < state.items.length; i++){

    if(state.items[i].type === 'fruit'){
      const storeLi = document.createElement('li')
      const storeDiv = document.createElement('div')
      storeDiv.classList.add('store--item-icon')

      const image = document.createElement('img')
      image.setAttribute('src', `assets/icons/${state.items[i].id}.svg`)

      const button = document.createElement('button')
      button.addEventListener('click',function(){
        addToCart(state.items[i])
      })

      button.textContent = "Add to cart"
      button.classList.add('button')

      storeDiv.appendChild(image)
      storeLi.appendChild(storeDiv)
      storeLi.appendChild(button)
      storeListUL.appendChild(storeLi)
    }
  }
}




function addToCart(item){
  const cartItem = state.cart.find(cartItem => cartItem.id === item.id)
  if(cartItem){
    cartItem.quantity += 1
  }else {
    state.cart.push({...item, quantity: 1})
  }
  renderCart()
}

function removeFromCart(itemId){
  state.cart = state.cart.filter(item => item.id !== itemId)
}

function decreaseQuantity(itemId){
  const cartItem = state.cart.find(cartItem => cartItem.id === itemId)
  if(cartItem){
    cartItem.quantity -= 1

    if(cartItem.quantity === 0){
      removeFromCart(itemId)
    }
  }
  renderCart() 
}

function increaseQuantity(itemId){
  const cartItem = state.cart.find(cartItem => cartItem.id === itemId)
  if(cartItem){
    cartItem.quantity += 1
  }
  renderCart()
}

function renderCart(){
  cartListUL.innerHTML = ""
  let totalPrice = 0
  for(let i = 0; i < state.cart.length; i++){
    const cartLi = document.createElement('li')

    const image = document.createElement('img')
    image.setAttribute('src', `assets/icons/${state.cart[i].id}.svg`)
    image.classList.add('cart--item-icon')
    cartLi.appendChild(image)

    const name = document.createElement('p')
    name.textContent = state.cart[i].name
    cartLi.appendChild(name)

    const decreaseButton = document.createElement('button')
    decreaseButton.textContent ='-'
    decreaseButton.addEventListener('click', function(){
      decreaseQuantity(state.cart[i].id)
      renderCart()
    })
    decreaseButton.classList.add('remove-btn', 'center', 'quantity-btn')
    cartLi.appendChild(decreaseButton)

    const quantity = document.createElement('p')
    quantity.textContent = `${state.cart[i].quantity}`
    quantity.classList.add('quantity-text', 'center')
    cartLi.appendChild(quantity)
    
    const increaseButton = document.createElement('button')
    increaseButton.textContent ='+'
    increaseButton.addEventListener('click', function(){
      increaseQuantity(state.cart[i].id)
      renderCart()
    })
    increaseButton.classList.add('add-btn', 'center', 'quantity-btn')
    cartLi.appendChild(increaseButton)

    
    cartListUL.appendChild(cartLi)

    const subtotal = state.cart[i].quantity * state.cart[i].price
    totalPrice += subtotal
  }
  const totalNumber = document.querySelector('.total-number')
  totalNumber.textContent = `£${totalPrice.toFixed(2)}`
}


function main(){
  renderStore()
}

main()