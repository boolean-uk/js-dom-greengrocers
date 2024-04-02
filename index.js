const state = {
  items: [
    {
      id: "001-beetroot.svg",
      name: "beetroot",
      price: 0.35,
      type: "vegetable",
    },
    {
      id: "002-carrot.svg",
      name: "carrot",
      price: 0.45,
      type: "vegetable",
    },
    {
      id: "003-apple.svg",
      name: "apple",
      price: 0.65,
      type: "fruit",
    },
    {
      id: "004-apricot.svg",
      name: "apricot",
      price: 0.41,
      type: "fruit",
    },
    {
      id: "005-avocado.svg",
      name: "avocado",
      price: 0.52,
      type: "fruit",
    },
    {
      id: "006-bananas.svg",
      name: "bananas",
      price: 0.55,
      type: "fruit",
    },
    {
      id: "007-bell-pepper.svg",
      name: "bell pepper",
      price: 0.65,
      type: "vegetable",
    },
    {
      id: "008-berry.svg",
      name: "berry",
      price: 0.33,
      type: "fruit",
    },
    {
      id: "009-blueberry.svg",
      name: "blueberry",
      price: 0.72,
      type: "fruit",
    },
    {
      id: "010-eggplant.svg",
      name: "eggplant",
      price: 0.42,
      type: "vegetable",
    },
  ],
  cart: [],
};

const storeItems = state.items;
const cart = state.cart;
let type = [];

const totalPrice = document.querySelector(".total-number");
// store items
const storeItemList = document.querySelector(".store--item-list");
// cart menu
const cartItems = document.querySelector(".cart--item-list");

const removeItemBtn = document.querySelector(".remove-btn");

const addItemBtn = document.querySelector(".add-btn");
// Filter's btns
const divFilter = document.querySelector(".filter");
// Select menu
const sortBy = document.querySelector("#sorted-list");

// To add items to .store--item-list HTML menu 🍌🍎🥕
function addItemsToStoreList(array) {
  if (array.length > 0) {
    array.forEach((item) => {
      storeItemList.insertAdjacentHTML(
        "beforeend",
        `<li data-id = ${item.id} data-name = ${item.name} data-price = ${item.price}>
          <div class="store--item-icon">
            <img src="assets/icons/${item.id}" alt="beetroot" />
          </div>
          <p>${item.name}</p>
          <p>£${item.price}</p>
          <button class="addCart">Add to cart</button>
        </li>`
      );
    });
  }
}

// To filter items by type.
divFilter.addEventListener("click", (event) => {
  let clickedBtn = event.target;
  const classVegetables = clickedBtn.classList.contains("vegetables");
  const classFruits = clickedBtn.classList.contains("fruits");
  const classAll = clickedBtn.classList.contains("all");

  const vegetables = [];
  const fruits = [];

  storeItems.filter((item) => {
    item.type === "vegetable" ? vegetables.push(item) : fruits.push(item);
  });

  if (classVegetables) {
    storeItemList.innerHTML = "";
    addItemsToStoreList(vegetables);
    type = vegetables;
  }
  if (classFruits) {
    storeItemList.innerHTML = "";
    addItemsToStoreList(fruits);
    type = fruits;
  }
  if (classAll) {
    storeItemList.innerHTML = "";
    addItemsToStoreList(storeItems);
    type = storeItems;
  }

  return type;
});

