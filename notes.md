list of core functions:
    1) to render storeItems
        a) for loop to create my elemments

    2) function to add event listener for the add to cart button
        a) add what i clicked to my state.cart
            (i) if it already there then increase quantity by 1
      
    3) render cart 

        a) a for loop to create my elements for the cart items
        b) function to display the quantity
            (i)if the quantity === 0 then delete that item
        c) function to display the total price


Workflow:

    Render Store Function
      Loops through state.items
        Creates the store item
        Adds an event listener to the "add to cart" button
          Action - When clicked, the item will be added to the cart state
        Adds the item to the store

    Render cart function
      Loops through state.cart
        Clears the current cart HTML
        Builds the cart item
          If item does not exist, set quantity to 1
          If item does exist, add 1 to quantity
        Calculates the total price
        Adds an event listener to the "+" button
          Action - Increases quantity by 1
          Action - Updates total price
        Adds an event listener to the "-" button
          Action - Reduces quantity by 1
          Action - Updates Total Price
