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

  // add checks here for is item is in basket already
  createItemInBasket(itemInfo)

  
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
  // this quantity section will need changing in future functions
  quantity.innerText = 1

  const addButton = document.createElement("button")
  addButton.setAttribute("class", "quantity-btn add-btn center")
  addButton.innerText = "+"


  // append all items to li at the end
  li.append(img, p, subtractButton, quantity, addButton)
}

// maybe update the code above to set the quantity value
// store the items in the basket and then generate li elements from that 

// create element to go into basket once this is working concentrate on not making duplicates






// create function for updating current cart quantity

// create function for creating li in cart


// create structure for store cart
// a tracker of number in cart will be needed 
// if item already in cart dont create new list item instead just update the span


// tasks
// create state for basket
// create tempory inputs which can be updated



// cart info needs name of item, quantity, price