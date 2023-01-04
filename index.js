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

// storeItems, cartItems and total selectors
const storeItemsUl = document.querySelector(".store--item-list");
const cartItemsUl = document.querySelector(".cart--item-list");

// clear the stroreItems and cartItems
function clearingStoreItems() {
  storeItemsUl.innerText = "";
}

function clearingCart() {
  cartItemsUl.innerText = "";
}

function renderingItemsToStore() {
  clearingStoreItems();
  // Create the for loop for the items in the store
  for (let i = 0; i < state.items.length; i++) {
    const specificFruit = state.items[i];

    // section 1: create the list item like template
    // create the list items by createelement
    // than append li to ul
    const storeItemsList = document.createElement("li");
    storeItemsUl.append(storeItemsList);

    // create the div
    // set an attribute class to the div
    const itemsDiv = document.createElement("div");
    itemsDiv.setAttribute("class", "store--item-icon");

    // create the image elements and assign the path of the image source
    const fruitImage = document.createElement("img");
    fruitImage.setAttribute("src", `assets/icons/${specificFruit.id}.svg`);
    fruitImage.setAttribute("alt", "specificFruit.name");

    // also create  the button of "add to cart"
    const addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Add to cart";

    // append the div to the list
    storeItemsList.append(itemsDiv);
    itemsDiv.append(fruitImage);
    storeItemsList.append(addToCartButton);

    // add Event listener to the button and on click event it should add the item to the cart
    addToCartButton.addEventListener("click", () => {
      addingFruitToCart(specificFruit);
      renderItemsToCart();
      // add the sum of the items
      totalOfCart();
    });
  }
}
// renderingItemsToStore()

// checking the cart if there are items or not
let itemsAlreadyInTheCart = false;
function checkIfItemIsInCart(item) {
  for (i = 0; i < state.cart.length; i++) {
    if (state.cart[i].name === item.name) {
      itemsAlreadyInTheCart = true;
      state.cart[i].quantity += 1;
      break;
    } else {
      itemsAlreadyInTheCart = false;
    }
  }
}

// create the new object of items to the cart array
function addingFruitToCart(fruit) {
  const newObjInCart = {
    name: fruit.name,
    image: `assets/icons/${fruit.id}.svg`,
    quantity: 1,
    price: fruit.price,
  };
  checkIfItemIsInCart(fruit);
  if (!itemsAlreadyInTheCart) {
    // push this items to an array
    state.cart.push(newObjInCart);
  }
}

// create the function for the cart items
// write the for loop for selection the items.
function renderItemsToCart() {
  clearingCart();
  for (let i = 0; i < state.cart.length; i++) {
    const newCartItem = state.cart[i];
    // create the element for the list
    // append li to the ul items
    const cartItemsList = document.createElement("li");
    cartItemsUl.append(cartItemsList);

    // create the image element
    // set attribute to the img by class name already given
    // append the image to the list
    const cartImage = document.createElement("img");
    cartImage.setAttribute("class", "cart--item-icon");
    cartImage.setAttribute("alt", newCartItem.name);
    cartImage.setAttribute("src", newCartItem.image);
    cartItemsList.append(cartImage);

    // create the element for the "p" and assign the innertext
    // append it to the li items
    const cartItemname = document.createElement("p");
    cartItemname.innerText = newCartItem.name;
    cartItemsList.append(cartItemname);

    // create the button and set and attribute than add innertext as template
    // append it to the li items
    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove-btn");
    removeButton.innerText = "-";
    cartItemsList.append(removeButton);

    // add event listener to th removebutton to decrese the quantity of the items
    removeButton.addEventListener("click", () => {
      itemToRemove = state.cart.indexOf(newCartItem);
      if (newCartItem.quantity === 1) {
        state.cart.splice(itemToRemove, 1);
      } else {
        newCartItem.quantity -= 1;
      }
      renderItemsToCart();
      totalOfCart();
    });

    // create the element span and set an attribute to the element and give value as template
    // assign the value of the quantity from the newly created object
    // append it to the li items
    const itemQuantity = document.createElement("span");
    itemQuantity.setAttribute("class", "quantity-text");
    itemQuantity.innerText = newCartItem.quantity;
    cartItemsList.append(itemQuantity);

    // create the button and set and attribute than add innertext as template
    // append it to the li items
    const addButton = document.createElement("button");
    addButton.setAttribute("class", "add-btn");
    addButton.innerText = "+";
    cartItemsList.append(addButton);

    // add event listener to the buttons for incresing and decresing the value of the items
    addButton.addEventListener("click", () => {
      newCartItem.quantity++;
      renderItemsToCart();
      totalOfCart();
    });
  }
}

// renderItemsToCart()
const totalCost = document.querySelector(".total-number");

// write the function for the currency converter
function convertingCurrency(element) {
  return Number.parseFloat(element).toFixed(2);
}

// create the function for the sum of the items in cart
function totalOfCart() {
  let totalPriceOfItems = 0;
  for (let i = 0; i < state.cart.length; i++) {
    const cartItem = state.cart[i];
    totalPriceOfItems += cartItem.price * cartItem.quantity;
  }
  totalCost.innerText = `${convertingCurrency(totalPriceOfItems)}`;
}

renderingItemsToStore();
// and finally call the function of the  rendering the items in the store()
