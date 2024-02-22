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
function renderStore() {
  const storeList = document.querySelector('.store--item-list');
  storeList.innerHTML = '';

  state.items.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('item');
    listItem.innerHTML = `
      <img src="assets/icons/${item.id}.svg" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: £${item.price.toFixed(2)}</p>
      <button onclick="addToCart('${item.id}')">Add to Cart</button>
    `;
    storeList.appendChild(listItem);
  });
}
function renderCart() {
  const cartList = document.querySelector('.cart--item-list');
  const totalElement = document.querySelector('.total-number');
  cartList.innerHTML = '';
  state.cart.forEach(cartItem => {
    const listItem = document.createElement('li');
    listItem.classList.add('cart-item');

    // Create image
    const image = document.createElement("img");
    image.setAttribute("src", `assets/icons/${cartItem.id}.svg`);
    image.setAttribute("alt", cartItem.name);
    listItem.appendChild(image)

    // Create item name
    const itemName = document.createTextNode(cartItem.name);
    listItem.appendChild(itemName);

    // Create buttons and quantity display    
    const quantity = document.createElement('span');
    quantity.setAttribute('class', 'quantity');
    quantity.appendChild(document.createTextNode(`${cartItem.quantity}`));
    

    const buttonRemove = document.createElement("button");
      buttonRemove.setAttribute("class", "quantity-btn remove-btn center");
      buttonRemove.setAttribute("id", cartItem.id);
      buttonRemove.addEventListener("click", () => removeFromCart(cartItem.id));

      const buttonAdd = document.createElement("button");
      buttonAdd.setAttribute("class", "quantity-btn add-btn center");
      buttonAdd.setAttribute("id", cartItem.id);
      buttonAdd.addEventListener("click", () => addToCart(cartItem.id));


    listItem.appendChild(buttonRemove);
    listItem.appendChild(quantity);
    listItem.appendChild(buttonAdd);

    cartList.appendChild(listItem);
  });

  // Calculate and display the total
  const total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalElement.textContent = `£${total.toFixed(2)}`;
}

// Function to add an item to the cart
function addToCart(itemId) {
  const selectedItem = state.items.find(item => item.id === itemId);

  if (selectedItem) {
    const cartItem = state.cart.find(item => item.id === itemId);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      state.cart.push({ ...selectedItem, quantity: 1 });
    }

    renderCart();
  }
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
  const cartItemIndex = state.cart.findIndex(item => item.id === itemId);

  if (cartItemIndex !== -1) {
    const cartItem = state.cart[cartItemIndex];

    if (cartItem.quantity > 0) {
      cartItem.quantity--;
    }

    if (cartItem.quantity === 0) {
      state.cart.splice(cartItemIndex, 1);
    }

    renderCart();
  }
}

// Initial rendering
renderStore();
renderCart();