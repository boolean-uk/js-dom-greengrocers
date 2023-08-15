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

function renderBasket()   {
  const cartListContainer = document.querySelector('.item-list.cart--item-list')
  cartListContainer.innerHTML = ''
  state.cart.forEach((item,index)=>createCartItemCard(item,index,cartListContainer))
  if (state.cart) {
    renderTotalSum()  
   }
}
function renderStore() {
  const storeListContainer = document.querySelector('.item-list.store--item-list')
  state.items.forEach((item, index) => {
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
  buttonElement.setAttribute("id", index)

  buttonElement.addEventListener('click', e => addToCart(e))
  listElement.append(buttonElement)
}

function createCartItemCard(cartItem,index, cartListContainer) {
  const listElement = document.createElement('li')
  cartListContainer.append(listElement)
  // listElement.innerHTML = `
  // <img
  //   class="cart--item-icon"
  //   src="assets/icons/${cartItem.id}.svg"
  //   alt="${cartItem.name}"
  // />
  // <p>${cartItem.name}</p>
  // <button class="quantity-btn remove-btn center">-</button>
  // <span class="quantity-text center">${cartItem.quantity}</span>
  // <button class="quantity-btn add-btn center">+</button>
  // `
  // addEventListenersToButtons(index)
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
    // console.log('Reached this place')
  })
  listElement.append(addButton)

}


function addToCart(e) {
  updateBasket(e.target.getAttribute('id'))
  renderBasket()    
}

function updateBasket(itemId) {
  const item = state.items[itemId]
  const itemIndexInCart = checkIfCartIncludesItem(item)
  if (itemIndexInCart>=0) {
    // console.log(itemIndexInCart)
    // console.log(state.cart[itemIndexInCart].quantity)
      state.cart[itemIndexInCart].quantity++
  } else {
      state.cart.push({item, quantity: 1 });

  }
  // console.log(state.cart)
}


function checkIfCartIncludesItem(item) {
  for (let i = 0; i < state.cart.length; i++) {
      if (state.cart[i].item === item) {
        return i;
      }
    }
    return -1;
}

function render() {
  renderStore()
 renderBasket()
 
  // console.log(state)
}

render()