

//STORE - RENDER ITEMS

const populateStoreItemList = (array) => {array.forEach(item => {

    const storeItem = document.createElement('li')
    storeItem.setAttribute('id', `${item.name}`)
    storeItemList.append(storeItem)

    const storeItemImage = document.createElement('img')
    storeItemImage.setAttribute('src', `./assets/icons/${item.id}.svg`)
    storeItemImage.setAttribute('alt', `item.name`)
    storeItem.append(storeItemImage)

    const addToCart = document.createElement('button')
    addToCart.innerText = 'Add to cart'
    storeItem.append(addToCart)
    addToCart.addEventListener('click', () => {

    const checkIfInCart = state.cart.find((cartItem) =>  cartItem.name === item.name)
      
      if (!checkIfInCart) { 
          state.cart.push(item)  
        } else {
          checkIfInCart.quantity += 1   
        }
        removePreviousCartContent()
        populateCartItemList()  
    }
    ) 

})
    
}

//CART - RENDER ITEMS

let cartItem
 
const populateCartItemList = () => {state.cart.forEach(item => {
    cartItem = document.createElement('li')
    cartItemList.append(cartItem)

    const cartItemImage = document.createElement('img')
    cartItemImage.setAttribute('src', `./assets/icons/${item.id}.svg`)
    cartItem.append(cartItemImage)

    const cartItemName = document.createElement('p')
    cartItem.append(cartItemName)
    cartItemName.innerText = item.name
    calculateSum()
    addQuantityCounter(item)

})

}



const addQuantityCounter = (item) => {
  

    addDecreaseButton(item)
    addCounterDisplay(item)
    addIncreaseButton(item)
    
  
  }
  