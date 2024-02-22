console.log(state);
console.log(state.items[0]);


const storeContainer = document.querySelector(".store--item-list");
const cartContainer = document.querySelector(".cart--item-list");
const total = document.querySelector(".total-number");

state.items.forEach((item) => {
  // Create a container for each item
  const card = document.createElement("li");
  card.classList.add("item");

  // Create container for item image
  const itemIcon = document.createElement("div");
  itemIcon.classList.add("store--item-icon");

  const img = document.createElement("img");
  img.src = `assets/icons/${item.id}.svg`;

  // Create add to cart button for each item
  const addButtonStore = document.createElement("button");
  addButtonStore.classList.add("add-to-cart");
  addButtonStore.innerHTML = "Add to cart";

  addButtonStore.addEventListener("click", () => {
    addItemToCart(item.id);
  });

  itemIcon.appendChild(img);
  card.append(itemIcon, addButtonStore);
  storeContainer.appendChild(card);
});

function update() {
  cartContainer.innerHTML = "";
  state.cart.forEach((item) => {
    const cardCart = document.createElement("li");
    cardCart.classList.add("item");

    const img = document.createElement("img");
    img.src = `assets/icons/${item.id}.svg`;
    img.classList.add("cart--item-icon");

    const itemName = document.createElement("p");
    itemName.classList.add("item-name");
    itemName.innerHTML = item.name;

    const buttonRemove = document.createElement("button");
    buttonRemove.classList.add("quantity-btn", "remove-btn", "center");
    buttonRemove.innerHTML = "-";

    buttonRemove.addEventListener("click", () => {
      removeItemInCart(item.id);
    });

    const quantity = document.createElement("span");
    quantity.classList.add("quantity-text", "center");
    quantity.innerText = `${item.quantity}`;

    const buttonAdd = document.createElement("button");
    buttonAdd.classList.add("quantity-btn", "add-btn", "center");
    buttonAdd.innerHTML = "+";

    buttonAdd.addEventListener("click", () => {
      addItemToCart(item.id);
    });

    cardCart.append(img, itemName, buttonRemove, quantity, buttonAdd);
    cartContainer.appendChild(cardCart);
    calculateTotalPrice()
  });
}



// Add item to cart 
function addItemToCart(itemId) {
  const cartItem = state.cart.find((item) => item.id === itemId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    const storeItem = state.items.find((item) => item.id === itemId);
    state.cart.push({ ...storeItem, quantity: 1 });
  }
  console.log(state.cart);
  update();
}

// Remove item from the cart
function removeItemInCart(itemId) {
  const cartItem = state.cart.find((item) => item.id === itemId);

  if (cartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      const itemIndex = state.cart.indexOf(cartItem);
      state.cart.pop(itemIndex, 1);
    }
  }

  console.log(state.cart);
  update();
}

// Calculate total price items in the cart
function calculateTotalPrice() {
    let totalPrice = 0;

    state.cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    total.innerHTML = `£${totalPrice.toFixed(2)}`

}

