let sum = 0

const calculateSum = () => {

  state.cart.forEach(item =>
    {sum += item.price 
    return sum} )
    console.log(sum)
    total.innerText = `£${sum}`
}