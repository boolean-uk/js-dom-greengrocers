const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};
const storeList = document.querySelector(".store--item-list");
const cartList = document.querySelector(".cart--item-list");
const totalDisplay = document.querySelector(".total-number");

function renderStoreItems() {
  clearElement(storeList);

  state.items.forEach((item) => {
    const storeItem = document.createElement("li");
    storeList.appendChild(storeItem);

    const iconContainer = document.createElement("div");
    iconContainer.setAttribute("class", "store--item-icon");
    storeItem.appendChild(iconContainer);

    const itemImage = document.createElement("img");
    itemImage.src = `assets/icons/${item.id}.svg`;
    itemImage.alt = item.id;
    iconContainer.appendChild(itemImage);

    const itemName = document.createElement("p");
    itemName.textContent = item.name;
    storeItem.appendChild(itemName);

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `Price: €${item.price.toFixed(2)}`;
    storeItem.appendChild(itemPrice);

    const addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Add to cart";
    storeItem.appendChild(addToCartButton);

    addToCartButton.addEventListener("click", (e) => {
      item.quantity += 1;
      addItemToCart(item);
      displayCartItems();
      updateTotal();
    });
  });
}


function addItemToCart(item) {
  if (!state.cart.find((product) => product.name === item.name)) {
    item.quantity = 1;
    state.cart.push(item);
  } else {
    item.quantity++;
  }
  displayCartItems();
}

function displayCartItems() {
  clearElement(cartList);

  state.cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartList.appendChild(cartItem);

    const cartItemIcon = document.createElement("img");
    cartItemIcon.setAttribute("class", "cart--item-icon");
    cartItemIcon.src = `assets/icons/${item.id}.svg`;
    cartItemIcon.alt = item.id;
    cartItem.appendChild(cartItemIcon);

    const itemName = document.createElement("p");
    itemName.textContent = item.name;
    cartItem.appendChild(itemName);

    const decreaseButton = createQuantityButton("-", () => {
      item.quantity -= 1;
      if (item.quantity === 0) removeItemFromCart(item);
      displayCartItems();
      updateTotal();
    });
    decreaseButton.classList.add("remove-btn");

    const quantityText = createSpan("quantity-text center", item.quantity);

    const increaseButton = createQuantityButton("+", () => {
      item.quantity++;
      displayCartItems();
      updateTotal();
    });
    increaseButton.classList.add("add-btn");

    appendElements(cartItem, [decreaseButton, quantityText, increaseButton]);
  });
}

function removeItemFromCart(item) {
  const index = state.cart.indexOf(item);
  state.cart.splice(index, 1);
}

function updateTotal() {
  const total = state.cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  totalDisplay.textContent = `€${total.toFixed(2)}`;
}

function createQuantityButton(text, clickHandler) {
  const button = document.createElement("button");
  button.setAttribute("class", "quantity-btn center");
  button.innerText = text;
  button.addEventListener("click", clickHandler);
  return button;
}

function createSpan(className, text) {
  const span = document.createElement("span");
  span.setAttribute("class", className);
  span.textContent = text;
  return span;
}

function appendElements(parent, elements) {
  elements.forEach((element) => parent.appendChild(element));
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

renderStoreItems();
displayCartItems();
updateTotal();

