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
  cart: []
};


function listItems(){
  for (let i = 0; i < state.items.length; i++) {
const item = state.items[i];
const header = document.querySelector("#store")
const ul = document.querySelector('.item-list')
console.log(ul)
const li = document.createElement('li')
ul.append(li)
 
 
// creating div to insert inside li
 
const div = document.createElement("div")
div.setAttribute("class", "store--item-icon")
li.append(div)
 
const img = document.createElement('img')
img.setAttribute('src',`assets/icons/${item.id}.svg`)
div.append(img)
 
const button = document.createElement("button")
button.innerText = "add to cart"
li.append(button)
 
// add event listener
 
button.addEventListener("click", function() {
  addToCart(item);
});
}
}
 
listItems()
 
 
// adding an item to cart
 
const main = document.querySelector("#cart")
const divCartItem = document.querySelector(".cart--item-list-container")
// class 'item-list' already used twice so need to be more specific and chose the 2nd class name 'cart--item-list'
// when there is a space btw class names it means that it has 2 classes and can refer to them separately
const ulCartItem = document.querySelector('.cart--item-list')
// const totalCostDisplay = document.querySelector(".total-number");
const liCartItem = document.createElement('li')
ulCartItem.append(liCartItem)
// at this point managed to get one li into the ul in the main
 
function addToCart(item) {
  const existingItem = state.cart.find((CartItem) => CartItem.id === item.id);
  // CartItem variable works the same as liCartItem or ulCartItem
//  The condition is specified using an arrow function with a single parameter cartItem, 
// which represents each item in the state.cart array as the find method iterates through it.
  if (existingItem) {
    existingItem.quantity++;
  } else {
    const newItem = { ...item, quantity: 1 };
    state.cart.push(newItem);
  }
  // the if/else statement above checks if the selected item 
  // (the item argument passed to the addToCart function) is already in the state.cart array.
  // if item is already in the cart it is incremented by 1 (quantity++)
  // if item is not in the cart,then a new item object is created by spreading the properties of the original item object, 
  // and adding a new quantity property with a value of 1
  // new item object is then added to the 'state.cart' array using .push method
 
  updateCart();
}
 
function updateCart() {
  // clear the current cart display
  ulCartItem.innerHTML = "";
 
  // loop through the cart items and create list items
  // here svg images, plus/minus boxes as well as quantity box all get added
//  forEach method pulls data eg (img, name, id) from array and iterates through it and exexcutes a function
  state.cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-item-id", item.id);
    listItem.innerHTML = `
      <img class="cart--item-icon" src="assets/icons/${item.id}.svg" alt="${item.name}" />
      <p>${item.name}</p>
      <button class="quantity-btn remove-btn center">-</button>
      <span class="quantity-text center">${item.quantity}</span>
      <button class="quantity-btn add-btn center">+</button>
    `;
    // the above classes were lifted from cart-item.html file
    ulCartItem.appendChild(listItem);
  });
 
  // update total cost display
  const totalCostDisplay = document.querySelector(".total-number");

  // .reduce()method is called on state.cart. This method applies a function to each element in the array 
  // and accumulates the results into a single value. In this case, the accumulated value is the total cost 
  // of all the items in the cart. 
  const totalCost = state.cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  // .toFixed() method is to format a number into having only 2 x decimal places, return as a string and not a number
  totalCostDisplay.innerText = `£${totalCost.toFixed(2)}`;
}
 
// to increase/decrease quantity
// adding event listener to ulCartItem whenever clicking add or remove
// classList.contains("remove-btn") and classList.contains("add-btn") are used to check if 
// the clicked element has the CSS class "remove-btn" or "add-btn", respectively.
ulCartItem.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-btn")) {
    const itemID = event.target.parentElement.getAttribute("data-item-id");
    const itemIndex = state.cart.findIndex((item) => item.id === itemID);
 
    if (state.cart[itemIndex].quantity > 1) {
      state.cart[itemIndex].quantity--;
    } else {
      state.cart.splice(itemIndex, 1);
    }
 
    updateCart();
  }
 
  if (event.target.classList.contains("add-btn")) {
    const itemID = event.target.parentElement.getAttribute("data-item-id");
    const itemIndex = state.cart.findIndex((item) => item.id === itemID);
 
    state.cart[itemIndex].quantity++;
 
    updateCart();
  }
});












