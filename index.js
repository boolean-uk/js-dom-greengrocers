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

const headerStore = document.querySelector('#store');
const storeItemList = document.querySelector('.store--item-list');
const mainCart = document.querySelector('#cart');
const cartItemListContainer = document.querySelector('.cart--item-list-container');
const cartItemList = document.querySelector('.cart--item-list');
const totalNbr = document.querySelector('.total-number');

const objectNo = { number: 0 };
let itemsInCart = state.cart;
const itemsList = state.items;

function render() {
  showStoreItems();
}

function showStoreItems() {
  storeItemList.innerHTML = '';
  for (const item of itemsList) {
    const liItem = document.createElement('li');
    liItem.style.listStyleType = 'none';
    const divItem = document.createElement('div');
    divItem.classList.add('store--item-icon');
    const image = createStoreImage(item);
    const button = createStoreButton(item);
    divItem.appendChild(image);
    liItem.append(divItem, button);
    storeItemList.appendChild(liItem);
  }
}

function createStoreImage(item) {
  const image = document.createElement('img');
  image.setAttribute('src', `./assets/icons/${item.id}.svg`);
  image.setAttribute('alt', `${item.name}`);
  return image;
}

function createStoreButton(item) {
  const button = document.createElement('button');
  button.innerText = 'Add to cart';
  button.addEventListener('click', () => addItem(item));
  return button;
}

function addItem(newItem) {
  const existingItem = itemsInCart.find(item => item.name === newItem.name);
  if (existingItem) {
    existingItem.number++;
  } else {
    newItem.number = 1;
    itemsInCart.push(newItem);
  }
  showCartItems();
}

function showCartItems() {
  cartItemList.innerHTML = '';
  let totalPrice = 0;
  itemsInCart.forEach(item => {
    if (item.number > 0) {
      const liItem = document.createElement('li');
      const image = createCartImage(item);
      const pName = createCartPName(item);
      const buttonMinus = createButton('-', () => decreaseItem(item));
      const span = createSpan(item);
      const buttonPlus = createButton('+', () => increaseItem(item));
      const totalValue = item.price * item.number;

      totalPrice += totalValue;

      liItem.append(image, pName, buttonMinus, span, buttonPlus);
      cartItemList.appendChild(liItem);
    }
  });
  totalNbr.innerText = `£ ${totalPrice.toFixed(2)}`;
}

function createCartImage(item) {
  const image = document.createElement('img');
  image.classList.add('cart--item-icon');
  image.setAttribute('src', `./assets/icons/${item.id}.svg`);
  image.setAttribute('alt', `${item.name}`);
  return image;
}

function createCartPName(item) {
  const pName = document.createElement('p');
  pName.innerText = item.name;
  return pName;
}

function createSpan(item) {
  const span = document.createElement('span');
  span.innerText = item.number;
  span.classList.add('quantity-text');
  span.classList.add('center');
  return span;
}

function createButton(text, onClick) {
  const button = document.createElement('button');
  button.classList.add('quantity-btn');
  button.classList.add('center');
  button.innerText = text;
  button.addEventListener('click', onClick);
  return button;
}

function decreaseItem(item) {
  if (item.number > 0) {
    item.number--;
    showCartItems();
  }
}

function increaseItem(item) {
  item.number++;
  showCartItems();
}

render();

