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
      type: "vegetable"
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
      type: "vegetable"
    }
  ],
  cart: []
};

function setupShop() {
  renderStorefront()
  prepareFilters()
}

function renderStorefront(filter) {
  const storeItems = document.querySelector('.store--item-list')
  storeItems.innerHTML = ''

  let shopItems = state.items

  if (filter) {
    shopItems = state.items.filter(item => item.type != filter);
    document.querySelector('#filterStatus').innerText = "Shows only " + filter
  } else {
    document.querySelector('#filterStatus').innerText = "Shows both fruit and vegetables"
  }

  shopItems.forEach(item => {
    const storeListItem = document.createElement('li')
    storeListItem.innerHTML = `
        <div class="store--item-icon"><img src="assets/icons/${item.id}.svg" alt="${item.name}" /></div>
        <button id="${item.id}">Add to cart</button>
    `
    storeItems.appendChild(storeListItem)
    document.getElementById(item.id).addEventListener('click', function () {
      addItemToCart(this.id)
    })
  });
}

function prepareFilters() {
  document.getElementById('filterForVeggies').addEventListener('click', function () {
    renderStorefront('vegetable')
  })
  document.getElementById('filterForFruit').addEventListener('click', function () {
    renderStorefront('fruit')
  })
  document.getElementById('clearFilter').addEventListener('click', function () {
    renderStorefront()
  })
}

function addItemToCart(itemId) {
  const shoppingItem = state.items.find(({ id }) => id === itemId)
  if(state.cart.find(({ id }) => id === itemId)) {
    shoppingItem.amount++
  } else {
    shoppingItem.amount = 1
    state.cart = [...state.cart, shoppingItem]
  }
  renderCartView()
}

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function renderCartView() {
  const cartList = document.querySelector('.cart--item-list')
  let totalCartValue = 0
  
  cartList.innerHTML = ''

  state.cart.forEach(item => {
    const cartItem = document.createElement('li')
    cartItem.innerHTML = `
    <img class="cart--item-icon" src="assets/icons/${item.id}.svg">
    ${capitalizeFirstLetter(item.name)}
    &nbsp;<button id="decrease_${item.id}" class="quantity-btn remove-btn center">-</button>
    <input type="number" class="cart-amount" id="amount_${item.id}" value="${item.amount}" min="0" max="50">
    <button id="increase_${item.id}" class="quantity-btn add-btn center">+</button>
    `
    cartList.appendChild(cartItem)

    totalCartValue += Number(item.amount) * Number(item.price)

    document.querySelector('#decrease_' + item.id).addEventListener('click', function (event) {
      decreaseAmountInCart(this.id)
    })
    document.querySelector('#increase_' + item.id).addEventListener('click', function (event) {
      increaseAmountInCart(this.id)
    })
    document.querySelector('#amount_' + item.id).addEventListener('change', function (event) {
      changeAmountInCart(this.id, this.value)
    })
  })

  const totalPriceInView = document.querySelector('.total-number')
  totalPriceInView.innerText = "£" + totalCartValue.toFixed(2)
}

function decreaseAmountInCart(id) {
  const PURE_ID = id.split('_')
  const foundItem = state.cart.find(({ id }) => id === PURE_ID[1])

  if (foundItem.amount > 0) {
    foundItem.amount--
  }
  if (foundItem.amount <= 0) {
    state.cart = state.cart.filter(item => item.id != PURE_ID[1]);
  }

  renderCartView()
}

function increaseAmountInCart(id) {
  const PURE_ID = id.split('_')
  const foundItem = state.cart.find(({ id }) => id === PURE_ID[1])
  foundItem.amount++
  renderCartView()
}

function changeAmountInCart(id, newAmount) {
  const PURE_ID = id.split('_')
  const foundItem = state.cart.find(({ id }) => id === PURE_ID[1])
  foundItem.amount = newAmount
  if (foundItem.amount <= 0) {
    state.cart = state.cart.filter(item => item.id != PURE_ID[1]);
  }
  renderCartView()
}

setupShop()