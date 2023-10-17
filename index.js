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


const store = document.querySelector('#store')
const cart = document.querySelector('#cart')
const cartItemListContainer = document.querySelector('.cart--item-list-container')
const cartItemList = document.querySelector('.cart--item-list')
const storeItemList = document.querySelector('.store--item-list')
const totalSection = document.querySelector('.total-section')
const total = document.querySelector('.total-number')

populateStoreItemList(state.items)

populateCartItemList()





// render the filter dropdown selector

const filtersMenu = document.createElement('div')
filtersMenu.setAttribute('id', 'filtersMenu')
store.prepend(filtersMenu)

const filtersDropdown = document.createElement('select')
filtersMenu.append(filtersDropdown)

const selectPlaceholder = document.createElement('option')
selectPlaceholder.innerText = 'Select filter'
selectPlaceholder.setAttribute('value', 'filter')
filtersDropdown.append(selectPlaceholder)

const selectVegetables = document.createElement('option')
selectVegetables.innerText = 'Vegetables'
selectVegetables.setAttribute('value', 'vegetables')
filtersDropdown.append(selectVegetables)

const selectFruit = document.createElement('option')
selectFruit.innerText = 'Fruit'
selectFruit.setAttribute('value', 'fruit')
filtersDropdown.append(selectFruit)


const selectAll = document.createElement('option')
selectAll.innerText = 'all'
selectAll.setAttribute('name', 'all')
filtersDropdown.append(selectAll)

//events


// filtersDropdown.addEventListener('change', event => 


const filterFruit = () => {
  const fruit = state.items.filter(item => item.type === 'fruit')
  state.filtered = fruit
}

const filterVegetables = () => {
  const vegetables = state.items.filter(item => item.type === 'vegetables')
  state.filtered = vegetables
}


filterFruit()







filtersDropdown.addEventListener('change', event =>{

  if (event.target.value === 'fruit') {
  filterFruit()
  const itemsInShop = storeItemList.querySelectorAll('li')
  itemsInShop.forEach(item => item.remove())
  populateStoreItemList(state.filtered)
  }

  if (event.target.value === 'vegetables') {
    filterVegetables()
    const itemsInShop = storeItemList.querySelectorAll('li')
    itemsInShop.forEach(item => item.remove())
    populateStoreItemList(state.filtered)
    }

  if (event.target.value === 'all') {
    state.filtered = []
    const itemsInShop = storeItemList.querySelectorAll('li')
    itemsInShop.forEach(item => item.remove())
    populateStoreItemList(state.items)
    }

})