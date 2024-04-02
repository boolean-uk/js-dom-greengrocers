const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 1.35,
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
      price: 0.75,
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
      type: "fruit"
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
      price: 0.25,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.15,
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
      price: 0.65,
      type: "vegetable"
    }
  ],
  cart: []
};

const itemList = document.querySelector(".store--item-list")
const cartContainer = document.querySelector(".cart--item-list-container")
const cartList = document.querySelector(".cart--item-list")
const total = document.querySelector(".total-number")
const storeFilter = document.querySelector("#catagories")
const sortSelect = document.querySelector("#sort")


storeFilter.addEventListener('change', () => {
  render()
})

sortSelect.addEventListener('change', () => {
  render()
})

function capitlisation(inputString) {
  if (typeof inputString !== "string") {
    throw console.error("Not a string")
  }

  const splitString = inputString.split("")
  splitString[0] = splitString[0].toUpperCase()
  splitString.forEach( (element, index) => {
    if(element === " ") {
      splitString[index+1] = splitString[index+1].toUpperCase()
    }
  })

  const outputString = splitString.join("")
  return outputString
}


function sortingPopular(a, b) {
  const firstCompare = Number(a.id.split("-")[0])
  const secondCompare = Number(b.id.split("-")[0])

  return firstCompare - secondCompare
}

function sortPriceHL(a, b) {
  const firstCompare = a.price
  const secondCompare = b.price

  return firstCompare - secondCompare
}

function sortPriceLH(a, b) {
  const firstCompare = a.price
  const secondCompare = b.price

  return secondCompare - firstCompare
}

function createListItem(element) {
  const listItem = document.createElement("li")
  
  const itemContainer = document.createElement("div")
  itemContainer.className = "store--item-icon"
  
  const image = document.createElement("img")
  image.src = `./assets/icons/${element.id}.svg`
  image.alt = element.name
  
  const button = document.createElement("button")
  button.innerHTML = "Add to cart"
  button.addEventListener('click', (event) => {
    selection = event.currentTarget.previousElementSibling.firstChild.alt
    addCartItem(selection)
    render()
  })

  itemContainer.append(image)
  listItem.append(itemContainer)
  listItem.append(button)

  return listItem
}

function render() {
  itemList.innerHTML = ""
  cartList.innerHTML = ""
  
  let runningTotal = 0 

  if (sortSelect.value === "default") {
    state.items.sort(sortingPopular)
  } else if (sortSelect.value === "price-low-high") {
    state.items.sort(sortPriceLH)
  } else if (sortSelect.value === "price-high-low") {
    state.items.sort(sortPriceHL)
  }

  state.items.forEach(element => {
    if(storeFilter.value === "all" || storeFilter.value === "vegetables"  && element.type === "vegetable"){
      const listItem = createListItem(element)
      itemList.append(listItem)
    } else if(storeFilter.value === "all" || storeFilter.value === "fruit"  && element.type === "fruit") {
      const listItem = createListItem(element)
      itemList.append(listItem)
    }
    
  })


  state.cart.forEach((element, index) => {
    const cartItem = createCartItem(element, index)
    cartList.append(cartItem)

    runningTotal += element.price * element.quantity
  })

  total.innerHTML = '£' + runningTotal.toFixed(2)

}

function createCartItem(element , index) {
  const cartItem = document.createElement("li")


  const image = document.createElement("img")
  image.src = `./assets/icons/${element.id}.svg`
  image.alt = element.name
  
  const p = document.createElement("p")
  p.innerHTML = capitlisation(element.name)
  
  const buttonRemove = document.createElement("button")
  buttonRemove.className = "quantity-btn remove-btn center"
  buttonRemove.innerHTML = "-"
  
  buttonRemove.addEventListener('click', (e) => {
    element.quantity--
    if(element.quantity < 1) {
      state.cart.splice(index, 1)
    }
    render()
  })
  
  const totalQuantity = document.createElement("span")
  totalQuantity.className = "quantity-text center"
  totalQuantity.innerHTML = element.quantity
  
  const buttonAdd = document.createElement("button")
  buttonAdd.className = "quantity-btn add-btn center"
  buttonAdd.innerHTML = "+"
  
  buttonAdd.addEventListener('click', () => {
    element.quantity++
    render()
  })

  cartItem.append(image)
  cartItem.append(p)
  cartItem.append(buttonRemove)
  cartItem.append(totalQuantity)
  cartItem.append(buttonAdd)

  return cartItem
}

function addCartItem(item) {
  const element = state.items.find(e => (e.name === item))

  if(!element){
    throw new Error("this is not a valid item")
  }

  const cartElement = state.cart.find(e => (e.name === item))
  isInCart = !cartElement

  if(isInCart) {
    const newCartElement = structuredClone(element)
    newCartElement.quantity = 1
    state.cart.push(newCartElement)
  } else {
    cartElement.quantity++
  }


}

render()