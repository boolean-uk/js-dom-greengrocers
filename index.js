const state = {
  items: [
    {id: "001-beetroot", name: "beetroot", price: 0.35, type: "vegetable"},
    {id: "002-carrot", name: "carrot", price: 0.35, type: "vegetable"},
    {id: "003-apple", name: "apple", price: 0.35, type: "fruit"},
    {id: "004-apricot", name: "apricot", price: 0.35, type: "fruit"},
    {id: "005-avocado", name: "avocado", price: 0.35, type: "fruit"},
    {id: "006-bananas", name: "bananas", price: 0.35, type: "fruit"},
    {id: "007-bell-pepper", name: "bell pepper", price: 0.35, type: "vegetable"},
    {id: "008-berry", name: "berry", price: 0.35, type: "fruit"},
    {id: "009-blueberry", name: "blueberry", price: 0.35, type: "fruit"},
    {id: "010-eggplant", name: "eggplant", price: 0.35, type: "vegetable"}
  ],
  cart: []
};

let displayFruits = true
let displayVegetables = true 

const filters = {
  'Fruit': true,
  'Vegetable': true
}

//Main
renderFilterButtons()
renderStore()


//Functions
function renderFilterButtons() {
  const filterDiv = document.querySelector('.filters');

  const fruitFilterButton = document.createElement('button');
  updateFilterButtonClass(filters.Fruit, fruitFilterButton);
  fruitFilterButton.innerText = 'Fruits';
  fruitFilterButton.addEventListener('click', () => {
    updateFilter('Fruit', fruitFilterButton);
  });
  filterDiv.append(fruitFilterButton);

  const vegetableFilterButton = document.createElement('button');
  updateFilterButtonClass(filters.Vegetable, vegetableFilterButton);
  vegetableFilterButton.innerText = 'Vegetables';
  vegetableFilterButton.addEventListener('click', () => {
    updateFilter('Vegetable', vegetableFilterButton);
  });
  filterDiv.append(vegetableFilterButton);
}

function updateFilter(filtername, button){
  filters[filtername] = !filters[filtername]

  updateFilterButtonClass(filters[filtername], button);

  renderStore()
}

function updateFilterButtonClass(display, button) {
  button.classList.remove('add-btn', 'remove-btn');
  if (display) {
    button.classList.add('add-btn');
  } else {
    button.classList.add('remove-btn');
  }
}


function renderStore() {
  const storeUl = document.querySelector('.store--item-list');
  storeUl.innerHTML = '';

  state.items.forEach(item => {
    const itemType = item.type.charAt(0).toUpperCase() + item.type.slice(1);
    if (!filters[itemType]) {
      return;
    }

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

function renderCart(){
  const cartUl = document.querySelector('.cart--item-list')
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

function convert(shopItem){
  return {
    id: shopItem.id,
    name: shopItem.name,
    price: shopItem.price,
    quantity: 1
  }
}

function updateTotal(){
  const totalSpan = document.querySelector('.total-number')
  let sum = 0

  state.cart.forEach(element => {
    sum += element.price * element.quantity
  });

  totalSpan.innerText =  "£"+sum.toFixed(2)
}


