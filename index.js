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
  item.total = function() {
    return this.quantity * this.price
  }
})

const displayItems = () => {
  const itemDisplaySection = document.querySelector("header#store ul.item-list")

  state.items.forEach((item) => {
    const li = document.createElement("li")
    
    const img = document.createElement("img")
    img.class = "cart-item-icon"
    img.src = "assets/icons/" + item.id + ".svg"
  
    li.appendChild(img)
    
    const buttonAddToCart = document.createElement("button")
    buttonAddToCart.innerText = "Add to cart"
    buttonAddToCart.addEventListener("click", () => console.log("add ", item))
    li.appendChild(buttonAddToCart)

    itemDisplaySection.appendChild(li)
  })
}

const displayCartItems = () => {
  const cartDisplay = document.querySelector("main#cart ul.cart--item-list")

  state.items.forEach((item) => {
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
    buttonRemove.addEventListener("click", (event) => console.log(event))
    
    const quantity = document.createElement("span")
    quantity.class = "quantity-text center"
    quantity.innerText = item.quantity
    li.appendChild(quantity)
    
    const buttonAdd = document.createElement("button")
    buttonAdd.class = "quantity-btn add-btn center"
    buttonAdd.innerText = "+"
    buttonAdd.addEventListener("click", (event) => console.log(event))

    li.appendChild(buttonAdd)

    cartDisplay.appendChild(li)
  })
}

const findItemIndex = (itemID) => state.items.forEach((item, index) => {
  if (item.id === itemID) return index
})

const changeItemAmount = (itemID, quantity) => {
  const ind = findItemIndex(itemID)
  console.log(itemID, quantity)
  state.items[ind].quantity += quantity
}

initItems()
displayItems()
displayCartItems()