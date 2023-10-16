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
  ]
};

const initItems = () => state.items.forEach(item => {
  item.quantity = 0
  // to have different prices in tests I wrote a real life simulation of what it feels like looking at prices of fruit and veggies
  item.price = newSurprisePrice().toFixed(2)
  item.total = function() {
    return this.quantity * this.price
  }
  item.category = category(item.name)
})

const newSurprisePrice = () => 1 + Math.random() + Math.random() / 100

const clearDisplayItems = () => {
  const itemDisplaySection = document.querySelectorAll("header#store ul.item-list li")
  console.log(itemDisplaySection)
  itemDisplaySection.forEach(item => item.remove())
}

const displayItems = () => {
  clearDisplayItems()
  const itemDisplaySection = document.querySelector("header#store ul.item-list")

  state.items.forEach((item) => {
    
    if (filter.length !== 0 && item.category !== filter) return

    const li = document.createElement("li")
    
    const img = document.createElement("img")
    img.class = "cart-item-icon"
    img.src = "assets/icons/" + item.id + ".svg"
  
    li.appendChild(img)
    
    const pPrice = document.createElement("p")
    pPrice.innerText = "£" + item.price
    li.appendChild(pPrice) 
    
    const buttonAddToCart = document.createElement("button")
    buttonAddToCart.innerText = "Add to cart"
    buttonAddToCart.addEventListener("click", () => changeItemAmount(item, 1))
    li.appendChild(buttonAddToCart)

    itemDisplaySection.appendChild(li)
  })
}

const clearCartItems = () => {
  const cartItems = document.querySelectorAll("main#cart ul.cart--item-list li")
  cartItems.forEach(item => item.remove())
}

const displayCartItems = () => {
  clearCartItems()
  const cartDisplay = document.querySelector("main#cart ul.cart--item-list")

  state.items.forEach((item) => {
    if (item.quantity === 0) return

    const li = document.createElement("li")
    
    const img = document.createElement("img")
    img.class = "cart-item-icon"
    img.src = "assets/icons/" + item.id + ".svg"
    img.alt = item.val
    
    const p = document.createElement("p")
    p.innerText = item.name
    li.appendChild(img)
    li.appendChild(p)

    const buttonRemove = document.createElement("button")
    buttonRemove.class = "quantity-btn remove-btn center"
    buttonRemove.innerText = "-"
    li.appendChild(buttonRemove)
    buttonRemove.addEventListener("click", () => changeItemAmount(item, -1))
    
    const quantity = document.createElement("span")
    quantity.class = "quantity-text center"
    quantity.innerText = item.quantity
    li.appendChild(quantity)
    
    const buttonAdd = document.createElement("button")
    buttonAdd.class = "quantity-btn add-btn center"
    buttonAdd.innerText = "+"
    buttonAdd.addEventListener("click", () => changeItemAmount(item, 1))

    li.appendChild(buttonAdd)

    cartDisplay.appendChild(li)
  })
}

const calcCartTotal = () => state.items.reduce((sum, item) => sum + item.total(), 0)

const refreshCartTotalDisplay = () => {
  const total = document.querySelector("span.total-number")
  total.innerText = "£" + calcCartTotal().toFixed(2)
}

const category = (productName) => {
  const fruitArr = ["apple",
    "apricot",
    "bananas",
    "berry",
    "blueberry"]

  const vegetablesArr = ["beetroot",
    "carrot",
    "avocado",
    "bell pepper",
    "eggplant"]

  if (fruitArr.includes(productName)) return "fruits"
  if (vegetablesArr.includes(productName)) return "vegetables"
}

let filter = ""
const changeFilterValue = (filterName) => {
  filter = filterName
  console.log(filter)
  displayItems()
}

const constructFilters = () => {
  const aside = document.querySelector("header#store aside")
  console.log(aside)
  
  const fruitFilter = document.createElement("button")
  fruitFilter.innerText = "Fruits"
  fruitFilter.addEventListener("click", () => changeFilterValue("fruits"))

  const vegetablesFilter = document.createElement("button")
  vegetablesFilter.innerText = "Vegetables"
  vegetablesFilter.addEventListener("click", () => changeFilterValue("vegetables"))
  
  const resetFilterButton = document.createElement("button")
  resetFilterButton.innerText = "Reset"
  resetFilterButton.addEventListener("click", () => changeFilterValue(""))
  
  aside.appendChild(fruitFilter)
  aside.appendChild(vegetablesFilter)
  aside.appendChild(resetFilterButton)
}


const sortBy = (PriceOrName, AscOrDesc) => {
  // asc = default
  if ((PriceOrName.toLowerCase() === "price" || PriceOrName.toLowerCase() === "name" || false) === false) return

  const mode = AscOrDesc === "asc" ? 1 : -1

  state.items.sort((a, b) => {
    if (a[PriceOrName] < b[PriceOrName]) {
      return -1 * mode
    } 
    if (a[PriceOrName] > b[PriceOrName]) {
      console.log((a[PriceOrName] > b[PriceOrName]), 1 * mode)
      return 1 * mode
    }

    return 0
  })
}

const changeItemAmount = (item, quantity) => {
  item.quantity + quantity >= 0 ? item.quantity += quantity : item.remove()
  displayCartItems()
  refreshCartTotalDisplay()
}

constructFilters()
initItems()
sortBy("price", "asc")
displayItems()
displayCartItems()