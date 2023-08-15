const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      // price: 0.35,

      // Changed the price so I can test the sort by price functionality (all items had the same price)
      price: 0.45,
      type: "vegetable"
    }
  ],
  cart: []
};

function renderBasket()   {
  const cartListContainer = document.querySelector('.item-list.cart--item-list')
  cartListContainer.innerHTML = ''
  if (state.cart) {
    state.cart.forEach((item,index)=>createCartItemCard(item,index,cartListContainer))

    renderTotalSum()  
   }
}

function renderStore(items) {
  const storeListContainer = document.querySelector('.item-list.store--item-list')
  storeListContainer.innerHTML = ''
  items.forEach((item, index) => {
      createStoreItemCard(item,index, storeListContainer)
  });
}

function renderTotalSum(){
  const totalValueContainer = document.querySelector('.total-number')
  totalValueContainer.innerText = ''
  const totalPriceItems = state.cart.map((item)=> item.item.price * item.quantity)
        .reduce((result,currentItemPrice)=>result+currentItemPrice,0)
  totalValueContainer.innerText = `£${totalPriceItems.toFixed(2)}`
  console.log(totalPriceItems)
}

function  createStoreItemCard(item,index, storeListContainer) {
  const listElement = document.createElement('li')
  storeListContainer.append(listElement)

  const divElement = document.createElement('div')
  divElement.classList.add('store--item-icon')
  listElement.append(divElement)

  const imgElement = document.createElement('img')
  imgElement.src = `assets/icons/${item.id}.svg`
  imgElement.alt = item.id.split("-")[1]
  divElement.append(imgElement)

  const buttonElement = document.createElement('button')
  buttonElement.innerText = 'Add to cart'
  buttonElement.setAttribute("id", item.id)

  buttonElement.addEventListener('click', e => addToCart(e))
  listElement.append(buttonElement)
}

function addToCart(e) {
  updateBasket(e.target.getAttribute('id'))
  renderBasket()    
}

function updateBasket(itemId) {
  const item = findItemIdInItems(itemId)
  const itemIndexInCart = checkIfCartIncludesItem(item)
  if (itemIndexInCart>=0) {
      state.cart[itemIndexInCart].quantity++
  } else {
      state.cart.push({item, quantity: 1 });
  }
}


function createCartItemCard(cartItem,index, cartListContainer) {
  const listElement = document.createElement('li')
  cartListContainer.append(listElement)
  const imgElement = document.createElement('img')
  imgElement.classList.add('cart--item-icon')
  imgElement.src = `assets/icons/${cartItem.item.id}.svg`
  imgElement.alt = cartItem.item.id.split("-")[1]
  listElement.append(imgElement)

  const paragraphElement = document.createElement('p')
  paragraphElement.innerText = `${cartItem.item.name}`
  listElement.append(paragraphElement)

  const removeButton = document.createElement('button')
  removeButton.classList.add('quantity-btn', 'remove-btn', 'center')
  removeButton.innerText = '-'
  removeButton.addEventListener('click', () => {
    state.cart[index].quantity--
    if (state.cart[index].quantity === 0) {
      state.cart.splice(index,1)
    }
    renderBasket()
  })
  listElement.append(removeButton)

  const spanElement = document.createElement('span')
  spanElement.classList.add('quantity-text', 'center')
  spanElement.innerText = `${cartItem.quantity}`
  listElement.append(spanElement)

  const addButton = document.createElement('button')
  addButton.classList.add('quantity-btn', 'add-btn', 'center')
  addButton.innerText = '+'
  addButton.addEventListener('click', () => {
    state.cart[index].quantity++
    renderBasket()
  })
  listElement.append(addButton)
}

function checkIfCartIncludesItem(item) {
  for (let i = 0; i < state.cart.length; i++) {
      if (state.cart[i].item === item) {
        return i;
      }
    }
    return -1;
}

function findItemIdInItems(itemId) {
  for (let index = 0; index < state.items.length; index++) {
    if (state.items[index].id === itemId) {
      return state.items[index]
    }    
  }
}

