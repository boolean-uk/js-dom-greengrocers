const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.15,
      type: "vegetable",
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.12,
      type: "vegetable",
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.25,
      type: "fruit",
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.29,
      type: "fruit",
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.19,
      type: "fruit",
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.2,
      type: "vegetable",
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.32,
      type: "fruit",
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.31,
      type: "fruit",
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.27,
      type: "vegetable",
    },
  ],
  cart: [],
};

console.log(state);
// SELECT EXISTING DOM ELEMENT
const storeItemListUl = document.querySelector(".item-list.store--item-list");
const cartItemListUl = document.querySelector(".item-list.cart--item-list");
const totalNumber = document.querySelector(".total-number");
const sortingElement = document.getElementById("sort--store-items-price");
const sortingElementAlphabet = document.getElementById(
  "sort--store-items-alphabet"
);

const filteringFruit = document.getElementById("filter--store-items-fruit");
const filteringVetetable = document.getElementById(
  "filter--store-items-vegetable"
);
const undo = document.getElementById("undo");

let totalCost;

// SORTING
function sortByPrice() {
  state.items.sort((a, b) => a.price - b.price);
  storeItemListUl.innerHTML = "";

  renderingCards(state.items);
}

function sortByAlphabet() {
  state.items.sort((a, b) => a.name.localeCompare(b.name));
  storeItemListUl.innerHTML = "";

  renderingCards(state.items);
}
// END SOPRTING

// FILTERING
function filteringFruits(itemType) {
  const filteredItems = state.items.filter((item) => item.type === itemType);
  storeItemListUl.innerHTML = "";

  renderingCards(filteredItems);
}

function filteringVetetables(itemType) {
  const filteredItems = state.items.filter((item) => item.type === itemType);
  storeItemListUl.innerHTML = "";

  renderingCards(filteredItems);
}
// END FILTERING

// Refactored function so it could be rejusted of filtering functions
function renderingCards(items) {
  storeItemListUl.innerHTML = "";
  for (const grocery of items) {
    const liElement = createCardElement(grocery);
    storeItemListUl.appendChild(liElement);
  }
}

function createCardElement(grocery) {
  // Create my elements I need
  const liElement = document.createElement("li");
  const divElement = document.createElement("div");
  const imgElement = document.createElement("img");
  const btnElement = document.createElement("button");

  // set class and other attributes according to template
  imgElement.setAttribute("src", `assets/icons/${grocery.id}.svg`);
  imgElement.setAttribute("alt", `${grocery.name}`);

  divElement.appendChild(imgElement);
  divElement.className = "store--item-icon";

  btnElement.innerText = "Add to cart";
  btnElement.addEventListener("click", () => {
    createCartCard(grocery);
  });

  liElement.appendChild(divElement);
  liElement.appendChild(btnElement);

  return liElement;
}

function createCartCard(grocery) {
  // Creating my elements I need
  const liElement = document.createElement("li");
  const imgElement = document.createElement("img");
  const pElement = document.createElement("p");
  const increaseGroceryQuantityBtn = document.createElement("button");
  const spanElement = document.createElement("span");
  const decreaseGroceryQuantityBtn = document.createElement("button");

  // Check if item to add already exists in the cart
  const existingItem = state.cart.find((item) => item.id === grocery.id);

  if (!existingItem) {
    // initialize new quantity attribute
    grocery.quantity = 1;

    // Display price of grocery
    totalNumber.innerText = `£${(totalCost += grocery.price).toFixed(2)}`;

    // add grocery obj to state.cart
    state.cart.push(grocery);

    // set class and other attributes according to template
    imgElement.className = "cart--item-icon";
    imgElement.setAttribute("src", `assets/icons/${grocery.id}.svg`);
    imgElement.setAttribute("alt", `${grocery.name}`);

    pElement.innerText = grocery.name;

    decreaseGroceryQuantityBtn.className = "quantity-btn remove-btn center";
    decreaseGroceryQuantityBtn.innerText = "-";

    spanElement.className = "quantity-text center";
    spanElement.innerText = grocery.quantity;

    increaseGroceryQuantityBtn.className = "quantity-btn add-btn center";
    increaseGroceryQuantityBtn.innerText = "+";

    const elementsToAppend = [
      imgElement,
      pElement,
      decreaseGroceryQuantityBtn,
      spanElement,
      increaseGroceryQuantityBtn,
    ];

    // Append elements using a loop
    elementsToAppend.forEach((element) => {
      liElement.appendChild(element);
    });

    decreaseGroceryQuantityBtn.addEventListener("click", () => {
      totalNumber.innerText = `£${(totalCost -= grocery.price).toFixed(2)}`;
      if (grocery.quantity > 1) {
        grocery.quantity--;
        spanElement.innerText = grocery.quantity;
      } else {
        removeFromCart(cartItemListUl, liElement, grocery);
      }
    });

    increaseGroceryQuantityBtn.addEventListener("click", () => {
      grocery.quantity++;
      spanElement.innerText = grocery.quantity;
      totalNumber.innerText = `£${(totalCost += grocery.price).toFixed(2)}`;
    });

    cartItemListUl.appendChild(liElement);
  } else {
    // If the item is already in the cart, update the quantity
    grocery.quantity++;
    totalNumber.innerText = `£${(totalCost += grocery.price).toFixed(2)}`;
    const existingCartItemElement = document.querySelector(
      `.cart--item-icon[src="assets/icons/${grocery.id}.svg"]`
    );
    const quantityElement =
      existingCartItemElement.nextElementSibling.nextElementSibling
        .nextElementSibling;
    quantityElement.innerText = grocery.quantity;
  }
}

function removeFromCart(parentElement, childElement, grocery) {
  // remove from parentNode Frontend
  parentElement.removeChild(childElement);

  // remove from the state.cart list
  const index = state.cart.indexOf(grocery);

  if (index !== -1) {
    state.cart.splice(index, 1);
    console.log(state.cart);
  }
}

// eventlistners for sorting
sortingElement.addEventListener("click", () => sortByPrice());
sortingElementAlphabet.addEventListener("click", () => sortByAlphabet());

// eventlistners for filtering
filteringFruit.addEventListener("click", () => filteringFruits("fruit"));
filteringVetetable.addEventListener("click", () =>
  filteringVetetables("vegetable")
);

// eventlistners for undo filtering
undo.addEventListener("click", () => renderingCards(state.items));

function initialize() {
  console.log("initializing...");
  // init variables
  totalCost = 0;
  totalNumber.innerText = `£${totalCost}`;

  // init function
  renderingCards(state.items);

  console.log("initialized!");
}

initialize();
