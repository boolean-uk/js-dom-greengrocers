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
function renderItem() {
  const container = document.querySelector('.store--item-list');

  state.items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('store-item');

    const image = document.createElement('img');
    image.src = 'assets/' + item.id + '.svg';
    image.alt = item.name;

    const name = document.createElement('h3');
    name.textContent = item.name;

    const itemPrice = document.createElement('div');
    itemPrice.textContent = '£' + item.price.toFixed(2);

    const addButton = document.createElement('button');
    addButton.textContent = 'Add to Cart';
    addButton.addEventListener('click', () => {
      const cartItem = state.cart.find(cartItem => cartItem.id === item.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        state.cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        });
      }
      renderCart();
    });

    itemDiv.appendChild(image);
    itemDiv.appendChild(name);
    itemDiv.appendChild(itemPrice);
    itemDiv.appendChild(addButton);

    container.appendChild(itemDiv);
  });
}
function renderCart() {
  const cartContainer = document.querySelector('.cart--item-list');
  const totalElement = document.querySelector('.total-number');
  let total = 0;

  // Remove existing cart items
  while (cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }

  // Render items in the cart
  state.cart.forEach(cartItem => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');

    const itemName = document.createElement('span');
    itemName.textContent = cartItem.name;

    const itemQuantity = document.createElement('span');
    itemQuantity.textContent = ` x${cartItem.quantity}`;

    const plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.addEventListener('click', () => {
      cartItem.quantity++;
      renderCart();
    });

    const minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.addEventListener('click', () => {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        renderCart();
      } else {
        // Remove the item from the cart if quantity is 1
        const index = state.cart.indexOf(cartItem);
        state.cart.splice(index, 1);
        renderCart();
      }
    });

    const itemPrice = document.createElement('span');
    itemPrice.textContent = ` £${(cartItem.price * cartItem.quantity).toFixed(2)}`;

    cartItemDiv.appendChild(itemName);
    cartItemDiv.appendChild(minusButton);
    cartItemDiv.appendChild(itemQuantity);
    cartItemDiv.appendChild(plusButton);
    cartItemDiv.appendChild(itemPrice);
    cartContainer.appendChild(cartItemDiv);

    total += cartItem.price * cartItem.quantity;
  });

  // Update total
  totalElement.textContent = `£${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderItem();
  renderCart();
});