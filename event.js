function addToCart(storeItem) {
  const matchingItem = state.cart.find(
    (cartItem) => cartItem.id === storeItem.id
  );
  // console.log('matchingItem :>> ', matchingItem);
  if (matchingItem) {
    storeItem.quantity = matchingItem.quantity + 1;
  } else {
    storeItem.quantity = 1;
    state.cart.push(storeItem);
  }

  // console.log('state.cart :>> ', state.cart);

  renderCart();
  renderTotal();
}
