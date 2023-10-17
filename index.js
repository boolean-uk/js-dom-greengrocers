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
    // ... (other items)
  ],
  cart: []
};

const renderCart = () => {
  const cartItemlist = document.querySelector('.cart--item-list');
  const allCartItems = cartItemlist.querySelectorAll('*');
  allCartItems.forEach((allCartItem) => allCartItem.remove());

  state.cart.forEach((cart) => {
    const cartItemlist = document.querySelector('.cart--item-list');
    const cartLi = document.createElement('li');

    const svgFileName = `assets/icons/${cart.id}.svg`;
    const cartImage = document.createElement('img');
    cartImage.src = svgFileName;
    cartImage.alt = cart.name;
    cartLi.append(cartImage);

    const cartName = document.createElement('p');
    cartName.innerText = cart.name;
    cartLi.append(cartName);

    const minusButton = document.createElement('button');
    minusButton.classList.add('quantity-btn', 'add-btn', 'center');
    minusButton.innerText = '-';
    cartLi.append(minusButton);

    const cartSpan = document.createElement('span');
    cartSpan.innerText = cart.quantity;
    cartLi.append(cartSpan);

    const addButton = document.createElement('button');
    addButton.classList.add('quantity-btn', 'remove-btn', 'center');
    addButton.innerText = '+';
    cartLi.append(addButton);

    cartItemlist.append(cartLi);
    renderEvenLister(addButton, minusButton, cart);
  });

};

const renderEvenLister = (addButton, minusButton, cart) => {
  addButton.addEventListener('click', () => {
    if (cart.quantity > 0) {
      cart.quantity++;
    }
    renderCart();
  });


  minusButton.addEventListener('click', () => {
    if (cart.quantity > 0) {
      cart.quantity--;
    } 
    if (cart.quantity === 0) {
      // Remove the cart item from the cart array
      const index = state.cart.indexOf(cart);
      if (index !== -1) {
        state.cart.splice(index, 1);
        //this delete the first index of the array 
      }
    }
    renderCart();
  });
  
};

const renderStore = () => {
  const itemlist = document.querySelector('.item-list');

  state.items.forEach((item) => {
    const itemBox = document.createElement('li');

    const imageDiv = document.createElement('div');
    itemBox.classList.add('store--item-icon');

    const image = document.createElement('img');
    image.alt = item.name;
    const svgFileName = `assets/icons/${item.id}.svg`;
    image.src = svgFileName;
    imageDiv.append(image);

    const button = document.createElement('button');
    button.innerText = 'Add to cart';

    itemBox.append(imageDiv);
    itemBox.append(button);
    itemlist.append(itemBox);

    button.addEventListener('click', () => {
      const foundItem = state.cart.find((cart) => cart.id === item.id);
      if (foundItem) {
        foundItem.quantity++;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    
      renderCart();
    });
    
    

  });
};

renderStore();
renderCart();
