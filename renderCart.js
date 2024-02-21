export function renderCart(state) {
    const cartItemList = document.querySelector('.cart--item-list');
    cartItemList.innerHTML = ''; // Clear previous content
  
    let total = 0;
  
    state.cart.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img class="cart--item-icon" src="assets/icons/${item.id}.svg" alt="${item.name}" />
        <p>${item.name}</p>
        <button class="quantity-btn remove-btn center" data-id="${item.id}">-</button>
        <span class="quantity-text center">${item.quantity}</span>
        <button class="quantity-btn add-btn center" data-id="${item.id}">+</button>
      `;
      cartItemList.appendChild(listItem);
  
      total += item.price * item.quantity;
    });

    // Update total
  const totalElement = document.querySelector('.total-number');
  totalElement.textContent = `£${total.toFixed(2)}`;

  // Add event listeners for adjusting quantities
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeFromCart);
  });

  const addButtons = document.querySelectorAll('.add-btn');
  addButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
}
  