// Functions and an event listener to sort items by name and price.
function sortItemsByName(array) {
  array.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

function sortItemsByPriceAsce(array) {
  array.sort((a, b) => a.price - b.price);
  return array;
}

function sortItemsByPriceDesc(array) {
  array.sort((a, b) => b.price - a.price);
  return array;
}

sortBy.addEventListener("change", (event) => {
  let option = event.currentTarget.value;

  switch (option) {
    case "name":
      storeItemList.innerHTML = "";
      sortItemsByName(type);
      addItemsToStoreList(type);
      break;

    case "price-asce":
      storeItemList.innerHTML = "";
      sortItemsByPriceAsce(type);
      addItemsToStoreList(type);
      break;

    case "price-desc":
      storeItemList.innerHTML = "";
      sortItemsByPriceDesc(type);
      addItemsToStoreList(type);
      break;

    default:
      storeItemList.innerHTML = "";
      addItemsToStoreList(storeItems);
      type = storeItems;
  }
});

// To get the item's ID, price and name.
storeItemList.addEventListener("click", (event) => {
  let clickedBtn = event.target;
  if (clickedBtn.classList.contains("addCart")) {
    let item_id = clickedBtn.parentElement.dataset.id;
    let item_name = clickedBtn.parentElement.dataset.name;
    let item_price = clickedBtn.parentElement.dataset.price;

    // We pass them to addToCart() fn.
    addToCart(item_id, item_name, item_price);
  }
});

// 🛒➕➕
function addToCart(item_id, item_name, item_price) {
  // We pass a callback fn for findIndex()
  // The value will be 0 if the item is present othewise -1
  let itemIndexInTheCart = cart.findIndex((item) => item.item_id === item_id);

  if (cart.length <= 0) {
    cart.push({
      item_id: item_id,
      item_name: item_name,
      quantity: 1,
      price: item_price,
    });
  } else if (itemIndexInTheCart === -1) {
    cart.push({
      item_id: item_id,
      item_name: item_name,
      quantity: 1,
      price: item_price,
    });
  } else {
    cart[itemIndexInTheCart].quantity = cart[itemIndexInTheCart].quantity + 1;
  }

  addItemsToCartList();
  getTotal();
}

// To add items to .cart--item-list HTML menu (the cart 🛒)
function addItemsToCartList() {
  cartItems.textContent = "";
  if (cart.length > 0) {
    cart.forEach((item) => {
      cartItems.insertAdjacentHTML(
        "beforeend",
        `<li data-id = ${item.item_id}>
          <img
            class="cart--item-icon"
            src="assets/icons/${item.item_id}"
            alt="beetroot"
          />
          <p>${item.item_name}</p>
          <button class="quantity-btn remove-btn center">-</button>
          <span class="quantity-text center">${item.quantity}</span>
          <button class="quantity-btn add-btn center">+</button>
        </li>`
      );
    });
  }
}

// To get the total 💷 of all items inside the 🛒
function getTotal() {
  const sapn = document.querySelector(".total-number");
  let quantities = 0;
  let price;
  let total;

  cart.forEach((item) => {
    price = item.price;
    quantities += item.quantity;
  });

  // This condition to not get NaN if the cart array is empty.
  if (cart.length > 0) {
    total = quantities * price;
  } else {
    total = 0;
  }

  // The method toFixed(2) to keep 2 digits after the point.
  sapn.innerText = `£${total.toFixed(2)}`;
}

// To get the clicked button inside the cart ➕ or ➖ and its related item.
cartItems.addEventListener("click", (event) => {
  let clickedBtn = event.target;

  if (
    clickedBtn.classList.contains("remove-btn") ||
    clickedBtn.classList.contains("add-btn")
  ) {
    let item_id = clickedBtn.parentElement.dataset.id;
    let operation;

    if (clickedBtn.classList.contains("remove-btn")) {
      operation = "remove";
    } else {
      operation = "add";
    }

    addOrRemoveQuantity(item_id, operation);
  }
});

// To increase and decrease the quantity by clicking on ➕ or ➖.
function addOrRemoveQuantity(item_id, operation) {
  let itemIndexInTheCart = cart.findIndex((item) => item.item_id === item_id);
  if (itemIndexInTheCart >= 0) {
    switch (operation) {
      case "add":
        cart[itemIndexInTheCart].quantity =
          cart[itemIndexInTheCart].quantity + 1;
        break;

      default:
        let difference = cart[itemIndexInTheCart].quantity - 1;
        if (difference > 0) {
          cart[itemIndexInTheCart].quantity = difference;
        } else {
          // To delete the item from the cart when it has 0 quantity.
          cart.splice(itemIndexInTheCart, 1);
        }
    }
  }
  addItemsToCartList();
  getTotal();
}

// Adding items to the store form
const addNewItemToStoreBtn = document.querySelector(".add-item");
const formDiv = document.querySelector(".form");
const form = document.querySelector("form");
const buttonsDiv = document.querySelector(".buttons");
const allInputs = document.querySelectorAll("input[type='text']");
const resetBtn = document.querySelector(".reset");

// To show the form on the screen
addNewItemToStoreBtn.addEventListener("click", (event) => {
  formDiv.classList.add("show");
});

// Submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const idInput = document.querySelector("#id");
  const nameInput = document.querySelector("#name");
  const priceInput = document.querySelector("#price");
  const typeInput = document.querySelector("#type");

  let id = idInput.value.toLowerCase();
  let name = nameInput.value.toLowerCase();
  let price = +priceInput.value;
  let type = typeInput.value.toLowerCase();

  addNewItemToStore(id, name, price, type);
});

function addNewItemToStore(id, name, price, type) {
  storeItems.push({
    id: id,
    name: name,
    price: price,
    type: type,
  });

  storeItemList.textContent = "";
  addItemsToStoreList(storeItems);
}

// To reset or hide the form.
buttonsDiv.addEventListener("click", (event) => {
  let clickedBtn = event.target;
  let close = clickedBtn.classList.contains("close");
  let reset = clickedBtn.classList.contains("reset");

  if (close) {
    formDiv.classList.remove("show");
  }
  if (reset) {
    allInputs.forEach((input) => {
      input.value = "";
    });
  }
});

// To change the opacity of reset button.
allInputs.forEach((input) => {
  input.addEventListener("keypress", (event) => {
    resetBtn.classList.add("active");
  });
});

// To load the items when the App starts.
addItemsToStoreList(storeItems);
