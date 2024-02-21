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

function PopulateCurrentSelection() {
  const fruitSelected = 
    document.getElementById("SelectFruits").value === "on" ? true : false
  const vegetableSelected = 
    document.getElementById("SelectVegetables").value === "on" ? true : false

  state.itemsMatchingFilter = []

  state.items.forEach((item) => {
    if (item.type === "fruit" && fruitSelected) {
      state.itemsMatchingFilter.push(item)
    }
    if (item.type === "vegetable" && vegetableSelected) {
      state.itemsMatchingFilter.push(item)
    }
  })
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

function GenerateCartItemList() {
  const parent = document.getElementsByClassName('item-list cart--item-list')[0]
  parent.innerHTML = ""
  state.items.forEach((item) => {
    const numberOfItem = state.cart.filter(obj => obj == item).length
    if (numberOfItem != 0) {
      const cartItem = GenerateCartItem(item, numberOfItem)
      parent.appendChild(cartItem)
    }
  })
  UpdateCartTotalPrice()
}

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