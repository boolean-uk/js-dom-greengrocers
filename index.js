// A4. Select the ul from the dom with the class item-list
const itemsUL = document.querySelector(".item-list");
const cartUL = document.querySelector(".item-list");

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

// REQUIREMENT BREAKDOWN

// Create the store item list function.
const storeList = (index) => {
  // Create variable and store the image url and the alt name.
  const imageUrl = `assets/icons/${state.items[index].id}.svg`;
  const altName = state.items[index].name;

  // Create a new list element
  const itemList = document.createElement("li");

  // Create a new div element and set a class attribute.
  const div = document.createElement("div");
  div.setAttribute("class", "store--item-icon");

  // Create a new image element and set the src and alt attributes.
  const image = document.createElement("img");
  image.setAttribute("src", imageUrl);
  image.setAttribute("alt", altName);

  // Append the image to the div element.
  div.append(image);

  // Create a new button element and set it's inner text.
  const button = document.createElement("button");
  button.innerText = "Add to cart";

  // Add an event listener to the button.
  // button.addEventListener("click", () => {
  //   console.log(`Button ${index} was clicked!`);
  // });
  buttonAction(button, index);

  // Append the div and button to the list.
  itemList.append(div, button);

  return itemList;
};

// Create the cart item function
const cartItem = (index) => {
  // Create variable and store the image url and the alt name.
  const imageUrl = `assets/icons/${state.items[index].id}.svg`;
  const altName = state.items[index].name;

  // Create a new list for the cart item display
  const cartLI = document.createElement("li");

  // Create an image element and set its attributes.
  const image = document.createElement("img");
  image.setAttribute("class", "cart--item-icon");
  image.setAttribute("src", imageUrl);
  image.setAttribute("alt", altName);

  // Create the paragraph tag and set its innerText.
  const p = document.createElement("p");
  p.innerText = cart[index].item[index].name;

  // Create the add button and set its class attributes
  const addButton = document.createElement("button");
  addButton.setAttribute("class", "quantity-btn remove-btn center");
  addButton.innerText = "+";

  // Create the span element and set its class and text value dynamically.
  const span = document.createElement("span");
  span.setAttribute("class", "quantity-text center");
  span.innerText = 1;

  // Create the minus button and set its class attributes
  const minusButton = document.createElement("button");
  minusButton.setAttribute("class", "quantity-btn remove-btn center");
  minusButton.innerText = "-";

  // Append the image, p, button, span and button to the li.
  cartLI.append(image, p, addButton, span, minusButton);

  // Append the list to the ul.
  cartUL.append(cartLI);
};

// Create the render function()
const render = () => {
  // Loo through the store items using a for loop.
  for (let index = 0; index < state.items.length; index++) {
    // Invoke the storeList() function and store the result in a variable.
    const listResult = storeList(index);
    console.log(listResult);
    // Append the list returned to the ul.
    itemsUL.append(listResult);
  }
};

// Create a button event function to add item to the cart.
const buttonAction = (button, index) => {
  button.addEventListener("click", () => {
    console.log(`Button ${index} was clicked!`);
  });
};

render();

// B. From the store, a user can add an item to their cart

// B2. Create a function for the listener's callback
// B3. In the function, create a new list
// B4. Set the inner html value of the list
// B. append the list to the ul with the cart--item-list class

// C. If the item is already in the cart, increase the item's quantity in the cart
// D. From the cart, a user can view and adjust the number of items in their cart
// E. If an item's quantity equals zero it is removed from the cart
// F. A user can view the current total in their cart

// Extended 1
// Add filters to the store ie. filter by item type; when a user clicks a filter they will only see items of that type

// Extended 2
// Add sorting to the store ie. sort by price or sort alphabetically; when a user clicks sort they will see a sorted list of items
