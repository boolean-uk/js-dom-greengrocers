const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      quantity: 0
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      quantity: 0
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      quantity: 0
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      quantity: 0
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      quantity: 0
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      quantity: 0
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      quantity: 0
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      quantity: 0
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      quantity: 0
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      quantity: 0
    }
  ],
  cart: []
};

const storeList = document.querySelector(".store--item-list");
const itemList = document.querySelector(".cart--item-list");

const items = state.items;
const cart = state.cart;

const createStoreItems = () => {
  items.forEach((item) => {
    const li = document.createElement("li");

    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = `assets/icons/${item.id}.svg`;
    div.setAttribute("class", "store--item-icon");
    div.append(img);

    const button = document.createElement("button");
    button.innerText = "Add to Cart"

    button.addEventListener("click", () => {
      const cartItems = itemList.querySelectorAll("li");
      cartItems.forEach(item => item.remove());
      item.quantity += 1;

      const duplicate = cart.some(obj => {
       if (obj.id == item.id) { return true } else { return false }
      });

      duplicate ? addCartItem() : (cart.push(item), addCartItem());
    });

    li.append(div, button);
    storeList.append(li);
  })
};

const addCartItem = () => {
  state.cart.forEach((item) => {
    // Create req. elements
    const li = document.createElement("li");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const removeButton = document.createElement("button");
    const span = document.createElement("span");
    const addButton = document.createElement("button");

    // Setting attribute value
    img.setAttribute("class", "cart--item-icon");
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = item.name;
    removeButton.setAttribute("class", "quantity-btn remove-btn center");
    span.setAttribute("class", "quantity-text center");
    addButton.setAttribute("class", "quantity-btn add-btn center");

    // Setting .innerText value
    p.innerText = item.name;
    removeButton.innerText = "-";
    span.innerText = item.quantity;
    addButton.innerText = "+";

    li.append(img, p, removeButton, span, addButton);
    itemList.append(li);
  })
};

const render = () => {
  createStoreItems();
};

render()
