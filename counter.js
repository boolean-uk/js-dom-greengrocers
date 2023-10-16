let counter = 1


const increase = () => ++counter
const decrease = () => --counter


const addIncreaseButton = () => {
    const increaseButton = document.createElement("button")
    increaseButton.innerText = '+'
    increaseButton.setAttribute('class', 'quantity-btn add-btn center')
    increaseButton.addEventListener('click', e => {
        const initialCounter = cart.querySelector('span[class="quantity-text center"]')
        initialCounter.remove()
        increase()
        addCounterDisplay()
    })
    cartItem.append(increaseButton)
}

const addDecreaseButton = () => {
    const decreaseButton = document.createElement("button")
    decreaseButton.innerText = '-'  
    decreaseButton.setAttribute('class', 'quantity-btn remove-btn center') 
    decreaseButton.addEventListener('click', e => {
        const initialCounter = cart.querySelector('span[class="quantity-text center"]')
        initialCounter.remove()
        decrease()
        addCounterDisplay()
    })
    cartItem.append(decreaseButton)
}

const addCounterDisplay = () => {
    const counterDisplay = document.createElement('span')
    counterDisplay.setAttribute('class', 'quantity-text center')
    counterDisplay.innerText = counter
    cartItem.append(counterDisplay)
}

const addQuantityCounter = () => {
   
    addDecreaseButton() 
    addCounterDisplay()
    addIncreaseButton()
      
}