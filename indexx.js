const itemUl = document.querySelector('.store--item-list')
const cartUl = document.querySelector('.cart--item-list')
const state = {
  items: [
    {
      id: '001-beetroot',
      name: 'beetroot',
      price: 0.35
    },
    {
      id: '002-carrot',
      name: 'carrot',
      price: 0.35
    },
    {
      id: '003-apple',
      name: 'apple',
      price: 0.35
    },
    {
      id: '004-apricot',
      name: 'apricot',
      price: 0.35
    },
    {
      id: '005-avocado',
      name: 'avocado',
      price: 0.35
    },
    {
      id: '006-bananas',
      name: 'bananas',
      price: 0.35
    },
    {
      id: '007-bell-pepper',
      name: 'bell pepper',
      price: 0.35
    },
    {
      id: '008-berry',
      name: 'berry',
      price: 0.35
    },
    {
      id: '009-blueberry',
      name: 'blueberry',
      price: 0.35
    },
    {
      id: '010-eggplant',
      name: 'eggplant',
      price: 0.35
    }
  ],

  cart: []
}

function renderStoreItems() {
  for (let i = 0; i < state.items.length; i++) {
    const StoreItem = state.items[i]
    console.log(StoreItem)
    const alt = StoreItem.name
    const StoreList = document.createElement('li')
    itemUl.append(StoreList)

    const div = document.createElement('div')
    div.setAttribute('class', 'store--item-icon')
    StoreList.append(div)

    const img = document.createElement('img')
    img.setAttribute('src', `assets/icons/${StoreItem.id}.svg`)
    img.setAttribute('alt', alt)
    div.append(img)

    const AddToCartButton = document.createElement('button')
    AddToCartButton.innerText = `Add To cart`
    StoreList.append(AddToCartButton)
    AddToCartButton.addEventListener('click', () => {
      console.log("I've been clicked")
      state.cart.push(StoreItem)
      renderCartItems()
      addToCart()
    })
  }
}
function renderCartItems() {
  cartUl.innerHTML = ''
  for (let j = 0; j < state.cart.length; j++) {
    const cartList = document.createElement('li')
    cartUl.append(cartList)
    const cartItem = state.cart[j]

    const cartImg = document.createElement('img')
    cartImg.setAttribute('class', 'cart--item-icon')
    cartImg.setAttribute('src', `assets/icons/${cartItem.id}.svg`)
    cartImg.setAttribute('alt', cartItem.name)
    cartList.append(cartImg)

    const name = document.createElement('p')
    name.innerText = cartItem.name
    cartList.append(name)

    const minusButton = document.createElement('button')
    minusButton.setAttribute('class', 'quantity-btn remove-btn center')
    minusButton.innerText = '-'
    cartList.append(minusButton)

    const quantity = document.createElement('span')
    quantity.setAttribute('class', 'quantity-text center')
    quantity.innerText = cartItem.quantity

    cartList.append(quantity)
    const plusButton = document.createElement('button')
    plusButton.setAttribute('class', 'quantity-btn add-btn center')
    plusButton.innerText = '+'
    cartList.append(plusButton)
  }
}
const addToCart = (item) => {
  const copyStore = Object.assign({}, item);

  // First, check if the item exist in the cart.
  for (let x = 0; x < state.cart.length; x++) {
    if (copyStore.id === state.cart[x].id) {
      // If the item exist, then increase it by 1.
      state.cart[x].quantity++;
      renderCartItems();
      // return null;
    }
  }}
renderStoreItems()
