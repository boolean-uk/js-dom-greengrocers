const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      
      price: 0.35,
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

console.log()
const headerStore = document.querySelector('#store')
const storeItemList = document.querySelector('.store--item-list')
const mainCart = document.querySelector('#cart')
const cartItemListContainer = document.querySelector('.cart--item-list-container')
const cartItemList = document.querySelector('.cart--item-list')
const totalSection = document.querySelector('.total-section')
const totalNbr = document.querySelector('.total-number')

// for ul card and ul store
const itemList = document.querySelector('.item-list')

function render() {

  showStoreItems()


  // storeItemList.append()
}

function showStoreItems(){
  const items = state.items
  for(element in items) {
    const liItem = document.createElement('li')
    liItem.style.listStyleType = 'none'
    const divItem = document.createElement('div')
    divItem.classList.add('store--item-icon')
    const image = document.createElement('img')
    image.setAttribute('src',`./assets/icons/${items[element].id}.svg`)

    image.setAttribute('alt',`${items[element].name}`)
    
    const button = document.createElement('button')
    button.innerText = 'Add to cart'

    divItem.append(image)
    liItem.append(divItem, button)
    storeItemList.append(liItem)
  };
}
render()