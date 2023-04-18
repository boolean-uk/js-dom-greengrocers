
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


const cartList = document.querySelector('.item-list.cart--item-list');


for (let i = 0; i < state.items.length; i++) {
  const productInfo = state.items[i];
  const productName = productInfo.name;

  const productList = document.querySelector('.item-list.store--item-list');
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
    const selectedItem = state.cart.find(productInfo => productInfo.name === productName);

    if (selectedItem) {
      selectedItem.quantity++;
      selectedItem.element.querySelector('.cart--item-quantity').innerText = selectedItem.quantity;

      calTotal()
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
          selectedListItem.remove();
          state.cart = state.cart.filter(item => item !== cartItem);
        }
        calTotal()
      });

      state.cart.push(cartItem);

      calTotal()
    }

  });
}

      //calculate total
function calTotal() {
  const myCurrentTotal = document.querySelector('.total-number');
  let total = 0;
  state.cart.forEach(myItem => {
    const itemPrice = state.items.find(productInfo => productInfo.name === myItem.name).price;
    total += itemPrice * myItem.quantity;
  });
  myCurrentTotal.innerText = `£ ${total.toFixed(2)}`
}

 
