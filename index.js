const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable",
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.15,
      type: "vegetable",
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.45,
      type: "fruit",
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
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
      price: 0.35,
      type: "fruit",
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "vegetable",
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "vegetable",
    },
  ],
  cart: [],
};

function filterByType(itemType) {
  const filteredItems = state.items.filter((item) => {
    return item.type === itemType;
  });

  // Render the filtered items, also adding the reset button
  renderFilteredStore(filteredItems);
}

// Function to generate HTML for store items
function generateStoreItemHTML(item) {
  //takes an item object as a parameter. Will generate HTML markup for
  //store item based on the provided item object

  //creating a new <li> element, representing a single store item in the list
  const li = document.createElement("li");

  // Use provided store item template to create HTML for store items
  li.innerHTML = `<div class="store--item-icon"> 
                      <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
                  </div>
                  <button class="add-to-cart-btn">Add to cart</button>`; //Seeting the innerHTML property of the newly created <li> element
  //to a string of HTML markup. This markup includes an <img> tag for displaying the item icon, and a <button> tag for adding
  //the item to the cart. Using template literals (${}) to dynamically insert values from the item object, such as the id and name.
  li.querySelector(".add-to-cart-btn").addEventListener("click", () => {
    //using a query selector to select the "ADD to cart" button within the <li> element.
    // and then attaching an eventlistener to the button listening for clicks.
    addToCart(item); //when the button is clicked it calls the addToCart function and passes the item object as an argument
  });

  return li; //returning the <li> element that was created, which now contains all the necessary HTML markup for displaying a store item
}

// Function to generate HTML for cart items
function generateCartItemHTML(cartItem) {
  //takes a CartItem object as a parameter. Will generate HTML markup for
  //cart item based on the provided item object

  //creating a new <li> element, representing a single cart item in the list
  const li = document.createElement("li");

  // Use provided cart item template to create HTML for cart items
  li.innerHTML = `<img class="cart--item-icon" src="assets/icons/${cartItem.id}.svg" alt="${cartItem.name}" />
                  <p>${cartItem.name}</p>
                  <button class="quantity-btn remove-btn center">-</button>
                  <span class="quantity-text center">${cartItem.quantity}</span>
                  <button class="quantity-btn add-btn center">+</button>`; //Seeting the innerHTML property of the created <li> element
  //to a string of HTML markup. This markup includes an <img> tag for displaying the item icon, a <p> tag for displaying the cart items name
  //and a <button> tag creating a button with the class "quantity-btn" and "remove-btn" for removing an item. The `center`class is used to
  // center the button horizontally.
  //The <span> element with the class quantity-text. This span will display the quantity of the item in the cart. The center class is again
  //used to center the text horizontally. ${cartItem.quantity} is a placeholder that will be replaced with the actual quantity value of the
  //item in the cart. This value comes from the cartItem object, which is passed to the function that generates this HTML.
  //the last tag will create a button with the class quantity-btn and add-btn. This button will be used to increment the quantity of
  //the item in the cart. The center class is used to center the button horizontally.
  li.querySelector(".remove-btn").addEventListener("click", () => {
    removeCartItem(cartItem); //using a query selector to select the remove button within the <li> element.
    // and then attaching an eventlistener to the button listening for clicks and then calling the remore cart item function
  });
  li.querySelector(".add-btn").addEventListener("click", () => {
    increaseCartItemQuantity(cartItem); //using a query selector to select the add button within the <li> element.
    // and then attaching an eventlistener to the button listening for clicks and then calling the increase quantity function
  });
  return li;
}

// Function to render the store
function renderStore() {
  const storeItemList = document.querySelector(".store--item-list"); // query selector to select the store item list
  storeItemList.innerHTML = ""; // Clear existing items

  const filterButton = document.createElement("button");
  filterButton.textContent = "Filter by Type";
  filterButton.addEventListener("click", () => {
    // Prompt the user to enter a type to filter by
    const type = prompt("Enter a type to filter by (e.g., fruit, vegetable):");
    if (type) {
      filterByType(type.toLowerCase()); // Convert the type to lowercase for case-insensitive comparison
    }
  });

  // Append the filter button to the store item list
  storeItemList.appendChild(filterButton);

  const sortButton = document.createElement("button");
  sortButton.textContent = "Sort by Type";
  sortButton.addEventListener("click", () => {
    // Prompt the user to enter a type to sort by
    const type = prompt("Enter a type to sort by (e.g., price, type):");
    if (type) {
      sortByType(type.toLowerCase()); // Convert the type to lowercase for case-insensitive comparison
    }
  });

  // Append the sort button to the store item list
  storeItemList.appendChild(sortButton);

  // Render all items in the store
  state.items.forEach((item) => {
    const itemHTML = generateStoreItemHTML(item);
    storeItemList.appendChild(itemHTML);
  });
}

