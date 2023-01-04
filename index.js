const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "veg"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "veg"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruite"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruite"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "fruite"  
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruite",
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "veg"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruite"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "fruite"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "veg"
    }
  ],
  fruit: [],
  vegtables: [],
  cart: []
};


// Selectors
const StoreItemsUL = document.querySelector(".store--item-list")
const CartItemsUL = document.querySelector(".cart--item-list")
const imageContainer = document.querySelector(".store--item-icon")
const quantityValue = document.querySelector(".quantity-text")
const total = document.querySelector(".total-number")
const fruiteBtn = document.querySelector(".fruit")
const vegBtn = document.querySelector(".veg")
const mainStoreBtn = document.querySelector(".mainStore")
// Render Store items
mainStoreBtn.addEventListener("click", () => {
  StoreItemsUL.innerHTML = ""
  RenderStore()
})

fruiteBtn.addEventListener("click", () => {
  StoreItemsUL.innerHTML = ""
  const fruit = state.items.filter(items => items.type === "fruite")
  renderFruitOrVeg(fruit)
})

vegBtn.addEventListener("click", () => {
  StoreItemsUL.innerHTML = ""
  const veg = state.items.filter(items => items.type === "veg")
  renderFruitOrVeg(veg)
})

function renderFruitOrVeg (fruitOrVeg) {
  fruitOrVeg.forEach((item) => {
    item.quantity = 1
    
    const li = document.createElement("li");
    const imageContainer = document.createElement("div")
    const itemIcon = document.createElement("img")
    const addToCartButton = document.createElement("button")
    
    
    imageContainer.setAttribute("class", "store--item-icon")
    itemIcon.src = `assets/icons/${item.id}.svg`
    itemIcon.alt = item.name
    
    addToCartButton.innerText = 'Add to cart'
    
    addToCartButton.addEventListener("click", () => {
      // console.log(item)
      if (state.cart.includes(item)) {
        updateQuantityADD(item)
        console.log(item)
        return 
      }
      state.cart.push(item)
      renderCartItem()
      console.log(state.cart)
    })
    
    StoreItemsUL.append(li)
    li.append(imageContainer)
    imageContainer.append(itemIcon)
    li.append(addToCartButton)
    
  })
}


function RenderStore() {
  StoreItemsUL.innerHTML = ""
  
  state.items.forEach((item) => {
    item.quantity = 1
    
    const li = document.createElement("li");
    const imageContainer = document.createElement("div")
    const itemIcon = document.createElement("img")
    const addToCartButton = document.createElement("button")
    
    
    imageContainer.setAttribute("class", "store--item-icon")
    itemIcon.src = `assets/icons/${item.id}.svg`
    itemIcon.alt = item.name
    
    addToCartButton.innerText = 'Add to cart'
    
    addToCartButton.addEventListener("click", () => {
      // console.log(item)
      if (state.cart.includes(item)) {
        updateQuantityADD(item)
        console.log(item)
        return 
      }
      state.cart.push(item)
      renderCartItem()
      console.log(state.cart)
    })
    
    StoreItemsUL.append(li)
    li.append(imageContainer)
    imageContainer.append(itemIcon)
    li.append(addToCartButton)
    
    
  })
}

function renderCartItem (item) {
  
  CartItemsUL.innerHTML = ""
  
  state.cart.forEach((item) => {
    
    
    const li = document.createElement("li");
    const cartIcon = document.createElement("img")
    const itemName = document.createElement("p")
    const removeButton = document.createElement("button")
    const quantity = document.createElement("span")
    const addButton = document.createElement("button")
    
    cartIcon.setAttribute("class", "cart--item-icon")
    cartIcon.src = `assets/icons/${item.id}.svg`
    cartIcon.alt = item.name
    removeButton.classList.add("quantity-btn", "remove-btn", "center")
    addButton.classList.add("quantity-btn", "add-btn", "center")
    quantity.classList.add("quantity-text", "center")
    
    itemName.innerText = item.name
    removeButton.innerText = "-"
    addButton.innerText = "+"
    quantity.innerText = item.quantity
    
    addButton.addEventListener("click", () => {
      updateQuantityADD(item)
    })
    removeButton.addEventListener("click", () => {
      updateQuantitySUB(item)
    })
    CartItemsUL.append(li)
    li.append(
      cartIcon, 
      itemName,
      removeButton,
      quantity,
      addButton
      )
    })
    updateTotal()
  }
  
  function updateQuantityADD (item) {
    item.quantity = item.quantity + 1
    renderCartItem()
  }
  function updateQuantitySUB (item) {
    item.quantity = item.quantity - 1
    if (item.quantity === 0) {
      item.quantity = item.quantity + 1
      state.cart.splice(item, 1)
      renderCartItem()
      return
    }
    renderCartItem()
  }
  function removeCartItem (quantity, index, cart) {
    if (quantity === 0) {
      cart.splice(index, 1)

    }
  }

  function updateTotal (){
    totalsArr = [] 
    state.cart.forEach((item) => {
      const indivCost = item.price * item.quantity
      totalsArr.push(indivCost)
      console.log(totalsArr)
    })
    const totalPrice = totalsArr.reduce((accumulator, Number) => {
      return accumulator + Number;
    }, 0)  
    
    total.innerHTML = `£ ${totalPrice.toFixed(2)}`
  }
  function findFruit() {
    state.items.filter()
  }

  function renderPage() {
    RenderStore()
    // renderCartItem()
  }
  renderPage()