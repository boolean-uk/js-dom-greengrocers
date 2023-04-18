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

// GREENGROCERS SECTION

// Questa funzione renderà visibile gli elementi al caricamento della pagina.

function load() {
  displayItems();
}

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

  const paragraph = itemName(item.name);
  liEl.append(paragraph);

  const removeButton = document.createElement("button");
  removeButton.className = "remove-btn";
  removeButton.innerText = "-";
  liEl.append(removeButton);

  const quantity = document.createElement("span");
  quantity.className = "quantity-text";
  quantity.innerText = "2"
  liEl.append(quantity);

  const addButton = document.createElement("button");
  addButton.className = "add-btn"
  addButton.innerText = "+"
  liEl.append(addButton)
}

function itemImage(itemId) {
  const itemImg = document.createElement("img");
  itemImg.src = `assets/icons/${itemId}.svg`;
  return itemImg;
}

function itemName(itemName) {
  const parag = document.createElement("p");
  parag.innerHTML = `This is a ${itemName}`;
  console.log(itemName);
}

load();
