const addIncreaseButton = (item) => {
  const increaseButton = document.createElement("button")
  increaseButton.innerText = '+'
  increaseButton.setAttribute('class', 'quantity-btn add-btn center')

  increaseButton.addEventListener('click', e => {
      item.quantity += 1
      const itemsInCart = cartItemList.querySelectorAll('li')
      itemsInCart.forEach(item => item.remove())
      populateCartItemList()  
      calculateSum()   
  })
  cartItem.append(increaseButton)
}


const addDecreaseButton = (item) => {
  const decreaseButton = document.createElement("button")
  decreaseButton.innerText = '-'  
  decreaseButton.setAttribute('class', 'quantity-btn remove-btn center') 
  decreaseButton.setAttribute('id', `${item.id}Decrease`)
  decreaseButton.addEventListener('click', (event) => {

    const t = event.target
    console.log(t)
    console.log(item.id)
    console.log(event.target.id)

      if (`${item.id}Decrease`=== event.target.id && item.quantity <= 1) {
          state.cart.splice(state.cart.indexOf(item), 1)

      } else {
          item.quantity -= 1

      }
      const itemsInCart = cartItemList.querySelectorAll('li')
      itemsInCart.forEach(item => item.remove())
      populateCartItemList() 
      calculateSum()
  })
  cartItem.append(decreaseButton)
}

const addCounterDisplay = (item) => {
  const counterDisplay = document.createElement('span')
  counterDisplay.setAttribute('class', 'quantity-text center')
  counterDisplay.innerText = item.quantity
  cartItem.append(counterDisplay)
}



const calculateSum = () => {

    let sum = 0
    state.cart.forEach(item =>
      {sum += item.price  * item.quantity
      return sum} )
      console.log(sum)
      total.innerText = `£${sum.toFixed(2)}`
  }