// REFER TO THESE IF ANY DOUBTS ABOUT WHAT IM WRITING

// Definitions:

// *querySelector*
// The Document method querySelector() returns the first Element within the document that matches 
// the specified selector, or group of selectors. If no matches are found, null is returned.

// *innerHTML*
// A string containing the HTML serialization of the element's descendants. Setting the value of innerHTML 
// removes all of the element's descendants and replaces them with nodes constructed by parsing the HTML given in the string htmlString.

// *createElement*
// A string that specifies the type of element to be created. The nodeName of the created element is initialized with the value of tagName. 
// Don't use qualified names (like "html:a") with this method. When called on an HTML document, createElement() converts tagName to lower
// case before creating the element. In Firefox, Opera, and Chrome, createElement(null) works like createElement("null")

// *append*
// The Element.append() method inserts a set of Node objects or string objects after the last child of the Element. String objects are 
// inserted as equivalent Text nodes.

// *.className*
// The className property of the Element interface gets and sets the value of the class attribute of the specified element.

// *addEventListener*
// The addEventListener() method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered
// to the target. Common targets are Element, or its children, Document, and Window, but the target may be any object that supports events 
// (such as XMLHttpRequest). The method addEventListener() works by adding a function, or an object that implements EventListener, to the list 
// of event listeners for the specified event type on the EventTarget on which it's called. If the function or object is already in the list of 
// event listeners for this target, the function or object is not added a second time. 

// *indexOf*
// The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.

// *preventDefault*
// The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, 
// its default action should not be taken as it normally would be.The event continues to propagate as usual, unless one of its
// event listeners calls stopPropagation() or stopImmediatePropagation(), either of which terminates propagation at once.

// *setAttribute*
// Sets the value of an attribute on the specified element. If the attribute already exists, the value is updated; otherwise a 
// new attribute is added with the specified name and value.

// *localeCompare*
// The localeCompare() method returns a number indicating whether a reference string comes before, or after, or is the same as
//  the given string in sort order.

// STEP #1
// declare a const containing all the items we wish to show on the screen above the basket.
// these items, along with the "+ or -" button will be displayed in the basket when "add to cart" under the img is clicked
// each item should contain a name, id, price, and type. These should all be placed in an array so that individual items can
// be called upon.

const produce = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: 'vegetable',
    },

    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: 'vegetable',
    },

    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: 'fruit',
    },

    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: 'fruit',
    },

    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: 'vegetable',
    },

    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: 'fruit',
    },

    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: 'vegetable',
    },

    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: 'fruit',
    },

    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: 'fruit',
    },

    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: 'vegetable',
      type: 'fruit',
    },
  ],
  cart: [],
};

