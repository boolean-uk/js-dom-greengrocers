const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      type: "vegetable",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      type: "vegetable",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      type: "fruit",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      type: "vegetable",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      type: "vegetable",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      type: "fruit",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      type: "vegetable",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      type: "fruit",
      price: 1000
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      type: "fruit",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      type: "vegetable",
      price: 0.35
    }
  ],
  cart: []
};

const addToCart = (obj) => {
  const item = state.cart.find(c => c.id === obj.id)
  if (item){
    item.quantity++
  }
  else{
    state.cart.push(obj)
  }
  renderCart()
  total()
}

const adjustQuantity = (id, number) => {
  const item = state.cart.find(i => i.id === id)
  item.quantity += number
  if (item.quantity <= 0){
    const index = state.cart.indexOf(i => i.id === id)
    state.cart.splice(index, 1)
  }
  renderCart()
  total()
} 

const total = () => {
  const sum = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  document.querySelector(".total-number").innerHTML = `£${sum.toFixed(2)}`
}

const filter = (type) => {
  itemList = itemList.filter(i => i.type === type)
  renderGroceries() 
} 

const storeContainer = document.querySelector('.store--item-list');
const filters = document.querySelector(".filters")
const sortContainer = document.querySelector(".sort-buttons")
let itemList = [...state.items]
renderGroceries()
renderFilters()
renderSortButtons()

function renderGroceries(){
  storeContainer.innerHTML = ""
  itemList.forEach((item) => {
    const listItem = document.createElement('li')
    const container = document.createElement('div')
    const icon = document.createElement('img')
    const src = `assets/icons/${item.id}.svg`
    icon.src = src
    icon.alt = `${item.name}`
    container.append(icon)
    const button = document.createElement('button')
    button.innerHTML = "ADD TO CART"
    
    const obj = {
      id: item.id,
      icon: src,
      name: item.name,
      quantity: 1,
      price: item.price
    }
    
    button.addEventListener("click", () => addToCart(obj))
    listItem.append(container)
    listItem.append(button)
    storeContainer.append(listItem)
  })
}

function renderCart(){
  const cartContainer = document.querySelector('.cart--item-list')
  cartContainer.innerHTML = ""
  state.cart.forEach((item) => {
    const listItem = document.createElement('li')
    const icon = document.createElement('img')
    icon.classList.add('cart--item-icon')
    icon.src = item.icon
    icon.alt = item.name  
    listItem.append(icon)
  
    const title = document.createElement('p')
    title.innerText = item.name,
    listItem.append(title)
  
    const buttonReduce = document.createElement("button")
    buttonReduce.addEventListener("click", () => adjustQuantity(item.id, -1))    
    buttonReduce.classList.add("quantity-btn")
    buttonReduce.classList.add("remove-btn")
    buttonReduce.classList.add("center")
    buttonReduce.innerText = "-"
    listItem.append(buttonReduce)
    
    const span = document.createElement("span")
    span.classList.add("quantity-text")
    span.classList.add("center")
    span.innerText = item.quantity
    listItem.append(span)

    const buttonAdd = document.createElement("button")
    buttonAdd.addEventListener("click", () => adjustQuantity(item.id, 1))    
    buttonAdd.classList.add("quantity-btn")
    buttonAdd.classList.add("add-btn")
    buttonAdd.classList.add("center")
    buttonAdd.innerText = "+"  
    listItem.append(buttonAdd)  
    
    cartContainer.append(listItem)
  })
}


function renderFilters(){
  const fruit = document.createElement("button")
  fruit.innerText = "Fruit"
  fruit.addEventListener("click", () => filter("fruit"))
  filters.append(fruit)

  const vegetable = document.createElement("button")
  vegetable.innerText = "Vegetable"
  vegetable.addEventListener("click", () => filter("vegetable"))
  filters.append(vegetable)

  const clear = document.createElement("button")
  clear.innerText = "Clear Filters"
  clear.addEventListener("click", () => {
    itemList = [...state.items]
    renderGroceries()
  })
  filters.append(clear)
}

function renderSortButtons(){
  const alphabetical = document.createElement("button")
  alphabetical.innerText = "alphabetically"
  alphabetical.addEventListener("click", () => {
    itemList.sort(function(a, b) {
      return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
    })   
    renderGroceries()
  })
  sortContainer.append(alphabetical)

  const numerical = document.createElement("button")
  numerical.innerText = "by price"
  numerical.addEventListener("click", () => {
    itemList.sort((a, b) => a.price - b.price).reverse()
    renderGroceries()    
  })
  sortContainer.append(numerical)
}