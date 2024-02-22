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

const itemListUL = document.querySelector('#store .store--item-list')
//const addToCartButtons = document.querySelector('#store .store--item-button')

function renderStoreItems() {
    itemListUL.innerHTML = ''
    itemListUL.classList.add('store--item-list')

    for (let i = 0; i < state.items.length; i++) {
        const item = state.items[i]
        const itemLi = document.createElement('li')
        itemLi.setAttribute('id', item.id)
        
        const img = document.createElement('img')
        img.classList.add('store--item-icon')
        img.setAttribute('src', `assets/icons/${item.id}.svg`)
        img.setAttribute('alt', item.name)

        const button = document.createElement('button')
        button.classList.add('store--item-button')
        button.setAttribute('type', 'button')
        button.textContent = 'Add to cart'
      
        itemLi.appendChild(img)
        itemLi.appendChild(button)

        itemListUL.appendChild(itemLi)
    }
}

function renderCart() {
  cartListUL.innerHTML = ''
  cartListUL.classList.add('cart--item-list')

  for (let i = 0; i < state.cart.length; i++){
    const item = state.cart[i]
    const cartLi = document.createElement('li')
    cartLi.setAttribute('id', item.id)

    const img = document.createElement('img')
    img.classList.add('cart--item-icon')
    img.setAttribute('src', `assets/icons/${item.id}.svg`)
    img.setAttribute('alt', item.name)

    const p = document.createElement('p')
    p.textContent = item.name.charAt(0).toUpperCase() + item.name.slice(1)

    const buttonRemove = document.createElement('button')
    buttonRemove.classList.add('quantity-btn', 'remove-btn', 'center')
    buttonRemove.textContent = '-'

    const quantity = document.createElement('span')
    quantity.classList.add('quantity-text', 'center')
    quantity.textContent = item.quantity // TODO?

    const buttonAdd = document.createElement('button')
    buttoncAdd.classList.add('quantity-btn', 'add-btn', 'center')
    buttonAdd.textContent = '+'

    cartLi.appendChild(img)
    cartLi.appendChild(p)
    cartLi.appendChild(buttonRemove)
    cartLi.appendChild(quantity)
    cartLi.appendChild(buttonAdd)

    cartListUL.appendChild(cartLi)
  }
}

function registerButtonClicked() {
  const addToCartButtons = document.querySelectorAll('.store--item-button');

  addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
          const listItem = button.closest('li');
          const itemId = listItem.getAttribute('id');
          const itemToAdd = state.items.find(item => item.id === itemId);

          state.cart.push({
              ...itemToAdd,
              quantity: 1 
          });

          renderCart();
      });
  });
}


function main() {
    renderStoreItems()
    registerButtonClicked
}

main()
