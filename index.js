const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.65,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.45,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.75,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.55,
      type: "vegetable"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 10.00,
      type: "vegetable"
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
      price: 1.30,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.20,
      type: "berry"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.25,
      type: "berry"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 2.50,
      type: "vegetable"
    }
  ],
  cart: []
};
// Holds current sorted & filtered state
let currentItemState = [...state.items]

function renderStoreItems() {
  const itemList = document.querySelector(".store--item-list")
  itemList.innerHTML = "";
  currentItemState.forEach((item) => {
    itemList.append(renderStoreItem(item))
  })
}

function renderStoreItem(item) {
  const li = document.createElement('li')

  const div = document.createElement('div')
  div.className = 'store--item-icon'
  const img = document.createElement('img')
  img.src = `assets/icons/${item.id}.svg`
  img.alt = item.name
  
  div.append(img)
  li.append(div)

  const button = document.createElement('button')
  button.textContent = "ADD TO CART"

  button.addEventListener('click', addToCartInShop, false)

  li.append(button)

  return li
}

function renderCartItem(item, cartItem) {
  const li = document.createElement('li')

  const img = document.createElement('img')
  img.className = 'cart--item-icon'
  img.src = `assets/icons/${item.id}.svg`
  img.alt = item.name
  li.append(img)

  const name = document.createElement('p')
  name.textContent = item.name
  li.append(name)

  const removeButton = document.createElement('button')
  removeButton.classList.add('quantity-btn', 'remove-btn', 'center')
  removeButton.addEventListener('click', removeFromCart, false)
  li.append(removeButton)

  const span = document.createElement('span')
  span.classList.add('quantity-text', 'center')
  span.textContent = cartItem.quantity
  li.append(span)

  const addButton = document.createElement('button')
  addButton.classList.add('quantity-btn', 'add-btn', 'center')
  addButton.addEventListener('click', addToCartInCart, false)
  li.append(addButton)

  return li
}

function renderCartItems() {
  const cartList = document.querySelector(".cart--item-list");
  cartList.innerHTML = "";

  state.cart.forEach((cartItem) => {
    const item = state.items.find((i) => i.id === cartItem.id);
    cartList.append(renderCartItem(item, cartItem));
  });
}

var addToCartInCart = function() {
  addToCart(this.parentElement.children[0].alt)
}

var addToCartInShop = function() {
  addToCart(this.parentElement.children[0].children[0].alt)
}

function addToCart(itemName) {
  const item = state.items.find((item) => item.name === itemName)

  const itemInCart = state.cart.find((i) => i.id === item.id)

  if (itemInCart === undefined) {
    const newCartItem = {
      id: item.id,
      quantity: 1
    }
    state.cart.push(newCartItem)
    const cart = document.querySelector(".cart--item-list")
    cart.append(renderCartItem(item, newCartItem))
  } else {
    itemInCart.quantity += 1
  }
  
  renderCart()
}

var removeFromCart = function() {
  const item = state.items.find((item) => item.name === this.parentElement.children[0].alt)
  const itemInCart = state.cart.find((i) => i.id === item.id)

  itemInCart.quantity -= 1

  if (itemInCart.quantity <= 0) {
    state.cart = state.cart.filter((i) => i.id !== itemInCart.id);
  }

  renderCart()
}

function updateTotal() {
  let total = 0
  state.cart.forEach((i) => {
    total += state.items.find((item) => item.id === i.id).price * i.quantity
  })
  const totalNumber = document.querySelector('.total-number')
  totalNumber.textContent = `£${Math.round(total * 100) / 100}`
}

function createOptionsfilter() {
  const filterSelect = document.querySelector('#filter')

  const distinctTypes = [...new Set(state.items.map(item => item.type))];

  filterSelect.appendChild(createOption('All'))

  distinctTypes.forEach(type => {
    filterSelect.appendChild(createOption(type))
  });

  const sortSelect = document.querySelector('#filter')
  filterSelect.addEventListener("change", function() {
    filterAndSort(filterSelect.value, sortSelect.value)
  });
}

function filterAndSort(type, sortValue) {
  currentItemState = type === 'All' ? [...state.items] : [...state.items.filter((i) => i.type === type)];

  switch (sortValue) {
    case 'price desc':
      currentItemState.sort((a, b) => b.price - a.price);
      break;
    case 'price asc':
      currentItemState.sort((a, b) => a.price - b.price);
      break;
    case 'alphabetically desc':
      currentItemState.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'alphabetically asc':
      currentItemState.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  renderStoreItems();
}

function createOptionsSort() {
  const sortSelect = document.querySelector('#sort')

  sortSelect.appendChild(createOption('None'))

  sortSelect.appendChild(createOption('price desc'))
  sortSelect.appendChild(createOption('price asc'))
  sortSelect.appendChild(createOption('alphabetically desc'))
  sortSelect.appendChild(createOption('alphabetically asc'))

  const filterSelect = document.querySelector('#filter')
  sortSelect.addEventListener("change", function() {
  filterAndSort(filterSelect.value, sortSelect.value)
  });
}

function createOption(value) {
  const option = document.createElement('option')
  option.value = value
  option.textContent = value
  return option
}

function renderCart() {
  renderCartItems()
  updateTotal()
}

function main() {
  renderStoreItems()
  createOptionsfilter()
  createOptionsSort()
}

main()