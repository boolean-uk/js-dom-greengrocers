const storeUl = document.querySelector('.store--item-list');
const cartUl = document.querySelector('.cart--item-list')
const totalSpan = document.querySelector('.total-number')

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

//Main
renderStore()

//Functions
function renderStore(){
  state.items.forEach(item => {
    const product = document.createElement('li');       
  
    const image = document.createElement('img');
    image.classList.add('store--item-icon');
    image.src = `assets/icons/${item.id}.svg`;
    product.appendChild(image);
  
    const addButton = document.createElement('button');
    addButton.classList.add('button');
    addButton.innerText = 'Add to Cart';
    addButton.addEventListener('click', () => addToCart(item));

    product.append(addButton);
  
    storeUl.append(product);
  });
}

function addToCart(item) {
  const existingItem = state.cart.find(element => element.id === item.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    const newItem = convert(item);
    state.cart.push(newItem);
  }

  renderCart();
}


function convert(shopItem){
  return {
    id: shopItem.id,
    name: shopItem.name,
    price: shopItem.price,
    quantity: 1
  }
}

function renderCart(){
  cartUl.innerHTML = '';

  state.cart.forEach(item => {
    const product = document.createElement('li')

    const image = document.createElement('img')
    image.classList.add('cart--item-icon')
    image.src = `assets/icons/${item.id}.svg`;
    product.appendChild(image)

    const name = document.createElement('p')
    name.innerText = item.name
    product.appendChild(name)

    const removeButton = document.createElement('button')
    removeButton.classList.add('remove-btn')
    removeButton.innerText = '-'
    removeButton.addEventListener('click', () => removeFromCart(item))
    product.appendChild(removeButton)

    const quantityText = document.createElement('p')
    quantityText.classList.add('quantity-text')
    quantityText.innerText = item.quantity
    product.appendChild(quantityText)

    const addButton = document.createElement('button')
    addButton.classList.add('add-btn')
    addButton.innerText = '+'
    addButton.addEventListener('click', () => addToCart(item))
    product.appendChild(addButton)

    cartUl.appendChild(product)
  })

  updateTotal()
}

function removeFromCart(item) {
  const existingItem = state.cart.find(element => element.id === item.id);

  if (existingItem) {
    existingItem.quantity--;

    if (existingItem.quantity <= 0) {
      const index = state.cart.indexOf(existingItem);
      state.cart.splice(index, 1);
    }
  }

  renderCart();
}

function updateTotal(){
  let sum = 0

  state.cart.forEach(element => {
    sum += element.price * element.quantity
  });

  totalSpan.innerText =  "£"+sum.toFixed(2)
}


