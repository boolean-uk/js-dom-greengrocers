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

const itemListUL = document.querySelector('#store .store--item-list')
const cartListUL = document.querySelector('#cart .cart--item-list')
const addToCartButtons = document.querySelectorAll('#store .store--item-button');
const total = document.querySelector('.total-number')

function renderStoreItems() {
    itemListUL.innerHTML = ''

    for (let i = 0; i < state.items.length; i++) {
        const item = state.items[i]
        const itemLi = document.createElement('li')

        const div = document.createElement('div')
        div.classList.add('store--item-icon')
        
        const img = document.createElement('img')
        img.setAttribute('src', `assets/icons/${item.id}.svg`)
        img.setAttribute('alt', item.name)

        const button = document.createElement('button')
        button.classList.add('store--item-button')
        button.setAttribute('type', 'button')
        button.textContent = 'Add to cart'
        button.addEventListener('click', function(){
          addToCart(item, 1)
        })
      
        div.appendChild(img)
        itemLi.appendChild(div)
        itemLi.appendChild(button)

        itemListUL.appendChild(itemLi)
    }
}

function renderCart() {
  cartListUL.innerHTML = ''

  for (let i = 0; i < state.cart.length; i++){
    const item = state.cart[i]
    const cartLi = document.createElement('li')
    cartLi.setAttribute('id', item.id)

    const img = document.createElement('img')
    img.classList.add('cart--item-icon')
    img.setAttribute('src', `assets/icons/${item.id}.svg`)
    img.setAttribute('alt', item.name)

    const p = document.createElement('p')
    p.textContent = item.name.charAt(0).toUpperCase() + item.name.slice(1)

    const buttonRemove = document.createElement('button')
    buttonRemove.classList.add('quantity-btn', 'remove-btn', 'center')
    buttonRemove.textContent = '-'
    buttonRemove.addEventListener('click', function() {
      removeFromCart(item, item.quantity - 1)
    })

    const quantity = document.createElement('span')
    quantity.classList.add('quantity-text', 'center')
    quantity.textContent = item.quantity 

    const buttonAdd = document.createElement('button')
    buttonAdd.classList.add('quantity-btn', 'add-btn', 'center')
    buttonAdd.textContent = '+'
    buttonAdd.addEventListener('click', function(){
      addToCart(item, item.quantity + 1)
    })

    cartLi.appendChild(img)
    cartLi.appendChild(p)
    cartLi.appendChild(buttonRemove)
    cartLi.appendChild(quantity)
    cartLi.appendChild(buttonAdd)

    cartListUL.appendChild(cartLi)
  }
}

function addToCart(item, quantity) {
  const itemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id)

  if (itemIndex !== -1){
    state.cart[itemIndex].quantity = quantity
  } else {
    cartObj = {...item, quantity}
    state.cart.push(cartObj)
  }
  
  renderCart()
  displayTotal()
}

function removeFromCart(item, quantity){
  const itemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id)
  if (quantity <= 0) {
    state.cart.splice(itemIndex, 1)
  } else {
    state.cart[itemIndex].quantity = quantity
  }

  renderCart()
  displayTotal()
}


function displayTotal(){
  let totalCost = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  totalCost = totalCost.toFixed(2)
  total.textContent = `£${totalCost}`
}

function main() {
    renderStoreItems()
    renderCart()
    displayTotal()
}

main()
