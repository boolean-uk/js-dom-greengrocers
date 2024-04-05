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

const basket = document.querySelector(".cart--item-list")

function renderStore () {
  const store = document.querySelector(".item-list", ".store--item-list")

  state.items.forEach((value, index) => {
    const item = state.items[index]

    const li = document.createElement("li")

    const div = document.createElement("div")
    div.setAttribute("class", "store--item-icon")

    const img = document.createElement("img")
    img.setAttribute("src", `assets/icons/${item.id}.svg`)
    img.setAttribute("alt", item.name)
    div.append(img)

    const button = document.createElement("button")
    button.innerText = "Add to cart"
    button.addEventListener("click", () => {
      let inBasket = false

      // checks if food is in cart
      state.cart.forEach((food) => {
      if (food.name === item.name){
        inBasket = true
        food.quantity += 1
      }
      })

      if (inBasket === false) {
      const newItem = value
      newItem.quantity = 1
      state.cart.push(newItem)
     }

     renderCartSection()
    })

    li.append(div, button)
    store.append(li)
  })
}

renderStore()

function renderCartSection () {
  const totalElement = document.querySelector(".total-number")

  basket.innerHTML = ""
  let total = 0

  state.cart.forEach((item, index) => {
    const li = document.createElement("li")

    const img = document.createElement("img")
    img.setAttribute("class", "cart--item-icon")
    img.setAttribute("src", `assets/icons/${item.id}.svg`)
    img.setAttribute("class", item.name)

    const p = document.createElement("p")
    p.innerText = item.name

    const minusButton = document.createElement("button")
    minusButton.classList.add("quantity-btn", "remove-btn", "center")
    minusButton.innerText = "-"
    minusButton.addEventListener("click", () => {
      item.quantity -= 1
      if (item.quantity === 0) {
        state.cart.splice(index, 1)
      }

      renderCartSection()
    })

    const span = document.createElement("span")
    span.classList.add("quantity-text", "center")
    span.innerText = item.quantity

    const increaseButton = document.createElement("button")
    increaseButton.classList.add("quantity-btn", "add-btn", "center")
    increaseButton.innerText = "+"
    increaseButton.addEventListener("click", () => {
      item.quantity += 1
      renderCartSection()
    })

    li.append(img, p, minusButton, span, increaseButton)
    basket.append(li)

    total += item.price * item.quantity
  })

  totalElement.innerText = `£${parseFloat(total).toFixed(2)}`
}

