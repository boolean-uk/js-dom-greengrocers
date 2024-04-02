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

const storeList = document.querySelector('.store--item-list')
const cartList = document.querySelector('.cart--item-list')
const assets = [
  'assets/icons/001-beetroot.svg', 
  'assets/icons/002-carrot.svg',
  'assets/icons/003-apple.svg',
  'assets/icons/004-apricot.svg',
  'assets/icons/005-avocado.svg',
  'assets/icons/006-bananas.svg',
  'assets/icons/007-bell-pepper.svg',
  'assets/icons/008-berry.svg',
  'assets/icons/009-blueberry.svg',
  'assets/icons/010-eggplant.svg'
]

const store = document.querySelector('#store')

const filterList = document.createElement('ul')
filterList.classList.add('filter')
store.append(filterList)

const showAll = document.createElement('li')
const vegetables = document.createElement('li')
const fruits = document.createElement('li')

const showAllButton = document.createElement('button')
showAllButton.innerText = 'Show all'
showAllButton.classList.add('btn', 'active')
showAllButton.addEventListener('click', () => filterSelection('all'))
showAll.append(showAllButton)
filterList.append(showAll)

const vegetableButton = document.createElement('button')
vegetableButton.innerText = 'Vegetables'
vegetableButton.classList.add('btn')
vegetableButton.addEventListener('click', () => filterSelection('vegetable'))
vegetables.append(vegetableButton)
filterList.append(vegetables)

const fruitButton = document.createElement('button')
fruitButton.innerText = 'Fruits'
fruitButton.classList.add('btn')
fruitButton.addEventListener('click', () => filterSelection('fruit'))
fruits.append(fruitButton)
filterList.append(fruits)

function filterSelection(item) {
  let storeItems = document.querySelectorAll('.store--item-list li')
  storeItems.forEach(storeItem => {
    if (item === 'all' || storeItem.classList.contains(item)) {
      storeItem.style.display = 'grid'
    } else {
      storeItem.style.display = 'none'
    }
  })
}

function addClass(element, name) {
  let arr1, arr2
  arr1 = element.className.split(" ")
  arr2 = name.split(" ")

  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i]
    }
  }
}

function removeClass(element, name) {
  let arr1, arr2
  arr1 = element.className.split(" ")
  arr2 = name.split(" ")

  for (let i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1)
    }
  }
  element.className = arr1.join(" ")
}

let btnContainer = document.querySelector('.filter')
let btns = btnContainer.querySelector('.btn')

for (let i = 0; i < btns.length; i++) {
  btns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      const current = document.querySelector('.btn.active')
      current.classList.remove('active')
      event.target.classList.add('active')
    })
  })
}

for (let i = 0; i < assets.length; i++) {
  const storeItem = document.createElement('li')

  if (assets[i] === assets[0] || assets[i] === assets[1]) {
    storeItem.classList.add('filterType', 'vegetable')
  } else {
    storeItem.classList.add('filterType', 'fruit')
  }

  const storeIcon = document.createElement('div')
  storeIcon.classList.add('store--item-icon')
  storeItem.append(storeIcon)

  const itemImage = document.createElement('img')
  itemImage.setAttribute('src', assets[i])
  storeIcon.append(itemImage)

  const addToCart = document.createElement('button')
  addToCart.innerText = 'Add to cart'
  storeItem.append(addToCart)

  storeList.append(storeItem)
}

const addToCartButtons = document.querySelectorAll('.store--item-list button')

addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const selectedItem = state.items[index]
    const existingCartItemIndex = state.cart.findIndex(item => item.id === selectedItem.id)

    if (existingCartItemIndex !== -1) {
      state.cart[existingCartItemIndex].quantity++
    } else {
      state.cart.push({
        id: selectedItem.id,
        name: selectedItem.name,
        price: selectedItem.price,
        quantity: 1
      })
    }

    render()
  })
})

function render() {
  cartList.innerHTML = ''

  state.cart.forEach(item => {
    const cartItem = document.createElement('li')

    const cartImage = document.createElement('img')
    cartImage.classList.add('cart--item-icon')
    cartImage.setAttribute('src', `assets/icons/${item.id}.svg`)
    cartItem.append(cartImage)

    const itemName = document.createElement('p')
    itemName.innerText = item.name
    cartItem.append(itemName)

    const removeBtn = document.createElement('button')
    removeBtn.classList.add('quantity-btn', 'remove-btn', 'center')
    removeBtn.innerText = '-'
    cartItem.append(removeBtn)
  
    const itemQuantity = document.createElement('span')
    itemQuantity.classList.add('quantity-text', 'center')
    itemQuantity.textContent = item.quantity
    cartItem.append(itemQuantity)
  
    removeBtn.addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--
        itemQuantity.textContent = item.quantity
      } else {
        const itemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id)
        state.cart.splice(itemIndex, 1)
        cartItem.remove()
      }

      newTotalPrice()
    })
  
    const addBtn = document.createElement('button')
    addBtn.classList.add('quantity-btn', 'add-btn', 'center')
    addBtn.innerText = '+'
    cartItem.append(addBtn)
  
    addBtn.addEventListener('click', () => {
      const itemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id)
      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity++
        itemQuantity.textContent = state.cart[itemIndex].quantity

        newTotalPrice()
      }
    })
    
    cartList.append(cartItem)
  })

  newTotalPrice()
}

function calculateTotalPrice() {
  let priceAtTheMoment = 0
  state.cart.forEach(item => {
    priceAtTheMoment += item.price * item.quantity
  })
  return priceAtTheMoment.toFixed(2)

}

function newTotalPrice() {
  const totalNum = document.querySelector('.total-number')
  totalNum.textContent = `£ ${calculateTotalPrice()}`
}

render()