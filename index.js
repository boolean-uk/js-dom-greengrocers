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



const pageHeader = document.querySelector('#store')
const listOfItemsToBuy = document.querySelector('.item-list.store--item-list')
const main = document.querySelector('#cart')
const cartContainer = document.querySelector('.cart--item-list-container')
const listItemsInCart = document.querySelector('.item-list.cart--item-list')
const totalSection = document.querySelector('.total-section')
const totalNumber = document.querySelector('.total-number')



// function loopThroughItems() {
//   for(let i = 0; i < state.items.length; i++) {
//     createItemCards(state.items[i])
//   }
// }

// function createItemCards(state.items[i]) {
  

// }
for(let i = 0; i < state.items.length; i++) {
  const listItem = document.createElement('li');     listOfItemsToBuy.append(listItem)

  const itemIconContainer = document.createElement('div');itemIconContainer.classList.add('store--item-icon')
  listItem.append(itemIconContainer)
  
  const itemImage = document.createElement('img')
  itemImage.alt = (`${state.items[i].name}`)
  itemImage.setAttribute('src', `assets/icons/${state.items[i].id}.svg`)
  listItem.append(itemImage)
  
  const addToCartButton = document.createElement('button')
  addToCartButton.innerText = 'Add to cart'
  listItem.append(addToCartButton)
}  





