const cartItems = (item) => {
    return `<li class="cart--item" item-id="${item.id}">
    <img
      class="cart--item-icon"
      src="assets/icons/${item.id}.svg"
      alt="${item.name}"
    />
    <p>${item.name}</p>
    <button class="quantity-btn remove-btn center">-</button>
    <span class="quantity-text center">${item.quantity}</span>
    <button class="quantity-btn add-btn center">+</button>
  </li>`
}

const createCart = (cart) => {
    return cart.map(p => cartItems(p))
}

const updateCart = () => {
    document.getElementsByClassName("cart--item-list")[0].innerHTML =
    createCart(state.cart).join("")

    const itemsinCart = document.querySelectorAll('.cart--item');

    itemsinCart.forEach((cartItem) => {
        const addBtn = cartItem.querySelector('.add-btn')
        addBtn.addEventListener('click', () => {
            const itemId = cartItem.getAttribute('item-id')
            let itemObject
            state.items.forEach((item) => {
                if (item.id === itemId){
                    itemObject = item
                } 
            })
            AddToCart(itemObject)
        })
        const removeBtn = cartItem.querySelector('.remove-btn')
        removeBtn.addEventListener('click', () => {
            const itemId = cartItem.getAttribute('item-id')
            let itemObject
            state.items.forEach((item) => {
                if (item.id === itemId){
                    itemObject = item
                }
            })
            RemoveFromCart(itemObject)
        })
    })
}

updateCart()