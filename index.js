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

console.log(state);

// Arrow function to create the image, const variable declared to store this. Item as the argument.
const createItemImage = (item) => {
  // itemImage const variable used to store "img", document.createElement is used to create this element ("img") which will later be appended to the page and be seen
  const itemImage = document.createElement("img");
  // image.src is the location of where the image is located (assets/icons path) ${item} goes to the item parameter and all the items in the folders location are organised by an ID eg. "001-beetroot"
  // ``s used to access ${item.id}
  itemImage.src = `./assets/icons/${item.id}.svg`;
  // alt describes what the image is (helps search engines & visually impared). Hence why name is included after item & svg to describe what the image is & the type eg - "beetroot"
  itemImage.alt = item.name.svg;
  // return the image required
  return itemImage;
};

// Arrow function to create the image container, const variable declared to store this. Item as the argument.
const createItemImageContainer = (item) => {
  // imageContainer const variable used to store "div", document.createElement is used to create this element ("div") which will later be appended to the page and be seen.
  // div & store--item-icon are located on store.item.html
  const imageContainer = document.createElement("div");
  // Adding the class name "store--item-icon" for the image container as found in store-item.html
  imageContainer.className = "store--item-icon";
  // itemImage stores the image (item) that the createItemImage() function creates above.
  const itemImage = createItemImage(item);
  // imageContainer (div) appended the child (image)
  imageContainer.appendChild(itemImage);
  // The return of the function is the imageContainer which is created following the above process.
  return imageContainer;
};

// Arrow function to create the button for the item, const variable declared to store this. Item as the argument in parmeter.
const createItemButton = (item) => {
  // creating the button variable & the element for the page.
  const button = document.createElement("button");
  // const variable created to store the text for the button, createTextNode used to do this.
  const buttonText = document.createTextNode("Add to cart");
  // appending the button text using the appendChild as the button text is within the button element
  button.appendChild(buttonText);
  // addEventListener used so when user clicks on the button it gets added to cart. The addToCart() method done later.
  button.addEventListener("click", () => {
    // Adding item to the cart via the addToCart()
    addingItemToCart(item);
  });
  // return the button created following the above process & methods
  return button;
};

// Arrow function to create the item, const variable declared to store this. Item as the argument in parmeter.
const createItem = (item) => {
  //  creating the li element stored as li
  const li = document.createElement("li");
  // creating the item image using the createItemImageContainer() function, storing as image
  const image = createItemImageContainer(item);
  // creating the button using createItemButton () function, storing as button
  const button = createItemButton(item);
  // appending li with the image & button
  li.append(image, button);
  //returning li following the above process & methods
  return li;
};

// Arrow function to create the items list, const variable declared to store this. Items as the argument in parmeter.
const createItemList = (items) => {
  // .map method used to create a new array with the items using createItem() to get the item in the array.
  // .map used on the items array at top of index.js
  return items.map(createItem);
};

// Arrow function to render the items list - getting them on the page, const variable declared to store this.
const renderItemList = () => {
  // accessing the .store--item-list class on the ul, by using ul const variable
  const ul = document.querySelector(".store--item-list");
  //appending the items using the createItemList(), from the state & items obect path onto the ul
  ul.append(...createItemList(state.items));
};

// Arrow function, stored in a const variable createCartImage.  cartItem as the argument in parmeter.
const createCartImage = (cartItem) => {
  // const variable storing cartImage is declared.  This is to create the "img" element which will later be appended to the page.  This img element is in the cart-item html template.
  const cartImage = document.createElement("img");
  // // creating the image class
  cartImage.className = "cart--item-icon";
  // creating the src for the image.  The path where the image is located - assets folder, then icons list, then id.
  cartImage.src = `assets/icons/${cartItem.item.id}.svg`;
  // The alt for the image to describe it - "beetroot"
  cartImage.alt = "beetroot";
  //return the image to be used on the page for the cart
  return cartImage;
};

// Arrow function, stored in a const variable createCartItemText.  cartItem as the argument in parmeter.
const createCartItemText = (cartItem) => {
  // pText const variable declared to store the p element created within the document (webpage). p element located in the cart-item html template.
  const pText = document.createElement("p");
  // inserting the pText into the cartItem via item then name - hence eg "Beetroot"
  pText.innerText = cartItem.item.name;
  // returning the pText to be appended onto the page when the function is called & rendered.
  return pText;
};

// Arrow function, stored in a const variable createCartItem  cartItem as the argument in parmeter.
const createCartItem = (cartItem) => {
  // pText const variable declared to store the li element created within the document (webpage). li element located in the cart-item html template.
  const cartContainer = document.createElement("li");
  // Using the createCartImage() function to be stored in the variable cartImage which can then be appended
  const cartImage = createCartImage(cartItem);
  // Using the createCartItemText() function to be stored in the variable pText which can then be appended
  const pText = createCartItemText(cartItem);
  // Using the itemAmountControls() function to be stored in the variable amount which can then be appended
  const amount = itemAmountControls(cartItem);
  // Appending the cartContainer onto the page with the cartImage & pText variables in the parameters included within the li elements displaying ther cart items
  cartContainer.append(cartImage, pText, ...amount);
  // returning cartContainer to be appended onto the page when the function is called & rendered.
  return cartContainer;
};

