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
console.log('1', state)

//  - A user can view a selection of items in the store

function renderStoreItems() {
  for (let i = 0; i < state.items.length; i++) {
    const storeItemUl = document.querySelector('.store--item-list')
    const storeItemLi = document.createElement('li')

    const storeItemDiv = document.createElement('div')
    storeItemDiv.setAttribute('class', 'store--item-icon')

    const storeItemImg = document.createElement('img')
    const eachIconPic = state.items[i].id
    storeItemImg.setAttribute('src', `assets/icons/${eachIconPic}.svg`)

    const storeItemButton = document.createElement('button')
    storeItemButton.innerText = 'Add to cart'

    // appending
    storeItemDiv.append(storeItemImg)
    storeItemLi.append(storeItemDiv, storeItemButton)
    storeItemUl.append(storeItemLi)


    // - From the store, a user can add an item to their cart
    storeItemButton.addEventListener('click', function renderCartItems() {
      const cartItemUl = document.querySelector('.cart--item-list')

      const cartItemLi = document.createElement('li')

      const cartItemImg = document.createElement('img')
      cartItemImg.setAttribute('class', 'cart--item-icon')
      cartItemImg.setAttribute('src', `assets/icons/${eachIconPic}.svg`)

      const cartItemP = document.createElement('p')
      cartItemP.innerText = state.items[i].name

      const cartDecreaseButton = document.createElement('button')
      cartDecreaseButton.setAttribute('class', 'remove-btn')
      cartDecreaseButton.innerText = '-'

      const cartQuantityText = document.createElement('span')
      cartQuantityText.setAttribute('class', 'quantity-text')
      let cartQuantityCounter = 1
      cartQuantityText.innerText = cartQuantityCounter

      const cartIncreaseButton = document.createElement('button')
      cartIncreaseButton.setAttribute('class', 'add-btn')
      cartIncreaseButton.innerText = '+'

      // appending

      const itemObjectInCart = {
        id: state.items[i].id,
        name: state.items[i].name,
        price: state.items[i].price
      }
      state.cart.push(itemObjectInCart)
      console.log('cart items', state.cart[i], 'state items', state.items[i], 'value of i', i)
      // - If the item is already in the cart, increase the item's quantity in the cart
      // if (state.items[i] === state.cart[i]) {
      //   increaseQuantity
      //   cartItemLi.append(cartItemImg, cartItemP, cartDecreaseButton, cartQuantityText, cartIncreaseButton)
      // } else {
      //   cartItemUl.append(cartItemLi)
      //   cartItemLi.append(cartItemImg, cartItemP, cartDecreaseButton, cartQuantityText, cartIncreaseButton)

      // }
      for (let j = 0; j < state.cart.length; j++) {
        if (state.items[i].id === state.cart[j].id) {
          increaseQuantity()
        } else {
          cartItemUl.append(cartItemLi)
          cartItemLi.append(cartItemImg, cartItemP, cartDecreaseButton, cartQuantityText, cartIncreaseButton)
        }
        console.log(state.cart[j]) 

      }
           // - From the cart, a user can view and adjust the number of items in their cart
      function increaseQuantity() {
        cartQuantityCounter++
        cartQuantityText.innerText = cartQuantityCounter
      }
      cartIncreaseButton.addEventListener('click', increaseQuantity)
      //   - If an item's quantity equals zero it is removed from the cart
      // cartDecreaseButton.addEventListener('click', () => {
      //   cartQuantityCounter--
      //   cartQuantityText.innerText = cartQuantityCounter
      //   // if (cartQuantityCounter === 0) {
      //   //   state.cart.pop
      //   // }
      // })
      // - A user can view the current total in their cart
    })
  }

}
renderStoreItems()