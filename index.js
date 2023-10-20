const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      quantity: 0,
    },
  ],
  cart: [],
};

// SELECT EXISTING HTML ELEMENTS
const storeLists = document.querySelector(".store--item-list");
const cart = document.querySelector(".cart--item-list");
const totalNumber = document.querySelector(".total-number");

// RENDER FOR STORE ITEMS
function renderHeader() {
  storeLists.innerHTML = "";

  state.items.forEach((item) => {
    const listItem = document.createElement("li");
    storeLists.append(listItem);

    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");
    listItem.append(div);

    const img = document.createElement("img");
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = item.id; // Use item.id instead of "${items.id}"
    div.append(img);

    const button = document.createElement("button");
    button.innerText = "Add to cart";
    listItem.append(button);

    button.addEventListener("click", (event) => {
      addItem(item);
      renderMain();
      cartTotal();
    });
  });
}
//basket
function addItem(item) {
  if (state.cart.find((product) => product.name === item.name) === undefined) {
    item.quantity = 1;
    state.cart.push(item);
    renderMain();
  } else {
    item.quantity++;
    renderMain();
  }
}

// RENDER FOR CART
function renderMain() {
  cart.innerHTML = " ";

  state.cart.forEach((item) => {
    const cartInLi = document.createElement("li");
    cart.append(cartInLi);

    const cartImage = document.createElement("img");
    cartImage.setAttribute("class", "cart--item-icon");
    cartImage.src = `assets/icons/${item.id}.svg`;
    cartImage.alt = item.id; // Use item.id instead of "${items.id}"
    cartInLi.append(cartImage);

    const paragraph = document.createElement("p");
    paragraph.innerText = `${item.name}`;
    cartInLi.append(paragraph);

const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "quantity-btn remove-btn center");
    removeButton.innerText = "-";
    cartInLi.append(removeButton);

    removeButton.addEventListener("click", (event) => {
      item.quantity -= 1;

      if (item.quantity === 0) {
        const index = state.cart.indexOf(item);
        state.cart.splice(index, 1);
      }
      renderMain();
      cartTotal();
    });

    const span = document.createElement("span");
    span.setAttribute("class", "quantity-text center");
    span.innerText = `${item.quantity}`;
    cartInLi.append(span);

    const addButton = document.createElement("button");
    addButton.setAttribute("class", "quantity-btn add-btn center");
    addButton.innerText = "+";
    cartInLi.append(addButton);

    addButton.addEventListener("click", (event) => {
      item.quantity++;
      renderMain();
      cartTotal();
    });
  });
}
// total
function cartTotal() {
  let total = 0;
  state.cart.forEach((item) => {
    const price = item.price;
    const quantity = item.quantity;
    const itemTotal = price * quantity;
    total += itemTotal;
  });
  let totalPrice = total.toFixed(2);
  totalNumber.innerText = `£${totalPrice}`; // Use totalPrice instead of total
}

// 3. call renderHeader() as soon as the page loads
renderHeader();
cartTotal();
renderMain();