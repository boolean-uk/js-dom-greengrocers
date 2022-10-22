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
};
const vegetables = [
  "001-beetroot",
  "002-carrot",
  "005-avocado",
  "007-bell-pepper",
  "010-eggplant",
];
const storeItems = document.querySelector(".store--item-list");
const cartItems = document.querySelector(".cart--item-list");
const addToCartButton = document.querySelector(".add");
const h1 = document.querySelector("h1");

const allFilter = document.createElement("button");
allFilter.innerText = "All";
h1.appendChild(allFilter);

const vegetablesFilter = document.createElement("button");
vegetablesFilter.innerText = "Vegetables";
h1.appendChild(vegetablesFilter);

const fruitsFilter = document.createElement("button");
fruitsFilter.innerText = "Fruits";
h1.appendChild(fruitsFilter);

function addStoreItem(item) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.setAttribute("class", "store--item-icon");
  const img = document.createElement("img");
  img.setAttribute("src", item.image);
  img.setAttribute("alt", item.name);
  const addToCartButton = document.createElement("button");
  addToCartButton.setAttribute("class", "add");
  addToCartButton.innerText = "ADD TO CART";
  li.appendChild(div);
  div.appendChild(img);
  li.appendChild(addToCartButton);
  storeItems.appendChild(li);
  addToCartButton.addEventListener("click", () => {
    addToCart(item);
  });

  allFilter.addEventListener("click", () => {
    li.remove();
    addStoreItem(item);
  });

  vegetablesFilter.addEventListener("click", () => {
    li.remove();
  });
  fruitsFilter.addEventListener("click", () => {
    li.remove();
  });
}

function render() {
  state.items.forEach((item) => {
    item.quantity = 1;
    item.image = `assets/icons/${item.id}.svg`;
    addStoreItem(item);
  });
}

function addToCart(item) {
  if (state.cart.includes(item)) {
    return;
  }

  const li = document.createElement("li");
  const img = document.createElement("img");
  img.setAttribute("class", "cart--item-icon");
  img.setAttribute("src", item.image);
  img.setAttribute("alt", item.name);
  const p = document.createElement("p");
  p.innerText = item.name;
  const minusButton = document.createElement("button");
  minusButton.setAttribute("class", "remove-btn");
  minusButton.innerText = "-";
  const span = document.createElement("span");
  span.innerText = "1";
  const plusButton = document.createElement("button");
  plusButton.setAttribute("class", "add-btn");
  plusButton.innerText = "+";
  li.appendChild(img);
  li.appendChild(p);
  li.appendChild(minusButton);
  li.appendChild(span);
  li.appendChild(plusButton);
  cartItems.appendChild(li);
  state.cart.push(item);
  plusButton.addEventListener("click", () => {
    item.quantity += 1;
    span.innerText = item.quantity;
  });
  console.log(item.quantity);
  minusButton.addEventListener("click", () => {
    item.quantity -= 1;
    if (item.quantity < 1) {
      li.remove();
      // li.innerHTML = "";
    }
    span.innerText = item.quantity;
  });
}

render();
