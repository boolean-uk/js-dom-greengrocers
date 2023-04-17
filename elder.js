const itemsUL = document.querySelector(".store--item-list");
const cartUL = document.querySelector(".cart--item-list");

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
  ],
  cart: [],
};

const storeList = (index) => {
  const imageUrl = `assets/icons/${state.items[index].id}.svg`;
  const altName = state.items[index].name;

  const itemList = document.createElement("li");

  const div = document.createElement("div");
  div.setAttribute("class", "store--item-icon");

  const image = document.createElement("img");
  image.setAttribute("src", imageUrl);
  image.setAttribute("alt", altName);

  div.append(image);

  const button = document.createElement("button");
  button.innerText = "Add to cart";

  button.addEventListener("click", () => {
    const selectedItem = state.items[index];
    const existingCartItem = state.cart.find(item => item.id === selectedItem.id);

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      state.cart.push({
        ...selectedItem,
        quantity: 1
      });
    }

    renderCart();
  });

  itemList.append(div, button);

  return itemList;
};

const cartList = (item) => {
  const imageUrl = `assets/icons/${item.id}.svg`;
  const altName = item.name;

  const cartLI = document.createElement("li");

  const image = document.createElement("img");
  image.setAttribute("class", "cart--item-icon");
  image.setAttribute("src", imageUrl);
  image.setAttribute("alt", altName);

  const p = document.createElement("p");
  p.innerText = item.name;

  const addButton = document.createElement("button");
  addButton.setAttribute("class", "quantity-btn add-btn center");
  addButton.innerText = "+";
  addButton.addEventListener("click", () => {
    item.quantity += 1;
    renderCart();
  });

  const span = document.createElement("span");
  span.setAttribute("class", "quantity-text center");
  span.innerText = item.quantity;

  const minusButton = document.createElement("button");
  minusButton.setAttribute("class", "quantity-btn remove-btn center");
  minusButton.innerText = "-";
  minusButton.addEventListener("click", () => {
    item.quantity -= 1;
    if (item.quantity === 0) {
      state.cart = state.cart.filter(cartItem => cartItem.id !== item.id);
    }
    renderCart();
  });

  cartLI.append(image, p, addButton, span, minusButton);

  return cartLI;
};

const renderStore = () => {
  for (let index = 0; index < state.items.length; index++) {
    const listResult = storeList(index);
    itemsUL.append(listResult);
  }
};

const renderCart = () => {
  cartUL.innerHTML = "";

  for (let index = 0; index < state.cart.length; index++) {
    const cartItem = cartList(state.cart[index]);
    cartUL.append(cartItem);
  }

  const total = state.cart.reduce((accumulator, currentItem) => {
  return accumulator + currentItem.price * currentItem.quantity;
}, 0);

const totalContainer = document.createElement("div");
totalContainer.classList.add("total-container");
totalContainer.innerHTML = `
  <span class="total-label">Total:</span>
  <span class="total-price">$${total.toFixed(2)}</span>
`;

cartUL.append(totalContainer);



  const renderCart = () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";

  state.cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const cartItemTitle = document.createElement("h3");
    cartItemTitle.innerText = item.title;
    cartItem.appendChild(cartItemTitle);

    const cartItemPrice = document.createElement("p");
    cartItemPrice.innerText = formatCurrency(item.price);
    cartItem.appendChild(cartItemPrice);

    const cartItemQuantity = document.createElement("p");
    cartItemQuantity.innerText = `Quantity: ${item.quantity}`;
    cartItem.appendChild(cartItemQuantity);

    const cartItemTotal = document.createElement("p");
    cartItemTotal.innerText = `Total: ${formatCurrency(item.price * item.quantity)}`;
    cartItem.appendChild(cartItemTotal);

    cartItemsContainer.appendChild(cartItem);
  });

  const cartTotal = document.querySelector(".cart-total");
  cartTotal.innerText = `Total: ${formatCurrency(getCartTotal())}`;
};
