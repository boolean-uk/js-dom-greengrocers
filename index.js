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

const store = document.querySelector('.store--item-list');

const cartContainer = document.querySelector('.cart--item-list-container');
const total = document.getElementById('total-number');
let sum = 0;

const displayItems = () => {
  state.items.forEach(item => {
    const card = createItemCard(item);
    store.appendChild(card);
  });
};

const createItemCard = (item) => {
  const card = document.createElement('li');
  const img = document.createElement('img');
  const imgContainer = document.createElement('div')
  imgContainer.classList.add('store--item-icon')
  img.src = `/assets/icons/${item.id}.svg`;
  imgContainer.appendChild(img)
  const button = document.createElement('button');
  button.textContent = 'Add to cart';
  button.addEventListener('click', () => addToCart(item));

  card.appendChild(imgContainer);
  card.appendChild(button);

  return card;
};

const addToCart = (item) => {
  const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }
  renderCart();
};

const removeFromCart = (item) => {
  const index = state.cart.findIndex(cartItem => cartItem.id === item.id);
  if (index !== -1) {
    state.cart[index].quantity--;
    if (state.cart[index].quantity === 0) {
      state.cart.splice(index, 1);
    }
  }
  renderCart();
};

const renderCart = () => {
  const cartList = document.querySelector('.cart--item-list');
  cartList.innerHTML = '';
  state.cart.forEach(item => {
    const cartCard = createCartCard(item);
    cartList.appendChild(cartCard);
  });
  sumCart();
};

const sumCart = () => {
  sum = 0;
  state.cart.forEach(item => {
    sum += item.price*item.quantity
  })
  total.textContent = `£${Math.round(sum * 100) / 100}`
}

const createCartCard = (item) => {
  const cartCard = document.createElement('li');
  cartCard.classList.add('cart--item-list', 'li');
  cartCard.id = `cart-item-${item.id}`;

  const img = document.createElement('img');
  img.classList.add('cart--item-icon');
  img.src = `/assets/icons/${item.id}.svg`;

  const name = document.createElement('p');
  name.textContent = item.name;

  const rmBtn = document.createElement('button');
  rmBtn.textContent = '-';
  rmBtn.classList.add('quantity-btn', 'remove-btn', 'center');
  rmBtn.addEventListener('click', () => removeFromCart(item));

  const quantity = document.createElement('span');
  quantity.classList.add('quantity-text', 'center');
  quantity.textContent = item.quantity;

  const addBtn = document.createElement('button');
  addBtn.textContent = '+';
  addBtn.classList.add('quantity-btn', 'add-btn', 'center');
  addBtn.addEventListener('click', () => addToCart(item));

  cartCard.appendChild(img);
  cartCard.appendChild(name);
  cartCard.appendChild(rmBtn);
  cartCard.appendChild(quantity);
  cartCard.appendChild(addBtn);

  return cartCard;
};

displayItems();
renderCart();
