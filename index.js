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

// Render function that loops through the data and adds HTML for each item to store
// Function to create page item (called in forEach/ first function)

// Selections
const store = document.querySelector(".store--item-list");
const cart = document.querySelector(".cart--item-list");

function createStoreItem(product) {
  return (html = `
    <li>
      <div class="store--item-icon">
        <img src="assets/icons/${product.id}.svg" alt="${product.name}" />
      </div>
      <button class='cart-btn'>Add to cart</button>
    </li>
`);
}

state.items.forEach((product) => {
  const item = createStoreItem(product);

  store.innerHTML += item;

  handleButton();
});

// function to select the button and add the event listener which will listen for click event
function handleButton() {
  const cartBtn = document.querySelector(".cart-btn");
  console.log(cartBtn);
}

// function to render the cart items

// function to clear the cart list
function clearCart() {
  cart.innerHTML = "";
}
