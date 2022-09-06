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

// const setState = (updatedState) => {
//   Object.keys(updatedState).forEach(prop => state[prop] = updatedState[prop])
//   console.log(state);
//   render();
// }

const renderStoreItemList = () => {
  const itemList = document.querySelector('.item-list');
  itemList.innerHTML = '';
  renderStoreItemListElements(itemList);
  }

const renderStoreItemListElements = (itemList) => {
  state.items.forEach(item => {
    console.log(item.id);
    const storeItemList = document.createElement('li'); // List item is created
    itemList.append(storeItemList);
    const storeItemIcon = document.createElement('div'); // Icon is created
    storeItemIcon.className = 'store--item-icon';
    storeItemIcon.innerHTML = `<img src="assets/icons/${item.id}.svg" alt="beetroot" />`
    storeItemList.append(storeItemIcon);

    const storeItemButton = document.createElement('button'); // Button is created
    storeItemButton.innerHTML = 'Add to cart';
    storeItemButton.addEventListener('click', (event) => { // Button event
      event.preventDefault();
      state.cart.push(item);
      console.log(state.cart[state.cart.indexOf(item)].itemQuantity = 1);
      renderCartItemList(item);
      updateTotalPrice()
      console.log(state.cart[state.cart.indexOf(item)])
    })
    storeItemList.append(storeItemButton);
})}

const renderCartItemList = () => {
  console.log(state.cart.length)
  const itemList = document.querySelector('.cart--item-list');
  itemList.innerHTML = '';  // Remove existing cart items
  state.cart.forEach(cartItem => { // Loop over cart to render your cart items
  const cartItemList = document.createElement('li'); // List item is created
  itemList.append(cartItemList);

  const cartItemListImg = document.createElement('img') // image to display on the cart
  cartItemListImg.setAttribute('class', 'cart--item-icon')
  cartItemListImg.setAttribute('src', `assets/icons/${cartItem.id}.svg`);
  cartItemListImg.setAttribute('class', 'cart--item-icon')

  const cartItemListText = document.createElement('p'); // Text to display on the cart
  cartItemListText.innerHTML = cartItem.name

  const cartItemListRemove = document.createElement('button'); // Remove button for cart items
  cartItemListRemove.setAttribute('class', 'quantity-btn remove-btn center')
  cartItemListRemove.innerHTML = '-'
  cartItemListRemove.addEventListener('click', () => {
    console.log('minus button clicked');
    cartItem.itemQuantity--;
    if (cartItem.itemQuantity === 0) {
      state.cart.splice(state.cart.indexOf(cartItem), 1);
      console.log(state.cart.indexOf(cartItem))
    }
    renderCartItemList()
    updateTotalPrice()
  })

  const cartItemListQuantityText = document.createElement('span'); // Quantity to display on the cart
  cartItemListQuantityText.setAttribute('class', 'quantity-text center');
  cartItemListQuantityText.innerHTML = cartItem.itemQuantity;

  const cartItemListAdd = document.createElement('button'); // Add button for cart items
  cartItemListAdd.setAttribute('class', 'quantity-btn remove-btn center')
  cartItemListAdd.innerHTML = '+'
  cartItemListAdd.addEventListener('click', () => {
    console.log('plus button clicked');
    cartItem.itemQuantity++;
    renderCartItemList()
    updateTotalPrice()
  })



  cartItemList.append(cartItemListImg, cartItemListText, cartItemListRemove, cartItemListQuantityText, cartItemListAdd);
  })
}

const updateTotalPrice = () => { 
 const totalPrice = document.querySelector('.total-number')
 let totalPriceText = 0
 console.log(totalPriceText)
 for (item in state.cart) {
  totalPriceText += (state.cart[item].itemQuantity * state.cart[item].price) 
  console.log(totalPriceText)
 }
 totalPrice.innerHTML = '£' + totalPriceText.toFixed(2)
return totalPriceText

}



const init = () => { 
  console.log("init");
  renderStoreItemList()
}

init()