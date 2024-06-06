const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      type: "vegetable",
      price: 0.35,
      imageUrl: "assets/icons/001-beetroot.svg",
    },
    {
      id: "002-carrot",
      name: "carrot",
      type: "vegetable",
      price: 0.35,
      imageUrl: "assets/icons/002-carrot.svg",
    },
    {
      id: "003-apple",
      name: "apple",
      type: "fruit",
      price: 0.35,
      imageUrl: "assets/icons/003-apple.svg",
    },
    {
      id: "004-apricot",
      name: "apricot",
      type: "fruit",
      price: 0.35,
      imageUrl: "assets/icons/004-apricot.svg",
    },
    {
      id: "005-avocado",
      name: "avocado",
      type: "fruit",
      price: 0.35,
      imageUrl: "assets/icons/005-avocado.svg",
    },
    {
      id: "006-bananas",
      name: "bananas",
      type: "fruit",
      price: 0.35,
      imageUrl: "assets/icons/006-bananas.svg",
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      type: "vegetable",
      price: 0.35,
      imageUrl: "assets/icons/007-bell-pepper.svg",
    },
    {
      id: "008-berry",
      name: "berry",
      type: "fruit",
      price: 0.35,
      imageUrl: "assets/icons/008-berry.svg",
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      type: "fruit",
      price: 0.35,
      imageUrl: "assets/icons/009-blueberry.svg",
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      type: "vegetable",
      price: 0.35,
      imageUrl: "assets/icons/010-eggplant.svg",
    },
  ],
  cart: [],
};

// Insert filter and sort buttons dynamically
const header = document.querySelector("header");
const filtersDiv = document.createElement("div");
filtersDiv.className = "filters";

filtersDiv.innerHTML = `
  <button id="filter-fruit">Fruit</button>
  <button id="filter-vegetable">Vegetable</button>
  <button id="sort-name">Sort by Name</button>
  <button id="sort-price">Sort by Price</button>
  <button id="add-product-form-toggle">Add New Product</button>
  <form id="add-product-form" style="display: none;">
    <input type="text" id="new-product-name" placeholder="Product Name" required>
    <input type="number" id="new-product-price" placeholder="Price" step="0.01" required>
    <select id="new-product-type" required>
      <option value="">Select Type</option>
      <option value="fruit">Fruit</option>
      <option value="vegetable">Vegetable</option>
    </select>
    <input type="url" id="new-product-image-url" placeholder="Image URL" required>
    <button type="submit">Add Product</button>
  </form>
`;

header.insertBefore(filtersDiv, header.querySelector(".item-list"));

const storeList = document.querySelector(".store--item-list");
const cartList = document.querySelector(".cart--item-list");
const totalNumber = document.querySelector(".total-number");

const renderStore = (items) => {
  // Clear current store items
  storeList.innerHTML = "";
  // Add each item to the store
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="store--item-icon">
        <img src="${item.imageUrl}" alt="${item.name}" />
      </div>
      <button data-id="${item.id}">Add to cart</button>
    `;
    storeList.appendChild(li);
  });
};

const renderCart = () => {
  // Clear current cart items
  cartList.innerHTML = "";
  // Add each cart item
  state.cart.forEach((cartItem) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img
        class="cart--item-icon"
        src="${cartItem.imageUrl}"
        alt="${cartItem.name}"
      />
      <p>${cartItem.name}</p>
      <button class="quantity-btn remove-btn center" data-id="${cartItem.id}">-</button>
      <span class="quantity-text center">${cartItem.quantity}</span>
      <button class="quantity-btn add-btn center" data-id="${cartItem.id}">+</button>
    `;
    cartList.appendChild(li);
  });

  // Update the total price
  updateTotal();
};

const updateTotal = () => {
  // Calculate the total price of items in the cart
  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  totalNumber.textContent = `£${total.toFixed(2)}`;
};

storeList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.dataset.id;
    addToCart(id);
  }
});

cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("quantity-btn")) {
    const id = e.target.dataset.id;
    if (e.target.classList.contains("add-btn")) {
      updateCartItem(id, 1);
    } else if (e.target.classList.contains("remove-btn")) {
      updateCartItem(id, -1);
    }
  }
});

const addToCart = (id) => {
  // Find the item to add to the cart
  const item = state.items.find((item) => item.id === id);
  // Check if the item is already in the cart
  const cartItem = state.cart.find((item) => item.id === id);
  if (cartItem) {
    // If item is already in the cart, increase the quantity
    cartItem.quantity += 1;
  } else {
    // If item is not in the cart, add it with quantity 1
    state.cart.push({ ...item, quantity: 1 });
  }
  // Re-render the cart
  renderCart();
};

const updateCartItem = (id, change) => {
  // Find the cart item to update
  const cartItem = state.cart.find((item) => item.id === id);
  if (cartItem) {
    // Update the quantity of the cart item
    cartItem.quantity += change;
    // If quantity is zero, remove the item from the cart
    if (cartItem.quantity === 0) {
      state.cart = state.cart.filter((item) => item.id !== id);
    }
    // Re-render the cart
    renderCart();
  }
};

// Filter by fruit
document.getElementById("filter-fruit").addEventListener("click", () => {
  const fruits = state.items.filter((item) => item.type === "fruit");
  renderStore(fruits);
});

// Filter by vegetable
document.getElementById("filter-vegetable").addEventListener("click", () => {
  const vegetables = state.items.filter((item) => item.type === "vegetable");
  renderStore(vegetables);
});

// Sort by name
document.getElementById("sort-name").addEventListener("click", () => {
  const sorted = [...state.items].sort((a, b) => a.name.localeCompare(b.name));
  renderStore(sorted);
});

// Sort by price
document.getElementById("sort-price").addEventListener("click", () => {
  const sorted = [...state.items].sort((a, b) => a.price - b.price);
  renderStore(sorted);
});

// Toggle the new product form
document
  .getElementById("add-product-form-toggle")
  .addEventListener("click", () => {
    const form = document.getElementById("add-product-form");
    form.style.display = form.style.display === "none" ? "block" : "none";
  });

// Add a new product to the store
document.getElementById("add-product-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("new-product-name").value;
  const price = parseFloat(document.getElementById("new-product-price").value);
  const type = document.getElementById("new-product-type").value;
  const imageUrl = document.getElementById("new-product-image-url").value;
  const id = `00${state.items.length + 1}-${name
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  // Add the new product to the state
  state.items.push({ id, name, type, price, imageUrl });
  // Re-render the store
  renderStore(state.items);
  // Clear the form
  e.target.reset();
  // Hide the form
  e.target.style.display = "none";
});

// Initial render
renderStore(state.items);
renderCart();
