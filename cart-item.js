const populateCartItemList = () => { state.cart.forEach(item => {

    const cartItem = document.createElement('li')
    cartItemList.append(cartItem)

    const cartItemImage = document.createElement('img')
    cartItemImage.setAttribute('src', `./assets/icons/${item.id}.svg`)
    cartItem.append(cartItemImage)

    const cartItemName = document.createElement('p')
    cartItem.append(cartItemName)
    cartItemName.innerText = item.name

    addQuantityCounter()
})

}