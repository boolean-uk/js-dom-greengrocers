const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35, 
      category: 'vegetable'
      
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      category: 'vegetable'
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      category: 'fruit'
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      category: 'fruit'
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      category: 'vegetable'
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      category: 'fruit'
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      category: 'vegetable'
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      category: 'fruit'
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      category: 'fruit'
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      category: 'vegetable'
    }
  ],
  cart: []
};

const createItem = (item) => {
  return `<li>
  <div class="store--item-icon">
    <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
  </div>
  <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
</li>`
}

const createAllItems = (items) => {
  return items.map(i => createItem(i))
}

document.getElementsByClassName('item-list store--item-list')[0].innerHTML = createAllItems(state.items).join('')

const createCart = (item) => {
  return `<li>
      <img class="cart--item-icon" src="assets/icons/${item.id}.svg" alt="${item.name}" />
      <p>${item.name}</p>
      <button class="quantity-btn remove-btn center" data-id="${item.id}">-</button>
      <span class="quantity-text center">${item.quantity}</span>
      <button class="quantity-btn add-btn center" data-id="${item.id}">+</button>
  </li>`
}

const createFullCart = (items) =>{
  return items.map(i => createCart(i))
}

const updateTotal = () => {
  const totalElement = document.getElementById('total-number');
  const total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  totalElement.textContent = total.toFixed(2);
};
document.addEventListener('click', (event)=>{
  if(event.target.classList.contains('add-to-cart-btn')){
    const itemId = event.target.dataset.id
    const item = state.items.find(i => i.id === itemId)
    if (item) {
      const cartItemIndex = state.cart.findIndex(i => i.id === itemId);
      if (cartItemIndex !== -1) {
          state.cart[cartItemIndex].quantity++;
      } else {
          state.cart.push({ ...item, quantity: 1 });
      }
      const cartList = document.querySelector('.cart--item-list');
      cartList.innerHTML = createFullCart(state.cart).join('');
      updateTotal();
    }
  }
})

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-btn')) {
    const itemId = event.target.dataset.id;
    const cartItem = state.cart.find(i => i.id === itemId);
    if (cartItem && cartItem.quantity > 0) {
      cartItem.quantity--;
      const cartList = document.querySelector('.cart--item-list');
      cartList.innerHTML = createFullCart(state.cart).join('');
      updateTotal();
    }
  } else if (event.target.classList.contains('add-btn')) {
    const itemId = event.target.dataset.id;
    const cartItem = state.cart.find(i => i.id === itemId);
    if (cartItem) {
      cartItem.quantity++;
      const cartList = document.querySelector('.cart--item-list');
      cartList.innerHTML = createFullCart(state.cart).join('');
      updateTotal();
    }
  }
})

const categories = ['fruit', 'vegetable']
const filterButtons = categories.map(category => { 
  return `<button class="category-btn" data-category="${category}">${category}</button>`
})

document.getElementById('btn-container').innerHTML = filterButtons.join('')

document.addEventListener('click', (event)=>{
  if(event.target.classList.contains('category-btn')){
    const selected = event.target.dataset.category
    const filtered = state.items.filter(item => item.category === selected)

    refreshItems(filtered)
  }
})

function refreshItems(items) {
  const itemList = items.map(item => createItem(item));
  document.getElementsByClassName('item-list store--item-list')[0].innerHTML = itemList.join('');
}

function sortItemsAlphabetically(items) {
  const sorted =  items.slice().sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
          return -1;
      }
      if (nameA > nameB) {
          return 1;
      }
      return 0;
  });
  const itemList = sorted.map(item => createItem(item))
  document.getElementsByClassName('item-list store--item-list')[0].innerHTML = itemList.join('');
}

document.addEventListener('click', (event) =>{
  if(event.target.classList.contains('sort-btn')){
    sortItemsAlphabetically(state.items)
  }
})