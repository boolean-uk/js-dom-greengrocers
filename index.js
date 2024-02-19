const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.15,
      type: "vegetable",
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.25,
      type: "vegetable",
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
      price: 0.45,
      type: "fruit",
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.55,
      type: "fruit",
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.55,
      type: "fruit",
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.15,
      type: "vegetable",
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.25,
      type: "fruit",
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.65,
      type: "fruit",
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.85,
      type: "vegetable",
    },
  ],
  cart: [],
};

let cartUi = document.querySelector(".cart--item-list");
let storeUi = document.querySelector(".store--item-list");
let totalUi = document.querySelector(".total-number");
let selectedFilter = "all";
function init() {
  let storeButtons = document.querySelector(".filter-buttons");
  let vegBtn = document.createElement("button");
  vegBtn.innerHTML = "Sort by Vegetables";
  let fruitBtn = document.createElement("button");
  fruitBtn.innerHTML = "Sort by Fruit";
  let allBtn = document.createElement("button");
  allBtn.innerHTML = "Sort by All";
  allBtn.addEventListener("click", () => renderStore("all"));
  vegBtn.addEventListener("click", () => renderStore("vegetable"));
  fruitBtn.addEventListener("click", () => renderStore("fruit"));
  let sortAscBtn = document.createElement("button");
  sortAscBtn.innerHTML = "sortByPriceAsc";
  sortAscBtn.addEventListener("click", () => sortItems("asc"));
  let sortDescBtn = document.createElement("button");
  sortDescBtn.innerHTML = "sortByPriceDesc";
  sortDescBtn.addEventListener("click", () => sortItems("desc"));
  storeButtons.appendChild(fruitBtn);
  storeButtons.appendChild(vegBtn);
  storeButtons.appendChild(allBtn);
  storeButtons.appendChild(sortAscBtn);
  storeButtons.appendChild(sortDescBtn)
  renderStore("all");
}

function clearStoreUi(myNode) {
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
}

function renderStore(type) {
  clearStoreUi(storeUi);
  let items = [];
  state.items.forEach((item) => {
    if (item.type !== type && type !== "all") {
      return;
    }
    items.push(item);
  });
  selectedFilter = type;
  createStoreItems(items);

}

function sortItems(type) {
  if (type === "asc") {
    state.items.sort((a, b) => a.price - b.price);
  } else if (type === "desc") {
    state.items.sort((a, b) => b.price - a.price);
  }
  renderStore(selectedFilter);
}

function createStoreItems(itemsToRender) {
  itemsToRender.forEach((item) => {
    let storeli = document.createElement("li");
    let storeDiv = document.createElement("div");
    storeDiv.classList.add(".store--item-icon");
    let img = document.createElement("img");
    img.src = "assets/icons/" + item.id + ".svg";
    img.alt = "item.name";
    let btn = document.createElement("button");
    btn.innerHTML = "Add to cart";
    btn.addEventListener("click", () => addToCart(item));
    storeDiv.appendChild(img);
    storeli.appendChild(btn);
    storeli.appendChild(storeDiv);
    storeUi.appendChild(storeli);
  });
}

function addToCart(item) {
  let existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }
  renderCart();
  renderTotalSum();
}

function renderTotalSum() {
  let total = 0;
  state.cart.forEach((item) => {
    if (item.quantity !== undefined && item.quantity !== 0) {
      total += item.quantity * item.price;
    }
  });

  totalUi.innerHTML = "£" + total.toFixed(2);
}

function renderCart() {
  cartUi.innerHTML = "";
  state.cart.forEach((item) => {
    let cartItem = document.createElement("li");
    cartItem.textContent = `${item.name} x${item.quantity}`;
    cartUi.appendChild(cartItem);
  });
}

window.addEventListener("load", init);
