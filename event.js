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

function filterStoreItems(filterType, filterValue) {
  state.items.forEach((item) => {
    item.visible = false;
    if (item.filter[filterType] === filterValue) {
      item.visible = true;
    }
  });
  renderStore();
}

function sortStoreAlphabet(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0;
}

function sortStorePrice(a,b) {
  return a.price - b.price
}