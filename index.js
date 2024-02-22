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

function storeItemElement(item) {
  const itemElement = document.createElement('div')
  itemElement.classList.add('item')

  const imageElement = document.createElement('img')
  imageElement.src = `assets/${item.id}.jpg`
}

//Renders the store section of the webpage
function renderStore() {

  state.items.forEach(item => {
    //crates a list tag by the name of product
    const product = document.createElement('li')
    //Creates an img tag for the use of images in the store 
    const image = document.createElement('img')
    image.classList.add('store--item-icon')
    image.src = `assets/icons/${item.id}.svg`
    product.appendChild(image)

    //Creates a button element which will be used to add to cart
    const addToCart = document.createElement('button')
    addToCart.classList.add('button')
    addToCart.innerText = 'Add to cart'
    addToCart.addEventListener('click', () => addToCartFunc(item))
    product.appendChild(addToCart)
    storeUl.append(product)
  })
  const filterByFruit = document.createElement('button')
  filterByFruit.classList.add('button')
  filterByFruit.innerText = 'Filter fruit'
  filterByFruit.addEventListener('click', () => renderFruitStore())

  const filterByVeg = document.createElement('button')
  filterByVeg.classList.add('button')
  filterByVeg.innerText = 'Filter vegatbles'
  filterByVeg.addEventListener('click', () => renderVegStore())

  storeUl.appendChild(filterByFruit)
  storeUl.appendChild(filterByVeg)
}
renderStore()




//Renders the FRUIT store section of the webpage
function renderFruitStore() {
    let fItems = filterByFruitFunc()
  fItems.forEach(item => {
    //crates a list tag by the name of product
    const product = document.createElement('li')
    //Creates an img tag for the use of images in the store 
    const image = document.createElement('img')
    image.classList.add('store--item-icon')
    image.src = `assets/icons/${item.id}.svg`
    product.appendChild(image)

    //Creates a button element which will be used to add to cart
    const addToCart = document.createElement('button')
    addToCart.classList.add('button')
    addToCart.innerText = 'Add to cart'
    addToCart.addEventListener('click', () => addToCartFunc(item))
    product.appendChild(addToCart)
    storeUl.append(product)
  })
  const returnBtn = document.createElement('button')
  returnBtn.classList.add('button')
  returnBtn.innerText = 'return'
  returnBtn.addEventListener('click', () => restoreStore())

  
  storeUl.appendChild(returnBtn)
}

//Renders the VEGETABLES store section of the webpage
function renderVegStore() {
  let fItems = filterByVegFunc()
fItems.forEach(item => {
  //crates a list tag by the name of product
  const product = document.createElement('li')
  //Creates an img tag for the use of images in the store 
  const image = document.createElement('img')
  image.classList.add('store--item-icon')
  image.src = `assets/icons/${item.id}.svg`
  product.appendChild(image)

  //Creates a button element which will be used to add to cart
  const addToCart = document.createElement('button')
  addToCart.classList.add('button')
  addToCart.innerText = 'Add to cart'
  addToCart.addEventListener('click', () => addToCartFunc(item))

  product.appendChild(addToCart)
  storeUl.append(product)
})
const returnBtn = document.createElement('button')
returnBtn.classList.add('button')
returnBtn.innerText = 'return'
returnBtn.addEventListener('click', () => restoreStore())

storeUl.appendChild(returnBtn)
}

function restoreStore() {
  clearStore()
  renderStore()
}

function filterByVegFunc() {
  let vegItems = []
  state.items.forEach(item => {
    if(item.name === "bell pepper" || item.name === "eggplant" || item.name === "avocado" || item.name === "carrot" || item.name === "beetroot") {
      vegItems.push(item)
    }
    clearStore()
  })
  return vegItems
}

function filterByFruitFunc() {
  let fruitItems = []
  state.items.forEach(item => {
    if(item.name === "apricot" || item.name === "berry" || item.name === "blueberry" || item.name === "bananas" || item.name === "apricot" || item.name === "apple") {
      fruitItems.push(item)
    }
    clearStore()
  })
  return fruitItems
}

function clearStore() {

    storeUl.innerHTML = '';
}




function addToCartFunc(item) {
  const itemInCart = state.cart.find(existing => existing.id === item.id)

  if(itemInCart) {
    itemInCart.quantity++
  } else {
    const addItem = convert(item)
    state.cart.push(addItem)
  }
  renderCart();
}

function removeFromCartFunc(item) {
  //  const itemInCart = state.cart.find(existingItem => existingItem.id === item.id)
    const itemInCartIndex = state.cart.findIndex(existingItem => existingItem.id === item.id)
  
    if (itemInCartIndex !== -1) { // Check if item is in the cart
      const itemInCart = state.cart[itemInCartIndex]
  
    if(itemInCart.quantity > 1) {
      itemInCart.quantity--
    } else {
      state.cart.splice(itemInCartIndex)
    }

      renderCart()

    }
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
    removeButton.addEventListener('click', () => removeFromCartFunc(item))
    product.appendChild(removeButton)

    const quantityText = document.createElement('p')
    quantityText.classList.add('quantity-text')
    quantityText.innerText = item.quantity
    product.appendChild(quantityText)

    const addButton = document.createElement('button')
    addButton.classList.add('add-btn')
    addButton.innerText = '+'
    addButton.addEventListener('click', () => addToCartFunc(item))
    product.appendChild(addButton)

    cartUl.appendChild(product)
  })

  totalSpan.textContent = '£' +calculateTotalPrice().toFixed(2)
}


function CreateStoreInventory(items) {
  const storeInventory = []
  items.array.forEach(element => {
    storeInventory.push(element.id)
  });
  return storeInventory
}

function calculateTotalPrice() {
  let total = 0

  state.cart.forEach(item => {
    total += item.price * item.quantity
      const discountCount = Math.floor(item.quantity / 5);
      const discountedPrice = calculateDiscount(item) * discountCount;
      total += total - discountedPrice;
  })

  return total

}

function calculateDiscount(item) {
  let discountPrice = 0
      discountPrice += 3 * item.price
  return discountPrice
}