// create an empty array for the cart so that items can be added using various methods (push, append etc)
const renderStoreItemList = () => {
// create an empty array and use querySelector to place the imgs into it. Use innerHTML with empty quotation
// marks to ensure there is no text as we only want the img at this point.
  const itemList = document.querySelector(".item-list");
// use innerHTML with empty brackets to ensure no text is displayed with img
  itemList.innerHTML = "";
// 
  renderStoreItemListElements(itemList);
};
// use forEach to ensure each item goes into a section of the grid
const renderStoreItemListElements = (itemList) => {
// produce contains array, where indiviual items and details are contained
  produce.items.forEach((item) => {
// create list items and use itemList.append to place icons from assets into them
    const storeItemList = document.createElement("li"); 
    itemList.append(storeItemList);
// create a const to contain the div that will contain icon details (img, id)
    const storeItemIcon = document.createElement("div"); 
    storeItemIcon.className = "store--item-icon";
    storeItemIcon.innerHTML = `<img src="assets/icons/${item.id}.svg" alt="beetroot" />`;
    storeItemList.append(storeItemIcon);
// create a button and add the "add to cart" text inside it by using innerHTML
    const storeItemButton = document.createElement("button"); 
    storeItemButton.innerHTML = "Add to cart";
// use addEventListener, so that when clicked multiple times, a message detailing how to increment/decrement
// values appears
    storeItemButton.addEventListener("click", (event) => {
// use preventdefault to stop default behaviour when "add to cart" on a particular item has already been clicked.
      event.preventDefault();
// use an if statement to say if this item is already in the cart, display alert conataining instructions
      if (produce.cart.includes(item)) {
        alert("Cannot add 2 of the same item. Please use +/- in your cart to increase/decrease quantities");
        return ;
      }
// use .push to enter items into the your cart section and apply a numberical value showing current quantity as 1 
// when added
      produce.cart.push(item);
// use [state.cart.indexOf()] to to show variants of numbers in relation to quantity
      produce.cart[produce.cart.indexOf(item)].itemQuantity = 1;
// place added items into list in cart
      renderCartItemList(item);
// update the total after item is added
      updateTotalPrice();
    });
    storeItemList.append(storeItemButton);
  });
};
// declare a const to update the list of items in the cart
const renderCartItemList = () => {
// inside here, declare another const containing the list items within the cart
    const itemList = document.querySelector(".cart--item-list");
// remove any text
    itemList.innerHTML = ""; 
// use forEach to sort through items individual items in array
    produce.cart.forEach((cartItem) => {
// create a list
    const cartItemList = document.createElement("li"); 
// change name for items in list to reflect cart contents. Makes it easier to work with and prevents
// confusion about item location
    itemList.append(cartItemList);
// create an img element to place the img and other details from the array into
    const cartItemListImg = document.createElement("img"); // image to display on the cart
    cartItemListImg.setAttribute("class", "cart--item-icon");
    cartItemListImg.setAttribute("src", `assets/icons/${cartItem.id}.svg`);
    cartItemListImg.setAttribute("class", "cart--item-icon");

// create a const that has text containing the items name and use inner HTML to refer to it
    const cartItemListText = document.createElement("p"); 
    cartItemListText.innerHTML = cartItem.name;
// create the button that will be used to remove items from cart
    const cartItemListRemove = document.createElement("button"); 
// set the function of the button
    cartItemListRemove.setAttribute("class", "quantity-btn remove-btn center");
// use innerHTML to display the - symbol on the button
    cartItemListRemove.innerHTML = "-";
// use addEventListener to make the set how the button responds when clicked
    cartItemListRemove.addEventListener("click", () => {
      cartItem.itemQuantity--;
      if (cartItem.itemQuantity === 0) {
// ensure that the item is removed if the value is equal to 0
        produce.cart.splice(produce.cart.indexOf(cartItem), 1);
      }
// update list and totals accordingly
      renderCartItemList();
      updateTotalPrice();
    });
// Declare a const that when called upon shows the quantity of a particular item in the "your cart" section.
    const cartItemListQuantityText = document.createElement("span"); 
// use setAttribute to update the text in the box between the +,- buttons.
    cartItemListQuantityText.setAttribute("class", "quantity-text center");
// use innerHTML to update the item quantity in the cart 
    cartItemListQuantityText.innerHTML = cartItem.itemQuantity;
// create a const for the add function and use createElement to make a button to add more of the same item to the cart
    const cartItemListAdd = document.createElement("button"); 
// use setAttribute and select the aspect, and insert a "+" using innerHTML
    cartItemListAdd.setAttribute("class", "quantity-btn remove-btn center");
    cartItemListAdd.innerHTML = "+";
// use addEventListener to update item quantity. Using "++" will increment by one on each click
    cartItemListAdd.addEventListener("click", () => {
      cartItem.itemQuantity++;
// update the total of items in the cart
      renderCartItemList();
// update the total price with each + or -clicked
      updateTotalPrice();
    }); 
// use .append to update the cartItemList so that new items contain the img, text, -, text, +
    cartItemList.append(
      cartItemListImg,
      cartItemListText,
      cartItemListRemove,
      cartItemListQuantityText,
      cartItemListAdd
    );
  });
};
// declare updateTotalPrice as a const 
const updateTotalPrice = () => {
// use querySelector to return total number element
  const totalPrice = document.querySelector(".total-number");
// use a let to set the base value as 0
  let totalPriceText = 0;
// update totalPrice text when items are added or removed from basket.
// also update the text when multiples of items are added
  for (item in produce.cart) {
    totalPriceText += produce.cart[item].itemQuantity * produce.cart[item].price;
  }
  // use innderHTML to reflect the change in price according to items in basket in £
  totalPrice.innerHTML = "£" + totalPriceText.toFixed(2);
  return totalPriceText;
};