function sortByType(type) {
  if (type === "price") {
    state.items.sort((a, b) => a.price - b.price);
  } else {
    state.items.sort((a, b) => {
      // Convert the type to lowercase for case-insensitive comparison
      const typeA = a[type].toLowerCase();
      const typeB = b[type].toLowerCase();

      // Compare the types
      if (typeA < typeB) {
        return -1;
      }
      if (typeA > typeB) {
        return 1;
      }
      // If types are equal
      return 0;
    });
  }

  // After sorting, re-render the store
  renderSortedStore(state.items);
}

function renderSortedStore(sortedItems) {
  const storeItemList = document.querySelector(".store--item-list");
  storeItemList.innerHTML = ""; // Clear existing items

  const resetSortingButton = document.createElement("button");
  resetSortingButton.textContent = "Reset Sorting";
  resetSortingButton.addEventListener("click", () => {
    // Call the renderStore function to display all items without filtering
    renderStore();
  });

  // Append the reset filter button to the store item list
  storeItemList.appendChild(resetSortingButton);

  // Render the filtered items
  sortedItems.forEach((item) => {
    const itemHTML = generateStoreItemHTML(item);
    storeItemList.appendChild(itemHTML);
  });
}

function renderFilteredStore(filteredItems) {
  const storeItemList = document.querySelector(".store--item-list");
  storeItemList.innerHTML = ""; // Clear existing items

  const resetFilterButton = document.createElement("button");
  resetFilterButton.textContent = "Reset Filter";
  resetFilterButton.addEventListener("click", () => {
    // Call the renderStore function to display all items without filtering
    renderStore();
  });

  // Append the reset filter button to the store item list
  storeItemList.appendChild(resetFilterButton);

  // Render the filtered items
  filteredItems.forEach((item) => {
    const itemHTML = generateStoreItemHTML(item);
    storeItemList.appendChild(itemHTML);
  });
}

// Function to render the cart
function renderCart() {
  const cartItemList = document.querySelector(".cart--item-list"); // query selector to select the cart item list
  const totalSpan = document.querySelector(".total-number"); // query selector to select the total number for the amount
  cartItemList.innerHTML = ""; // Clear existing items
  state.cart.forEach((cartItem) => {
    const cartItemHTML = generateCartItemHTML(cartItem); // generating the cart item HTML for each item
    cartItemList.appendChild(cartItemHTML); // adding to the cart item list
  });
  // Calculate and display total
  const total = state.cart.reduce(
    //state.cart refers to the array containing all items in the cart
    //reducing the array to a single value, iterating over each element of the array and accumulating the result
    (acc, curr) => acc + curr.price * curr.quantity, //callback function provided to reduce(). Takes to parameters the accumulator and the current
    //item being processed. For each item in the cart the subtotal is calculated and added to the accumulator
    0 //initial value of the accumulator
  );
  totalSpan.textContent = `£${total.toFixed(2)}`; //updateing the content of an HTML element with the id "totalspan" to display the total price
  //using textContent to set the text content to the element
  //£${total.toFixed(2)}: This is a template literal that constructs a string with the total price. total.toFixed(2) converts the total number to a
  //string with exactly two decimal places (to represent currency), and adds a pound symbol (£) in front of it.
}

// Function to add an item to the cart
function addToCart(item) {
  const existingCartItem = state.cart.find(
    //using the find method to search the state.cart array for an item that matches the id of the item
    (cartItem) => cartItem.id === item.id //if such an item already exists in the cart, teh existingCartItem will be assigned a refrence to that item
    // otherwise it will be undefined
  );
  if (existingCartItem) {
    // if existingCartItem is true, i.e the item already is in the card, the quantity is increased
    existingCartItem.quantity++;
  } else {
    state.cart.push({ ...item, quantity: 1 }); //otherwise the item is added with a quantity of 1, this item is a copy by using the spread operator
  }
  renderCart(); //responsible for updating the HTML to reflect the updated state of the cart, ensuring that the user interface displays the current contents
}

// Function to remove a cart item
function removeCartItem(cartItem) {
  state.cart = state.cart.filter(
    // updating the state.cart array by filtering out the item that matches the id of the cartItem being removed. The filter method
    // creates a new array containing only the elements that pass the test implemented by the provided function
    (item) => item.id !== cartItem.id || item.quantity > 1 //the filtering function. It checks each item in the cart array. If the id of the item does not match the
    //id of the cartitem being removed, or if the quantity of the cartitrem is greater than 1, then the item is included in the filtered array. By including this condition,
    //we ensure that only one instance of the item is removed from the cart when its quantity is decremented.
    //After filtering, the resulting array is assigned back to state.cart, effectively removing the specified cartItem from the cart or reducing its quantity by one.
  );
  renderCart();
}

// Function to increase cart item quantity
function increaseCartItemQuantity(cartItem) {
  const item = state.cart.find((item) => item.id === cartItem.id); //using find again
  item.quantity++; //increasing the quantity of the matched item
  renderCart();
}

// Initial render
renderStore();
renderCart();
