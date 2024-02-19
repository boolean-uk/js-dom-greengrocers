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

// Refactored function so it could be rejusted of filtering functions
// END FILTERING
function renderingCards(items) {
  storeItemListUl.innerHTML = "";
  for (const grocery of items) {
    const liElement = createCardElement(grocery);
    storeItemListUl.appendChild(liElement);
  }
}

function createCardElement(grocery) {
  const liElement = document.createElement("li");
  const divElement = document.createElement("div");
  const imgElement = document.createElement("img");
  const btnElement = document.createElement("button");

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
  const liElement = document.createElement("li");
  const imgElement = document.createElement("img");
  const pElement = document.createElement("p");
  const iBtnElement = document.createElement("button");
  const spanElement = document.createElement("span");
  const dBtnElement = document.createElement("button");

  // initialize new quantity attribute
  grocery.quantity = 1;

  // add price of grocery
  totalNumber.innerText = `£${(totalCost += grocery.price).toFixed(2)}`;

  // add grocery obj to state.cart
  state.cart.push(grocery);

  imgElement.className = "cart--item-icon";
  imgElement.setAttribute("src", `assets/icons/${grocery.id}.svg`);
  imgElement.setAttribute("alt", `${grocery.name}`);

  pElement.innerText = grocery.name;

  dBtnElement.className = "quantity-btn remove-btn center";
  dBtnElement.innerText = "-";

  spanElement.className = "quantity-text center";
  spanElement.innerText = grocery.quantity;

  iBtnElement.className = "quantity-btn add-btn center";
  iBtnElement.innerText = "+";

  const elementsToAppend = [
    imgElement,
    pElement,
    dBtnElement,
    spanElement,
    iBtnElement,
  ];

  // Append elements using a loop
  elementsToAppend.forEach((element) => {
    liElement.appendChild(element);
  });

  dBtnElement.addEventListener("click", () => {
    totalNumber.innerText = `£${(totalCost -= grocery.price).toFixed(2)}`;
    if (grocery.quantity > 1) {
      grocery.quantity--;
      spanElement.innerText = grocery.quantity;
    } else {
      removeFromCart(cartItemListUl, liElement, grocery);
    }
  });

  iBtnElement.addEventListener("click", () => {
    grocery.quantity++;
    spanElement.innerText = grocery.quantity;
    totalNumber.innerText = `£${(totalCost += grocery.price).toFixed(2)}`;
  });

  cartItemListUl.appendChild(liElement);
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

// eventlistners for sorting and filtering
sortingElement.addEventListener("click", () => sortByPrice());
sortingElementAlphabet.addEventListener("click", () => sortByAlphabet());

filteringFruit.addEventListener("click", () => filteringFruits("fruit"));
filteringVetetable.addEventListener("click", () =>
  filteringVetetables("vegetable")
);
undo.addEventListener("click", () => renderingCards(state.items));

function initialize() {
  console.log("initializing...");
  totalCost = 0;
  totalNumber.innerText = `£${totalCost}`;
  renderingCards(state.items);
  console.log("initialized!");
}

initialize();

/* Store card 
<li>
  <div class="store--item-icon">
    <img src="assets/icons/001-beetroot.svg" alt="beetroot" />
  </div>
  <button>Add to cart</button>
</li>
 */

/* Cart card
<li>
  <img
    class="cart--item-icon"
    src="assets/icons/001-beetroot.svg"
    alt="beetroot"
  />
  <p>beetroot</p>
  <button class="quantity-btn remove-btn center">-</button>
  <span class="quantity-text center">1</span>
  <button class="quantity-btn add-btn center">+</button>
</li>
*/
