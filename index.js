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

// Selected Root Elements
const storeItemListUL = document.querySelector(".store--item-list");
const cartItemListUL = document.querySelector(".cart--item-list");
const total = document.querySelector(".total-number")

function renderItems() {
  // Reset all of the items
  storeItemListUL.innerHTML = "";
  // Loop through the data create a new li element for each
  for (let i = 0; i < state.items.length; i++) {
    // Get the current item
    const item = state.items[i];

    // Create a <li></li> for the item
    const storeItemLi = document.createElement("li");

    // Create div
    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");

    // Create image
    const image = document.createElement("img");
    const imageId = item.id;
    image.src = "/assets/icons/" + imageId + ".svg";
    image.alt = item.name;
    div.appendChild(image);
    storeItemLi.appendChild(div);

    // Create button
    const addButton = document.createElement("button");
    addButton.innerText = "Add to cart";
    storeItemLi.appendChild(addButton);
    // Add event listener to button
    addButton.addEventListener("click", () => {
      addItemToStateCart(item);
      //add to total
      const oldTotal = parseFloat(total.innerText.substring(1, total.innerText.length))
      total.innerText = '£' + (oldTotal + item.price)
    });

    // Add the list item to the list
    storeItemListUL.appendChild(storeItemLi);
  }
}

function addItemToStateCart(item) {
  // om den klickas ska den läggas till i state cart
  // om den redan finns i state cart ska den ej läggas till
  let found = false;
  //måste leta efter id då state cart även har quantity prop
  for (let i = 0; i < state.cart.length; i++) {
    if (state.cart[i].id === item.id) {
      state.cart[i].quantity++;
      found = true;
      break;
    }
  }
  if (!found) {
    item.quantity = 1;
    console.log(item)
    state.cart.push(item);
  }

  //re-create html cart list from state cart
  createCartItemLi();
}

function createCartItemLi() {
  // Reset all of the items
  cartItemListUL.innerHTML = "";

  console.log(state.cart)

  //för varje element, skapa det igen
  for (let i = 0; i < state.cart.length; i++) {
    const item = state.cart[i];

    // Create li
    let cartItemLi = document.createElement("li");

    // Create image
    const image = document.createElement("img");
    const imageId = item.id;
    image.src = "/assets/icons/" + imageId + ".svg";
    image.alt = item.name;
    cartItemLi.appendChild(image);

    // Create p tag
    const name = document.createElement("p");
    name.innerText = item.name;
    cartItemLi.appendChild(name);

    // Create remove button
    const decrementButton = document.createElement("button");
    decrementButton.setAttribute("class", "remove-btn");
    decrementButton.innerText = "-";
    cartItemLi.appendChild(decrementButton);
    // create eventlistener to button
    decrementButton.addEventListener("click", () => {
      // om den klickas ska quantity i state.cart bli minus ett
      const index = state.cart.findIndex(item => item.id === item.id);
      state.cart[index].quantity--;
      //span ska minska med 1
      const span = cartItemLi.querySelector(".quantity-text");
      const quantity = parseInt(span.innerText);
      span.innerText = quantity - 1;

      //minska total
      const oldTotal = parseFloat(total.innerText.substring(1, total.innerText.length))
      console.log(oldTotal)
      total.innerText = '£' + (oldTotal - item.price)

      // om quantity = 0 ska detta element tas bort ur state cart och html view
      if (state.cart[index].quantity === 0) {
        delete state.cart[index];
        cartItemListUL.remove(cartItemLi);
      }
    });

    // Create span
    const span = document.createElement("span");
    span.setAttribute("class", "quantity-text");
    span.innerText = 1;
    cartItemLi.appendChild(span);

    // Create increment button
    const incrementButton = document.createElement("button");
    incrementButton.setAttribute("class", "add-btn");
    incrementButton.innerText = "+";
    cartItemLi.appendChild(incrementButton);
    incrementButton.addEventListener("click", () => {
      // om den klickas ska quantity i state.cart bli plus ett
      const index = state.cart.findIndex(item => item.id === item.id);
      state.cart[index].quantity++;
      console.log("quantity " + item.quantity)
      // uppdatera span
      const span = cartItemLi.querySelector(".quantity-text");
      const quantity = parseInt(span.innerText);
      span.innerText = quantity + 1;

      //öka total 
      const oldTotal = parseFloat(total.innerText.substring(1, total.innerText.length))
      console.log(oldTotal)
      total.innerText = '£' + (oldTotal + item.price)
    });

    // Add to html view
    cartItemListUL.appendChild(cartItemLi);
  }
}

// Intial Render
function main() {
  renderItems();
}

main();