// Arrow function, stored in a const variable renderCartItems. Nothing in the parameter.
const renderCartItems = () => {
  //const variable declared to store the cartItems.  The state object & cart array is accessed to render those items within the cart array.
  const cartItems = state.cart;
  // cartContainer variable used to access the .cart--item-list class in the webpage (html).
  const cartContainer = document.querySelector(".cart--item-list");
  // items variable used to store the new array .map creates from the cart array. The createCartItem function used in the parameter to append the item image & text for each item within the array
  const items = cartItems.map(createCartItem);
  // appending the cartContainer to the page to be seen by the user - ... meaning it goes through all the items array.
  cartContainer.append(...items);
};

// Arrow function, stored in a const variable addingItemToCart. Item in the parameter.
const addingItemToCart = (item) => {
  // if statement checking if item is in cart, then return the item as it's true.
  if (checkItemInCart(item)) {
    return;
  }
  // push the item into the cart array in the state object.
  // The quantity also pushed and shown in the cart, starting at 1
  state.cart.push({ item: item, quantity: 1 });
  // call the rend function to display on the page
  render();
};

// Arrow function, stored in a const variable checkItemInCart . Item in the parameter.
const checkItemInCart = (item) => {
  // matchedItem variable declared to store the item found (using find()) if it matches item
  const matchedItem = state.cart.find((cartItem) => cartItem.item === item);
  // returns the matchItem if not undefined
  return matchedItem !== undefined;
};

// Arrow function, stored in a const variable clearCartItems. Nothing in the parameter.
const clearCartItems = () => {
  // cartContainer variable declared to store the access to the .cart--item-list class in the html document.
  const cartContainer = document.querySelector(".cart--item-list");
  // items variable declared which stores the children (items) from the cartContainer (.cart--item-list class)
  const items = Array.from(cartContainer.children);
  // for each (item) remove the item to make the cart clear, using the remove() function
  items.forEach((item) => item.remove());
};

// delcared a const variable to store the createLessItemsButton() function. With cartItem in the parameter
const createLessItemsButton = (cartItem) => {
  // lessItemsButton variable declared to store the button element which is created
  const lessItemsButton = document.createElement("button");
  // adding the class list - "quantity-btn", "remove-btn", "center" for the button
  lessItemsButton.classList.add("quantity-btn", "remove-btn", "center");
  // adding the - for the button
  lessItemsButton.innerText = "-";
  // adding the event "click" so when the user clicks on the - an action occurs
  lessItemsButton.addEventListener("click", () => {
    // The action is the cartItem goes dowwn in quantity
    cartItem.quantity--;
    // an if condition, so when the cartItem quantity === 0
    if (cartItem.quantity === 0) {
      // then the item is removed from the cart using the removeItemInCart() function
      removeItemInCart(cartItem.item);
    }
    // render function called to get this shown on the page & then appended to be seen by user
    render();
  });
  // lessItemButton is returned when the createLessItemsButton is called
  return lessItemsButton;
};

// similar to the createLessItemsButton, just no if condition & the quantity increases ++
const createMoreItemsButton = (cartItem) => {
  const moreItemsButton = document.createElement("button");
  moreItemsButton.classList.add("quantity-btn", "remove-btn", "center");
  moreItemsButton.innerText = "+";
  moreItemsButton.addEventListener("click", () => {
    cartItem.quantity++;
    render();
  });
  return moreItemsButton;
};

// itemAmountControls variable declared to store the function, cartItem used in the parameter
const itemAmountControls = (cartItem) => {
  // lessItemsButton variable created ready to be appended using the createLessItemsButton() function
  const lessItemsButton = createLessItemsButton(cartItem);
  // moreItemsButton variable created ready to be appended using the createMoreItemsButton() function
  const moreItemsButton = createMoreItemsButton(cartItem);
  // amount variable used to store the span element which is created. Span located on cart-item.html
  const amount = document.createElement("span");
  // using amount.innerHTML to locate the span element which will be appended
  amount.innerHTML = cartItem.quantity;
  // returns array lessItemsButton, amount, moreItemsButton which can be used when itemAmountControls function is called by the createCartItem()
  return [lessItemsButton, amount, moreItemsButton];
};

// const variable declared to store the removeItemInCart() function, item used as a parameter
const removeItemInCart = (item) => {
  // const index declared to store the index once it is found (findIndex) & matched item === item
  const index = state.cart.findIndex((cartItem) => cartItem.item === item);
  // splice method used to remove the matched item in the cart
  state.cart.splice(index, 1);
};

// const variable declared to store the function cartTotal()
const cartTotal = () => {
  // reduce() used to produce a single number of the total of the cart items in the array
  return state.cart.reduce(
    // the reduce() sum, then goes through a function as the item price is multiplied by the quantity, the value starts at 0
    (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
    0
  );
};

// const variable declared to store the function renderCartTotal()
const renderCartTotal = () => {
  // const variable declared to store the access to the .total-number class in the document (HTML)
  const totalElement = document.querySelector(".total-number");
  // Const variable total created to store the cartTotal, where the number is fixed to 2 decimal places, show as a string - eg "£1.75"
  const total = cartTotal().toFixed(2).toString();
  // the amount (total) number inserted using innerText into the totalElement which is the .total-number class
  totalElement.innerText = `£${total}`;
};

// render arrow function used to render different methods.
// eg - renderItemList() allowing the items to be rendered on the ul, showing on the page
const render = () => {
  // clear the cart function, render will show this action on the webpage
  clearCart();
  //  renderItemList() will be called when render() is called
  renderItemList();
  //  renderCartList() will be called when render() is called
  renderCartItems();
  //  renderCartTotal() will be called when render() is called
  renderCartTotal();
};

// clear the cart function will activate the clearCartItems() function to make cart empty
const clearCart = () => {
  clearCartItems();
};

//calling the render function to activate the methods so the images can be seen & work
render();
