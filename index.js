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
      price: 0.55
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.05
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.15
    }
  ],
  cart: []
};

//Root elements
const cartItemUL = document.querySelector('.cart--item-list')
const storeItemUL = document.querySelector('.store--item-list')
const totalSpan = document.querySelector('.total-number')
const h1 = document.querySelector('h1')
let chosenType = ''

//Extension 1
//Add type to the existing products
function addTypeToExisting(){
  for(let i = 0; i < state.items.length; i ++){
    const fruit = state.items[i]
    fruit.type = 'fruit'
  }  
}

//Create other category
function addNewProducts(){
  let idCount = 10
  for(let i = 0; i < 10; i ++){
    let newProd = {}
    idCount++
    newProd.id = `${idCount} - item`
    
    newProd.name = `${idCount} name`
    newProd.price = idCount - 0.55
    newProd.type = 'other'

    state.items.push(newProd)
  }
}

//Render filter buttons
function renderButtons(){
  const showAllButton = document.createElement('button')
  showAllButton.textContent = 'Show all'

  const filterFruitButton = document.createElement('button')
  filterFruitButton.textContent = 'Filter fruits'

  const filterOtherButton = document.createElement('button')
  filterOtherButton.textContent = 'Filter other'

  const sortAlph = document.createElement('button')
  sortAlph.textContent = 'Sort A-Z'

  const sortPrice = document.createElement('button')
  sortPrice.textContent = 'Sort by price'

  //EventListeners
  showAllButton.addEventListener('click',() => {
    chosenType = ''
    renderStore()
  })
  filterFruitButton.addEventListener('click',() => {
    chosenType = 'fruit'
    renderStore()
  })
  filterOtherButton.addEventListener('click',() => {
    chosenType = 'other'
    renderStore()
  })
  sortAlph.addEventListener('click',() => {
    sortAlpha()
  })
  sortPrice.addEventListener('click',() => {
    sortByPrice()
  })

  const buttonDiv = document.createElement('div')

  buttonDiv.append(showAllButton)
  buttonDiv.append(filterFruitButton)
  buttonDiv.append(filterOtherButton)
  buttonDiv.append(sortAlph)
  buttonDiv.append(sortPrice)
  h1.append(buttonDiv)
}

//Render cart
function renderCart(){
  renderTotalSpan()
  cartItemUL.innerHTML = ''
  for(let i = 0; i < state.cart.length; i ++){
    const product = state.cart[i]
    const cartLi = document.createElement('li')
    //img
    const idName = product.id
    const cartIcon = document.createElement('img')
    cartIcon.setAttribute('class','cart--item-icon')
    cartIcon.setAttribute('src',`assets/icons/${idName}.svg`)
    cartIcon.setAttribute('alt',product.name)
    //p
    const title = document.createElement('p')
    title.innerText = product.name
    //Buttons
    const decreaseButton = document.createElement('button')
    decreaseButton.setAttribute('class','quantity-btn remove-btn center')
    decreaseButton.textContent = '-'
    //EventListener
    decreaseButton.addEventListener('click',() => {
      //Decrease product count
      decreaseProduct(product)
    })
    const increaseButton = document.createElement('button')
    increaseButton.setAttribute('class','quantity-btn add-btn center')
    increaseButton.textContent = '+'
    //EventListener
    increaseButton.addEventListener('click',() => {
      //Increase product count
      increaseProduct(product)
    })
  
    //Span
    const storeSpan = document.createElement('span')
    storeSpan.setAttribute('class','quantity-text center')
    //Listen for counts
    storeSpan.textContent = product.count

    cartLi.appendChild(cartIcon)
    cartLi.appendChild(title)
    cartLi.appendChild(decreaseButton)
    cartLi.appendChild(storeSpan)
    cartLi.appendChild(increaseButton)
    cartItemUL.appendChild(cartLi)
  }
}
//Render store
function renderStore(){
  storeItemUL.innerHTML = ''
  for(let i = 0; i < state.items.length; i ++){
    const product = state.items[i]
    if (chosenType === '' || product.type === chosenType){
      const storeLi = document.createElement('li')
      const storeDiv = document.createElement('div')
      storeDiv.setAttribute('class','store--item-icon')
      const idName = state.items[i].id
      const storeIcon = document.createElement('img')
      storeIcon.setAttribute('src',`assets/icons/${idName}.svg`)
      //Button
      const storeButton = document.createElement('button')
      storeButton.textContent = 'Add to cart'
      //EventListener
      storeButton.addEventListener('click',() => {
        //Get the item
        addProductToCart(product)
    })
      storeDiv.appendChild(storeIcon)
      storeLi.appendChild(storeDiv)
      storeLi.appendChild(storeButton)
      storeItemUL.appendChild(storeLi)
  } 
}
}

//Render total cost
function renderTotalSpan(){
  var totalCost = 0
  for(let i = 0; i < state.cart.length; i++){
    totalCost += state.cart[i].price * state.cart[i].count
  }
  totalSpan.innerText = '£: '+ totalCost.toFixed(2)
}

//Sort list
function sortAlpha(){
  state.items = state.items.sort((a, b) => a.name.localeCompare(b.name))
  renderStore()
}

function sortByPrice(){
  state.items = state.items.sort((a, b) => a.price - b.price)
  renderStore()
}

//Button functions
function addProductToCart(product){
  //Check if the item already exists
  if(state.cart.includes(product)){
    productInCart = state.cart.find(item => item.id === product.id)
    //Add one to count
    productInCart.count++
  } else {
    //Create count and add to cart
    product.count = 1
    state.cart.push(product)
  }  
  renderCart()
}

function increaseProduct(product){
  productInCart = state.cart.find(item => item.id === product.id)
  productInCart.count++
  renderCart()
}

function decreaseProduct(product){
  if(product.count > 1){
    product.count--
  }else{
    product.count--
    state.cart.splice(state.cart.indexOf(product), 1)
  }
  renderCart()
}


//Render page
function renderGrocers(){
  addTypeToExisting()
  addNewProducts()
  renderButtons()
  renderStore()
  renderCart()
}

function main(){
  renderGrocers()
}
main()