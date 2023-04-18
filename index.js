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

// ---------------CORE REQUIREMENTS PLAN ----------//
// - Implement the following requirements
  - A user can view a selection of items in the store
  
  
  // create some array of items
  // create function to select item
  // append item to store
  // create loop to add new items
  // make new items into a list
  
  - From the store, a user can add an item to their cart

  // create function to pick item from above list
  // append new item to cart list

    - If the item is already in the cart, increase the item's quantity in the cart

    // find duplicate item in cart
    // increase item amount by one for each duplicate (for loop here?)


  - From the cart, a user can view and adjust the number of items in their cart

  // add click event for additional item
  // add click event for reomval of item
  // can above 2 steps be made into one function with else/if statements??


      - If an item's quantity equals zero it is removed from the cart

      // add if statement that will clear cart but only selected item

  - A user can view the current total in their cart

  // add click event AND/OR function that returns sum of cart items

// ---------------------- EXTENSION ONE ----------------//

- Add filters to the store ie. filter by item type; when a user clicks a filter they will only see items of that type

// add click event function that will recognise item
// append item to new "selected" list


// ----------------------- EXTENSION 2 ------------------//

- Add sorting to the store ie. sort by price or sort alphabetically; when a user clicks sort they will see a sorted list of items

// add click event function to arrange "ordered list" numerically "pushing" highest value first going to lowest in "array"???