const storeItemsUL = document.querySelector(".item-list.store--item-list");
const cartUL = document.querySelector(".item-list.cart--item-list");
const totalNumber = document.querySelector(".total-number");

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
      updatePrice();
      renderCartItems();
      return null;
    }
  }
  // If the item is not already in cart, then add to cart array
  storeItemCopy.quantity = 1;
  state.cart.push(storeItemCopy);
  updatePrice();
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
        state.cart.splice(state.cart.indexOf(cartItem), 1);
      }
      updatePrice();
      renderCartItems();
    });

    // Click event to increment quantity
    increaseQuantity.addEventListener("click", (event) => {
      cartItem.quantity++;
      updatePrice();
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

// function that updates the price
function updatePrice() {
  // Throw away the HTML first and declare a counter variable
  totalNumber.innerHTML = "";
  let total = 0;

  // Recalculate the total by going through the entire cart and render it
  state.cart.forEach((cartItem) => {
    total += cartItem.price * cartItem.quantity;
  });
  const total2DecmimalPlaces = total.toFixed(2);
  totalNumber.innerHTML = `£${total2DecmimalPlaces}`;
}

// Function to call when the page is loaded
renderStoreItems();

// // A4. Select the ul from the dom with the class item-list
// const itemsUL = document.querySelector(".store--item-list");
// const cartUL = document.querySelector(".cart--item-list");
// const span = document.createElement("span");
// const cartUpdate = {};

// const state = {
//   items: [
//     {
//       id: "001-beetroot",
//       name: "beetroot",
//       price: 0.35,
//     },
//     {
//       id: "002-carrot",
//       name: "carrot",
//       price: 0.35,
//     },
//     {
//       id: "003-apple",
//       name: "apple",
//       price: 0.35,
//     },
//     {
//       id: "004-apricot",
//       name: "apricot",
//       price: 0.35,
//     },
//     {
//       id: "005-avocado",
//       name: "avocado",
//       price: 0.35,
//     },
//     {
//       id: "006-bananas",
//       name: "bananas",
//       price: 0.35,
//     },
//     {
//       id: "007-bell-pepper",
//       name: "bell pepper",
//       price: 0.35,
//     },
//     {
//       id: "008-berry",
//       name: "berry",
//       price: 0.35,
//     },
//     {
//       id: "009-blueberry",
//       name: "blueberry",
//       price: 0.35,
//     },
//     {
//       id: "010-eggplant",
//       name: "eggplant",
//       price: 0.35,
//     },
//   ],
//   cart: [],
// };

// // Create the store item list function.
// const storeList = (index) => {
//   // Create variable and store the image url and the alt name.
//   const imageUrl = `assets/icons/${state.items[index].id}.svg`;
//   const altName = state.items[index].name;

//   // Create a new list element
//   const itemList = document.createElement("li");

//   // Create a new div element and set a class attribute.
//   const div = document.createElement("div");
//   div.setAttribute("class", "store--item-icon");

//   // Create a new image element and set the src and alt attributes.
//   const image = document.createElement("img");
//   image.setAttribute("src", imageUrl);
//   image.setAttribute("alt", altName);

//   // Append the image to the div element.
//   div.append(image);

//   // Create a new button element and set it's inner text.
//   const button = document.createElement("button");
//   button.innerText = "Add to cart";

//   // Call the buttonAction function with button and index arguments.
//   buttonAction(button, index);

//   // Append the div and button to the list.
//   itemList.append(div, button);

//   return itemList;
// };

// // Create the cart item function
// const cartList = (index) => {
//   const imageUrl = `assets/icons/${state.items[index].id}.svg`;
//   const altName = state.items[index].name;

//   // Create a new list for the cart item display
//   const cartLI = document.createElement("li");

//   // Create an image element and set its attributes.
//   const image = document.createElement("img");
//   image.setAttribute("class", "cart--item-icon");
//   image.setAttribute("src", imageUrl);
//   image.setAttribute("alt", altName);

//   // Create the paragraph tag and set its innerText.
//   const p = document.createElement("p");
//   // p.innerText = state.cart[index].item[index].name;
//   p.innerText = state.items[index].name;

//   // Create the add button and set its class attributes
//   const addButton = document.createElement("button");
//   addButton.setAttribute("class", "quantity-btn remove-btn center");
//   addButton.innerText = "+";

//   // Create the span element and set its class and text value dynamically.
//   const span = document.createElement("span");
//   span.setAttribute("class", "quantity-text center");
//   span.innerText = 1;

//   // Create the minus button and set its class attributes
//   const minusButton = document.createElement("button");
//   minusButton.setAttribute("class", "quantity-btn remove-btn center");
//   minusButton.innerText = "-";

//   // Append the image, p, button, span and button to the li.
//   cartLI.append(image, p, addButton, span, minusButton);

//   return cartLI;
// };

// // Create the render function()
// const render = () => {
//   // Loo through the store items using a for loop.
//   for (let index = 0; index < state.items.length; index++) {
//     // Invoke the storeList() function and store the result in a variable.
//     const listResult = storeList(index);
//     // Append the list returned to the ul.
//     itemsUL.append(listResult);
//   }
// };

// const checkCartExist = (state) => {
//   // for (let index = 0; index < state.cart.length; index++) {
//   //   state.cart[index]
//   // }

//   if (state.cart.length === 0) {
//     return true;
//   }
// };

// const updateCart = (state, index) => {
//   cartUpdate.id = state.items[index].id;
//   cartUpdate.name = state.items[index].name;
//   cartUpdate.price = state.items[index].price;
//   state.cart.push(cartUpdate);
// };

// // Create a button event function to add item to the cart.
// const buttonAction = (button, index) => {
//   button.addEventListener("click", () => {
//     // Check if item has been added before trying to display.
//     // checkCartExist(state);

//     let increaseByOne = 0;
//     // If item exist, increment quantity

//     if (state.cart.includes(state.items[index])) {
//       increaseByOne = increaseByOne + 1;
//       // Increase the quantity
//       console.log("Included", increaseByOne);
//     } else {
//       console.log("Not included yet");
//       const cartItem = cartList(index);
//       cartUL.append(cartItem);
//     }

//     // Update the cart
//     state.cart.push(state.items[index]);
//     console.log("Cart:", state.cart);

//     // Update Cart state.
//     // updateCart(state, index);
//   });
// };

// render();

// // B. From the store, a user can add an item to their cart

// // C. If the item is already in the cart, increase the item's quantity in the cart
// // D. From the cart, a user can view and adjust the number of items in their cart
// // E. If an item's quantity equals zero it is removed from the cart
// // F. A user can view the current total in their cart

// // Extended 1
// // Add filters to the store ie. filter by item type; when a user clicks a filter they will only see items of that type

// // Extended 2
// // Add sorting to the store ie. sort by price or sort alphabetically; when a user clicks sort they will see a sorted list of items
