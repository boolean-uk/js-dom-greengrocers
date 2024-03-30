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
      price: 0.1,
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
      price: 0.2,
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
      price: 0.7,
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
      price: 0.4,
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
      price: 0.5,
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
  if (item.picURL) {
    img.setAttribute("src", `${item.picURL}`);
  } else {img.setAttribute("src", `assets/icons/${item.id}.svg`)};
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
  if (item.picURL) {
    img.setAttribute("src", `${item.picURL}`);
  } else {img.setAttribute("src", `assets/icons/${item.id}.svg`)};
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
const sortNameButton = document.querySelector("#sortByName-button");
const sortPriceButton = document.querySelector("#sortByPrice-button");

sortNameButton.addEventListener("click", () => {
  const alphabeticalItems = state.items.toSorted((a, b) =>
    a.name.localeCompare(b.name)
  );
  console.log(alphabeticalItems);
  render(alphabeticalItems);
});

sortPriceButton.addEventListener("click", () => {
  const pricedItems = state.items.toSorted((a, b) => a.price - b.price);
  render(pricedItems);
});

//Render the product list
const render = (input) => {
  storeItemList.innerHTML = "";

  if (filterDropDown.value === "all") {
    input.forEach(buildStoreItem);
  }

  if (filterDropDown.value === "vegetable") {
    const justVeg = input.filter((item) => item.category === "vegetable");
    justVeg.forEach(buildStoreItem);
  }

  if (filterDropDown.value === "fruit") {
    const justFruit = input.filter((item) => item.category === "fruit");
    justFruit.forEach(buildStoreItem);
  }
};

//Render the cart
const renderCart = () => {
  cartItemList.innerHTML = "";
  state.cart.forEach(buildCartItem);
};

render(state.items);

//Build form
const buildForm = () => {
  const formSection = document.querySelector("#add-product-form");

  const nameP = document.createElement("p");
  nameP.classList.add("form-title");
  nameP.innerText = "Name of Item";
  formSection.append(nameP);

  const nameInput = document.createElement("input");
  nameInput.classList.add("form-input");
  nameInput.type = "text";
  nameInput.placeholder = "Enter product name";
  nameInput.setAttribute("id", "name-input");
  formSection.append(nameInput);

  const priceP = document.createElement("p");
  priceP.classList.add("form-title");
  priceP.innerText = "Price of Item";
  formSection.append(priceP);

  const priceInput = document.createElement("input");
  priceInput.classList.add("form-input");
  priceInput.type = "text";
  priceInput.placeholder = "Enter product price";
  priceInput.setAttribute("id", "price-input");
  formSection.append(priceInput);

  const categoryP = document.createElement("p");
  categoryP.classList.add("form-title");
  categoryP.innerText = "Select Category";
  formSection.append(categoryP);

  const categoryDropdown = document.createElement("select");
  categoryDropdown.setAttribute("id", "category-dropdown");
  formSection.append(categoryDropdown);

  const vegOption = document.createElement("option");
  vegOption.value = "vegetable";
  vegOption.innerText = "Vegetable";
  categoryDropdown.append(vegOption);

  const fruitOption = document.createElement("option");
  fruitOption.value = "fruit";
  fruitOption.innerText = "Fruit";
  categoryDropdown.append(fruitOption);

  const picP = document.createElement("p");
  picP.classList.add("form-title");
  picP.innerText = "Picture URL";
  formSection.append(picP);

  const picInput = document.createElement("input");
  picInput.classList.add("form-input");
  picInput.type = "text";
  picInput.placeholder = "Enter picture URL";
  picInput.setAttribute("id", "pic-input");
  formSection.append(picInput);

  const addButton = document.createElement("button");
  addButton.setAttribute("id", "add-product-button");
  addButton.innerText = "Add";
  formSection.append(addButton);

  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("id", "cancel-button");
  cancelButton.innerText = "Cancel";
  formSection.append(cancelButton);
};

//Display form
const addNewProductButton = document.querySelector("#add-new-button");
addNewProductButton.addEventListener("click", (event) => {
  const formSection = document.querySelector("#add-product-form");
  formSection.innerHTML = "";
  buildForm();
});

//Activate new 'Cancel' and 'Add' buttons
document.body.addEventListener("click", (event) => {
  if (event.target.matches("#add-new-button")) {
    const cancelButton = document.querySelector("#cancel-button");
    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();
      const formSection = document.querySelector("#add-product-form");
      formSection.innerHTML = ""
    });

    const addButton = document.querySelector('#add-product-button')
    addButton.addEventListener('click', (event) => {
      event.preventDefault();
      submitForm()
    })
  }
})

//Add new product
const submitForm = () => {
  const productName = document.querySelector('#name-input').value
  const productPrice = Number(document.querySelector('#price-input').value).toFixed(2)
  const productCategory = document.querySelector('#category-dropdown').value
  const productPic = document.querySelector('#pic-input').value

  const productObject = {}
  productObject.id = `0${state.items.length + 1}-${productName}`
  productObject.name = productName
  productObject.price = productPrice
  productObject.category = productCategory
  productObject.picURL = productPic
 
  state.items.push(productObject)
  render(state.items)
  const formSection = document.querySelector("#add-product-form");
  formSection.innerHTML = ""
}

