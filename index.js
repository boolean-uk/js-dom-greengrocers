const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: [],
  total: [],
};

// Function to add item to cart
function addToCart(index) {
  
  //new item
  const newItem = state.items[index];

  //check if item already exists
  const existingItemIndex = state.cart.findIndex(item => item.id === newItem.id);

  if (existingItemIndex !== -1) 
  { //increase quantity if item is already in cart
    state.cart[existingItemIndex].quantity++;
  } else
  { //otherwise add to cart with quantity = 1
    newItem.quantity = 1;
    state.cart.push(newItem);
  }

  //increase total price
  state.total.push(newItem.price);
  const sum = state.total.reduce((total, currentValue) => 
  total + currentValue, 0);
  renderCart() //update cart
}

//function to increase quantity
function increaseQuantity(item) {
  item.quantity++;
  state.total.push(item.price);
  renderCart(); //update the cart display
}

//function to decrease quantity
function decreaseQuantity(item) {
  if (item.quantity === 1)
  {
    state.cart.pop(item);
    state.total.pop(item.price);
  } else

  {
    item.quantity--;
    state.total.pop(item.price);
  }
  renderCart();//update cart
}

//loop through the itemsList
for (let i = 0; i < state.items.length; i++)
{
  //create new item
  const storeItem = document.createElement("li");

  //create div for store item icon
  const storeItemDiv = document.createElement("div");
  storeItemDiv.classList.add("store--item-icon")

  //create img element for the icon
  const storeItemImg = document.createElement("img");
  storeItemImg.src = "assets/icons/" + state.items[i].id + ".svg";
  storeItemImg.alt = state.items[i].name; //loop

  //append the img element to div
  storeItemDiv.appendChild(storeItemImg);

  //create button
  const addButton = document.createElement("button");
  addButton.textContent = "Add to cart";

  // Add event listener to "Add to cart" button
  addButton.addEventListener("click", () => {
    addToCart(i);
  });

  //append icon div and button to item
  storeItem.appendChild(storeItemDiv);
  storeItem.appendChild(addButton);

  //find the element to put storeItem
  var itemList = document.querySelector(".item-list.store--item-list");

  //append the list item to the item list
  itemList.appendChild(storeItem);
}

//function to render cart
function renderCart() {
  // Find the cart item list
  const cartItemList = document.querySelector(".item-list.cart--item-list");
  
  // Clear the existing content of the cart
  cartItemList.innerHTML = "";

  //set total to equal 0 if no item is in the cart
  const total = 0;
  const totalElement = document.querySelector(".total-number");
  totalElement.textContent = "£" + total.toFixed(2);

  // Loop through the items in the cart
  state.cart.forEach(item => {

    // Create a new list item for the cart item
    const cartItem = document.createElement("li");

    // Create img element for the item icon
    const cartItemImg = document.createElement("img");
    cartItemImg.classList.add("cart--item-icon");
    cartItemImg.src = "assets/icons/" + item.id + ".svg";
    cartItemImg.alt = item.name;

    // Create p element for the item name
    const cartItemName = document.createElement("p");
    cartItemName.textContent = item.name;

    // Create button for decreasing quantity
    const decreaseButton = document.createElement("button");
    decreaseButton.classList.add("quantity-btn", "remove-btn", "center");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", () => decreaseQuantity(item));

    // Create span element for the item quantity
    const cartItemQuantity = document.createElement("span");
    cartItemQuantity.classList.add("quantity-text", "center");
    cartItemQuantity.textContent = item.quantity;

    // Create button for increasing quantity
    const increaseButton = document.createElement("button");
    increaseButton.classList.add("quantity-btn", "add-btn", "center");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () => increaseQuantity(item));

    // Append all elements to the cart item
    cartItem.appendChild(cartItemImg);
    cartItem.appendChild(cartItemName);
    cartItem.appendChild(decreaseButton);
    cartItem.appendChild(cartItemQuantity);
    cartItem.appendChild(increaseButton);

    // Append the cart item to the cart item list
    cartItemList.appendChild(cartItem);

  // Update the total displayed on the webpage
  const total = state.total.reduce((total, currentValue) => 
  total + currentValue, 0);
  totalElement.textContent = "£" + total.toFixed(2);
  console.log(total);
  });
}