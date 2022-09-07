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

function init() {
  createAllFood()
}

function createAllFood() {
  for (let foodNumber = 0; foodNumber < state.items.length; foodNumber++)
    createFood(foodNumber)
}

function createFood(foodNumber) {
  const foodListUl = document.querySelector("ul")
  const FoodLi = createLi()
  const FoodDiv = createDiv()
  const foodButton = createButton(foodNumber)
  const foodImg = createImg(foodNumber)

  FoodDiv.append(foodImg)
  FoodLi.append(FoodDiv, foodButton)
  foodListUl.append(FoodLi)
}

function createLi() {
  const elementLi = document.createElement("li")
  return elementLi
}

function createDiv() {
  const elementDiv = document.createElement("div")
  elementDiv.setAttribute("class", "store--item-icon")
  return elementDiv
}

function createButton(foodNumber) {
  const elementButton = document.createElement("button")
  elementButton.innerText = "Add to cart"
  addToCart(elementButton, foodNumber)
  return elementButton
}

function createImg(foodNumber) {
  const elementImg = document.createElement("img")
  elementImg.setAttribute("src", createImgPath(foodNumber))
  elementImg.setAttribute("alt", retrieveFoodName(foodNumber))
  return elementImg
}

function createImgPath(foodNumber) {
  const imgPath = ("assets/icons/" + state.items[foodNumber].id + ".svg")
  return imgPath
}

function retrieveFoodName(foodNumber) {
  const foodName = state.items[foodNumber].name
  return foodName
}

function createItemInCart(foodNumber) {
  const itemInCart = {}
  itemInCart.name = ""
  itemInCart.quantity = 1
  itemInCart.price = state.items[foodNumber].price
  itemInCart.id = `${foodNumber}`
  return itemInCart
}

function putItemInCart(foodNumber) {
  const itemInCart = createItemInCart(foodNumber)
  foodName = retrieveFoodName(foodNumber)
  itemInCart.name = `${foodName}`
  state.cart.push(itemInCart)
  return itemInCart
}

function createCartItem(foodNumber) {
  const itemInCart = putItemInCart(foodNumber)
  const cartUl = document.querySelector("main").querySelector("ul")
  const CartLi = createLi()
  const cartImg = createCartImg(foodNumber)
  const cartParagraph = createCartParagraph(foodNumber)
  const cartSpan = createSpan(itemInCart)
  const cartMinusButton = createCartButton("remove-btn", "-")
  const cartAddButton = createCartButton("add-btn", "+")

  CartLi.append(cartImg, cartParagraph, cartMinusButton, cartSpan, cartAddButton)
  cartUl.append(CartLi)
  buttonAddOne(cartAddButton, itemInCart, cartSpan)
  buttonSubtractOne(cartMinusButton, itemInCart, cartSpan, CartLi)
}

function createCartImg(foodNumber) {
  const cartImg = createImg(foodNumber)
  cartImg.setAttribute("class", "cart--item-icon")
  return cartImg
}

function createCartParagraph(foodNumber) {
  const cartParagraph = document.createElement("p")
  cartParagraph.innerHTML = `${retrieveFoodName(foodNumber)}`
  return cartParagraph
}

function createCartButton(RemoveOrAdd, PlusOrMinus) {
  const elementButton = document.createElement("button")
  elementButton.classList.add('quantity-btn', `${RemoveOrAdd}`, 'center')
  elementButton.innerHTML = `${PlusOrMinus}`
  return elementButton
}

function createSpan(itemInCart) {
  const elementSpan = document.createElement("span")
  elementSpan.classList.add('quantity-text', 'center')
  elementSpan.setAttribute("id", `${itemInCart.name}`)
  const numberOfFood = itemInCart.quantity
  elementSpan.innerText = numberOfFood
  return elementSpan
}

function addToCart(buttonElement, foodNumber) {
  buttonElement.addEventListener('click', () => {
    checkIfAlreadyCart(foodNumber)
    totalCalculation()
  })
}

function checkIfAlreadyCart(foodNumber) {
  if (state.cart.length > 0) {

    for (let i = 0; i < state.cart.length; i++) {
      if (`${state.cart[i].id}` == foodNumber) {
        const cartSpan = document.getElementById(state.cart[i].name)
        const itemInCart = state.cart[i]
        addOne(itemInCart, cartSpan)
        return
      } 
    }
    createCartItem(foodNumber)

  } else {
    createCartItem(foodNumber)
  }
}

function buttonAddOne(cartAddButton, itemInCart, cartSpan) {
  cartAddButton.addEventListener('click', () => {
    addOne(itemInCart, cartSpan)
  })
}

function buttonSubtractOne(cartMinusButton, itemInCart, cartSpan, CartLi) {
  cartMinusButton.addEventListener('click', () => {
    subtractOneCheck(itemInCart, cartSpan, CartLi)
  })
}

function addOne(itemInCart, cartSpan) {
  const newQuantity = itemInCart.quantity + 1
  itemInCart.quantity = newQuantity
  cartSpan.innerText = newQuantity
  totalCalculation()
}

function subtractOneCheck(itemInCart, cartSpan, CartLi) {
  const newQuantity = itemInCart.quantity - 1
  if (zeroCheck(newQuantity)) {
    subtractOne(newQuantity, itemInCart, cartSpan)
  } else {
    clearFruitZeroQuantity(CartLi, itemInCart)
    console.log(`delete this ${itemInCart.name}`)
  }
}

function subtractOne(newQuantity, itemInCart, cartSpan) {
  itemInCart.quantity = newQuantity
  cartSpan.innerText = newQuantity
  totalCalculation()
}

function zeroCheck(newQuantity) {
  if (newQuantity <= 0) {
    return false
  }
  return true
}

function clearFruitZeroQuantity(CartLi, itemInCart) {
  clearFruitStateCart(itemInCart)
  clearFruitItemList(CartLi)
}

function clearFruitStateCart(itemInCart) {
  state.cart = state.cart.filter(function (item) {
    return item !== itemInCart
  })
}

function clearFruitItemList(CartLi) {
  CartLi.remove()
}

function totalCalculation() {
  const totalSpan = document.querySelector(".total-number")
  let totalCost = 0
    for (let i=0; i <state.cart.length; i++) {
      totalCost =+ ((Number(state.cart[i].price) * Number(state.cart[i].quantity)) + totalCost).toFixed(2)
    }
  totalSpan.innerHTML = ""
  totalSpan.innerText = `£${totalCost}`
}


















init()