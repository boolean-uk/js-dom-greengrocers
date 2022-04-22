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
  // image.src is the location of where the image is located (assets/icons path) ${item} goes to the item parameter and all the items in the folders location are organised by an ID eg. 001
  // ``s used to access ${item.id}
  itemImage.src = `./assets/icons/${item.id}.svg`;
  // alt describes what the image is (helps search engines & visually impared). Hence why name is included after item & svg to describe what the image is & the type
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
    addToCart(item);
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

// render arrow function used to render different methods.
// eg - renderItemList() allowing the items to be rendered on the ul, showing on the page
const render = () => {
  renderItemList();
};

//calling the render function to activate the methods so the images can be seen & work
render();

// To be used later:
// addToCart();
