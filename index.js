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
const cartLists = document.querySelector(".cart--item-list");
const totalNumber = document.querySelector(".total-number");

state.items.forEach((item) => {
  // create li
  const li = document.createElement("li");

  //create div
  const div = document.createElement("div");
  div.setAttribute("class", "store--item-icon");

  // image
  const image = document.createElement("img");
  image.src = `assets/icons/${item.id}.svg`;
  image.alt = item.name;

  const addToCart = document.createElement("button");
  addToCart.innerText = "Add to cart";

  addToCart.addEventListener("click", () => {
    const itemCartValue = state.cart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (itemCartValue) {
      itemCartValue.count++;
    } else {
      state.cart.push({ ...item, count: 1 });
    }

    renderTheCart();
  });
  // added the lists, div, image and button to the grocersList
  div.append(image);
  li.append(div, addToCart);
  grocersList.append(li);
});

// RENDER FOR CART
// Write a renderCart() function
const renderTheCart = () => {
  cartLists.innerHTML = "";

  state.cart.forEach((item) => {
    const li = document.createElement("li");

    const image = document.createElement("img");
    image.setAttribute("class", "cart--item-icon");
    image.src = `assets/icons/${item.id}.svg`;
    image.alt = item.name;

    // name of the item
    const NameOfItem = document.createElement("p");
    NameOfItem.innerText = `${item.name}`;

    // create the button for minus
    const decreaseButton = document.createElement("button");
    decreaseButton.setAttribute("class", "quantity-btn remove-btn center");
    decreaseButton.innerText = "_";

    decreaseButton.addEventListener("click", () => {
      const itemCartValue = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (itemCartValue && itemCartValue.count > 1) {
        itemCartValue.count--;
      } else {
        state.cart = state.cart.filter((cartItem) => cartItem.id !== item.id);
      }

      renderTheCart();
    });
    const span = document.createElement("span");
    span.setAttribute("class", "quantity-text center");
    span.innerText = item.count;

    // create the button for Add
    const increaseButton = document.createElement("button");
    increaseButton.setAttribute("class", "quantity-btn add-btn center");
    increaseButton.innerText = "+";

    increaseButton.addEventListener("click", () => {
      const itemCartValue = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (itemCartValue) {
        itemCartValue.count++;
        renderTheCart();
      }
    });
    // added the image,  NameOfItem, decreaseButton, span, increaseButton
    li.append(image, NameOfItem, decreaseButton, span, increaseButton);
    cartLists.append(li);
  });
  const totalAmount = state.cart
    .map((item) => item.price * item.count)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  totalNumber.innerText = `£${totalAmount}`;
};
