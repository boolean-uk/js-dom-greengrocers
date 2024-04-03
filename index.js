const storeList = document.querySelector('#store')
const cartItems = document.querySelector('#cart')
const storeItemList = document.querySelector('.store--item-list')
const cartItemList = document.querySelector('.cart--item-icon') // Added period before class name
const cartList = document.querySelector('#cartItemList') // Added # before ID

document.addEventListener('DOMContentLoaded', function () {    
    const items = state.items
    const cart = state.cart
    storeItems(items)
})

function storeItems(items) {
    storeItemList.innerHTML = ''

    items.forEach(item => {
        const listItem = document.createElement('li')
        const itemIcon = document.createElement('img')
        const addToCartButton = document.createElement('button')

        const filename = `${item.id}.svg`
    
        itemIcon.src = `./assets/icons/${filename}` // Removed "skkl"
        itemIcon.alt = item.name

        addToCartButton.classList.add('add-to-cart-btn')
        addToCartButton.textContent = 'Add to cart'

        addToCartButton.addEventListener('click', function() {
           addItemToCart(item)
        })

        listItem.appendChild(itemIcon)
        listItem.appendChild(addToCartButton)

        storeItemList.appendChild(listItem)
    })
}

function addItemToCart(item) {
    const newItem = document.createElement('li')
    const imgCart = document.createElement('img')
    const pCart = document.createElement('p')
    const removeButton = document.createElement('button')
    const quantitySpan = document.createElement('span')
    const addButton = document.createElement('button')

    imgCart.classList.add('cart--item-icon')
    imgCart.src = `./assets/icons/${item.id}.svg`
    imgCart.alt = item.name

    pCart.textContent = item.name

    removeButton.classList.add('quantity-btn', 'remove-btn', 'center')
    removeButton.textContent = '-'
    removeButton.addEventListener('click', decreaseButton)

    quantitySpan.classList.add('quantity-text', 'center')
    quantitySpan.textContent = '1'

    addButton.classList.add('quantity-btn', 'add-btn', 'center')
    addButton.textContent = '+'
    addButton.addEventListener('click', increaseButton)

    newItem.appendChild(imgCart)
    newItem.appendChild(pCart)
    newItem.appendChild(removeButton)
    newItem.appendChild(quantitySpan)
    newItem.appendChild(addButton)

    cartList.appendChild(newItem)

    removeButton.addEventListener('click', function () {
        decreaseButton()
    })

    addButton.addEventListener('click', function () {
        increaseButton()
    })
}

function increaseButton() {
    const counterId = document.getElementById('counter')
    const currentValue = parseInt(counterId.textContent)
    counterId.textContent = currentValue + 1
}

function decreaseButton() {
    const counterId = document.getElementById('counter')
    const currentValue = parseInt(counterId.textContent)
    if (currentValue > 1) {
        counterId.textContent = currentValue - 1
    }
}

const addButton = document.querySelector('.add-btn')
const removeButton = document.querySelector('.remove-btn')

const numberOfItems = state.cart.length // Use state.cart.length to loop over items

for (let i = 0; i < numberOfItems; i++) {
    addItemToCart(state.cart[i])
}
