## Instructions
- Use the index.html file as a starting point.
- index.js contains the initial state - a list of items available to purchase and an empty cart
- Images for each item are in the assets folder
- The HTML required for the items in the list and the cart items are provided in the templates folder
- Implement the following requirements
  - A user can view a selection of items in the store
  - From the store, a user can add an item to their cart
    - If the item is already in the cart, increase the item's quantity in the cart
  - From the cart, a user can view and adjust the number of items in their cart
    - If an item's quantity equals zero it is removed from the cart
  - A user can view the current total in their cart

## Approach - Core
1. The area of purchasable items will be retrieved from the `state` object.
  - They will be rendered once, on page load
  - Each item in this area will have a button which, when pressed, will add the item to the cart if there isn't one already, or if there is at least one in the cart already, increase its quantity by one

2. The cart area will contain a list of all items which have been added to the cart.
  - Each item in the list will display:
    - An image of the product
    - The name of the product
    - Buttons to increment/decrement the quantity of the item in the basket
    - A field displaying the quantity of the product in the basket

3. The **state** should keep track of:
- Which items are in the cart, by their ID
- The quantity of each item in the cart
