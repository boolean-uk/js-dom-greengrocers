// A4. Select the ul from the dom with the class item-list
const ul = document.querySelector(".item-list");

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

// A. A user can view a selection of items in the store

// A1. Loop through state.items[i] and grap each element of the items array.

const render = () => {
  for (let i = 0; i < state.items.length; i++) {
    // A2. Create a list item
    const li = document.createElement("li");
    // A3. Set the inner html of the list. Dynamically add the image of the item using the item id
    li.innerHTML = `
      <div class="store--item-icon">
        <img src="assets/icons/${state.items[i].id}.svg" alt="beetroot" />
      </div>
      <button>Add to cart</button>
  `;
    // A5. Append the li to the ul.
    ul.append(li);
  }
};

render();

// A. From the store, a user can add an item to their cart

// B. If the item is already in the cart, increase the item's quantity in the cart
// C. From the cart, a user can view and adjust the number of items in their cart
// D. If an item's quantity equals zero it is removed from the cart
// E. A user can view the current total in their cart

// Extended 1
// Add filters to the store ie. filter by item type; when a user clicks a filter they will only see items of that type

// Extended 2
// Add sorting to the store ie. sort by price or sort alphabetically; when a user clicks sort they will see a sorted list of items
