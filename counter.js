let counter = 0

const increase = () => ++counter
const decrease = () => --counter


const addIncreaseButton = () => {
    const increaseButton = document.createElement("button")
    increaseButton.innerText = '+'
    increaseButton.addEventListener('click', e => increase())
    cartItem.append(increaseButton)
}

const addDecreaseButton = () => {
    const decreaseButton = document.createElement("button")
    decreaseButton.innerText = '-'  
    decreaseButton.addEventListener('click', e => decrease())
    cartItem.append(decreaseButton)
}

const addCounterDisplay = () => {
    const counterDisplay = document.createElement('span')
    counterDisplay.innerText = counter
    cart.append(counterDisplay)
}