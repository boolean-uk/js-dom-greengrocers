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

const itemList = document.querySelector(".store--item-list")
const cartContainer = document.querySelector(".cart--item-list-container")
const cartList = document.querySelector(".cart--item-list")
const total = document.querySelector("total-number")


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
  cartList.innerHTML =""
  
  state.items.forEach(element => {
    const listItem = createListItem(element)
    itemList.append(listItem)
  })


  state.cart.forEach((element, index) => {
    const cartItem = createCartItem(element, index)
    cartList.append(cartItem)
  })

}

function createCartItem(element , index) {
  const cartItem = document.createElement("li")


  const image = document.createElement("img")
  image.src = `./assets/icons/${element.id}.svg`
  image.alt = element.name
  
  const p = document.createElement("p")
  p.innerHTML = element.name
  
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