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

let fruitIsAlreadyInCart = false
let index = 0

function renderStoreIcons() {
  const storeItemList = document.querySelector('.store--item-list');
  storeItemList.innerHTML = ''
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
    button.innerText = 'Add to cart';
    li.appendChild(button);

    button.addEventListener("click", function() {
      addFruitToCartInState(item)
      renderUserCart()
      renderTotalPrice()
    })
  }
}

function addFruitToCartInState(item) {
  const newCartItem = {
    name: item.name,
    price: item.price,
    img: `assets/icons/${item.id}.svg`,
    quantity: 1
  }
  checkIfFruitIsAlreadyInCart(item)
  if (fruitIsAlreadyInCart) {
    state.cart[index].quantity += 1
  } else {
    state.cart.push(newCartItem)
  }
}

function checkIfFruitIsAlreadyInCart(newFruit) {
  for (i = 0; i < state.cart.length; i++) {
    if (state.cart[i].name === newFruit.name) {
      fruitIsAlreadyInCart = true;
      index = i;
      break
    } else {
      fruitIsAlreadyInCart = false
    }
  }
}

function renderUserCart(){
  const cartItemList = document.querySelector('.cart--item-list');
  cartItemList.innerHTML = '';
  for (let item of state.cart) {
    const li = document.createElement('li');
    cartItemList.appendChild(li);

    const img = document.createElement('img');
    img.setAttribute('src', item.img);
    img.setAttribute('alt', item.name);
    img.setAttribute('class', "cart--item-icon");
    li.appendChild(img);

    const p = document.createElement('p');
    p.innerText = item.name;
    li.appendChild(p);

    const removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'quantity-btn remove-btn center');
    removeButton.innerText = '-'
    li.appendChild(removeButton);

    const counterSpan = document.createElement('counterSpan');
    counterSpan.setAttribute('class', 'quantity-text center');
    counterSpan.innerText = item.quantity;
    li.appendChild(counterSpan);

    const addButton = document.createElement('button');
    addButton.setAttribute('class', 'quantity-btn add-btn center');
    addButton.innerText = '+'
    li.appendChild(addButton);

    removeButton.addEventListener("click", function() {
      if (item.quantity <= 1) {
        itemToRemove = state.cart.indexOf(item)
        state.cart.splice(itemToRemove, 1)
        fruitIsAlreadyInCart = false;
      } else {
        item.quantity -= 1
      }
      renderUserCart()
      renderTotalPrice()
    })

    addButton.addEventListener("click", function() {
      item.quantity += 1
      renderUserCart()
      renderTotalPrice()
    })
    }
}

function renderTotalPrice() {
  let totalPrice = 0

  for (item of state.cart) {
    totalPrice += item.price * item.quantity
  }

  const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });

  const totalPriceContainer = document.querySelector('.total-number')
  totalPriceContainer.innerText = currencyFormatter.format(totalPrice)
}

function init() {
  renderStoreIcons();
  renderTotalPrice();
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






