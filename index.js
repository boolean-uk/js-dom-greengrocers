const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "veg",
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "veg",
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "veg",
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "veg",
    },
  ],
};

const store = document.querySelector("ul.item-list.store--item-list");
const cart = document.querySelector("ul.item-list.cart--item-list");
const divSort = document.getElementById("sort");
const divFilter = document.getElementById("filter");
const buttonASC = document.createElement("button");
buttonASC.textContent = "Sort Ascending";
buttonASC.onclick = (e) => {
  sortASC();
};
const buttonDES = document.createElement("button");
buttonDES.textContent = "Sort Descending";
buttonDES.onclick = (e) => {
  sortDES();
};
divSort.appendChild(buttonASC);
divSort.appendChild(buttonDES);
cart.id = "cart-items";
for (let i = 0; i < state.items.length; i++) {
  store.appendChild(createStoreItem(state.items[i]));
}
const buttonNone = document.createElement("button");
buttonNone.textContent = "Filter: None";
buttonNone.onclick = (e) => {
  filterNone();
};
const buttonFruit = document.createElement("button");
buttonFruit.textContent = "Filter: Fruit";
buttonFruit.onclick = (e) => {
  filterFruit();
};const buttonVeg = document.createElement("button");
buttonVeg.textContent = "Filter: Vegetables";
buttonVeg.onclick = (e) => {
  filterVeg();
};
divFilter.appendChild(buttonNone)
divFilter.appendChild(buttonFruit)
divFilter.appendChild(buttonVeg)
function addItem(id) {
  const item = state.items.find((item) => item.id === id);
  let exists = false;
  for (let i = 0; i < cart.children.length; i++) {
    if (cart.children[i].getAttribute("id") === id.toString()) {
      const span = document.getElementById("span" + id);
      span.textContent = parseInt(span.textContent) + 1;
      exists = true;
    }
  }
  if (!exists) {
    cart.appendChild(createCartItem(item));
  }
  let total = document.querySelector(".total-number").textContent.slice(1);
  total = parseFloat(total) + item.price;
  document.querySelector(".total-number").textContent = "£" + total.toFixed(2);
}
function incItem(id) {
  const span = document.getElementById("span" + id);
  span.textContent = parseInt(span.textContent) + 1;
}
function decItem(id) {
  const span = document.getElementById("span" + id);
  span.textContent = parseInt(span.textContent) - 1;
}

function createStoreItem(item) {
  const id = item.id;
  const listItem = document.createElement("li");
  const div = document.createElement("div");
  div.classList.add("store--item-icon");
  const img = document.createElement("img");
  img.src = "assets/icons/" + item.id + ".svg";
  img.alt = item.id.split("-")[1];
  const button = document.createElement("button");
  button.onclick = (e) => {
    addItem(id);
  };
  button.textContent = "Add to cart";

  listItem.appendChild(div);
  div.appendChild(img);
  listItem.appendChild(button);
  return listItem;
}

function createCartItem(item) {
  const id = item.id;
  const cartItem = document.createElement("li");
  cartItem.setAttribute("id", id);
  cartItem.setAttribute("quantity", 1);

  const img = document.createElement("img");
  img.classList.add("cart--item-icon");
  img.src = "assets/icons/" + item.id + ".svg";
  img.alt = item.id.split("-")[1];

  const para = document.createElement("p");
  para.textContent = item.id.split("-")[1];

  const buttonAdd = document.createElement("button");
  buttonAdd.className = "quantity-btn add-btn center";
  buttonAdd.textContent = "+";

  const span = document.createElement("span");
  span.className = "quantity-text center";
  span.id = "span" + id;
  span.textContent = 1;

  const buttonRemove = document.createElement("button");
  buttonRemove.className = "quantity-btn remove-btn center";
  buttonRemove.textContent = "-";

  cartItem.appendChild(img);
  cartItem.appendChild(para);
  cartItem.appendChild(buttonRemove);
  cartItem.appendChild(span);
  cartItem.appendChild(buttonAdd);

  buttonAdd.onclick = (e) => {
    span.textContent = parseInt(span.textContent) + 1;
    let total = document.querySelector(".total-number").textContent.slice(1);
    total = parseFloat(total) + item.price;
    document.querySelector(".total-number").textContent =
      "£" + total.toFixed(2);
  };
  buttonRemove.onclick = (e) => {
    span.textContent = parseInt(span.textContent) - 1;
    if (span.textContent === "0") {
      const cart = document.getElementById("cart-items");
      const cartItemToRemove = document.getElementById(id);

      if (cartItemToRemove) {
        cart.removeChild(cartItemToRemove);
      }
    }
    let total = document.querySelector(".total-number").textContent.slice(1);
    total = parseFloat(total) - item.price;
    document.querySelector(".total-number").textContent =
      "£" + total.toFixed(2);
  };
  return cartItem;
}

function sortASC() {
  state.items.sort((a, b) => {
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
  while (store.firstChild) {
    store.removeChild(store.firstChild);
  }
  for (let i = 0; i < state.items.length; i++) {
    store.appendChild(createStoreItem(state.items[i]));
  }
}
function sortDES() {
  state.items.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });
  while (store.firstChild) {
    store.removeChild(store.firstChild);
  }
  for (let i = 0; i < state.items.length; i++) {
    store.appendChild(createStoreItem(state.items[i]));
  }
}
function filterFruit() {
  while (store.firstChild) {
    store.removeChild(store.firstChild);
  }
  for (let i = 0; i < state.items.length; i++) {
    if (state.items[i].type === "fruit") {
      store.appendChild(createStoreItem(state.items[i]));
    }
  }
}
function filterVeg() {
  while (store.firstChild) {
    store.removeChild(store.firstChild);
  }
  for (let i = 0; i < state.items.length; i++) {
    if (state.items[i].type === "veg") {
      store.appendChild(createStoreItem(state.items[i]));
    }
  }
}
function filterNone() {
  while (store.firstChild) {
    store.removeChild(store.firstChild);
  }
  for (let i = 0; i < state.items.length; i++) {
    store.appendChild(createStoreItem(state.items[i]));
  }
}
