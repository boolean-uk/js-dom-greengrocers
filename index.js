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

function GenerateSortButtonsStoreItem() {
  const parent = document.getElementById("sortContainer")
  console.log(parent)
  const sortByPriceButton = document.createElement("button")
  sortByPriceButton.textContent = "Price"
  sortByPriceButton.addEventListener("click", () => {
    state.items.sort((a, b) => a.price - b.price)
    GenerateItemList()
  })
  const sortByNameButtonDescending = document.createElement("button")
  sortByNameButtonDescending.textContent = "Alphabetical (ASC)"
  sortByNameButtonDescending.addEventListener("click", () => {
    state.items.sort((a, b) => a.name > b.name)
    GenerateItemList()
  })

  const sortByNameButtonAscending = document.createElement("button")
  sortByNameButtonAscending.textContent = "Alphabetical (DESC)"
  sortByNameButtonAscending.addEventListener("click", () => {
    state.items.sort((a, b) => a.name < b.name)
    GenerateItemList()
  })

  parent.appendChild(sortByPriceButton)
  parent.appendChild(sortByNameButtonAscending)
  parent.appendChild(sortByNameButtonDescending)
}

function GenerateItemList() {
  const parent = document.getElementsByClassName('item-list store--item-list')[0]
  parent.innerHTML = ""
  state.items.forEach((item) =>  {
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

function GenerateCartItem(item, count) {
  const cartItem = document.createElement("li")

  const image = document.createElement("img")
  image.classList.add("cart--item-icon")
  image.src = "./assets/icons/"+item.id+".svg"
  image.alt = item.name

  const cartItemName = document.createElement("p")
  cartItemName.textContent = item.name

  const quantityCounter = document.createElement("span")
  quantityCounter.classList.add("quantity-text", "center")
  quantityCounter.textContent = count

  const removeButton = document.createElement("button")
  removeButton.classList.add("quantity-btn", "remove-btn", "center")
  removeButton.textContent = "-"
  removeButton.addEventListener("click", () => {
    state.cart.splice(state.cart.indexOf(item), 1)
    GenerateCartItemList()
  })

  const addButton = document.createElement("button")
  addButton.classList.add("quantity-btn", "add-btn", "center")
  addButton.textContent = "+"
  addButton.addEventListener("click", () => {
    state.cart.push(item)
    GenerateCartItemList()
  })

  cartItem.appendChild(image)
  cartItem.appendChild(cartItemName)
  cartItem.appendChild(removeButton)
  cartItem.appendChild(quantityCounter)
  cartItem.appendChild(addButton)

  return cartItem
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
  GenerateItemList()
  GenerateCartItemList()
  GenerateSortButtonsStoreItem()
})