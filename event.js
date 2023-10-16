function addToCart(storeItem) {
  const matchingItem = matchToSTATECart(storeItem);

  if (matchingItem) {
    storeItem.quantity = matchingItem.quantity + 1;
  } else {
    storeItem.quantity = 1;
    STATE.cart.push(storeItem);
  }

  renderCart();
}

function matchToSTATECart(item) {
  return STATE.cart.find((cartItem) => cartItem.id === item.id);
}

function changeCartQuantity(cartItem, plusOrMinus) {
  const matchingItem = matchToSTATECart(cartItem);

  switch (plusOrMinus) {
    case "+":
      matchingItem.quantity++;
      break;

    case "-":
      matchingItem.quantity === 1
        ? STATE.cart.splice(STATE.cart.indexOf(matchingItem), 1)
        : matchingItem.quantity--;
      break;
  }

  renderCart();
}

function filterStoreItems(filterType, filterValue) {
  STATE.items.forEach((item) => {
    item.visible = false;
    if (item.filter[filterType] === filterValue) {
      item.visible = true;
    }
  });
  renderStore();
}

function sortAlpha(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function sortStoreItems(sortType) {
  switch (sortType) {
    case "aToZ":
      STATE.items.sort(sortAlphabetAsc);
      break;
    case "zToA":
      STATE.items.sort(sortAlphabetDesc);
      break;
    case "priceAsc":
      STATE.items.sort(sortPriceAsc);
      break;
    case "priceDesc":
      STATE.items.sort(sortPriceDesc);
      break;
  }

  renderStore();
}

function sortAlphabetAsc(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  return sortAlpha(nameA, nameB);
}

function sortAlphabetDesc(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  return sortAlpha(nameB, nameA);
}

function sortPriceAsc(a, b) {
  return a.price - b.price;
}

function sortPriceDesc(a, b) {
  return b.price - a.price;
}

function resetSort(params) {
  STATE.items.sort((a, b) => {
    return sortAlpha(a.id, b.id);
  });

  const sort = STORE_FILTER_SORT.querySelector("#store-sort");
  sort.value = "";

  renderStore();
}

function resetFilter() {
  STATE.items.forEach((item) => (item.visible = true));

  const filter = STORE_FILTER_SORT.querySelector("#store-filter");
  filter.value = "";

  renderStore();
}
