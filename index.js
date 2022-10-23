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

/*

Create a function that contains variables for store items

  Create an li element for each item in the store
  Create a div to for the image store--item-icon class
  add image into the div
  add the button into the li
  make an event listener for the click

  Remove store-item--list

Create a function that contains variables for cart item

  Create an li element for each item in the cart
  Add the item img for the li
  Create a p element within each li containing state.cart.name
  Create plus and minus button in the li with 'quantity-btn remove-btn//add-btn center'
  
  Create the amount showing in li with 'quantity-text center'
  
Event listener for plus and minus buttons click

 
  Remove from cart--item-list-container


Create function for the total

  Create sum of the cart item price * cart item quantity
  Append sum into span with class total-number 
  
  */

const storeitems = document.querySelector(".store--item-list");

function addItemsToStore(item) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.setAttribute("class", "store--item-icon");
}
