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

// Created functions to display items in Greengrocers section

// Questa funzione renderà visibile gli elementi al caricamento della pagina.

function load() {
  displayItems();
}

// The function will go through each item in the objct and display each one of them.

function displayItems() {
  state.items.forEach((item) => {
    console.log(item.id);
    createItem(item.id);
  });
}

// This function creates the actual items we need to display.
// The parameter allows us to go through each image and display it. (Instead of displaying the same one)

function createItem(itemId) {
  const ul = document.querySelector(".item-list");
  const li = document.createElement("li");
  ul.append(li);
  // appendChild -------------------

  const div = document.createElement("div");
  div.className = "store--item-icon";
  li.append(div);

  const img = document.createElement("img");
  img.src = `assets/icons/${itemId}.svg`;
  div.append(img);

  const button = document.createElement("button");
  button.innerText = "Add to cart";
  li.append(button);

  console.log(li);
}

load();
