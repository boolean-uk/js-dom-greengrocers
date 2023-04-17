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

// A4. Select the ul from the dom with the class item-list
const itemsUL = document.querySelector(".store--item-list");
const cartUL = document.querySelector(".cart--item-list");
const totalNo = document.querySelector(".total-number");

// Create the store item list function.
const storeList = () => {
  itemsUL.innerHTML = "";

  state.items.forEach((item) => {
    // Create a new list element
    const itemList = document.createElement("li");

    // Create a new div element and set a class attribute.
    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");

    // Create a new image element and set the src and alt attributes.
    const image = document.createElement("img");
    image.setAttribute("src", `assets/icons/${item.id}.svg`);
    image.setAttribute("alt", `${item.name}`);

    // Create a new button element and set it's inner text.
    const button = document.createElement("button");
    button.innerText = "Add to cart";

    // Append the div and button to the list.
    div.append(image);
    itemList.append(div, button);
    itemsUL.append(itemList);

    button.addEventListener("click", (event) => {
      addToCart(item);
    });
  });
};

// Create the cart item function
const cartList = () => {
  cartUL.innerHTML = "";

  state.cart.forEach((item) => {
    const imageUrl = `assets/icons/${item.id}.svg`;
    const altName = item.name;

    // Create a new list for the cart item display
    const cartLI = document.createElement("li");

    // Create an image element and set its attributes.
    const image = document.createElement("img");
    image.setAttribute("class", "cart--item-icon");
    image.setAttribute("src", imageUrl);
    image.setAttribute("alt", altName);

    // Create the paragraph tag and set its innerText.
    const p = document.createElement("p");
    // p.innerText = state.cart[index].item[index].name;
    p.innerText = item.name;

    // Create the add button and set its class attributes
    const addButton = document.createElement("button");
    addButton.setAttribute("class", "quantity-btn remove-btn center");
    addButton.innerText = "+";

    // Create the span element and set its class and text value dynamically.
    const span = document.createElement("span");
    span.setAttribute("class", "quantity-text center");
    span.innerText = item.quantity;

    // Create the minus button and set its class attributes
    const minusButton = document.createElement("button");
    minusButton.setAttribute("class", "quantity-btn remove-btn center");
    minusButton.innerText = "-";

    // Append the image, p, button, span and button to the li.
    cartLI.append(image, p, addButton, span, minusButton);
    cartUL.append(cartLI);

    addButton.addEventListener("click", () => {
      item.quantity++;
      priceUpdate();
      cartList();
    });

    minusButton.addEventListener("click", () => {
      item.quantity--;
      if (item.quantity === 0) {
        state.cart.splice(state.cart.indexOf(item), 1);
      }
      priceUpdate();
      cartList();
    });
  });
};

// Create the add to cart function.
const addToCart = (item) => {
  const copyStore = Object.assign({}, item);

  // First, check if the item exist in the cart.
  for (let i = 0; i < state.cart.length; i++) {
    if (copyStore.id === state.cart[i].id) {
      // If the item exist, then increase it by 1.
      state.cart[i].quantity++;
      priceUpdate();
      cartList();
      return null;
    }
  }
  // If the item is not in the cart, then add it.
  copyStore.quantity = 1;
  state.cart.push(copyStore);
  priceUpdate();
  cartList();
};
