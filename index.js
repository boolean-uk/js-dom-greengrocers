document.addEventListener('DOMContentLoaded', () => {
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

          const itemIconDiv = document.createElement('div');
          itemIconDiv.classList.add('store--item-icon');
          const itemImg = document.createElement('img');
          itemImg.src = `assets/icons/${item.id}.svg`;
          itemImg.alt = item.name;
          itemIconDiv.appendChild(itemImg);

          const addButton = document.createElement('button');
          addButton.textContent = 'Add to cart';
          addButton.dataset.id = item.id;
          addButton.addEventListener('click', addToCart);

          listItem.appendChild(itemIconDiv);
          listItem.appendChild(addButton);

          storeList.appendChild(listItem);
      });
  }

  function renderCart() {
      const cartList = document.querySelector('.cart--item-list');
      cartList.innerHTML = '';
      state.cart.forEach(item => {
          const listItem = document.createElement('li');

          const itemImg = document.createElement('img');
          itemImg.classList.add('cart--item-icon');
          itemImg.src = `assets/icons/${item.id}.svg`;
          itemImg.alt = item.name;

          const itemName = document.createElement('p');
          itemName.textContent = item.name;

          const removeButton = document.createElement('button');
          removeButton.classList.add('quantity-btn', 'remove-btn', 'center');
          removeButton.textContent = '-';
          removeButton.dataset.id = item.id;
          removeButton.addEventListener('click', decreaseQuantity);

          const quantitySpan = document.createElement('span');
          quantitySpan.classList.add('quantity-text', 'center');
          quantitySpan.textContent = item.quantity;

          const addButton = document.createElement('button');
          addButton.classList.add('quantity-btn', 'add-btn', 'center');
          addButton.textContent = '+';
          addButton.dataset.id = item.id;
          addButton.addEventListener('click', increaseQuantity);

          listItem.appendChild(itemImg);
          listItem.appendChild(itemName);
          listItem.appendChild(removeButton);
          listItem.appendChild(quantitySpan);
          listItem.appendChild(addButton);

          cartList.appendChild(listItem);
      });

      renderTotal();
  }

  function renderTotal() {
      const total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      document.querySelector('.total-number').textContent = `£${total.toFixed(2)}`;
  }

  function addToCart(event) {
      const itemId = event.target.dataset.id;
      const storeItem = state.items.find(item => item.id === itemId);

      const cartItem = state.cart.find(item => item.id === itemId);
      if (cartItem) {
          cartItem.quantity++;
      } else {
          state.cart.push({ ...storeItem, quantity: 1 });
      }

      renderCart();
  }

  function increaseQuantity(event) {
      const itemId = event.target.dataset.id;
      const cartItem = state.cart.find(item => item.id === itemId);
      cartItem.quantity++;

      renderCart();
  }

  function decreaseQuantity(event) {
      const itemId = event.target.dataset.id;
      const cartItem = state.cart.find(item => item.id === itemId);
      if (cartItem.quantity > 1) {
          cartItem.quantity--;
      } else {
          state.cart = state.cart.filter(item => item.id !== itemId);
      }

      renderCart();
  }

  renderStore();
  renderCart();
});
