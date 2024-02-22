function main() {
  storeItems()
  cartItems()
}


function storeItems() {
  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i]

    const li = document.createElement('li')
    const div = document.createElement('li')

    div.classList = 'Store--item-icon'

    const img = document.createElement('img')
    img.className = "store--item-icon"
    img.src = `assets/icons/${item.id}.svg`
    img.alt = item.name

    const button = document.createElement('button')
    button.addEventListener('click', function () {
      addToCart(item)
    }) 
    button.textContent = "Add to cart"

    div.appendChild(img)
    li.appendChild(div)
    li.appendChild(button)
    storeList.appendChild(li)
  }
}

function cartItems() {
  cartList.innerHTML = ""
  let sum = 0
  for (let i = 0; i < state.cart.length; i++) {
    const item = state.cart[i]
    
    const li = document.createElement('li')

    // Image
    const img = document.createElement('img')
    img.className = "cart--item-icon"
    img.src = `assets/icons/${item.id}.svg`
    li.appendChild(img)

    // Name
    const p = document.createElement('p')
    p.textContent = item.name
    li.appendChild(p)

    // Buttons 
    const buttonDcr = document.createElement('button')
    buttonDcr.classList.add('quantity-btn', 'remove-btn', 'center')
    buttonDcr.addEventListener('click', function () {
      decrement(item)
    }) 
    buttonDcr.textContent = "-"
    li.appendChild(buttonDcr)

    const buttonIcr = document.createElement('button')
    buttonIcr.classList.add('quantity-btn', 'add-btn', 'center')
    buttonIcr.addEventListener('click', function () {
      increment(item)
    }) 
    buttonIcr.textContent = "+"
    
    // Quantity display 
    const span = document.createElement('span')
    span.classList.add('quantity-text', 'center')
    span.textContent = `${item.quantity}`
    li.appendChild(span)

    li.appendChild(buttonIcr)

    cartList.appendChild(li)

    sum += item.quantity * item.price
  }

  const total = document.querySelector(".total-number")
  total.innerText = sum.toFixed(2)
}

function addToCart(item) {
  let obj = state.cart.find(i => i.id === item.id)
  
  if (obj) {
    obj.quantity += 1
  }
  else {
    item.quantity = 1
    state.cart.push(item)
  }
  cartItems()
}

function increment(item) {
  let obj = state.cart.find(i => i.id === item.id)
  obj.quantity += 1
  cartItems()
}

function decrement(item) {
  let obj = state.cart.find(i => i.id === item.id)
  obj.quantity -= 1
  if (obj.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== item.id)
  }
  cartItems() 
}

const storeList = document.querySelector(".store--item-list");
const cartList = document.querySelector(".cart--item-list");

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
  cart: [{
    id: "001-beetroot",
    name: "beetroot",
    price: 0.35, 
    quantity: 2
  }]
};

main()