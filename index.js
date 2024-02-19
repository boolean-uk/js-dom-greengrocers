const state = {
  filterOn: false,
  sort: 0,
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.135,
      type: "vegetable",
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.235,
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
      price: 0.75,
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
      price: 0.65,
      type: "fruit",
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.375,
      type: "vegetable",
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.325,
      type: "fruit",
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.78,
      type: "fruit",
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.55,
      type: "vegetable",
    },
  ],
  cart: [],
};

const shop_items = document.querySelector(".store--item-list");
const filterAndSort = document.querySelector(".filterAndSort");
//Filted button
const filterButton = document.createElement("Button");
filterButton.innerText = "Filter";
filterAndSort.appendChild(filterButton);
filterButton.addEventListener("click", (e) => {
  console.log(state.filterOn === false);
  if (state.filterOn === false) {
    state.filterOn = "vegetable";
    filterButton.innerHTML = "Veggies";
  } else if (state.filterOn === "vegetable") {
    state.filterOn = "fruit";
    filterButton.innerHTML = "Fruit";
  } else if (state.filterOn === "fruit") {
    state.filterOn = false;

    filterButton.innerHTML = "Sort";
  }
  console.log(state.filterOn);
  renderItems();
});

const sortButton = document.createElement("Button");
sortButton.innerText = "Sort";
filterAndSort.appendChild(sortButton);

const sortStyles = ["Price", "Alphabetically"];
sortButton.addEventListener("click", (e) => {
  state.sort++;
  let sortOn = sortStyles[state.sort % 2];

  if (sortOn === "Price") {
    sortButton.innerHTML = sortOn;
    state.items.sort((a, b) => a.price - b.price);
  } else if (sortOn === "Alphabetically") {
    sortButton.innerHTML = sortOn;
    state.items.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
  renderItems();
});

function sortItems() {}
function renderItems() {
  const itemsToDisplay = filterDisplayItems(state.filterOn, state.items);
  shop_items.innerHTML = "";
  for (const item of itemsToDisplay) {
    const i = createItemElement(item);
    shop_items.appendChild(i);
  }
}

function createItemElement(item) {
  // Create the list item element
  const li = document.createElement("li");

  // Create the div for item icon
  const divIcon = document.createElement("div");
  divIcon.className = "store--item-icon";
  li.appendChild(divIcon);

  // Create the img element for the icon
  const img = document.createElement("img");
  img.src = `assets/icons/${item.id}.svg`;
  img.alt = item.name;
  divIcon.appendChild(img);

  // Create the button to add to cart
  const button = document.createElement("button");
  button.textContent = "Add to cart";
  li.appendChild(button);

  button.addEventListener("click", () => {
    console.log(item.id);
    addToCart(item.id);
  });

  return li;
}

function renderCart() {
  const cartList = document.querySelector(".cart--item-list");
  cartList.innerHTML = ""; // Clear the current cart UI

  for (const item of state.cart) {
    CreateCartItem(item, cartList);
  }
  renderPrice();
}

function CreateCartItem(item, cartList) {
  const li = document.createElement("li");
  li.setAttribute("data-id", item.id);

  const img = document.createElement("img");
  img.className = "cart--item-icon";
  img.src = `assets/icons/${item.id}.svg`;
  img.alt = item.name;

  const p = document.createElement("p");
  p.textContent = item.name;

  const removeBtn = document.createElement("button");
  removeBtn.className = "quantity-btn remove-btn center";
  removeBtn.textContent = "-";
  removeBtn.addEventListener("click", () => updateQuantity(item.id, -1));

  const quantityText = document.createElement("span");
  quantityText.className = "quantity-text center";
  quantityText.textContent = item.quantity;

  const addBtn = document.createElement("button");
  addBtn.className = "quantity-btn add-btn center";
  addBtn.textContent = "+";
  addBtn.addEventListener("click", () => updateQuantity(item.id, 1));

  li.appendChild(img);
  li.appendChild(p);
  li.appendChild(removeBtn);
  li.appendChild(quantityText);
  li.appendChild(addBtn);

  cartList.appendChild(li);
}

function addToCart(itemId) {
  const itemIndex = state.cart.findIndex((item) => item.id === itemId);
  if (itemIndex > -1) {
    state.cart[itemIndex].quantity += 1;
  } else {
    const item = state.items.find((item) => item.id === itemId);
    if (item) {
      state.cart.push({ ...item, quantity: 1 });
    }
  }

  renderCart();
}

function renderPrice() {
  const priceElement = document.querySelector(".total-number");
  const total = state.cart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity * currentItem.price;
  }, 0);
  priceElement.innerHTML = "€" + total.toFixed(2);
}

function updateQuantity(itemId, change) {
  const itemIndex = state.cart.findIndex((item) => item.id === itemId);
  if (itemIndex > -1) {
    const newQuantity = state.cart[itemIndex].quantity + change;
    if (newQuantity > 0) {
      state.cart[itemIndex].quantity = newQuantity;
    } else {
      // Remove the item from cart if quantity is 0
      state.cart.splice(itemIndex, 1);
    }
    renderCart();
  }
}

function filterDisplayItems(filterCondition = false, items = []) {
  if (filterCondition === false) {
    return items;
  }

  items = items.filter((item) => {
    // console.log(item.type + "");
    // console.log(filterCondition + "");

    return item.type === filterCondition;
  });
  console.log(items);
  return items;
}

renderItems();
