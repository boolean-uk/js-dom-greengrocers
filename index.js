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

// all items in the shop
const allItems = state.items

// select ul which stores the store li items
const storeList = document.querySelector("#store > ul")

// select ul which stores the basket li items
const basketContainer = document.querySelector("#cart > div.cart--item-list-container > ul")

// console.log(basketContainer)


// for filter extension can use a diffrent variable than allItems when displaying shop items

allItems.forEach((itemInfo) => {
  console.log(itemInfo)
  // create elements for store-item template
  const itemLi = document.createElement("li")
  storeList.append(itemLi)

  const div = document.createElement("div")
  div.setAttribute("class", "store--item-icon")
  itemLi.append(div)

  const img = document.createElement("img")
  img.src = `assets/icons/${itemInfo.id}.svg`
  img.setAttribute("alt", itemInfo.name)
  div.append(img)

  const button = document.createElement("button")
  button.innerText = "Add to cart"
  itemLi.append(button)

  button.addEventListener("click", () => {
    shopToCart(itemInfo)
  })
})


// shop to cart - checks then creates or updates
function shopToCart (itemInfo) {
  console.log("added an item")

  // variable to be changed for condition
  let inBasketAlready = false
  let itemBasketIndex = null

  // add checks here for is item is in basket already
  for (let x = 0; x < state.cart.length; x++) {
    if (state.cart[x].name === itemInfo.name) {
      console.log("item already in basket")
      inBasketAlready = true
      itemBasketIndex = x
    }
  }

  if (inBasketAlready === false) {
     // push item data into basket
     itemInfo.quantity = 1
     state.cart.push(itemInfo)
     createItemInBasket(itemInfo)
  }

  else {
    state.cart[itemBasketIndex].quantity += 1
    console.log("quantity updated")
    // itemInfo.quantity++
  }

  // reset inBasketAlready value
  inBasketAlready = false

  // clear cart data
  clearCart()

  // render cart
  renderCart()



 
  

  
  // mutliple routes here might need making
}

// create function for adding rendering a new item to the cart
function createItemInBasket (itemInfo) {
  const li = document.createElement("li")
  basketContainer.append(li)

  const img = document.createElement("img")
  img.setAttribute("class", "cart--item-icon")
  img.src = `assets/icons/${itemInfo.id}.svg`
  img.alt = itemInfo.name

  const p = document.createElement("p")
  p.innerText = itemInfo.name

  const subtractButton = document.createElement("button")
  subtractButton.setAttribute("class", "quantity-btn remove-btn center")
  subtractButton.innerText = "-"

  const quantity = document.createElement("span")
  quantity.setAttribute("class", "quantity-text center")
  // this quantity will changed depending on how many duplicates of the item are in the cart
  quantity.innerText = itemInfo.quantity

  const addButton = document.createElement("button")
  addButton.setAttribute("class", "quantity-btn add-btn center")
  addButton.innerText = "+"


  // append all items to li at the end
  li.append(img, p, subtractButton, quantity, addButton)
}

function clearCart () {
  // select container children
  const cartElements = document.querySelectorAll("ul.item-list.cart--item-list > *")
  console.log("clearing cart")

  // remove each element
  cartElements.forEach((item) => {
    item.remove()
  })
}

function renderCart () {
  console.log("rendering")
  // store the items in the basket and then generate li elements from that 
  state.cart.forEach((item) => {
    if (item.quantity > 0) {
      createItemInBasket(item)
    }
    else {
      console.log("item needs deleting from cart")
    }
    
  })
}

function total () {

}


// tasks
// update the total price depending on items
// 1) select all elements within the cart; set to variable
// 2) for each element get the price and quantity and set in variables
// 3)Calculate total and set to variable
// 4) select span element and the text within then set value


// add event listners to cart item buttons so the quantity can be updated
// if quantity drops to 0 remove from cart

