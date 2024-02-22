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

function addProductsToCart(itemId) {
  const item = state.items.find((item) => item.id === itemId);
  const itemInCart = state.cart.find((item) => item.id === itemId);

  if (itemInCart) {
    itemInCart.quantity++;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }

  renderCart();
}

function changeQuantity(itemId, quantity) {
  const itemInCart = state.cart.find((item) => item.id === itemId);

  if (itemInCart) {
    itemInCart.quantity += quantity;

    if (itemInCart.quantity <= 0) {
      state.cart = state.cart.filter((item) => item.id !== itemId);
    }
  }

  renderCart();
}

function total() {
  return state.cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );
}

function filterProductsByType(type) {
  return state.items.filter((item) => item.type === type);
}

function sortProducts(category) {
  const sortedItems = [...state.items];

  if (category === "price") {
    sortedItems.sort((productOne, productTwo) => productOne.price - productTwo.price);
  } else if (category === "alphabetical") {
    sortedItems.sort((productOne, productTwo) => productOne.name.localeCompare(productTwo.name));
  }

  return sortedItems;
}

function renderStoreProducts(type = null, sortCategory = null) {
  let itemsToRender = state.items;

  if (type) {
    itemsToRender = filterProductsByType(type);
  }

  if (sortCategory) {
    itemsToRender = sortProducts(sortCategory);
  }

  const store = document.querySelector(".store--item-list");
  store.innerHTML = "";

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
    button.addEventListener('click', () => addProductsToCart(item.id));
    li.appendChild(button);

    store.appendChild(li);
  });
}

function renderCart() {
  const cartList = document.querySelector(".cart--item-list");
  cartList.innerHTML = "";

  state.cart.forEach((item) => {
    const li = document.createElement("li");
    const image = document.createElement("img");
    image.src = `assets/icons/${item.id}.svg`;
    image.alt = item.name;
    image.classList.add("cart--item-icon");
    li.appendChild(image);

    const p = document.createElement("p");
    p.textContent = item.name;
    li.appendChild(p);

    const removeButton = document.createElement("button");
    removeButton.textContent = "-";
    removeButton.classList.add("quantity-btn", "remove-btn", "center");
    removeButton.addEventListener('click', () => changeQuantity(item.id, -1));
    li.appendChild(removeButton);

    const quantityText = document.createElement("span");
    quantityText.textContent = item.quantity;
    quantityText.classList.add("quantity-text", "center");
    li.appendChild(quantityText);

    const addButton = document.createElement("button")
    addButton.textContent = "+"
    addButton.classList.add("quantity-btn", "add-btn", "center")
    addButton.addEventListener('click', () => changeQuantity(item.id, 1))
    li.appendChild(addButton)

    cartList.appendChild(li)
  })

  const totalNumber = document.querySelector(".total-number")
  totalNumber.textContent = `£${total().toFixed(2)}`
}

document.getElementById("item-type").addEventListener('change', function () {
  renderStoreProducts(this.value);
})

document
  .getElementById("sort-category")
  .addEventListener('change', function () {
    renderStoreProducts(null, this.value)
  });

renderStoreProducts()
renderCart()