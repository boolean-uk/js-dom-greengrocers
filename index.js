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

// 1. Creating a function for all the list of items - pulling data from above state.items list
// 2.  Create a const for header and selecting header 
// 3. Create a const for ul and selecting the ul
// 4. Creating a variable called li and then creating an element within ul and header.
// 5. Appending li to ul

function listOfItems(){
  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i];
const header = document.querySelector("#store")
const ul = document.querySelector('.item-list')
console.log(ul)
const li = document.createElement('li')
ul.append(li)


// Creating the div inside the Li
// 1. Create variable for div - create an element for div
// 2. Set class attribute for div
// 3. Append div to the li
// 4. Create image element inside of div
// 5 . Set attribute - icons
// 6. Append the image to the div



  const div = document.createElement("div")
  div.setAttribute("class", "store--item-icon")
  li.append(div)

  // Image creation

  const img = document.createElement('img')
  img.setAttribute('src',`assets/icons/${item.id}.svg`)
  div.append(img)



  // Button - Add to cart
  // 1. Create an element call button - this is within li
  // 2. set innertexr to button "add to cart"
  // 3. Append the button to the li

  const button = document.createElement("button")
  button.innerText = "add to cart"
  li.append(button)

    // Add event listener to "Add to cart" button
    // When button is clicked - items should appear in the cart
    button.addEventListener("click", () => {
      state.cart.push(item);
      console.log(state.cart);
    });
  }
}
listOfItems();


// Function for list of items

  function listOfCartItems(){
    for (let i = 0; i < state.items.length; i++) {
      const item = state.items[i];
const main = document.querySelector("#cart")
const divCartItem = document.querySelector(".cart--item-list-container")
// targeting second class name .cart--item-list
// space between two classes means two classes
const ulCartItem = document.querySelector('.cart--item-list')
const liCartItem = document.createElement('li')
ulCartItem.append(liCartItem)
    }}

// }

listOfCartItems()

