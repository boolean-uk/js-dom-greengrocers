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

// SELECT EXISTING HTML ELEMENTS
const grocersList = document.querySelector(".store--item-list");
const cartList = document.querySelector(".cart--item-list");
const totalSpan = document.querySelector(".total-number");

// RENDER FOR STORE ITEMS

function storeItems() {
  grocersList.innerHTML = "";
  state.items.forEach((item) => {
    const li = document.createElement("li");
    grocersList.append("li");
    // create div
    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");
    li.append(div);

    //create img  inside div
    const image = document.createElement("img");
    image.src = `assets/icons/${item.id}.svg`;
    image.alt = `${item.id}`;
    div.appendChild(image);

    //create button and listen to it
    const button = document.createElement("button");
    button.innerText = "Add to cart";
    li.append(button);

    button.addEventListener("click", (event) => {
      addTheItem(item);
    });
  });
}

function addTheItem(item) {
  const existingItem = state.cart.find((produce) => produce.name === item.name);

  if (!existingItem) {
    item.quantity = 1;
    state.cart.push(item);
  } else {
    existingItem.quantity++;
  }

  renderTheCart();
}

// RENDER FOR CART
// Write a renderCart() function

function renderTheCart() {
  cart.innerHTML = " ";
  state.cart.forEach((item) => {
    // create cart List
    const cartList = document.createElement("li");
    cart.append(cartList);
    // create Image
    const cartImage = document.createElement("img");
    cartImage.setAttribute("class", "cart--item-icon");
    cartImage.src = `assets/icons/${item.id}.svg`;
    cartImage.alt = `${item.id}`;
    cartList.append(cartImage);

    // name of the item
    const NameOfItem = document.createElement("p");
    NameOfItem.innerText = `${item.name}`;
    cartList.append(NameOfItem);

    // create the button for minus
    const decreaseButton = document.createElement("button");
    decreaseButton.setAttribute("class", "quantity-btn remove-btn center");
    decreaseButton.innerText = "_";
    cartList.append(decreaseButton);
  });
}
