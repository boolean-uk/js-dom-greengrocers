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
      price: 0.35
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

const storeList = document.querySelector('.store--item-list')
const cartList = document.querySelector('.cart--item-list')
const totalPrice = document.querySelector(".total-number")

const filterButtons = document.querySelectorAll('.filter-btn')

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const type = button.dataset.type
    renderStore(type)
  })
})

function renderStore(filterType = ''){

  storeList.innerHTML = ''

  for (let i = 0; i < state.items.length; i++) {

    const item = state.items[i]
  
    if (filterType === '' || item.type === filterType)  {
      const itemLi = document.createElement('li')
      const itemDiv = document.createElement('div')
      const itemImg = document.createElement('img')
      const itemButton = document.createElement('button')

      itemButton.addEventListener('click', () => {
        addCart(item)
      })
    
      itemDiv.class = ('store--item-icon')
      itemImg.src = `assets/icons/${item.id}.svg`
      itemImg.alt = item.name
      itemButton.innerText = 'Add to cart'
    
      storeList.appendChild(itemLi)
      itemLi.appendChild(itemDiv)
      itemDiv.appendChild(itemImg)
      itemLi.appendChild(itemButton)
    }
  }
}

function renderCart(){

  const total = state.cart.reduce((acc, item) => acc + (item.price * item.count), 0)
  totalPrice.innerText = '£' + total.toFixed(2)

  cartList.innerHTML = ''

  for (let i = 0; i < state.cart.length; i++) {

    const item = state.cart[i]
  
   const itemLi = document.createElement('li')
   const itemImg = document.createElement('img')
   const itemName = document.createElement('p')
   const buttonDec= document.createElement('button')
   const buttonCount= document.createElement('button')
   const buttonAdd= document.createElement('button')
   
  buttonDec.addEventListener('click', handleDec)
  buttonAdd.addEventListener('click', handleAdd)

  buttonDec.style.color = 'white'
  buttonDec.style.backgroundColor = 'red'
  buttonAdd.style.color = 'white'
  buttonAdd.style.backgroundColor = 'green'
    
  function handleDec() {
    if (item.count > 0) {
    buttonCount.innerText = --item.count
    renderCart() 
    }
  }
  
  function handleAdd() {
    buttonCount.innerText = ++item.count
    renderCart()
  }

  itemImg.class = 'cart--item-icon'
  itemImg.src = `assets/icons/${item.id}.svg`
  itemImg.alt = item.name
  itemName.innerText = item.name
  
  buttonCount.class = 'counter'
  buttonDec.innerText = '-'
  buttonCount.innerText = item.count
  buttonAdd.innerText = '+'

  itemLi.appendChild(itemImg)
  itemLi.appendChild(itemName)
  itemLi.appendChild(buttonDec)
  itemLi.appendChild(buttonCount)
  itemLi.appendChild(buttonAdd)
  cartList.appendChild(itemLi)
  }
}

function addCart(produce) {
  const foundItem = state.cart.find(item => item.id === produce.id)

  if (foundItem) {
    foundItem.count++
  } else {
    produce.count = 1
    state.cart.push(produce)
  }
  renderCart()
  const total = state.cart.reduce((acc, item) => acc + (item.price * item.count), 0)
  totalPrice.innerText = '£' + total.toFixed(2)
}

renderStore()