function renderFilter() {
  const headerContainer = document.getElementById('store')
  const fruitItemsFiltered = state.items.filter(item=>item.type === 'fruit')
  const vegetableItemsFiltered = state.items.filter(item=>item.type === 'vegetable')

  const divElement = document.createElement('div')
  divElement.classList.add('filter-buttons', 'item-list')
  const storeListContainer = document.querySelector('.item-list.store--item-list')
  headerContainer.insertBefore(divElement,storeListContainer)
  
  const headingElement = document.createElement('h4')
  headingElement.innerText = 'FILTER:'
  divElement.append(headingElement)

  const showAllButton = document.createElement('button')
  showAllButton.classList.add('show-all-button')
  showAllButton.innerText = 'Show All'
  divElement.append(showAllButton)
  showAllButton.addEventListener('click',()=> renderStore(state.items))

  const showFruitsButton = document.createElement('button')
  showAllButton.classList.add('show-fruits-button')
  showFruitsButton.innerText = 'Show Fruits'
  showFruitsButton.addEventListener('click',()=> renderStore(fruitItemsFiltered))
  divElement.append(showFruitsButton)

  const showVegetablesButton = document.createElement('button')
  showVegetablesButton.classList.add('show-vegetables-button')
  showVegetablesButton.innerText = 'Show Vegetables'
  showVegetablesButton.addEventListener('click', ()=>renderStore(vegetableItemsFiltered))
  divElement.append(showVegetablesButton)


}

//TODO: Make the sorting functionality work with filtered lists as well
function renderSort() {

  const headerContainer = document.getElementById('store')
  const itemsSortedByNameAsc = state.items.slice().sort((a, b) => a.name.localeCompare(b.name))
  const itemsSortedByNameDesc = state.items.slice().sort((a, b) => b.name.localeCompare(a.name))
  const itemsSortedByPriceAsc = state.items.slice().sort((a, b) => a.price - b.price)
  const itemsSortedByPriceDesc = state.items.slice().sort((a, b) => b.price - a.price)


  const divElement = document.createElement('div')
  divElement.classList.add('sort-dropdown', 'item-list')
  const storeListContainer = document.querySelector('.item-list.store--item-list')
  headerContainer.insertBefore(divElement,storeListContainer)

  const selectElement = document.createElement('select')
  selectElement.classList.add('select-sort')
  divElement.append(selectElement)
  selectElement.addEventListener('change',()=>{
    const optionValue = selectElement.value
    if (optionValue === 'name-asc') {
      renderStore(itemsSortedByNameAsc)
    } else if (optionValue === 'name-desc') {
      renderStore(itemsSortedByNameDesc)
    } else if (optionValue === 'price-asc') {
      renderStore(itemsSortedByPriceAsc)
    } else if (optionValue === 'price-desc') {
      renderStore(itemsSortedByPriceDesc)
    }
  }
)

  const sortOptionElement = document.createElement('option')
  sortOptionElement.value = 'sort'
  sortOptionElement.innerText = 'Sort:'
  selectElement.append(sortOptionElement)

  const sortByNameAscOptionElement = document.createElement('option')
  sortByNameAscOptionElement.value = 'name-asc'
  sortByNameAscOptionElement.innerText = 'By Name Ascending'
  selectElement.append(sortByNameAscOptionElement)

  const sortByNameDescOptionElement = document.createElement('option')
  sortByNameDescOptionElement.value = 'name-desc'
  sortByNameDescOptionElement.innerText = 'By Name Descending'
  selectElement.append(sortByNameDescOptionElement)

  const sortByPriceAscOptionElement = document.createElement('option')
  sortByPriceAscOptionElement.value = 'price-asc'
  sortByPriceAscOptionElement.innerText = 'By Price Ascending'
  selectElement.append(sortByPriceAscOptionElement)

  const sortByPriceDescOptionElement = document.createElement('option')
  sortByPriceDescOptionElement.value = 'price-desc'
  sortByPriceDescOptionElement.innerText = 'By Price Descending'
  selectElement.append(sortByPriceDescOptionElement)
}

function render() {
  renderFilter()
  renderSort()
  renderStore(state.items)
  renderBasket() 
}

render()