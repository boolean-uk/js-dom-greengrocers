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

let TotalCartPrice = 0;

const TotalPrice = document.querySelector('.total-number');

const renderCart = () => {
    const cartItemlist = document.querySelector('.cart--item-list');
    const allCartItems = cartItemlist.querySelectorAll('*');
    allCartItems.forEach((allCartItem) => allCartItem.remove());

    TotalCartPrice = 0; // Reset the total price

    state.cart.forEach((cart) => {
        const cartItemlist = document.querySelector('.cart--item-list');
        const cartLi = document.createElement('li');

        const svgFileName = `assets/icons/${cart.id}.svg`;
        const cartImage = document.createElement('img');
        cartImage.src = svgFileName;
        cartImage.alt = cart.name;
        cartLi.append(cartImage);

        const cartName = document.createElement('p');
        cartName.innerText = cart.name;
        cartLi.append(cartName);

        const minusButton = document.createElement('button');
        minusButton.classList.add('quantity-btn', 'remove-btn', 'center');
        minusButton.innerText = '-';
        cartLi.append(minusButton);

        const cartSpan = document.createElement('span');
        cartSpan.innerText = cart.quantity;
        cartLi.append(cartSpan);

        const addButton = document.createElement('button');
        addButton.classList.add('quantity-btn', 'add-btn', 'center');
        addButton.innerText = '+';
        cartLi.append(addButton);

        // Calculate and update the individual item price
        const itemPrice = cart.price * cart.quantity;
        TotalCartPrice += itemPrice;

        cartItemlist.append(cartLi);
        renderEventListener(addButton, minusButton, cart);
    });

    // Update TotalPrice with the new total cart price
    TotalPrice.innerText = TotalCartPrice.toFixed(2);
}; 



  const renderEventListener = (addButton, minusButton, cart) => {
    addButton.addEventListener('click', () => {
        if (cart.quantity > 0) {
            cart.quantity++;
            renderCart(); // Update the cart and total price
        }
    });

    minusButton.addEventListener('click', () => {
        if (cart.quantity > 0) {
            cart.quantity--;
            
            const index = state.cart.indexOf(cart)
            if(index === 0 && cart.quantity === 0){
              state.cart.splice(index, 1)
            }

            renderCart(); 

        }
    });
};
 
const renderStore = () => {
    const itemlist = document.querySelector('.item-list');

    state.items.forEach((item) => {
        const itemBox = document.createElement('li');

        const imageDiv = document.createElement('div');
        itemBox.classList.add('store--item-icon');

        const image = document.createElement('img');
        image.alt = item.name;
        const svgFileName = `assets/icons/${item.id}.svg`;
        image.src = svgFileName;
        imageDiv.append(image);

        const button = document.createElement('button');
        button.innerText = 'Add to cart';

        itemBox.append(imageDiv);
        itemBox.append(button);
        itemlist.append(itemBox);

        button.addEventListener('click', () => {
            const foundItem = state.cart.find((cart) => cart.id === item.id);
            if (foundItem) {
                foundItem.quantity++;
            } else {
                state.cart.push({ ...item, quantity: 1 });
            }
            renderCart(); // Update the cart and total price
        });
    });
};

renderStore();
renderCart();

