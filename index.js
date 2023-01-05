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

// This query selector has a global scope, i.e. it is not defined inside a function
const storeItemsUL = document.querySelector(".item-list.store--item-list");
const cartUL = document.querySelector(".item-list.cart--item-list");

// Render the store items in a for each
// Anytime the user does something, then this is called
function renderStoreItems() {
  state.items.forEach((storeItem) => {
    // Create the necessary HTML elements & set attributes
    const itemLI = document.createElement("li");

    const itemDIV = document.createElement("div");
    itemDIV.setAttribute("class", "store--item-icon");

    const itemImage = document.createElement("img");
    itemImage.setAttribute("src", `assets/icons/${storeItem.id}.svg`);
    itemImage.setAttribute("alt", `${storeItem.name}`);

    const addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Add to cart";

    // Call a function when the button is clicked that will add the item to cart
    addToCartButton.addEventListener("click", (event) => {
      addToCart(storeItem);
    });

    // Append the elements
    storeItemsUL.append(itemLI);
    itemLI.append(itemDIV);
    itemDIV.append(itemImage);
    itemLI.append(addToCartButton);
  });
}

// Make an array to store the item

function addToCart(storeItem) {
  // Create a copy of the store item object
  const storeItemCopy = { ...storeItem };

  // Check if the cart already contains the item
  // Increment the quantity if it contains the item
  for (let i = 0; i < state.cart.length; i++) {
    if (storeItemCopy.id === state.cart[i].id) {
      state.cart[i].quantity++;
      console.log("addToCart() same item: ", state.cart[i]);
      renderCartItems();
      return null;
    }
  }
  // If the item is not already in cart, then add to cart array
  storeItemCopy.quantity = 1;
  state.cart.push(storeItemCopy);
  renderCartItems();
}

function renderCartItems() {
  cartUL.innerHTML = ""; // Throw away the HTML so that I can update the cart
  // Create the necessary HTML elements & set attributes

  console.log("Rendering: ", state.cart);

  state.cart.forEach((cartItem) => {
    const cartLI = document.createElement("li");

    const cartImage = document.createElement("img");
    cartImage.setAttribute("class", "cart--item-icon");
    cartImage.setAttribute("src", `assets/icons/${cartItem.id}.svg`);
    cartImage.setAttribute("alt", `${cartItem.name}`);

    const cartText = document.createElement("p");
    cartText.innerText = `${cartItem.name}`;

    const decreaseQuantity = document.createElement("button");
    decreaseQuantity.setAttribute("class", "quantity-btn remove-btn center");
    decreaseQuantity.innerText = "-";

    const quantityAmount = document.createElement("span");
    quantityAmount.setAttribute("class", "quantity-text center");
    quantityAmount.innerText = `${cartItem.quantity}`; // Change to the actual quantity amount!

    const increaseQuantity = document.createElement("button");
    increaseQuantity.setAttribute("class", "quantity-btn add-btn center");
    increaseQuantity.innerText = "+";

    // Click event to decrement quantity
    decreaseQuantity.addEventListener("click", (event) => {
      cartItem.quantity--;
      if (cartItem.quantity === 0) {
        // const cartCopy = state.cart;
        state.cart.splice(state.cart.indexOf(cartItem), 1);
      }
      renderCartItems();
      // decrementCartQuantity(cartItem);
    });

    // Click event to increment quantity
    increaseQuantity.addEventListener("click", (event) => {
      cartItem.quantity++;
      renderCartItems();
    });

    // Append the elements
    cartUL.append(cartLI);
    cartLI.append(cartImage);
    cartLI.append(cartText);
    cartLI.append(decreaseQuantity);
    cartLI.append(quantityAmount);
    cartLI.append(increaseQuantity);
  });
}

/* function decrementCartQuantity(cartItem) {
  if (cartItem.quantity === 0) {
    for (let i = 0; i < state.cart.length; i++) {
      if (state.cart[i].id === cartItem.id) {
        delete state.cart[i];
      }
    }
  } else {
    cartItem.quantity--;
  }
} */

// Function to call when the page is loaded
renderStoreItems();
