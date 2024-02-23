import { populateItems } from "./populate.js"

export function updateCart(state) {
    updateTotalPrice(state.cart)
    populateItems('.item-list.cart--item-list', state)
}

function updateTotalPrice(cartItems) {
    const totalContainer = document.querySelector('.total-number')
    if (totalContainer)
    {
        const total = calculateTotal(cartItems);
        totalContainer.textContent = `£${total.toFixed(2)}`
    }
}

function calculateTotal(cartItems) {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
}