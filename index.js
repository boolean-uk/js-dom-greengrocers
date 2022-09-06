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

function setupShop() {
  const storeItems = document.querySelector('.store--item-list')

  state.items.forEach(item => {
    const storeListItem = document.createElement('li')
    storeListItem.innerHTML = `
      <li>
        <div class="store--item-icon">
          <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
        </div>
        <button id="${item.id}">Add to cart</button>
      </li>
    `
    storeItems.appendChild(storeListItem)
    document.getElementById(item.id).addEventListener('click', function () {
      addItemToCart(this.id)
    })
  });
}

function addItemToCart(itemId) {
  const shoppingItem = state.items.find(({ id }) => id === itemId)
  state.cart = [...state.cart, shoppingItem]
  updateCartView()
}

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function updateCartView() {
  const cartList = document.querySelector('.cart--item-list')
  cartList.innerHTML = ''
  state.cart.forEach(item => {
    const cartItem = document.createElement('li')

    cartItem.innerHTML = `<img src="assets/icons/${item.id}.svg">${capitalizeFirstLetter(item.name)}`
    cartList.appendChild(cartItem)
  })
}

setupShop()