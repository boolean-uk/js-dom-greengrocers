function main() {
  renderStoreItems();
  renderCart();
}

function renderStoreItems() {
  const storeList = document.querySelector(".store--item-list");
  storeList.innerHTML = "";
  
  state.items.forEach(item => {
    const itemLi = document.createElement('li');
    itemLi.classList.add('store--item');

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('store--item-icon');

    const img = document.createElement('img');
    img.className = "store--item-icon";
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = item.name;

    const button = document.createElement('button');
    button.textContent = "Add to cart";
    button.addEventListener('click', function () {
      addToCart(item);
    });

    itemDiv.appendChild(img);
    itemLi.appendChild(itemDiv);
    itemLi.appendChild(button);
    storeList.appendChild(itemLi);
  });
}

function renderCart() {
  const cartList = document.querySelector(".cart--item-list");
  cartList.innerHTML = "";

  let sum = 0;
  state.cart.forEach(item => {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.className = "cart--item-icon";
    img.src = `assets/icons/${item.id}.svg`;
    li.appendChild(img);

    const p = document.createElement('p');
    p.textContent = item.name;
    li.appendChild(p);

    const buttonDcr = createButton('-', function () {
      decrement(item);
    });
    li.appendChild(buttonDcr);

    const span = document.createElement('span');
    span.classList.add('quantity-text', 'center');
    span.textContent = `${item.quantity}`;
    li.appendChild(span);

    const buttonIcr = createButton('+', function () {
      increment(item);
    });
    li.appendChild(buttonIcr);

    cartList.appendChild(li);

    sum += item.quantity * item.price;
  });

  const totalElement = document.querySelector(".total-number");
  totalElement.innerText = sum.toFixed(2);
}

function createButton(text, onClick) {
  const button = document.createElement('button');
  button.classList.add('quantity-btn', 'center');
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
}

function addToCart(item) {
  let obj = state.cart.find(i => i.id === item.id);

  if (obj) {
    obj.quantity += 1;
  } else {
    item.quantity = 1;
    state.cart.push(item);
  }
  renderCart();
}

function increment(item) {
  let obj = state.cart.find(i => i.id === item.id);
  obj.quantity += 1;
  renderCart();
}

function decrement(item) {
  let obj = state.cart.find(i => i.id === item.id);
  obj.quantity -= 1;
  if (obj.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== item.id);
  }
  renderCart();
}

const state = {
  items: [
    { id: "001-beetroot", name: "beetroot", price: 0.35, type: "red" },
    { id: "002-carrot", name: "carrot", price: 0.35, type: "orange" },
    { id: "003-apple", name: "apple", price: 0.35, type: "red" },
    { id: "004-apricot", name: "apricot", price: 0.45, type: "orange" },
    { id: "005-avocado", name: "avocado", price: 0.75, type: "green" },
    { id: "006-bananas", name: "bananas", price: 0.25, type: "yellow" },
    { id: "007-bell-pepper", name: "bell pepper", price: 0.45, type: "green" },
    { id: "008-berry", name: "berry", price: 0.65, type: "red" },
    { id: "009-blueberry", name: "blueberry", price: 0.35, type: "blue" },
    { id: "010-eggplant", name: "eggplant", price: 0.35, type: "blue" }
  ],
  cart: [
    { id: "001-beetroot", name: "beetroot", price: 0.35, quantity: 2 }
  ]
};

main();
