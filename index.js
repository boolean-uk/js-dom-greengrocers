document.addEventListener('DOMContentLoaded', () => {
  const state = {
    items: [
      { id: "001-beetroot",
        name: "beetroot", 
        price: 0.35
      },

      { id: "002-carrot", 
        name: "carrot", 
        price: 0.35 
      },

      { id: "003-apple", 
        name: "apple", 
        price: 0.35 
      },

      { id: "004-apricot", 
        name: "apricot", 
        price: 0.35 
      },

      { id: "005-avocado", 
        name: "avocado", 
        price: 0.35 
      },

      { id: "006-bananas", 
        name: "bananas", 
        price: 0.35 
      },
      
      { id: "007-bell-pepper", 
        name: "bell pepper", 
        price: 0.35 
      },
      
      { id: "008-berry", 
        name: "berry", 
        price: 0.35 
      },
      
      { id: "009-blueberry", 
        name: "blueberry", 
        price: 0.35 
      },

      { id: "010-eggplant", 
        name: "eggplant", 
        price: 0.35 
      }
    ],
    cart: [],
  }

  //Getting elements from DOM
  const storeItems = document.querySelector('.store--item-list')
  const cartItems = document.querySelector('.cart--item-list')
  
  //render store items 
  state.items.forEach(item => {
    storeItems.append(renderStoreItem(item))
  })

  function renderStoreItem(item) {
    const storeItem = document.createElement('li')
    storeItem.style.listStyle = 'none'

    let storeItemContainer = document.createElement('div')
    storeItemContainer.setAttribute('class', "store--item-icon")

    let storeItemImage = document.createElement('img')
    storeItemImage.setAttribute('src', 'assets/icons/' + item.id + '.svg')

    let storeButton = document.createElement('button')
    storeButton.innerText = 'Add to cart'
    storeButton.addEventListener('click', function() {
      addToCart(item)
    })

    storeItemContainer.append(storeItemImage)
    storeItem.append(storeItemContainer)
    storeItem.append(storeButton)
    return storeItem
  }
  
  //Add to cart
  function addToCart(item) {
    state.cart.push(item)
    let number = state.cart.filter(x => x.id === item.id).length
    let DOMitem = renderCartItem(item, number)
    if (number === 1) {
      cartItems.append(DOMitem)
    } else {
      updateCartItem(item, number)
    }
    updateTotal()
  }
  
  //Function to update quantity
  function updateCartItem(item, number) {
    let itemId = document.getElementById(item.id)
    if (itemId) {
      itemId.querySelector('.quantity-text').innerText = number
    }
  }
  
  //Remove from cart
  function unrenderCartItem(item) {
    let itemId = document.getElementById(item.id)
    if (itemId) {
      itemId.remove()
    }
  }
  
  //Update total price
  function updateTotal() {
    let totalElement = document.querySelector('.total-number')
    let total = 0
    state.cart.forEach(cartItem => {
      total += cartItem.price
    })
    totalElement.innerText = total.toFixed(2)
  }
  
  //Render a cart item 
  function renderCartItem(item, number) {
    const cartItem = document.createElement('li')
    cartItem.setAttribute('id', item.id)
    cartItem.style.listStyle = 'none'

    let cartItemImg = document.createElement('img')
    cartItemImg.setAttribute('src', 'assets/icons/' + item.id + '.svg')

    let cartItemName = document.createElement('p')
    cartItemName.innerText = item.name

    let removeButton = document.createElement('button')
    removeButton.addEventListener('click', function() {
      removeFromCart(item)
    })
    let itemValue = document.createElement('span')
    let addButton = document.createElement('button')
    addButton.addEventListener('click', function() {
      addToCart(item)
    })

    removeButton.setAttribute('class', 'remove-btn')
    removeButton.innerText = '-'
    itemValue.setAttribute('class', 'quantity-text')
    itemValue.innerText = number
    addButton.setAttribute('class', 'add-btn')
    addButton.innerText = '+'

    cartItem.append(cartItemImg)
    cartItem.append(cartItemName)
    cartItem.append(removeButton)
    cartItem.append(itemValue)
    cartItem.append(addButton)
    return cartItem
  }
  
  //Removing item from cart
  function removeFromCart(item) {
    const index = state.cart.findIndex(cartItem => cartItem.id === item.id)
    if (index > -1) {
      state.cart.splice(index, 1)
      let number = state.cart.filter(x => x.id === item.id).length
      if (number === 0) {
        unrenderCartItem(item)
      } else {
        updateCartItem(item, number)
      }
      updateTotal()
    }
  }
})
