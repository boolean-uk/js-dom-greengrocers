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

const items = state.items;
const cart = state.cart;

// Create and display store items
for (let i = 0; i < items.length; i++) {
  const id = items[i].id;
  const name = items[i].name;
  storeListItems(id, name);
}

function storeListItems(id, name) {
  const storeUl = document.querySelector(".store--item-list");
  const storeLi = document.createElement("li");
  storeUl.appendChild(storeLi);

  const div = document.createElement("div");
  div.classList = "store--item-icon";

  const img = document.createElement("img");
  img.src = "assets/icons/" + id + ".svg";
  img.alt = name;

  const button = document.createElement("button");
  button.textContent = "Add to cart";
  button.addEventListener("click", () => {
    addToCart(id, name);
    updateCartTotal()
  });

  div.appendChild(img);
  storeLi.appendChild(div);
  storeLi.appendChild(button);
}

function addToCart(id, name) {
  let cartItem;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cartItem = cart[i];
      break;
    }
  }

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ id, name, quantity: 1 });
  }

  renderCartItems();
  updateCartTotal();
}

function renderCartItems() {
  const mainUl = document.querySelector(".cart--item-list");
  mainUl.innerHTML = ""; // Clear the cart list

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    const cartLi = document.createElement("li");

    const img = document.createElement("img");
    img.classList = "cart--item-icon";
    img.src = "assets/icons/" + item.id + ".svg";
    img.alt = item.name;

    const paragraph = document.createElement("p");
    paragraph.textContent = item.name;

    const subBtn = document.createElement("button");
    subBtn.classList = "quantity-btn remove-btn center";
    subBtn.textContent = "-";
    subBtn.addEventListener("click", () => {
      updateCartItemQuantity(item.id, -1);
    });

    const span = document.createElement("span");
    span.classList = "quantity-text center";
    span.textContent = item.quantity;

    const addBtn = document.createElement("button");
    addBtn.classList = "quantity-btn add-btn center";
    addBtn.textContent = "+";
    addBtn.addEventListener("click", () => {
      updateCartItemQuantity(item.id, 1);
    });

    cartLi.append(img, paragraph, subBtn, span, addBtn);
    mainUl.appendChild(cartLi);
  }
}

function updateCartItemQuantity(id, change) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity += change;
      if (cart[i].quantity <= 0) {
        cart.splice(i, 1);
      }
      renderCartItems();
      updateCartTotal();
      break;
    }
  }
}

function updateCartTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  document.querySelector(".cart-total").textContent = "£" + total.toFixed(2);
}

function getItemPriceById(id) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i].price;
    }
  }
  // Return null or handle the case when item is not found
  return null;
} 

