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

// Store or else
function resetList(listName) {
  if (listName === "store") {
    // Removes all the children of the ul
    const ul = document.querySelector(".store--item-list");
    while (ul.hasChildNodes()) {
      ul.removeChild(ul.firstChild);
    }
  } else {
    // cart
    const total = document.querySelector(".total-number");
    console.log("-- Total set to 0");
    total.innerText = "£0.00";
    // Removes all the children of the ul
    const ul = document.querySelector(".cart--item-list");
    while (ul.hasChildNodes()) {
      ul.removeChild(ul.firstChild);
    }
  }
}

// Called when ready (Categories: all, vegetable, fruit)
function renderStore(category, sortBy) {
  // reset before iterating though new ones
  resetList("store");

  // Update the value, so when we call this through button
  // we just need to set one value (filter or sort)
  data.category = category;
  data.sortBy = sortBy;

  const sortedItems = sortStore(sortBy);

  // classes: all, vegetable, fruit
  // check whether it is supposed to render all or a specific category
  if (category === "all") {
    // iterate though data.items
    sortedItems.forEach((item) => {
      // call function to render item card
      createStore(item);
    });
  }
  // has a category specified
  else {
    // iterate though data.items
    sortedItems.forEach((item) => {
      // if item.class not same as category, jump to next item
      if (item.class !== category) {
        return;
      }
      // if the same as category, render item
      createStore(item);
    });
  }
}
// Called at the end of addToCart and removeFromCart
function renderCart() {
  // reset before iterating though new ones
  resetList("cart");

  // iterate though data.cart
  data.cart.forEach((item) => {
    // call function to render item
    createCart(item);
  });

  // Update total adding item price to total
  updateTotal();
}

// price, alpha, none
function sortStore(sortBy) {
  // Returns the items array
  // Creates a clone of data.items to sort
  let sortedItems = [...data.items];

  if (sortBy === "alpha") {
    sortedItems.sort(compareName);
  } else if (sortBy === "price") {
    sortedItems.sort(comparePrice);
  } else {
    // Return the default array
    return [...data.items];
  }

  return sortedItems;
}
function compareName(a, b) {
  // A and B are items
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
}
function comparePrice(a, b) {
  // A and B are items
  return a.price - b.price;
}

// render and append individual item to store
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
// render and append individual item to cart
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
  buttonRemove.addEventListener("click", () => {
    removeFromCart(item);
  });

  const buttonAdd = document.createElement("button");
  buttonAdd.setAttribute("class", "quantity-btn add-btn center");
  buttonAdd.innerText = "+";
  buttonAdd.addEventListener("click", () => {
    addToCart(item);
  });

  ul.appendChild(li);
  li.appendChild(img);
  li.appendChild(p);
  li.appendChild(buttonRemove);
  li.appendChild(span);
  li.appendChild(buttonAdd);
}

// Called when Shop or Cart add button pressed
function addToCart(item) {
  const itemIndex = data.cart.indexOf(item);
  // if item exists, update
  if (data.cart.includes(item)) {
    data.cart[itemIndex].quantity += 1;
  }
  // if item dont exists, add quantity and push
  else {
    item.quantity = 1;
    data.cart.push(item);
  }

  renderCart();
}
function removeFromCart(item) {
  const itemIndex = data.cart.indexOf(item);
  // if quantity is more than 1, subtract, if 1 then remove completely
  if (item.quantity > 1) {
    data.cart[itemIndex].quantity -= 1;
  } else {
    data.cart.splice(itemIndex, 1);
  }

  renderCart();
}

// Iterates though the Cart items checking for the item quantity.
function updateTotal() {
  const totalSpan = document.querySelector(".total-number");
  let total = 0;

  data.cart.forEach((item) => {
    // Iterate though the items to check its quantity
    for (let i = 1; i <= item.quantity; i++) {
      // Looping though the item quantity, add here
      total += item.price;
    }
  });

  // Fix the value to only 2 zeros after .
  total = total.toFixed(2);
  totalSpan.innerText = `£${total}`; // Updates HTML
}

function filterPressed(category, element) {
  // Set all filter buttons as not active
  const listOfButtons = document.querySelectorAll(".filter-content-btn");
  for (let i = 0; i < listOfButtons.length; i++) {
    listOfButtons[i].setAttribute("class", "filter-content-btn");
  }

  // Set filter button as active
  element.setAttribute("class", "filter-content-btn activeBtn");

  renderStore(category, data.sortBy);
}
function sortPressed(sortBy, element) {
  // Set all sort buttons as not active
  const listOfButtons = document.querySelectorAll(".sort-content-btn");
  for (let i = 0; i < listOfButtons.length; i++) {
    listOfButtons[i].setAttribute("class", "sort-content-btn");
  }

  // Set sort button as active
  element.setAttribute("class", "sort-content-btn activeBtn");

  renderStore(data.category, sortBy);
}

renderStore(data.category, data.sortBy);
