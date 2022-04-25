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
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
    },
  ],
  cart: [],
  baseTotal: 0,
  total: 0,
};

const itemList = document.querySelector(".store--item-list");
const cartList = document.querySelector(".cart--item-list");

const cartTotal = document.querySelector(".total-number");

function createShop() {
  state.items.forEach((el, index) => {
    el.amount = 1;
    let fruit = state.items[index].id;
    let item = `<li>
    <div class="store--item-icon">
      <img src="assets/icons/${fruit}.svg" alt=${fruit.slice(4)} />
    </div>
    <button id=${fruit} class='add-to-basket' >Add to cart</button>
    </li> 
    `;

    itemList.insertAdjacentHTML("beforeend", item);
  });
}
createShop();

const buttons = document.querySelectorAll(".add-to-basket");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    updateCartState(event);
  });
});

function updateCartState(event) {
  if (!state.cart.includes(returnItem(event.target.id))) {
    state.cart.push(returnItem(event.target.id));
    renderCart();
  }
}

function returnItem(id) {
  let item = state.items.find((el) => el.id === id);
  return item;
}

function createCartItem(id) {
  let item = returnItem(id);

  let cartItem = `<li>
      <img
        class="cart--item-icon"
        src="assets/icons/${item.id}.svg"
        alt= '${item.id}'
      />
      <p>${item.name}</p>
      <button id='remove${item.id}' class='remove-from-basket' >Remove</button>
      <button id='subtract${item.name}' class="quantity-btn remove-btn center">-</button>
      <span class="quantity-text center">${item.amount}</span>
      <button id='add${item.name}' class="quantity-btn add-btn center">+</button>
    </li>`;
  cartList.insertAdjacentHTML("beforeend", cartItem);

  const removeButton = document.querySelector(`#remove${item.id}`);
  removeButton.addEventListener("click", () => removeCartItem(item.id));

  const addAmount = document.getElementById(`add${item.name}`);
  addAmount.addEventListener("click", () => addToCart(item.id));

  const subtractAmount = document.getElementById(`subtract${item.name}`);
  subtractAmount.addEventListener("click", () => subtractFromCart(item.id));

  totalCost();
}

function removeCartItem(id) {
  let filteredArray = state.cart.filter((el) => el.id !== id);
  state.cart = filteredArray;
  // renderCart();
}

function addToCart(id) {
  state.cart = state.cart.map((el) => {
    if (el.id === id) {
      el.amount++;
    }
    return el;
  });

  renderCart();
}

function subtractFromCart(id) {
  state.cart = state.cart.map((el) => {
    if (el.id === id) {
      el.amount--;
    }
    return el;
  });
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  state.cart.forEach((el) => {
    createCartItem(el.id);
  });
}

function totalCost() {
  let total = 0;
  state.cart.forEach((el) => {
    total += el.amount * el.price;
  });
  cartTotal.innerText = total.toFixed(2);
}
