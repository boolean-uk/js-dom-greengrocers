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
  cart: [],
};

  // Store
  window.onload = function() {
    const itemContainer = document.querySelector('.store--item-list');
    sortButton()
    for(let i = 0; i < state.items.length; i++){
      // Template for store item
      const item = document.createElement('li');
      item.className = state.items[i].id
      const itemImageContainer = document.createElement('div')
      item.appendChild(itemImageContainer)
      itemImageContainer.className = "store--item-icon"

      // image
      const itemImage = document.createElement('img')
      itemImage.src = `assets/icons/${state.items[i].id}.svg`
      itemImageContainer.appendChild(itemImage)

      // button
      const addToCartButton = document.createElement('button')
      addToCartButton.textContent = "Add to cart"
      addToCartButton.onclick = () => handleClick(state.items[i])
      item.appendChild(addToCartButton)




      itemContainer.appendChild(item)
    }

  }

  //
  function handleClick(item) {
    item.quantity = 1
    item.total = item.price
    const cartContainer = document.querySelector('.cart--item-list')
    updateTotal()
    // Check if the item already exists in the cart
    const existingCartItem = cartContainer.querySelector(`[data-id="${item.id}"]`);

    if (existingCartItem) {
      // If item already exists, increment its quantity
      const quantityText = existingCartItem.querySelector('.quantity')
      item.quantity = parseInt(quantityText.textContent)
      item.quantity++
      quantityText.textContent = item.quantity
      item.total = (item.quantity * item.price)
      existingCartItem.setAttribute('data-total', item.total);
      updateTotal();
    } else {
        // Create a new cart item
        const cartItem = document.createElement('li')
        cartItem.setAttribute('data-id', item.id)
        cartItem.setAttribute('data-quantity', item.quantity)
        cartItem.setAttribute('data-total', item.total)


        // Image
        const image = document.createElement('img')
        image.src = `assets/icons/${item.id}.svg`
        image.alt = item.name; // Dynamically set alt attribute
        cartItem.appendChild(image)

        // Name of item
        const itemName = document.createElement('p')
        itemName.textContent = item.name
        cartItem.appendChild(itemName)

        // Quantity of item
        const quantityText = document.createElement('span')
        quantityText.className = `quantity-text center`
        quantityText.textContent = `${item.quantity}`
        quantityText.classList.add('quantity')

        // Add button
        const addButton = document.createElement('button')
        addButton.className = `quantity-btn add-btn center`
        addButton.textContent = '+'
        addButton.addEventListener('click', () => {
            item.quantity = parseInt(quantityText.textContent)
            item.quantity++
            quantityText.textContent = item.quantity
            item.total = (item.quantity * item.price)
            cartItem.setAttribute('data-total', item.total);
            updateTotal();
        });

        // Remove button
        const removeButton = document.createElement('button')
        removeButton.className = `quantity-btn remove-btn center`
        removeButton.textContent = '-'
        removeButton.addEventListener('click', () => {
            item.quantity = parseInt(quantityText.textContent)
            if (item.quantity > 0) {
                item.quantity--
                if (item.quantity === 0) {
                  cartItem.remove()
                }
                quantityText.textContent = item.quantity
                item.total = (item.quantity * item.price)
                cartItem.setAttribute('data-total', item.total);
                updateTotal();
            }
        });


        cartItem.appendChild(removeButton)
        cartItem.appendChild(quantityText)
        cartItem.appendChild(addButton)
        cartContainer.appendChild(cartItem)
        updateTotal()
    }
  }

  function updateTotal() {
    const cartItems = document.querySelectorAll('.cart--item-list li');
    let totalPrice = 0;

    // Calculate the total price based on the items in the cart
    cartItems.forEach(cartItem => {
        let itemTotal = cartItem.getAttribute('data-total')
        
        totalPrice += parseFloat(itemTotal)
    });

    // Update the total price in the UI
    const totalPriceElement = document.querySelector('.total-number');
    totalPriceElement.textContent = `£${totalPrice.toFixed(2)}` //with two decimal places
}


// Get reference to the sort button'
function sortButton() {
  const sortButton = document.getElementById('sort-btn');

  // Add event listener to the sort button
  sortButton.addEventListener('click', () => {
      // Sort the items array by name
      state.items.sort((a, b) => {
          // Convert names to lowercase for case-insensitive sorting
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
  
          // Compare the names and return the result of the comparison
          if (nameA < nameB) {
              return -1; // Name A comes before Name B
          }
          if (nameA > nameB) {
              return 1; // Name A comes after Name B
          }
          return 0; // Names are equal
      });
  
      // Call a function to update the UI with the sorted items
      updateItemList(state.items);
  });
}
// Function to update the UI with the sorted items
function updateItemList(items) {
  // Clear the existing item list
  const itemList = document.querySelector('.item-list');
  itemList.innerHTML = '';

  // Re-render the sorted items
  items.forEach(item => {
      const listItem = document.createElement('li');
      listItem.className = item.id;
      const ListItemImageContainer = document.createElement('div')
      listItem.appendChild(ListItemImageContainer)
      ListItemImageContainer.className = "store--item-icon"

      // image
      const ListItemImage = document.createElement('img')
      ListItemImage.src = `assets/icons/${item.id}.svg`
      ListItemImageContainer.appendChild(ListItemImage)

      // button
      const addToCartButton = document.createElement('button')
      addToCartButton.textContent = "Add to cart"
      addToCartButton.onclick = () => handleClick(item)
      listItem.appendChild(addToCartButton)
      itemList.appendChild(listItem);
  });
}


