const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable",
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
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
      price: 0.2,
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
      type: "vegetable",
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
      type: "vegetable",
    },
  ],
  cart: [],
};

const storeListUL = document.querySelector("#store-list");

function renderStore(items) {
  storeListUL.innerHTML = "";

  const filterBtn = document.createElement("button");
  filterBtn.textContent = "Filter by type";
  filterBtn.addEventListener("click", () => {
    const type = prompt("Input desired type (fruit, vegetable):");
    if (type) {
      filterByType(type);
    }
  });
  storeListUL.appendChild(filterBtn);

  const sortBtn = document.createElement("button");
  sortBtn.textContent = "Sort by type";
  sortBtn.addEventListener("click", () => {
    const type = prompt("Input sorting type (name, price):");
    if (type) {
      sortBy(type);
    }
  });
  storeListUL.appendChild(sortBtn);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const itemLi = document.createElement("li");
    itemLi.classList.add("store--item-icon");

    const img = document.createElement("img");
    img.src = `./assets/icons/${item.id}.svg`;
    img.alt = item.name;
    img.height = 75;
    itemLi.appendChild(img);

    const btn = document.createElement("button");
    btn.textContent = "Add to cart";
    btn.addEventListener("click", () => {
      addItem(item);
    });

    itemLi.appendChild(btn);

    storeListUL.appendChild(itemLi);
  }
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset Store";
  resetBtn.addEventListener("click", () => {
    renderStore(state.items);
  });
  storeListUL.appendChild(resetBtn);
}

function filterByType(type) {
  const filtered = state.items.filter((item) => {
    return item.type === type;
  });
  renderStore(filtered);
}

function sortBy(type) {
  const sortList = [...state.items];
  if (type === "price") {
    const sortedItemsByPrice = sortList.sort((a, b) => a.price - b.price);
    console.log(sortedItemsByPrice);
    renderStore(sortedItemsByPrice);
  } else {
    const sortedItemsByName = sortList.sort((a, b) => {
      const nameA = a[type].toUpperCase(); // Convert names to uppercase for case-insensitive comparison
      const nameB = b[type].toUpperCase();

      if (nameA < nameB) {
        return -1; // a should come before b
      } else if (nameA > nameB) {
        return 1; // b should come before a
      } else {
        return 0; // names are equal
      }
    });
    console.log(sortedItemsByName);
    console.log(state.items);
    renderStore(sortedItemsByName);
  }
}

function generateCartItem(item) {
  const itemLi = document.createElement("li");
  itemLi.innerHTML = `
  <img
    class="cart--item-icon"
    src="assets/icons/${item.id}.svg"
    alt="${item.name}"
  />
  <p>${item.name}</p>
  <button class="quantity-btn remove-btn center">-</button>
  <span class="quantity-text center">${item.quantity}</span>
  <button class="quantity-btn add-btn center">+</button>
`;
  itemLi.querySelector(".add-btn").addEventListener("click", () => {
    addItem(item);
  });
  itemLi.querySelector(".remove-btn").addEventListener("click", () => {
    removeItem(item);
  });
  return itemLi;
}

function renderCart() {
  const cartListUL = document.querySelector(".cart--item-list");
  cartListUL.innerHTML = "";
  let totalValue = 0;
  for (let i = 0; i < state.cart.length; i++) {
    const item = state.cart[i];

    const itemLi = generateCartItem(item);
    totalValue += item.price * item.quantity;
    cartListUL.appendChild(itemLi);
  }
  const totalNumber = document.querySelector(".total-number");
  totalNumber.textContent = `${totalValue.toFixed(2)}£`;
}

function addItem(item) {
  if (state.cart.indexOf(item) < 0) {
    item.quantity = 1;
    state.cart.push(item);
  } else {
    state.cart[state.cart.indexOf(item)].quantity += 1;
  }
  console.log(state.cart);
  renderCart();
}

function removeItem(item) {
  if (item.quantity === 1) {
    state.cart.splice(state.cart.indexOf(item), 1);
  } else {
    item.quantity -= 1;
  }

  console.log(state.cart);
  renderCart();
}

function main() {
  renderStore(state.items);
  renderCart();
}

main();
