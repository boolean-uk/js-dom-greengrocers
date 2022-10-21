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

// render shop items
// 1. query selector item list
// 2. function to create li
//      create + append div to li
//      create + append img to div
//      create + append button to li
// 3. for each state item run create li function

const shopItems = document.querySelector(".item-list")
const itemData = state.items

itemData.forEach((item) => {
  shopItems.appendChild(createShopItem(item))
})

function createShopItem (item) {

  const shopItem = document.createElement('li')
  const shopIconCon = document.createElement('div')
  const shopIcon = document.createElement('img')
  const addToCart = document.createElement('button')

  shopIconCon.setAttribute('class', "store--item-icon" )
  shopIcon.src = `assets/icons/${item.id}.svg`
  addToCart.innerText = 'Add to cart'

  shopItem.appendChild(shopIconCon)
  shopIconCon.appendChild(shopIcon)
  shopItem.appendChild(addToCart)

  return shopItem

}

