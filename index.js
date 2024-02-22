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

const storeList = document.getElementById("store").children[1]


// Render the items

function renderShopItems() {

  for (let i = 0; i < state.items.length; i++) {

    const itemLi = document.createElement("li")

    let itemDiv = document.createElement("div")
    itemDiv.setAttribute('class', 'store--item-icon')

    let itemImg = document.createElement("img")
    itemImg.setAttribute('src', 'assets/icons/' + state.items[i].id + '.svg')
    itemImg.setAttribute('alt', state.items[i].name)

    itemDiv.appendChild(itemImg)

    let itemButton = document.createElement("button")
    itemButton.innerText = "Add to cart"

    itemLi.appendChild(itemDiv)
    itemLi.appendChild(itemButton)

    
    storeList.appendChild(itemLi)
  }

}

function main() {
  renderShopItems()
}

main()