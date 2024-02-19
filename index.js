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
      price: 0.35,
      type: "fruit",
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "vegetable",
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

function addToCart(itemId) {
  const item = state.items.find((item) => item.id === itemId);
  const cartItem = state.cart.find((item) => item.id === itemId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }

  renderCart();
}

function adjustQuantity(itemId, quantity) {
  const cartItem = state.cart.find((item) => item.id === itemId);

  if (cartItem) {
    cartItem.quantity += quantity;

    if (cartItem.quantity <= 0) {
      state.cart = state.cart.filter((item) => item.id !== itemId);
    }
  }

  renderCart();
}

function calculateTotal() {
  return state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function filterItemsByType(type) {
  return state.items.filter((item) => item.type === type);
}

function sortItems(criteria) {
  const sortedItems = [...state.items];

  if (criteria === "price") {
    sortedItems.sort((a, b) => a.price - b.price);
  } else if (criteria === "alphabetical") {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  }

  return sortedItems;
}

function renderStoreItems(type = null, sortCriteria = null) {
  let itemsToRender = state.items;

  if (type) {
    itemsToRender = filterItemsByType(type);
  }

  if (sortCriteria) {
    itemsToRender = sortItems(sortCriteria);
  }

  const storeList = document.querySelector(".store--item-list");
  storeList.innerHTML = "";

  itemsToRender.forEach((item) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("store--item-icon");
    li.appendChild(div);

    const img = document.createElement("img");
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = item.name;
    div.appendChild(img);

    const button = document.createElement("button");
    button.textContent = "Add to cart";
    button.addEventListener("click", () => addToCart(item.id));
    li.appendChild(button);

    storeList.appendChild(li);
  });
}

function renderCart() {
  const cartList = document.querySelector(".cart--item-list");
  cartList.innerHTML = "";

  state.cart.forEach((item) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = item.name;
    img.classList.add("cart--item-icon");
    li.appendChild(img);

    const p = document.createElement("p");
    p.textContent = item.name;
    li.appendChild(p);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "-";
    removeBtn.classList.add("quantity-btn", "remove-btn", "center");
    removeBtn.addEventListener("click", () => adjustQuantity(item.id, -1));
    li.appendChild(removeBtn);

    const quantityText = document.createElement("span");
    quantityText.textContent = item.quantity;
    quantityText.classList.add("quantity-text", "center");
    li.appendChild(quantityText);

    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.classList.add("quantity-btn", "add-btn", "center");
    addBtn.addEventListener("click", () => adjustQuantity(item.id, 1));
    li.appendChild(addBtn);

    cartList.appendChild(li);
  });

  const totalNumber = document.querySelector(".total-number");
  totalNumber.textContent = `£${calculateTotal().toFixed(2)}`;
}

document.getElementById("item-type").addEventListener("change", function () {
  renderStoreItems(this.value);
});

document
  .getElementById("sort-criteria")
  .addEventListener("change", function () {
    renderStoreItems(null, this.value);
  });

renderStoreItems();
renderCart();
