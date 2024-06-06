// JavaScript Setup:
// Define the initial state in 'index.js'.
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

document.addEventListener("DOMContentLoaded", () => {
  renderStoreItems();
  renderCart();
});

// Display store items
function renderStoreItems() {
  const itemsContainer = document.querySelector(".store--item-list");
  itemsContainer.innerHTML = "";

  state.items.forEach((item) => {
    const itemLi = document.createElement("li");
    itemLi.innerHTML = `
      <div class="store--item-icon">
        <img src="assets/icons/${item.id}.svg" alt="${item.name}">
      </div>
      <button data-id="${item.id}">Add to cart</button>
    `;

    itemsContainer.appendChild(itemLi);
  });

  // Add event listeners to buttons
  const buttons = document.querySelectorAll(".store--item-list button");
  buttons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

// Add to Cart button to add items to the cart.
function addToCart(event) {
  const itemId = event.target.getAttribute("data-id");
  const item = state.items.find((item) => item.id === itemId);

  const cartItem = state.cart.find((cartItem) => cartItem.id === itemId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }

  renderCart();
  updateCartTotal();
}
// Create a function to display cart items in the html body
function renderCart() {}
