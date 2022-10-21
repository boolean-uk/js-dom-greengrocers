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


function renderStoreIcons() {
  const storeItemList = document.querySelector('.store--item-list');
  storeItemList.innerHTML = '';
  for (let item of state.items) {
    const li = document.createElement('li');
    storeItemList.appendChild(li);

    const div = document.createElement('div');
    div.setAttribute('class', 'store--item-icon');
    li.appendChild(div);

    const img = document.createElement('img');
    img.setAttribute('src', `assets/icons/${item.id}.svg`);
    img.setAttribute('alt', item.name);
    div.appendChild(img);

    const button = document.createElement('button');
    button.innerText = 'Add to card';
    li.appendChild(button);

    button.addEventListener("click", function() {
      addFruitToCartState(item)
      renderUserCart()
    })
  }
}

function addFruitToCartState(item) {
  const newCartItem = {
    name: item.name,
    price: item.price,
    img: `assets/icons/${item.id}.svg`
  }

  state.cart.push(newCartItem)
}

function renderUserCart(){
  const cartItemList = document.querySelector('.cart--item-list');
  cartItemList.innerHTML = '';
  for (let item of state.cart) {
    const li = document.createElement('li');
    cartItemList.appendChild(li);

    const img = document.createElement('img');
    img.setAttribute('src', `assets/icons/${item.id}.svg`);
    img.setAttribute('alt', item.name);
    img.setAttribute('class', "cart--item-icon");
    div.appendChild(img);

    const p = document.createElement('p');
    button.innerText = item.name;
    li.appendChild(p);

    removeButton

    button.addEventListener("click", function() {
      addFruitToCartState(item)
      renderUserCart()
    })
    }
}

function init() {
  renderStoreIcons();
}

init();

// FRIDAY:
// For each item in state.items:
// – render a li that replicates store-item.html
// – add an event listener to the button inside li
// – the event listener should do a few things:
//  – – call a function that adds the selected item into state.cart
//  – – call a render function that renders things for the user in cart--item-list

// MONDAY:
// Add a listeners to the cart--item-list buttons that do a few things:
// – call the function to change the quantity in state.cart (IMPORTANT: add quantity property to items)
// – call the render function to re-render the cart 
// Refactor Friday event listener to change the quantity property items instead of adding the same thing over and over again

// TUESDAY:
// Write a function to calculate overall price
// Write a render function to display it on the page
// Hook function into both Friday and Monday event listeners
// Final bug hunt