// *EXTENSIONS*
// create a function that will sort the items into categories of fruits and vegetables. 
// declare const filterByVegetables to enable filtering by veg only
const vegFilter = () => {
// console.log the desired result
console.log('Filtered by vegetables')

const itemList = document.querySelector(".item-list");
// do not display any text by using innerHTML with empty brackets
itemList.innerHTML = "";
// use forEach to sort through each item in the array
produce.items.forEach((item) => {
// use an if statement stating if the item type is a vegetable
  if (item.type === "vegetable") {
// create a const called storeItemList to contain a list and place it into the itemList using append.
  const storeItemList = document.createElement("li"); 
// use append to add storeItemList to itemList
  itemList.append(storeItemList);
// use createElement to make a div to store the icon
  const storeItemIcon = document.createElement("div"); 
// assign the img to the storeItemIcon const
  storeItemIcon.className = "store--item-icon";
// assign the id of the img to the innerHTML of the storeItemIcon const
  storeItemIcon.innerHTML = `<img src="assets/icons/${item.id}.svg" alt="beetroot" />`;
// use append to add the storeItemIcon to the storeItemList
  storeItemList.append(storeItemIcon);
// declare a const called storeItemButton and assign a button to it
  const storeItemButton = document.createElement("button"); 
// use innerHTML to assign "Add to cart" to appear inside the button
  storeItemButton.innerHTML = "Add to cart";
// use addEventlistener to reorganise list items whenever button is clicked
  storeItemButton.addEventListener("click", (event) => {
// Prevent default behaviours for after when this is clicked. if 2 items of the same type are 
// attempted to added, use an alert to display a message saying to use alternante methods.
    event.preventDefault();
    if (produce.cart.includes(item)) {
      alert("Cannot add 2 of the same item. Please use +/- in your cart to increase/decrease quantities");
      return ;
    }
// use .push to add item to cart with a beginning quantity of 1
    produce.cart.push(item);
// use indexOf to increment the number when quantity is increased while in the cart
    produce.cart[produce.cart.indexOf(item)].itemQuantity = 1;
// add item to cart and update running total at bottom.
    renderCartItemList(item);
    updateTotalPrice();
  });
  storeItemList.append(storeItemButton);
}});
}
// *EXTENSIONS*
// declare a const fruitFilter. 
// use a button function that will show only fruits when clicked
// to speed things up we can copy and paste the previous extension and make the required changes

const fruitFilter = () => {
const itemList = document.querySelector(".item-list");
itemList.innerHTML = "";
produce.items.forEach((item) => {
  if (item.type === "fruit") {
  const storeItemList = document.createElement("li"); 
  itemList.append(storeItemList);
  const storeItemIcon = document.createElement("div"); 
  storeItemIcon.className = "store--item-icon";
  storeItemIcon.innerHTML = `<img src="assets/icons/${item.id}.svg" alt="beetroot" />`;
  storeItemList.append(storeItemIcon);
  const storeItemButton = document.createElement("button"); 
  storeItemButton.innerHTML = "Add to cart";
  storeItemButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (produce.cart.includes(item)) {
      alert("Cannot add 2 of the same item. Please use +/- in your cart to increase/decrease quantities");
      return ;
    }
    produce.cart.push(item);
    produce.cart[produce.cart.indexOf(item)].itemQuantity = 1;
    renderCartItemList(item);
    updateTotalPrice();
  });
  storeItemList.append(storeItemButton);
}});

}
// *EXTENSION*
// To sort the fruits and veg alphabetically
// declare a const called sortAlphabetically.
const sortAlphabetically = () => {
// place a const called sortArray inside it with x and y values in it
  const sortArray = (x,y) => {
// use.localeCompare to sort through the array and display items alphabetically
    return x.name.localeCompare(y.name);
  }
// console log the function
  console.log('sortAlphabetically');
// declare a const containing the imgs, details of the item and sort them using the 
// sort array(localeCompare) 
  const itemsSortedAlphabetically = produce.items.sort(sortArray);
// log the function
  console.log(itemsSortedAlphabetically);
// declare a const and make its value that of .item-list
  const itemList = document.querySelector(".item-list");
// use innerText to show no text as we only want the img at this point
  itemList.innerHTML = "";
// use .forEach(item) to reference each item in the array
  itemsSortedAlphabetically.forEach((item) => {
// use const storeItemList to contain list elements for each item
    const storeItemList = document.createElement("li");
// use append to enter storeItemList into itemList 
    itemList.append(storeItemList);
// use storeItemIcon const and create a div element to place the icons into
    const storeItemIcon = document.createElement("div"); 
// use className to return the value of the img
    storeItemIcon.className = "store--item-icon";
// use innerHTML to refer to the item id and assets
    storeItemIcon.innerHTML = `<img src="assets/icons/${item.id}.svg" alt="beetroot" />`;
// use append to add the image into the storeItemList
    storeItemList.append(storeItemIcon);
// create a button that will be named storeItemButton
    const storeItemButton = document.createElement("button"); 
// place the text into the button using innerHTML
    storeItemButton.innerHTML = "Add to cart";
// in storeItemButton use addEventListener to respond with an error message when
// user attempts to add the same item twice.
    storeItemButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (produce.cart.includes(item)) {
        alert("Cannot add 2 of the same item. Please use +/- in your cart to increase/decrease quantities");
        return ;
      }
// use .push to add a new item and increment the quantity by 1 each time. use indexOf(parameter) to reflect how
// item quantity should increment. Update the total price by incrementing the total cost by the value of the cart item.
      produce.cart.push(item);
      produce.cart[produce.cart.indexOf(item)].itemQuantity = 1;
      renderCartItemList(item);
      updateTotalPrice();
    });
// when clicking "add to cart" button, add items to the cart with new qualities
    storeItemList.append(storeItemButton);
  });

}
// 
const init = () => {
  renderStoreItemList();
};

init();