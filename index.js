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

const imgArray = ['001-beetroot.svg', '002-carrot.svg', '003-apple.svg', '004-apricot.svg', '005-avocado.svg', '006-bananas.svg', '007-bell-pepper.svg', '008-berry.svg', '009-blueberry.svg', '010-eggplant.svg']

const storeItemList = document.querySelector('.store--item-list')
const cartItemList = document.querySelector('.cart--item-list')
const total = document.querySelector('.total-number')
let cartQuantity = 1

function addItemToStore() {
  state.items.forEach((item, index) => {
    cartItemList.innerHTML = ''
    const storeItem = document.createElement('li')
    const storeItemDiv = document.createElement('div')
    const storeItemImage = addImage(item, index)
    const addToCartButton = makeAddToCartButton(item, index)

    storeItemDiv.classList.add('store--item-icon')

    storeItem.append(storeItemDiv)
    storeItemDiv.append(storeItemImage)
    storeItem.append(addToCartButton)

    storeItemList.append(storeItem)
  });
}

addItemToStore()

function addImage(item, index) {
  const storeItemImage = document.createElement('img')
  storeItemImage.setAttribute('alt', item.name)
  storeItemImage.setAttribute('src', './assets/icons/' + imgArray[index])

  return storeItemImage
}

function makeAddToCartButton(item, index) {
  const addToCartButton = document.createElement('button')
  addToCartButton.innerText = 'Add to cart'
  addToCartButton.addEventListener('click', () => addItemToCart(item, index))

  return addToCartButton
}

function addItemToCart(item, index) {
  const cartItem = document.createElement('li')
  const cartImage = addImage(item, index)
  const cartItemName = document.createElement('p')
  const minusButton = makeAddOrRemoveCartButton()
  const plusButton = makeAddOrRemoveCartButton()
  const quantity = document.createElement('span')

  cartImage.classList.add('cart--item-icon')
  cartItemName.innerText = item.name
  minusButton.classList.add('remove-btn')
  minusButton.innerText = '-'
  plusButton.classList.add('add-btn')
  plusButton.innerText = '+'
  quantity.classList.add('quantity-text')
  quantity.classList.add('center')
  quantity.innerText = cartQuantity  

  cartItem.append(cartImage)
  cartItem.append(cartItemName)
  cartItem.append(minusButton)
  cartItem.append(quantity)
  cartItem.append(plusButton)

  state.cart.push(item)

  console.log(state.cart)
  cartItemList.append(cartItem)
}

function makeAddOrRemoveCartButton() {
  const addButton = document.createElement('button')
  addButton.classList.add('quantity-btn')
  addButton.classList.add('center')

  return addButton
}