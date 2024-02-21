export function renderStore(state) {
    const storeItemList = document.querySelector('.store--item-list');
    storeItemList.innerHTML = ''; // Clear previous content
  
    state.items.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div class="store--item-icon">
          <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
        </div>
        <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add to cart</button>
      `;
      storeItemList.appendChild(listItem);
    });
  
    // Add event listeners for adding items to cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
    });
  }