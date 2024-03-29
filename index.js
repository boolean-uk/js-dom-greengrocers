const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.05,
      category: "vegetable",
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.10,
      category: "vegetable",
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.15,
      category: "fruit",
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.20,
      category: "fruit",
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.25,
      category: "fruit",
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.70,
      category: "fruit",
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      category: "vegetable",
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.40,
      category: "fruit",
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.55,
      category: "fruit",
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.50,
      category: "vegetable",
    },
  ],
  cart: [],
};

const storeItemList = document.querySelector(".store--item-list");
const cartItemList = document.querySelector(".cart--item-list");
const filterDropDown = document.querySelector("select");

//Build product cards
const buildStoreItem = (item) => {
  const li = document.createElement("li");

  const div = document.createElement("div");
  div.setAttribute("class", "store--item-icon");

  const img = document.createElement("img");
  img.setAttribute("src", `assets/icons/${item.id}.svg`);
  img.setAttribute("alt", `${item.name}`);

  div.append(img);
  li.append(div);

  const button = document.createElement("button");
  button.innerText = "Add to cart";
  button.addEventListener("click", () => {
    if (!state.cart.includes(item)) {
      state.cart.push(item);
      item.noInCart = 1;
    } else {
      increaseCartQuantity(item);
    }
    updatePrice();
    renderCart();
  });
  li.append(button);
  storeItemList.append(li);
};

//Build cart item
const buildCartItem = (item) => {
  const li = document.createElement("li");

  const img = document.createElement("img");
  img.setAttribute("class", "cart--item-icon");
  img.setAttribute("src", `assets/icons/${item.id}.svg`);
  img.setAttribute("alt", `${item.name}`);
  li.append(img);

  const p = document.createElement("p");
  p.innerText = `${item.name}`;
  li.append(p);

  const decrementButton = document.createElement("button");
  decrementButton.setAttribute("class", "quantity-btn remove-btn center");
  decrementButton.innerText = "-";
  decrementButton.addEventListener("click", () => decreaseCartQuantity(item));
  li.append(decrementButton);

  const itemQuantity = document.createElement("span");
  itemQuantity.innerText = `${item.noInCart}`;
  li.append(itemQuantity);

  const incrementButton = document.createElement("button");
  incrementButton.setAttribute("class", "quantity-btn add-btn center");
  incrementButton.innerText = "+";
  incrementButton.addEventListener("click", () => increaseCartQuantity(item));
  li.append(incrementButton);

  cartItemList.append(li);
};

// Increment and decrement cart quantity
const increaseCartQuantity = (item) => {
  item.noInCart++;
  updatePrice();
  renderCart();
};

const decreaseCartQuantity = (item) => {
  item.noInCart--;
  if (item.noInCart === 0) {
    state.cart.splice(state.cart.indexOf(item), 1);
  }
  updatePrice();
  renderCart();
};

// Update price
const updatePrice = () => {
  const priceText = document.querySelector(".total-number");
  let runningTotal = 0;
  state.cart.forEach((element) => {
    runningTotal += element.price * element.noInCart;
  });
  priceText.innerText = `£${runningTotal.toFixed(2)}`;
};

// Filter items
filterDropDown.addEventListener("change", () => {
  render(state.items);
});

// Sort items
const sortNameButton = document.querySelector('#sortByName-button')
const sortPriceButton = document.querySelector('#sortByPrice-button')

sortNameButton.addEventListener('click', () => {
  const alphabeticalItems = state.items.toSorted((a, b) => a.name.localeCompare(b.name))
  console.log(alphabeticalItems)
  render(alphabeticalItems)
})

sortPriceButton.addEventListener('click', () => {
  const pricedItems = state.items.toSorted((a, b) => a.price - b.price)
  render(pricedItems)
})

//Render the product list
const render = (input) => {
  storeItemList.innerHTML = "";
  

  if (filterDropDown.value === 'all') {
     input.forEach(buildStoreItem)
  }

  if (filterDropDown.value === 'vegetable') {
    const justVeg = input.filter(
      (item) => item.category === 'vegetable'
    );
    justVeg.forEach(buildStoreItem)
  }

  if (filterDropDown.value === 'fruit') {
    const justFruit = input.filter(
      (item) => item.category === 'fruit'
    );
    justFruit.forEach(buildStoreItem)
  }
};

//Render the cart
const renderCart = () => {
  cartItemList.innerHTML = "";
  state.cart.forEach(buildCartItem);
}


render(state.items);