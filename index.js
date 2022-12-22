const data = {
  category: "all",
  sortBy: "none",
  items: [
    {
      id: "001-beetroot",
      class: "vegetable",
      name: "Beetroot (1kg)",
      price: 1.29,
    },
    {
      id: "002-carrot",
      class: "vegetable",
      name: "Carrot (each)",
      price: 0.04,
    },
    {
      id: "003-apple",
      class: "fruit",
      name: "Apple (each)",
      price: 0.54,
    },
    {
      id: "004-apricot",
      class: "fruit",
      name: "Apricot (500g)",
      price: 5.17,
    },
    {
      id: "005-avocado",
      class: "fruit",
      name: "Avocado (1kg)",
      price: 2.0,
    },
    {
      id: "006-bananas",
      class: "fruit",
      name: "Bananas (1kg)",
      price: 1.8,
    },
    {
      id: "007-bell-pepper",
      class: "vegetable",
      name: "Bell pepper (each)",
      price: 0.8,
    },
    {
      id: "008-berry",
      class: "fruit",
      name: "Berry (300g)",
      price: 3.5,
    },
    {
      id: "009-blueberry",
      class: "fruit",
      name: "Blueberry (150g)",
      price: 1.75,
    },
    {
      id: "010-eggplant",
      class: "vegetable",
      name: "Eggplant (each)",
      price: 1.25,
    },
  ],
  cart: [
    // {
    //   id: "001-beetroot",
    //   class: "vegetable",
    //   name: "Beetroot (1kg)",
    //   price: 1.29,
    //   quantity: 1
    // }
  ],
};

// Store or else (Cart)
function resetList(listName) {
  if (listName === "store") {
    // Reset Store
    const ul = document.querySelector(".store--item-list");
    while (ul.hasChildNodes()) ul.removeChild(ul.firstChild);
  } else {
    // Reset Cart
    const total = document.querySelector(".total-number");
    console.log("-- Total set to 0");
    total.innerText = "£0.00";
    const ul = document.querySelector(".cart--item-list");
    while (ul.hasChildNodes()) ul.removeChild(ul.firstChild);
  }
}

function renderStore(category, sortBy) {
  resetList("store");

  data.category = category;
  data.sortBy = sortBy;
  const sortedItems = sortStore(sortBy);

  if (category === "all") {
    sortedItems.forEach((item) => createStore(item));
  } else {
    sortedItems.forEach((item) => {
      if (item.class !== category) return;
      createStore(item);
    });
  }
}

function renderCart() {
  resetList("cart");
  data.cart.forEach((item) => createCart(item));
  updateTotal();
}

// price, alpha, none
function sortStore(sortBy) {
  let sortedItems = [...data.items];

  if (sortBy === "alpha") {
    sortedItems.sort(compareName);
  } else if (sortBy === "price") {
    sortedItems.sort(comparePrice);
  } else return [...data.items];

  return sortedItems;
}
function compareName(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}
function comparePrice(a, b) {
  return a.price - b.price;
}

function createStore(item) {
  const ul = document.querySelector(".store--item-list");
  const li = document.createElement("li");

  const div = document.createElement("div");
  div.setAttribute("class", "store--item-icon");

  const img = document.createElement("img");
  img.setAttribute("src", `assets/icons/${item.id}.svg`);

  const name = document.createElement("span");
  name.setAttribute("class", "store--item-name");
  name.innerText = item.name;

  const price = document.createElement("span");
  price.setAttribute("class", "store--item-price");
  price.innerText = `£${item.price}`;

  const button = document.createElement("button");
  button.innerText = "ADD TO CART";
  button.addEventListener("click", () => {
    addToCart(item);
  });

  ul.appendChild(li);
  li.appendChild(div);
  li.appendChild(name);
  li.appendChild(price);
  li.appendChild(button);
  div.appendChild(img);
}

function createCart(item) {
  const ul = document.querySelector(".cart--item-list");
  const li = document.createElement("li");

  const img = document.createElement("img");
  img.setAttribute("class", "cart--item-icon");
  img.setAttribute("src", `assets/icons/${item.id}.svg`);
  img.setAttribute("alt", item.name);

  const p = document.createElement("p");
  p.innerText = item.name;

  const span = document.createElement("span");
  span.setAttribute("class", "quantity-text center");
  span.innerText = item.quantity;

  const buttonRemove = document.createElement("button");
  buttonRemove.setAttribute("class", "quantity-btn remove-btn center");
  buttonRemove.innerText = "-";
  buttonRemove.addEventListener("click", () => removeFromCart(item));

  const buttonAdd = document.createElement("button");
  buttonAdd.setAttribute("class", "quantity-btn add-btn center");
  buttonAdd.innerText = "+";
  buttonAdd.addEventListener("click", () => addToCart(item));

  ul.appendChild(li);
  li.appendChild(img);
  li.appendChild(p);
  li.appendChild(buttonRemove);
  li.appendChild(span);
  li.appendChild(buttonAdd);
}

function addToCart(item) {
  const itemIndex = data.cart.indexOf(item);
  if (data.cart.includes(item)) {
    data.cart[itemIndex].quantity += 1;
  } else {
    item.quantity = 1;
    data.cart.push(item);
  }

  renderCart();
}

function removeFromCart(item) {
  const itemIndex = data.cart.indexOf(item);
  if (item.quantity > 1) {
    data.cart[itemIndex].quantity -= 1;
  } else data.cart.splice(itemIndex, 1);

  renderCart();
}

function updateTotal() {
  const totalSpan = document.querySelector(".total-number");
  let total = 0;

  data.cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  total = total.toFixed(2);
  totalSpan.innerText = `£${total}`; // Updates HTML
}

function filterPressed(category, element) {
  const listOfButtons = document.querySelectorAll(".filter-content-btn");
  listOfButtons.forEach((button) =>
    button.setAttribute("class", "filter-content-btn")
  );
  element.setAttribute("class", "filter-content-btn activeBtn");

  renderStore(category, data.sortBy);
}

function sortPressed(sortBy, element) {
  const listOfButtons = document.querySelectorAll(".sort-content-btn");
  listOfButtons.forEach((button) =>
    button.setAttribute("class", "sort-content-btn")
  );
  element.setAttribute("class", "sort-content-btn activeBtn");

  renderStore(data.category, sortBy);
}

renderStore(data.category, data.sortBy);
