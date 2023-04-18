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
  state.cart.push(item);

  const ulEl = document.querySelector(".cart--item-list");
  const liEl = document.createElement("li");
  ulEl.append(liEl);

  const productImg = itemImage(item.id);
  liEl.append(productImg);

  const paragraph = document.createElement("p");
  paragraph.innerText = item.name;
  liEl.append(paragraph);

  // let count = 0;

  const removeButton = document.createElement("button");
  removeButton.className = "remove-btn";
  removeButton.innerText = "-";

  removeButton.addEventListener("click", () => {
    quantity--;
  });

  liEl.append(removeButton);

  // if statement ? if quantity === 0 .remove() / innerText="" /.splice()

  const quantity = document.createElement("span");
  quantity.className = "quantity-text";
  quantity.innerText = ""; // to be changed
  liEl.append(quantity);

  console.log(quantity);

  const addButton = document.createElement("button");
  addButton.className = "add-btn";
  addButton.innerText = "+";
  addButton.addEventListener("click", () => {
    quantity++;
  });

  // addButton.addEventListener("click", () => {
  //   item.quantity++;
  // });

  liEl.append(addButton);
}

// const handleIncrement = () => {
//   count++
// }

// new function?

// This function gets each images and displays it when clicked the corresponding item
function itemImage(itemId) {
  const itemImg = document.createElement("img");
  itemImg.src = `assets/icons/${itemId}.svg`;
  return itemImg;
}

// TOTAL PRICE

// function itemsTotalPrice(item) {
//   const totalPrice = document.querySelector(".total-number");
//   totalPrice.innerText = item.price;
// }

load();
