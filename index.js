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

//Variables in global scope (bad practice)
const storeList = document.querySelector(".store--item-list");
const itemList = document.querySelector(".cart--item-list");
const price = document.querySelector(".total-number");

const items = state.items;
const cart = state.cart;

const renderStoreItems = () => {
  items.forEach((item) => {
    // Create req. elements
    const li = document.createElement("li");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const button = document.createElement("button");
    button.innerText = "Add to Cart"

    // Setting attribute value
    img.src = `assets/icons/${item.id}.svg`;
    div.setAttribute("class", "store--item-icon");
    div.append(img);

    //Add to cart button
    button.addEventListener("click", () => {
      const cartItems = itemList.querySelectorAll("li");
      cartItems.forEach(item => item.remove());
      item.quantity += 1;

      const duplicate = cart.some(obj => {
       if (obj.id == item.id) { return true } else { return false }
      });

      duplicate ? createCartItem() : (cart.push(item), createCartItem());
      calculateTotal();
    });

    li.append(div, button);
    storeList.append(li);
  })
};

const createCartItem = () => {
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

const calculateTotal = () => {
  let num = 0;
  cart.forEach(item => { num += item.quantity * item.price });
  price.innerText = `£${num.toFixed(2)}`;
};

renderStoreItems()
