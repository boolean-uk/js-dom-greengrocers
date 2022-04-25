const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      type: "vegetable",
      price: 0.35,
    },
  ],
  cart: [],
  total: 0,
  filteredItems: [],
};

state.filteredItems = state.items;

const itemList = document.querySelector(".store--item-list");
const cartList = document.querySelector(".cart--item-list");
const cartTotal = document.querySelector(".total-number");
const alphaSortButton = document.querySelector(".alpha-sort-button");
const vegetableOnly = document.querySelector(".veg-filter");
const fruitOnly = document.querySelector(".fruit-filter");

function filterAddListener(element, type) {
  element.addEventListener("click", (event) => {
    if (event.target.checked) {
      itemList.innerHTML = "";
      filterByType(type);
    } else {
      state.filteredItems = state.items;
    }

    createShop();
  });
}

function filterByType(type) {
  let filteredArray = state.items.filter((el) => el.type === type);
  state.filteredItems = filteredArray;
}

filterAddListener(vegetableOnly, "vegetable");
filterAddListener(fruitOnly, "fruit");

alphaSortButton.addEventListener("click", () => {
  itemList.innerHTML = "";
  sortABC(state);
  createShop();
});

function sortABC(state) {
  let sortedStateItems = state.items.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  state.items = sortedStateItems;
  return state.items;
}

function createShop() {
  itemList.innerHTML = "";
  state.filteredItems.forEach((el, index) => {
    el.amount = 1;
    let fruit = state.filteredItems[index].id;
    let item = `<li>
    <div class="store--item-icon">
      <img src="assets/icons/${fruit}.svg" alt=${fruit.slice(4)} />
    </div>
    <button id=${fruit} class='add-to-basket' >Add to cart</button>
    </li> 
    `;

    itemList.insertAdjacentHTML("beforeend", item);
  });
  const buttons = document.querySelectorAll(".add-to-basket");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      updateCartState(event);
    });
  });
}

createShop();

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
      <button id='subtract${item.name}' class="quantity-btn remove-btn center">-</button>
      <span class="quantity-text center">${item.amount}</span>
      <button id='add${item.name}' class="quantity-btn add-btn center">+</button>
    </li>`;
  cartList.insertAdjacentHTML("beforeend", cartItem);

  const addAmount = document.getElementById(`add${item.name}`);
  addAmount.addEventListener("click", () => addToCart(item.id));

  const subtractAmount = document.getElementById(`subtract${item.name}`);
  subtractAmount.addEventListener("click", () => subtractFromCart(item.id));

  totalCost();

  removeItemWhenTotalZero(item);
}

function removeItemWhenTotalZero(item) {
  if (item.amount === 0) {
    removeCartItem(item.id);
    item.amount = 1;
  }
}

function removeCartItem(id) {
  let filteredArray = state.cart.filter((el) => el.id !== id);
  state.cart = filteredArray;
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

function incrementDecrement() {}

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
  cartTotal.innerText = `$${total.toFixed(2)}`;
}

// vegetableOnly.addEventListener("click", (event) => {
//   if (event.target.checked) {
//     itemList.innerHTML = "";
//     sortVegetableOnly(state);
//   } else {
//     state.filteredItems = state.items;
//   }

//   createShop();
// });

// function sortVegetableOnly(state) {
//   let filteredArray = state.items.filter((el) => el.type === "vegetable");
//   state.filteredItems = filteredArray;
// }

// fruitOnly.addEventListener("click", (event) => {
//   if (event.target.checked) {
//     itemList.innerHTML = "";
//     sortFruitOnly(state);
//   } else {
//     state.filteredItems = state.items;
//   }
//   createShop();
// });

// function sortFruitOnly(state) {
//   let filteredArray = state.items.filter((el) => el.type === "fruit");
//   state.filteredItems = filteredArray;
// }
