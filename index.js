const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "unknown"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "berry"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "berry"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "fruit"
    }
  ],
  cart: []
};

function createProduct(product){
  return `<li>
  <div class="store--item-icon">
    <img src="assets/icons/${product.id}.svg" alt="${product.name}" />
  </div>
  <button onclick="addToCart('${product.id}')">Add to cart</button>
</li>
`
}

function createProductInCart(product){
  return `<li>
  <img
    class="cart--item-icon"
    src="assets/icons/${product.id}.svg"
    alt="${product.name}"
  />
  <p>${product.name}</p>
  <button class="quantity-btn remove-btn center" onclick="removeFromCart('${product.id}')">-</button>
  <span class="quantity-text center">${product.quantity}</span>
  <button class="quantity-btn add-btn center" onclick="addToCart('${product.id}')">+</button>
</li>
`
}

function generateProducts(products){
  let result = ``
  products.forEach(product => {
    result += createProduct(product)
  });
  document.getElementsByClassName('item-list store--item-list')[0].innerHTML = result
}

function generateProductsInCart(products){
  let result = ``
  let resultPrice = 0
  products.forEach(product => {
    result += createProductInCart(product)
    resultPrice += product.price * product.quantity
  });
  document.getElementsByClassName('item-list cart--item-list')[0].innerHTML = result
  document.getElementsByClassName('total-number')[0].innerHTML = `£${resultPrice.toFixed(2)}`
}

function addToCart(productId){
  const product = state.items.find(x => x.id === productId)
  if(state.cart.includes(product)){
    const productInCart = state.cart.find(x => x.id === productId)
    productInCart.quantity += 1
  } else {
    state.cart.push(product)
    state.cart[state.cart.length - 1].quantity = 1
  }
  generateProductsInCart(state.cart)
}

function removeFromCart(productId){
  const product = state.items.find(x => x.id === productId)
  if(product.quantity === 1){
    state.cart.splice(state.cart.findIndex(x => x.id === productId), 1)
  } else {
    const productInCart = state.cart.find(x => x.id === productId)
    productInCart.quantity -= 1
  }
  generateProductsInCart(state.cart)
}

function sortBy(type){
  if(type === 'Vegetables'){
    const vegetables = state.items.filter((x) => x.type.includes('vegetable'))
    generateProducts(vegetables)
  } else if (type === 'Fruit'){
    const fruits = state.items.filter((x) => x.type.includes('fruit'))
    generateProducts(fruits)
  } else if (type === 'Berries'){
    const berries = state.items.filter((x) => x.type.includes('berry'))
    generateProducts(berries)
  } else if (type === 'All'){
    generateProducts(state.items)
  }
}

generateProducts(state.items)