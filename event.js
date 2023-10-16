function addToCart(storeItem) {
  const matchingItem = matchToStateCart(storeItem);

  if (matchingItem) {
    storeItem.quantity = matchingItem.quantity + 1;
  } else {
    storeItem.quantity = 1;
    state.cart.push(storeItem);
  }

  renderCart();
}

function matchToStateCart(item) {
  return state.cart.find((cartItem) => cartItem.id === item.id);
}

function changeCartQuantity(cartItem, plusOrMinus) {
  const matchingItem = matchToStateCart(cartItem);

  switch (plusOrMinus) {
    case "+":
      matchingItem.quantity++;
      break;
      
    case "-":
      matchingItem.quantity === 1
        ? state.cart.splice(state.cart.indexOf(matchingItem), 1)
        : matchingItem.quantity--;
      break;
  }

  renderCart();
}

function filterCartItems() {
  console.log(state.cart);
}

filterCartItems()