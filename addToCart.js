export function addToCart(event) {
  const itemId = event.target.dataset.id;
  const itemName = event.target.dataset.name;
  const itemPrice = parseFloat(event.target.dataset.price);
  const existingItem = state.cart.find(item => item.id === itemId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    state.cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
  }

  renderCart();
    
  }
  