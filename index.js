const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetables"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "vegetables"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruits"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruits"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "fruits"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruits"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "vegetables"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruits"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "fruits"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "vegetables"
    }
  ],
  cart: []
}


function renderStoreItems() {
  const storeList = document.querySelector(".store--item-list")
  const storeItemsHtml = state.items
   .map(
      item => `
      <li class="store-item" data-item-id="${item.id}" data-item-type="${item.type}">
        <div class="store--item-icon">
          <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
        </div>
        <p class="store-item-name">${item.name}</p>
        <p class = "store-item-price">£${item.price.toFixed(2)}</p>
        <button class="store-item-button">Add to cart</button>
      </li>
    `
    )
   .join("")

  storeList.innerHTML = storeItemsHtml

  addEventListenersToStoreItems()
}

function addEventListenersToStoreItems() {
  const storeItemButtons = document.querySelectorAll(".store-item-button")
  storeItemButtons.forEach(button => {
    button.addEventListener("click", event => {
      const itemId = event.target.closest(".store-item").dataset.itemId
      const item = state.items.find(item => item.id === itemId)
      addToCart(item)
    })
  })
}

function addToCart(item) {
  const cartItem = state.cart.find(cartItem => cartItem.item.id === item.id)

  if (cartItem) {
    cartItem.quantity++
  } else {
    state.cart.push({ item, quantity: 1 })
  }

  updateCart()
}

function removeFromCart(itemId) {
  const cartItemIndex = state.cart.findIndex(
    cartItem => cartItem.item.id === itemId
  )

  if (cartItemIndex!== -1) {
    const cartItem = state.cart[cartItemIndex]

    if (cartItem.quantity > 1) {
      cartItem.quantity--
    } else {
      state.cart.splice(cartItemIndex, 1)
    }

    updateCart()
  }
}

function updateCart() {
  // Calculate the total cost of the cart
  let total = 0
  for (let i = 0; i < state.cart.length; i++) {
    const itemPriceAndQ = state.cart[i]
    total = total + itemPriceAndQ.price * itemPriceAndQ.quantity
    console.log(b)
  }

  // Update the total number display
  const totalNumber = document.querySelector(".total-number")
  totalNumber.textContent = `£${total.toFixed(2)}`

  // Update the cart display
  const cartList = document.querySelector(".cart--item-list")
  cartList.innerHTML = ""

  for (const item of state.cart) {
    const li = document.createElement("li")
    const icon = document.createElement("img")
    const name = document.createElement("p")
    const removeButton = document.createElement("button")
    const quantityText = document.createElement("span")
    const addButton = document.createElement("button")

    li.classList.add("cart-item")
    icon.classList.add("cart-item-icon")
    removeButton.classList.add("quantity-btn", "remove-btn")
    addButton.classList.add("quantity-btn", "add-btn")

    icon.src = `assets/icons/${item.item.id}.svg`
    icon.alt = item.item.name
    name.textContent = item.item.name
    removeButton.textContent = "-"
    quantityText.textContent = item.quantity
    addButton.textContent = "+"

    addButton.addEventListener("click", (event) => {
      addToCart(item.item)
    })
    removeButton.addEventListener("click", (event) => {
      removeFromCart(item.item.id)
    })

    li.appendChild(icon)
    li.appendChild(name)
    li.appendChild(removeButton)
    li.appendChild(quantityText)
    li.appendChild(addButton)
    cartList.appendChild(li)
  }
}

renderStoreItems()