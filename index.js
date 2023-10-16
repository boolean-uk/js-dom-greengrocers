const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      quantity: 0,
      type: "veg"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      quantity: 0,
      type: "veg"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      quantity: 0,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      quantity: 0,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      quantity: 0,
      type: "fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      quantity: 0,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      quantity: 0,
      type: "veg"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      quantity: 0,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      quantity: 0,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      quantity: 0,
      type: "fruit"
    }
  ],
  cart: []
};

// Variables in global scope (bad practice)
const storeList = document.querySelector(".store--item-list");
const itemList = document.querySelector(".cart--item-list");
const price = document.querySelector(".total-number");
const filter = document.querySelector("#filter"); 

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

    // Add to cart button
    button.addEventListener("click", () => {
      cartRemoval();
      item.quantity += 1;

      const duplicate = cart.some(obj => { return obj.id == item.id });

      duplicate ? createCartItem() : (cart.push(item), createCartItem());
      calculateTotal();
    });

    li.append(div, button);
    storeList.append(li);
  })
};

const cartRemoval = () => {
  const cartItems = itemList.querySelectorAll("li");
  cartItems.forEach(item => item.remove());
};

const storeRemoval = () => {
  const storeItems = storeList.querySelectorAll("li");
  storeItems.forEach(item => item.remove());
};

const createCartItem = () => {
  cart.forEach((item) => {
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

    // Add button
    addButton.addEventListener("click", () => {
      cartRemoval();

      item.quantity++;
      createCartItem();
      calculateTotal();
    });

    // Remove button 
    removeButton.addEventListener("click", () => {
      cartRemoval();
      item.quantity--;

      if (item.quantity === 0) {
        const idx = cart.indexOf(item);
        if (idx > -1) { cart.splice(idx, 1) }
      };  

      createCartItem();
      calculateTotal();
    });

    li.append(img, p, removeButton, span, addButton);
    itemList.append(li);
  })
};

const calculateTotal = () => {
  let num = 0;
  cart.forEach(item => { num += item.quantity * item.price });
  price.innerText = `£${num.toFixed(2)}`;
};

// Fruit filter

const fruitFilter = () => {
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

    // Add to cart button
    button.addEventListener("click", () => {
      cartRemoval();
      item.quantity += 1;

      const duplicate = cart.some(obj => { return obj.id == item.id });

      duplicate ? createCartItem() : (cart.push(item), createCartItem());
      calculateTotal();
    });

    if (item.type === "fruit") { li.append(div, button), storeList.append(li) };
  })
};

// Vegetable Filter

const vegFilter = () => {
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

    // Add to cart button
    button.addEventListener("click", () => {
      cartRemoval();
      item.quantity += 1;

      const duplicate = cart.some(obj => { return obj.id == item.id });

      duplicate ? createCartItem() : (cart.push(item), createCartItem());
      calculateTotal();
    });

    if (item.type === "veg") { li.append(div, button), storeList.append(li) };
  })
};

filter.addEventListener("change", () => {
  const option = filter.value;
  storeRemoval();

  option === "fruit" ? fruitFilter() 
  : option === "veg" ? vegFilter()
  : renderStoreItems();
});

renderStoreItems();
