const data = {
  items: [
    {
      id: "001-beetroot",
      class: "vegetable",
      name: "Beetroot (1kg)",
      price: 1.29
    },
    {
      id: "002-carrot",
      class: "vegetable",
      name: "Carrot (each)",
      price: 0.04
    },
    {
      id: "003-apple",
      class: "fruit",
      name: "Apple (each)",
      price: 0.54
    },
    {
      id: "004-apricot",
      class: "fruit",
      name: "Apricot (500g)",
      price: 5.17
    },
    {
      id: "005-avocado",
      class: "fruit",
      name: "Avocado (1kg)",
      price: 2.0
    },
    {
      id: "006-bananas",
      class: "fruit",
      name: "Bananas (1kg)",
      price: 1.80
    },
    {
      id: "007-bell-pepper",
      class: "vegetable",
      name: "Bell pepper (each)",
      price: 0.80
    },
    {
      id: "008-berry",
      class: "fruit",
      name: "Berry (300g)",
      price: 3.50
    },
    {
      id: "009-blueberry",
      class: "fruit",
      name: "Blueberry (150g)",
      price: 1.75
    },
    {
      id: "010-eggplant",
      class: "vegetable",
      name: "Eggplant (each)",
      price: 1.25
    }
  ],
  cart: [
    // {
    //   id: "001-beetroot",
    //   class: "vegetable",
    //   name: "Beetroot (1kg)",
    //   price: 1.29,
    //   quantity: 1
    // }
  ]
};

// Store or else
function resetList(listName) {
  if (listName === "store") {
    // Removes all the children of the ul
    const ul = document.querySelector(".store--item-list")
    while (ul.hasChildNodes()) {
      ul.removeChild(ul.firstChild)
    }
  }
  else { // cart
    const total = document.querySelector(".total-number")
    console.log("-- Total set to 0")
    total.innerText = "£0.00"
    // Removes all the children of the ul
    const ul = document.querySelector(".cart--item-list")
    while (ul.hasChildNodes()) {
      ul.removeChild(ul.firstChild)
    }
  }
  console.log("- Reset")
}

// Called when ready
function renderStore() {
  // reset before iterating though new ones
  resetList("store")

  // iterate though data.items
  data.items.forEach((item) => {
    // call function to render item card
    createStore(item)
  })
}
// Called at the end of addToCart and removeFromCart
function renderCart() {
  // reset before iterating though new ones
  resetList("cart")

  // iterate though data.cart
  data.cart.forEach((item) => {   
    // call function to render item
    createCart(item)

    // Update total adding item price to total
    updateTotal(item.price)
  })
}

// render and append individual item to store
function createStore(item) {
  const ul = document.querySelector(".store--item-list")
  const li = document.createElement("li")

  const div = document.createElement("div")
  div.setAttribute("class", "store--item-icon")

  const img = document.createElement("img")
  img.setAttribute("src", `assets/icons/${item.id}.svg`)

  const name = document.createElement("span")
  name.setAttribute("class", "store--item-name")
  name.innerText = item.name

  const price = document.createElement("span")
  price.setAttribute("class", "store--item-price")
  price.innerText = `£${item.price}`

  const button = document.createElement("button")
  button.innerText = "ADD TO CART"
  button.addEventListener("click", () => {
    addToCart(item)
  })

  ul.appendChild(li)
  li.appendChild(div)
  li.appendChild(name)
  li.appendChild(price)
  li.appendChild(button)
  div.appendChild(img)
}
// render and append individual item to cart
function createCart(item) {
  const ul = document.querySelector(".cart--item-list")
  const li = document.createElement("li")

  const img = document.createElement("img")
  img.setAttribute("class", "cart--item-icon")
  img.setAttribute("src", `assets/icons/${item.id}.svg`)
  img.setAttribute("alt", item.name)

  const p = document.createElement("p")
  p.innerText = item.name

  const span = document.createElement("span")
  span.setAttribute("class", "quantity-text center")
  span.innerText = item.quantity
  
  const buttonRemove = document.createElement("button")
  buttonRemove.setAttribute("class", "quantity-btn remove-btn center")
  buttonRemove.innerText = "-"
  buttonRemove.addEventListener("click", () => {removeFromCart(item)})
  
  const buttonAdd = document.createElement("button")
  buttonAdd.setAttribute("class", "quantity-btn add-btn center")
  buttonAdd.innerText = "+"
  buttonAdd.addEventListener("click", () => {addToCart(item)})

  ul.appendChild(li)
  li.appendChild(img)
  li.appendChild(p)
  li.appendChild(buttonRemove)
  li.appendChild(span)
  li.appendChild(buttonAdd)
}

// Called when Shop or Cart add button pressed
function addToCart(item) {
  const itemIndex = data.cart.indexOf(item)
  // if item exists, update
  if (data.cart.includes(item)) {
    data.cart[itemIndex].quantity += 1
  }
  // if item dont exists, add quantity and push
  else {
    item.quantity = 1
    data.cart.push(item)
  }

  renderCart()
}
function removeFromCart(item) {
  const itemIndex = data.cart.indexOf(item)
  // if quantity is more than 1, subtract, if 1 then remove completely
  if (item.quantity > 1) {
    data.cart[itemIndex].quantity -= 1
  }
  else {
    data.cart.splice(itemIndex, 1)
  }

  renderCart()
}

function updateTotal(value) {
  const total = document.querySelector(".total-number")
  
  const selfFloat = parseFloat(total.innerText.slice(1)) 
  const fixedValue = Number(selfFloat + value).toFixed(2)
  console.log(`Add value ${value} to total ${total.innerText}`)
  
  total.innerText = `£${fixedValue}`
}

renderStore()
