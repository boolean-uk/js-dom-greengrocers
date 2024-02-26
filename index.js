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

const storeItemsUL = document.querySelector('#store-inventory')
const cartItemsUL = document.querySelector('#cart-inventory')

// STORE FUNCTIONS

function addItemsToStore(arrayOfItems) {
  for(const item of arrayOfItems.items) {
    createStoreItem(item)
  }
}

function createStoreItem(item) {
  const productLi = document.createElement('li')
  const iconContainerDiv = document.createElement('div')

  const iconImg = document.createElement('img')
  iconImg.setAttribute('src', `assets/icons/${item.id}.svg`)
  iconImg.setAttribute('alt', `${item.name}`)

  const addToCartBtn = document.createElement('button')
  addToCartBtn.textContent = "Add To Cart"
  addToCartBtn.addEventListener('click', function() {
      addToCart(item, 1)
  })

  productLi.appendChild(iconContainerDiv)
  iconContainerDiv.appendChild(iconImg)
  productLi.appendChild(addToCartBtn)
  storeItemsUL.appendChild(productLi)
}

// CART FUNCTIONS

function createCartItem(item) {
  const productLi = document.createElement('li')

  const iconImg = document.createElement('Img')
  iconImg.setAttribute('src', `assets/icons/${item.id}.svg`)
  iconImg.setAttribute('alt', `${item.name}`)

  const productNameP = document.createElement('p')
  productNameP.textContent = `${item.name}`

  const productRemoveBtn = document.createElement('button')
  productRemoveBtn.classList.add('remove-btn')
  productRemoveBtn.textContent = '-'
  productRemoveBtn.addEventListener('click', function() {
    item.quantity--
    updateCartItems()
  })

  const productQuantitySpan = document.createElement('span') // make input
  productQuantitySpan.textContent = `${item.quantity}`

  productAddBtn = document.createElement('button')
  productAddBtn.classList.add('add-btn')
  productAddBtn.textContent = '+'
  productAddBtn.addEventListener('click', function() {
    item.quantity++
    updateCartItems()
  })

  productLi.appendChild(iconImg)
  productLi.appendChild(productNameP)
  productLi.appendChild(productRemoveBtn)
  productLi.appendChild(productQuantitySpan)
  productLi.appendChild(productAddBtn)

  cartItemsUL.appendChild(productLi)
}

function cleanupCartItems() {
  for(let i = 0; i < state.cart.length; i++) {
    if(state.cart[i].quantity <= 0) {
      state.cart.splice(i, 1)
    }
  }
}

function updateCartItems() {
  cartItemsUL.innerHTML = ""
  cleanupCartItems()
  for(const item of state.cart) {
    createCartItem(item)
  }
  displaySum()
}

function addToCart(item, quantity) {

  const sameInCart = state.cart.find(x => x.id === item.id)
  if(sameInCart === undefined) {
    item.quantity = quantity
    state.cart.push(item)
  } else {
    sameInCart.quantity += quantity
  }
  updateCartItems()
}

// Total

function getSum() {
  let price = 0
  for(let item of state.cart) {
    price += (item.price * item.quantity)
  }

  return price
}

sumSpan = document.querySelector('#total-sum')

function displaySum() {
  sumSpan.textContent = `£${getSum().toFixed(2)}`
}

function main() {
  addItemsToStore(state)
}

main()