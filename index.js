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
const storeItems = document.querySelector(".store--item-list")
const cartItems = document.querySelector(".cart--item-list-container")

state.items.forEach(item => {
  
  
  storeItems.append(renderStoreItem(item))
}) 

function renderStoreItem(item){
  const storeItem = document.createElement('li')
  storeItem.style.listStyle = 'none'
  
  let storeItemContainer = document.createElement('div')
  storeItemContainer.setAttribute('class', "store--item-icon")
  
  let storeItemImg = document.createElement('img')
  storeItemImg.setAttribute('src', 'assets/icons/' + item.id +'.svg')
  
  let storeButton = document.createElement('button')
  storeButton.innerText = 'Add to cart'

  storeItemContainer.append(storeItemImg)
  storeItem.append(storeItemContainer)
  storeItem.append(storeButton)
  return storeItem
}

function addToCart(item){
  cart.push(item)
}