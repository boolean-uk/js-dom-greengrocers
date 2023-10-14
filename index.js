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

const displayItems = () => {
  const itemDisplaySection = document.querySelector("header#store ul.item-list")

  state.items.forEach((item) => {
    const li = document.createElement("li")
    
    const img = document.createElement("img")
    img.class = "cart-item-icon"
    img.src = "assets/icons/" + item.id + ".svg"
    img.alt = item.val
    
    const p = document.createElement("p")
    p.innerText = item.name
    li.appendChild(img)
    li.appendChild(p)

    const buttonRemove = document.createElement("button")
    buttonRemove.class = "quantity-btn remove-btn center"
    buttonRemove.innerText = "-"
    li.appendChild(buttonRemove)
    
    const quantity = document.createElement("span")
    quantity.class = "quantity-text center"
    quantity.innerText = 1
    li.appendChild(quantity)
    
    const buttonAdd = document.createElement("button")
    buttonAdd.class = "quantity-btn add-btn center"
    buttonAdd.innerText = "+"
    li.appendChild(buttonAdd)

    itemDisplaySection.appendChild(li)
  })
}

displayItems()