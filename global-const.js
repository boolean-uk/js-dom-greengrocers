//This is to ensure the code store here is accessible to all the code store in other .js files

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

// ADDS PROPERTIES TO STATE
const vegetablesId = ["001-beetroot", "002-carrot", "005-avocado", "007-bell-pepper", "010-eggplant"]
const fruitId = ["003-apple", "004-apricot", "006-bananas", "008-berry", "009-blueberry"]

state.items.forEach((item => 
    {if (vegetablesId.includes(item.id)) {
        item.type = "vegetables"
     } else if (fruitId.includes(item.id)) {
        item.type = "fruit"
    }
}))

state.items.forEach(item => item.quantity = 1)
  
// ACCESS HARD-CODED HTML ELEMENTS

const store = document.querySelector('#store')
const cart = document.querySelector('#cart')
const cartItemListContainer = document.querySelector('.cart--item-list-container')
const cartItemList = document.querySelector('.cart--item-list')
const storeItemList = document.querySelector('.store--item-list')
const totalSection = document.querySelector('.total-section')
const total = document.querySelector('.total-number')

// RESET / REMOVE

const removePreviousStoreContent = () => {
  const itemsInShop = storeItemList.querySelectorAll('li')
  itemsInShop.forEach(item => item.remove())
}

const removePreviousCartContent = () => {
  const itemsInCart = cartItemList.querySelectorAll('li')
  itemsInCart.forEach(item => item.remove())
}