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

// Questa funzione renderà visibile gli elementi al caricamento della pagina.

function load() {
  displayItems();
}
// GREENGROCERS SECTION

// The function will go through each item in the objct and display each one of them.

function displayItems() {
  state.items.forEach((item) => {
    createItem(item);
  });
}

// This function creates the actual items we need to display.
// The parameter allows us to go through each image and display it. (Instead of displaying the same one)

function createItem(item) {
  const ul = document.querySelector(".item-list");
  const li = document.createElement("li");
  ul.append(li);

  const div = document.createElement("div");
  div.className = "store--item-icon";
  li.append(div);

  const img = createImg(item.id);
  div.append(img);

  const button = document.createElement("button");
  button.innerText = "Add to cart";
  li.append(button);

  button.addEventListener("click", () => {
    addItemToCart(item);
  });
}

function createImg(itemId) {
  const newImg = document.createElement("img");
  newImg.src = `assets/icons/${itemId}.svg`;
  return newImg;
}

// CART SECTION

function addItemToCart(item) {
  // ! returns the opposite
  // adding cartRow if is not on the screen but we flip it
  //  (turn 1 into 0 or true into false etc)

  if (!isItemInCart(item.name)) {
    addCartRow(item);
  }
  state.cart.push(item);

  // updating quantity box of cart item clicked
  updateQuantity(item);
}

function updateQuantity(quantityItem) {
  // 1. find quantity in the cart of the items clicked
  const quantityItems = state.cart.filter(
    (cartItem) => cartItem.name === quantityItem.name
  );
  const numOfItems = quantityItems.length;

  // 2. display quantity on screen for cartRow item that was clicked

  // change code so it doesn't update if element no longer exsist
  document.querySelector(`#${quantityItem.name} span.quantity-text`).innerText =
    numOfItems.toString();

  itemsTotalPrice();
}

// la funzione riceve il paramentro itemName che controlla(con filter) nella lista
// con cartItem se il nome dell'elemento che è gia nel 'cart'
// corrisponde a quello che stiamo 'aggiungendo'

function isItemInCart(itemName) {
  const itemsInCart = state.cart.filter(
    (cartItem) => cartItem.name === itemName
  );
  if (itemsInCart.length > 0) {
    // return itemsInCart.length - same as doing if statement
    // because 0 is false and the other numbers are true
    return true;
  } else {
    return false;
  }
}

function addCartRow(item) {
  const ulEl = document.querySelector(".cart--item-list");
  const liEl = document.createElement("li");
  liEl.id = item.name;
  ulEl.append(liEl);

  const productImg = itemImage(item.id);
  liEl.append(productImg);

  const paragraph = document.createElement("p");
  paragraph.innerText = item.name;
  liEl.append(paragraph);

  const removeButton = document.createElement("button");
  removeButton.className = "remove-btn";
  removeButton.innerText = "-";

  removeButton.addEventListener("click", () => {
    removeItem(item);
  });

  liEl.append(removeButton);

  const quantity = document.createElement("span");
  quantity.className = "quantity-text";
  quantity.innerText = 1;

  liEl.append(quantity);

  const addButton = document.createElement("button");
  addButton.className = "add-btn";
  addButton.innerText = "+";
  addButton.addEventListener("click", () => {
    addItemToCart(item);
  });

  liEl.append(addButton);
}

function removeItem(item) {
  // 1. Find item in state.cart that matched item to remove
  const index = state.cart.findIndex((cartItem) => cartItem.name === item.name);

  // 2. Remove item that we found
  state.cart.splice(index, 1);
  // 3. if quantity < 1 remove row
  if (!isItemInCart(item.name)) {
    removeRow(item);
  }

  // 4. update texbox
  updateQuantity(item);
}

function removeRow(item) {
  // Find and Remove Row
  document.querySelector(`#${item.name}`).remove();
}

// This function gets each images and displays it when clicked the corresponding item
function itemImage(itemId) {
  const itemImg = document.createElement("img");
  itemImg.src = `assets/icons/${itemId}.svg`;
  return itemImg;
}

// TOTAL PRICE

function itemsTotalPrice() {
  const totalPrice = document.querySelector(".total-number");
  let total = 0;
  state.cart.forEach((item) => {
    const pricing = state.items.find(
      (cartItem) => cartItem.name === item.name
    ).price;

    const sum = (total += pricing * item.price);
    totalPrice.innerText = `£ ${sum.toFixed(2)}`;

    if (sum === 0) {
      totalPrice.innerText = "£ 0.00";
    }
  });
}

// const totalPrice = state.map((item) => item.price)
//   .reduce((acc, curr) => acc + curr);
// console.log("total", totalPrice)
load();
