const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 1.35,
      type: "vegetables"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "vegetables"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruits"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 7.35,
      type: "vegetables"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 3.67,
      type: "fruits"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 9.35,
      type: "fruits"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "vegetables"
    },
  /*new id */
    {
      id: "012- dragon-fruit",
      name: "dragon-fruit",
      price: 1.35,
      type: "fruits"
    },

    {
      id: "011-melon",
      name: "melon",
      price: 1.35,
      type: "fruits"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 10.35,
      type: "fruits"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "fruits"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 20.35,
      type: "fruits"
    },
    {
      id: "013-passion-fruits",
      name: "passion-fruits",
      price: 20.35,
      type: "fruits"
    }
  ],
  cart: []
};

const cartList = document.querySelector('.item-list.cart--item-list');
const productList = document.querySelector('.item-list.store--item-list');

for (let i = 0; i < state.items.length; i++) {
  const productInfo = state.items[i];
  const productName = productInfo.name;

  const productItem = document.createElement('li');
  productList.append(productItem);

  const productDiv = document.createElement('div');
  productDiv.setAttribute('class', 'store--item-icon');

  const productImage = document.createElement('img');
  productImage.src = `assets/icons/${productInfo.id}.svg`;
  productImage.setAttribute('alt', `${productName}`);

  productDiv.append(productImage);

  const buttonAddtoCart = document.createElement('button');
  buttonAddtoCart.innerText = "Add to cart";
  productItem.append(productDiv, buttonAddtoCart);

  buttonAddtoCart.addEventListener('click', function (event) {
    let selectedItem = null;
    for (let j = 0; j < state.cart.length; j++) {
      const item = state.cart[j];
      if (item.name === productName) {
        selectedItem = item;
      }
    }

    if (selectedItem) {
      selectedItem.quantity++;
      selectedItem.element.querySelector('.cart--item-quantity').innerText = selectedItem.quantity;
      calTotal();
    } else {

        const selectedListItem = document.createElement('li');
        selectedListItem.setAttribute('class', 'cart--item');

        const selectedProductIcon = document.createElement('img');
        selectedProductIcon.src = `assets/icons/${productInfo.id}.svg`;
        selectedProductIcon.className = 'cart--item-icon';
        selectedProductIcon.alt = `${productName}`;

        const selectedProductName = document.createElement('p');
        selectedProductName.innerText = productName;

        const selectedButtonRemove = document.createElement('button');
        selectedButtonRemove.setAttribute('class', 'quantity-btn remove-btn center');
        selectedButtonRemove.innerText = '-';

        const selectedItemQuantity = document.createElement('span');
        selectedItemQuantity.setAttribute('class', 'cart--item-quantity');
        selectedItemQuantity.innerText = '1';

        const selectedButtonAdd = document.createElement('button');
        selectedButtonAdd.setAttribute('class', 'quantity-btn add-btn center')
        selectedButtonAdd.innerText = '+'

        selectedListItem.append(selectedProductIcon, selectedProductName, selectedButtonRemove, selectedItemQuantity, selectedButtonAdd);
        cartList.append(selectedListItem);

        const cartItem = {
          element: selectedListItem,
          name: productName,
          quantity: 1
        };

      selectedButtonAdd.addEventListener('click', function (event) {
        cartItem.quantity++;
        selectedItemQuantity.innerText = cartItem.quantity;
        calTotal()

      });

      selectedButtonRemove.addEventListener('click', function (event) {
        cartItem.quantity--;
        selectedItemQuantity.innerText = cartItem.quantity;
        if (cartItem.quantity === 0) {
          selectedListItem.style.display = 'none';
          for (let k = 0; k <= state.cart.length; k++) {
            if (state.cart[k] === cartItem) {
              state.cart.splice(k, 1);
              k--;
            }
          }
        }
        calTotal()
      });

      state.cart.push(cartItem);

      calTotal()
    }


  })
}

function calTotal() {
  const myCurrentTotal = document.querySelector('.total-number');
  let total = 0;
  for(let i = 0; i < state.cart.length; i++) {
    const myItem = state.cart[i];
    let itemPrice = 0;
    for(let j = 0; j < state.items.length; j++) {
      if(state.items[j].name === myItem.name) {
        itemPrice = state.items[j].price;
        break;
      }
    }
    total += itemPrice * myItem.quantity;
  }

  myCurrentTotal.innerText = `£ ${total.toFixed(2)}`
}

/*event listeners to the filter buttons to trigger the filtering*/

const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach(button => {
  button.addEventListener('click', function () {
    const filterType = button.getAttribute('data-filter');
    filterItems(filterType);
  });
});

// Define a function to filter items by type
function filterItems(type) {
  const filteredCart = state.cart.filter(cartItem => {
    for (let i = 0; i < state.items.length; i++) {
      const product = state.items[i];
      if (product.name === cartItem.name && product.type === type) {
        return true;
      }
    }
    return false;
  });

  // Clear the current cart list
  while (cartList.firstChild) {
    cartList.removeChild(cartList.firstChild);
  }

  // Rebuild the cart list with the filtered items
  for (const cartItem of filteredCart) {
    const productInfo = state.items.find(item => item.name === cartItem.name);

    const selectedListItem = document.createElement('li');
    selectedListItem.setAttribute('class', 'cart--item');

    const selectedProductIcon = document.createElement('img');
    selectedProductIcon.src = `assets/icons/${productInfo.id}.svg`;
    selectedProductIcon.src = `assets/icons/${productInfo.id}.png`;
    selectedProductIcon.className = 'cart--item-icon';
    selectedProductIcon.alt = `${productInfo.name}`;

    const selectedProductName = document.createElement('p');
    selectedProductName.innerText = productInfo.name;

    const selectedButtonRemove = document.createElement('button');
    selectedButtonRemove.setAttribute('class', 'quantity-btn remove-btn center');
    selectedButtonRemove.innerText = '-';

    const selectedItemQuantity = document.createElement('span');
    selectedItemQuantity.setAttribute('class', 'cart--item-quantity');
    selectedItemQuantity.innerText = cartItem.quantity;

    const selectedButtonAdd = document.createElement('button');
    selectedButtonAdd.setAttribute('class', 'quantity-btn add-btn center')
    selectedButtonAdd.innerText = '+';

    selectedListItem.append(selectedProductIcon, selectedProductName, selectedButtonRemove, selectedItemQuantity, selectedButtonAdd);
    cartList.append(selectedListItem);

    // Add event listeners for increment and decrement buttons
    selectedButtonAdd.addEventListener('click', function (event) {
      cartItem.quantity++;
      selectedItemQuantity.innerText = cartItem.quantity;
      calTotal();
    });

    selectedButtonRemove.addEventListener('click', function (event) {
      cartItem.quantity--;
      selectedItemQuantity.innerText = cartItem.quantity;
      if (cartItem.quantity === 0) {
        selectedListItem.style.display = 'none';
        for (let k = 0; k < state.cart.length; k++) {
          if (state.cart[k] === cartItem) {
            state.cart.splice(k, 1);
            k--;
          }
        }
      }
      calTotal();
    });
  }

  calTotal();
}


