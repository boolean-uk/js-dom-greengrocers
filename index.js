// Remember, this will make it easier to determine where the problem lies, logic or code
// Plan each function with description, input, output, small steps in squence
// Implement first step with code (3-5 lines)
// Test it: comments, run, console.log
// Implement next step
// ...
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

// SELECT EXISTING/FIXED DOM ELEMENTS
const StoreUl = document.querySelector(".store--item-list");
const CartUl = document.querySelector(".cart--item-list");
const TotalCost = document.querySelector(".total-number");

// LOGIC (functions) TO UPDATE APP STATE (controller -> model -> view update)
function addButtonEventListener(cartItem) {
  // Description: When addBtn is pressed, increase the quantity of this cartItem.quantity by one
  // Input: cartItem
  // Output: NaN
  console.log("Increasing");
  // Increase quantity on cartItem
  cartItem.quantity += 1;
  // Render items again
  addToTotalCost(cartItem.price);
  renderItemsInCart();
}
function removeButtonEventListener(cartItem) {
  // Description: When remBtn is pressed, decrease the quantity of this cartItem.quantity by one, if it becomes 0 then remove from state.cart
  // Input: cartItem
  // Output: NaN
  console.log("Decreasing");
  // Decrease quantity on cartItem
  cartItem.quantity -= 1;
  // Check if quantity is now 0
  if (cartItem.quantity === 0) {
    console.log("Removing");
    // If it is -> remove cartItem from state.cart
    // Loop through state.cart to find index of cartItem
    for (let i = 0; i < state.cart.length; i++) {
      // Splice that index and leave loop
      if (state.cart[i].id === cartItem.id) {
        state.cart.splice(i, 1);
        break;
      }
    }
  }
  // Render items again
  removeFromTotalCost(cartItem.price);
  renderItemsInCart();
}
function addItemToCart(storeItem) {
  // Description: recieves an item from state.items, 'turns' it into cartItem and renders it to the cart element. On "Add to cart"-button click
  // Input: storeItem
  // Output: NaN
  console.log("Running addItemToCart");
  // Convert storeItem into cartItem (add quantity)
  let exists = false;
  // Loop through state.cart to see if storeItem exists already
  for (let i = 0; i < state.cart.length; i++) {
    // if exists set "variable" to true
    if (storeItem.id === state.cart[i].id) {
      exists = true;
      // Increment cartItem.quantity by 1
      state.cart[i].quantity += 1;
      addToTotalCost(state.cart[i].price);
      break;
    }
  }
  if (!exists) {
    const cartItem = {
      id: storeItem.id,
      name: storeItem.name,
      price: storeItem.price,
      quantity: 1,
    };
    // Add cartItem to state.cart if not exists
    state.cart.push(cartItem);
    addToTotalCost(cartItem.price);
  }
  console.log(state.cart);
  // Render the cartItem to HTML
  renderItemsInCart();
}
function addToTotalCost(price) {
  // Description: Adds the provided price to the value of totalCost
  // Input: price
  // Output: NaN
  // Turn TotalCost.innerText to Number
  let totalNr = Number(
    TotalCost.innerText.slice(1, TotalCost.innerText.length)
  );
  // Add price to totalNr
  totalNr += price;
  // Round totalNr to avoid calculation errors
  const formattedNumber = Math.round(totalNr * 100) / 100;
  // Print new TotalCost
  TotalCost.innerText = "£" + formattedNumber;
}
function removeFromTotalCost(price) {
  // Description: Removes the provided price from the value of totalCost
  // Input: price
  // Output: NaN
  // Turn TotalCost.innerText to Number
  let totalNr = Number(
    TotalCost.innerText.slice(1, TotalCost.innerText.length)
  );
  // Remove price from totalCost
  totalNr -= price;
  // Round totalNr to avoid calculation errors
  const formattedNumber = Math.round(totalNr * 100) / 100;
  // Print new TotalCost
  TotalCost.innerText = "£" + formattedNumber;
}
// LOGIC (functions) TO HANDLE USER EVENTS (view -> controller interaction)

// LOGIC (functions) TO HANDLE RENDERING / DISPLAY / CLEARING OF UI (view)
function renderItemsInCart() {
  // Description: Render elements in state.cart to the cart HTML element
  // Input: List of cartItems from state.cart
  // Output: NaN
  console.log("Rendering items to cart");
  // Clear HTML
  // Loop through cartItems in state.cart
  CartUl.innerHTML = "";
  for (let i = 0; i < state.cart.length; i++) {
    // Create HTML Elements and set attributes
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("class", "cart--item-icon");
    img.setAttribute("src", `assets/icons/${state.cart[i].id}.svg`);
    const p = document.createElement("p");
    p.innerText = state.cart[i].name;

    const remBtn = document.createElement("button");
    remBtn.setAttribute("class", "quantity-btn remove-btn center");
    remBtn.innerText = "-";
    remBtn.addEventListener("click", () =>
      removeButtonEventListener(state.cart[i])
    );

    const span = document.createElement("span");
    span.setAttribute("class", "quantity-text center");
    span.innerText = state.cart[i].quantity;

    const addBtn = document.createElement("button");
    addBtn.setAttribute("class", "quantity-btn add-btn center");
    addBtn.innerText = "+";
    addBtn.addEventListener("click", () =>
      addButtonEventListener(state.cart[i])
    );

    // Append Elements to CartUl list
    li.appendChild(img);
    li.appendChild(p);
    li.appendChild(remBtn);
    li.appendChild(span);
    li.appendChild(addBtn);

    CartUl.appendChild(li);
  }
}
function renderStoreItems() {
  // Description: Render elements in state.items to HTML element
  // Input: List of storeItems from state.items
  // Output: NaN
  console.log("Rendering items to the store");
  // Loop through storeItems
  for (let i = 0; i < state.items.length; i++) {
    // Create HTML Elements and set attributes
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");

    const img = document.createElement("img");
    img.setAttribute("src", `assets/icons/${state.items[i].id}.svg`);

    const btn = document.createElement("button");
    btn.innerText = "Add to cart";
    btn.addEventListener("click", () => addItemToCart(state.items[i]));

    // Append Elements to StoreUl list
    li.appendChild(div);
    li.appendChild(img);
    li.appendChild(btn);
    StoreUl.appendChild(li);
  }
}

// INITIALISATION LOGIC
function initialise() {
  console.log("Initialising...");

  // perform any additional actions to load state

  // perfrom initial render
  renderStoreItems();

  //TotalCost.innerText = "£1.50";
  // setup event handlers
  console.log("Initialisation done.");
}

initialise();
