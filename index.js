const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
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
      price: 0.35,
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
      type: "vegetable"
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
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
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
      price: 0.35,
      type: "vegetable"
    }
  ],
  itemsMatchingFilter: [],
  cart: []
};

/**
 * Populate the "itemsMatchingFilter" field of the state object with items in state.items whose type is currently indicated "on" by the form contained within the "filter-container" div.
 * @returns 
 */
function PopulateCurrentSelection() {
  // If null just return immediatly
  if (document.getElementById("SelectFruits") === null || document.getElementById("SelectVegetables") === null) {
    return
  }
  // Turn "on"/"off" into boolean values
  const fruitSelected = 
    document.getElementById("SelectFruits").value === "on" ? true : false
  const vegetableSelected = 
    document.getElementById("SelectVegetables").value === "on" ? true : false

  // Clear the current selection
  state.itemsMatchingFilter = []

  // Iterate through and append items
  state.items.forEach((item) => {
    // Fruit item
    if (item.type === "fruit" && fruitSelected) {
      state.itemsMatchingFilter.push(item)
    }
    // Vegetable item
    if (item.type === "vegetable" && vegetableSelected) {
      state.itemsMatchingFilter.push(item)
    }
  })
  // Regeneate the list of available items
  GenerateItemList()
}

function GenerateItemList() {
  const parent = document.getElementsByClassName('item-list store--item-list')[0]
  parent.innerHTML = ""
  state.itemsMatchingFilter.forEach((item) =>  {
    const produceItem = document.createElement("li")

    const imageContainer = document.createElement("div")
    imageContainer.classList.add("store--item-icon")
    const image = document.createElement("img")
    image.src = "./assets/icons/"+item.id+".svg"
    image.alt = item.name
    imageContainer.appendChild(image)

    const addToCartButton = document.createElement("button")
    addToCartButton.textContent = "Add to cart"
    addToCartButton.addEventListener("click", () => {
      state.cart.push(item)
      GenerateCartItemList()
    })

    produceItem.appendChild(imageContainer)
    produceItem.appendChild(addToCartButton)

    parent.appendChild(produceItem)
  })
}

/**
 * Generate the cart item list by grouping items in the cart matching a certain category then generating and adding the <li> element onto the "item-list-cart--item-list" <ul> element.
 */
function GenerateCartItemList() {
  const parent = document.getElementsByClassName('item-list cart--item-list')[0]
  // Clear already present elements
  parent.innerHTML = ""
  state.items.forEach((item) => {
    // Find the number of times the current item is contained within the cart
    const numberOfItem = state.cart.filter(obj => obj == item).length
    // Only insert item if more than 0.
    if (numberOfItem != 0) {
      const cartItem = GenerateCartItem(item, numberOfItem)
      parent.appendChild(cartItem)
    }
  })
  UpdateCartTotalPrice()
}

/**
 * Calculate and update the value of the "total-number" <span> element to be the total value of the items contained within state.cart.
 */
function UpdateCartTotalPrice() {
  const parent = document.getElementsByClassName("total-number")[0]
  let price = 0

  state.cart.forEach((item) => {
    price = price + item.price
  })
  // Set price to be in pounds and to carry 2 decimals
  parent.textContent = "£" + price.toFixed(2)
}

document.addEventListener('DOMContentLoaded', () => {
  GenerateCartItemList()
  filterByType()
  PopulateCurrentSelection()
  CreateStoreItemSorteringButtons()
})