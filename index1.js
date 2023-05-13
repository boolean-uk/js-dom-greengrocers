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


const cartItemUl = document.querySelector('.cart--item-list')

const totalPrice = document.querySelector('.total-number')
let cartQuantityCounter = 1

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


        storeItemButton.addEventListener('click', () => {
            const foundItem = state.cart.find(item => item.id === state.items[i].id)
            console.log('found?', foundItem)

            const itemObjectInCart = {
                id: state.items[i].id,
                name: state.items[i].name,
                price: state.items[i].price,
                quantity: 1
            }

            // 1) check if the item is in the cart, if so increase quantity otherwise it will be added to cart

            if (foundItem === undefined) {
                state.cart.push(itemObjectInCart)
                updatePrice()
            } else {
                increaseQuantity(foundItem)
                updatePrice()

            }
            renderCartItems()
            console.log('cart', state.cart)

        })
    }
}

function renderCartItems() {
    cartItemUl.innerHTML = ''

    for (let i = 0; i < state.cart.length; i++) {

        const cartItemLi = document.createElement('li')
        const cartQuantityText = document.createElement('span')
        const cartIncreaseButton = document.createElement('button')
        const cartDecreaseButton = document.createElement('button')
        const cartItemImg = document.createElement('img')
        const cartItemP = document.createElement('p')

        cartItemImg.setAttribute('class', 'cart--item-icon')
        const eachIconPic = state.cart[i].id

        cartItemImg.setAttribute('src', `assets/icons/${eachIconPic}.svg`)

        cartItemP.innerText = state.cart[i].name

        cartDecreaseButton.setAttribute('class', 'remove-btn')
        cartDecreaseButton.innerText = '-'

        cartQuantityText.setAttribute('class', 'quantity-text')
        cartQuantityText.innerText = state.cart[i].quantity

        cartIncreaseButton.setAttribute('class', 'add-btn')
        cartIncreaseButton.innerText = '+'

        cartItemUl.append(cartItemLi)
        cartItemLi.append(cartItemImg, cartItemP, cartDecreaseButton, cartQuantityText, cartIncreaseButton)


        cartIncreaseButton.addEventListener('click', () => {
            increaseQuantity(state.cart[i])
            renderCartItems()
        })

        cartDecreaseButton.addEventListener('click', () => {
            decreaseQuantity(state.cart[i])
            renderCartItems()
            console.log('inside', state.cart)

        })
    }
}

//- If an item's quantity equals zero it is removed from the cart

function decreaseQuantity(item) {
    item.quantity--
    updatePrice()
    if (item.quantity === 0) {
        const deletedItem = state.cart.indexOf(item)
        console.log('item', item)
        state.cart.splice(deletedItem, deletedItem)
    }
}

function increaseQuantity(item) {
    item.quantity++
    updatePrice()
}

function updatePrice() {
    let cartPrice = 0
    for (let i = 0; i < state.cart.length; i++) {
        const item = state.cart[i]
        const addingUp = item.quantity * item.price
        cartPrice += addingUp
    }
    totalPrice.innerText = cartPrice.toFixed(2)
}

// appending
renderStoreItems()