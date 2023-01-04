const checkIfItemIsInCart = (item) => {
    for (i = 0; i < state.cart.length; i++) {
      if (state.cart[i].name === item.name) {
        state.cart[i].quantity += 1
        return true
      } else {
        return false
      }
    }
}

const addItemToCart = (product) => {
  const newItemObj = {
    name: product.name,
    price: product.price,
    img: `assets/icons/${product.id}.svg`,
    quantity: 1
  }
  if (!checkIfItemIsInCart(product)) {
    state.cart.push(newItemObj)
  }
}