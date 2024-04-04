function updateTotalMoney() {
    const totalMoneyElement = document.querySelector('.total-number');
    let totalPrice = 0;

    // Iterate through each item in the cart
    const cartItems = document.querySelectorAll('.cart--item-list li');
    cartItems.forEach(cartItem => {
        const itemName = cartItem.querySelector('p').textContent;
        const itemQuantity = parseInt(cartItem.querySelector('.quantity-text').textContent);
        const item = state.items.find(item => item.name === itemName);
        if (item) {
            totalPrice += item.price * itemQuantity;
        }
    });

    totalMoneyElement.textContent = `£${totalPrice.toFixed(2)}`;
}


//This function adds Items to CArt
function addItemToCart(item) {
    const cartList = document.querySelector('#cartItemList'); 

    const newItem = document.createElement('li');
    const imgCart = document.createElement('img');
    const pCart = document.createElement('p');
    const removeButton = document.createElement('button');
    const quantitySpan = document.createElement('span');
    const addButton = document.createElement('button');

    imgCart.classList.add('cart--item-icon');
    imgCart.src = `./assets/icons/${item.id}.svg`;
    imgCart.alt = item.name;

    pCart.textContent = item.name;

    removeButton.classList.add('quantity-btn', 'remove-btn', 'center');
    removeButton.textContent = '-';
    removeButton.addEventListener('click', function() {
        decreaseButton(newItem);
        updateTotalMoney();
    });

    quantitySpan.classList.add('quantity-text', 'center');
    quantitySpan.textContent = '1';

    addButton.classList.add('quantity-btn', 'add-btn', 'center');
    addButton.textContent = '+';
    addButton.addEventListener('click', function() {
        increaseButton(quantitySpan);
        updateTotalMoney();
    });

    newItem.appendChild(imgCart);
    newItem.appendChild(pCart);
    newItem.appendChild(removeButton);
    newItem.appendChild(quantitySpan);
    newItem.appendChild(addButton);

    cartList.appendChild(newItem);
}

function increaseButton(quantitySpan) {
    let currentValue = parseInt(quantitySpan.textContent) || 0;
    currentValue++;
    quantitySpan.textContent = currentValue.toString();
}

function decreaseButton(newItem) {
    const counterElement = newItem.querySelector('.quantity-text');
    let currentValue = parseInt(counterElement.textContent) || 0;
    if (currentValue > 1) {
        currentValue--;
        counterElement.textContent = currentValue.toString();
    } else {
        newItem.remove(); 
    }
}

document.addEventListener('DOMContentLoaded', function () {    
    const items = state.items;
    const cart = state.cart;
    storeItems(items);
});

function storeItems(items) {
    const storeItemList = document.querySelector('.store--item-list')

    storeItemList.innerHTML = ''

    items.forEach(item => {
        const listItem = document.createElement('li')
        const itemIcon = document.createElement('img')
        const addToCartButton = document.createElement('button')

        const filename = `${item.id}.svg`
    
        itemIcon.src = `./assets/icons/${filename}`
        itemIcon.alt = item.name

        addToCartButton.classList.add('add-to-cart-btn')
        addToCartButton.textContent = 'Add to cart'

        addToCartButton.addEventListener('click', function() {
            addItemToCart(item)
            updateTotalMoney();
        })

        listItem.appendChild(itemIcon)
        listItem.appendChild(addToCartButton)

        storeItemList.appendChild(listItem)
    })
}

const numberOfItems = state.cart.length

for (let i = 0; i < numberOfItems; i++) {
    addItemToCart(state.cart[i])
}

updateTotalMoney();
