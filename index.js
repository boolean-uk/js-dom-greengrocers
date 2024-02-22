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
  cart: [
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      quantity: 4
    }
  ]
};

const AddToCart = (item) => {
  // check if item is in cart
    const itemIsInCart = state.cart.findIndex((i) => i.id === item.id)
    if (itemIsInCart === -1){
      // add if empty
      const toCart = item
      toCart.quantity = 1
      state.cart.push(toCart)
      
    } else {
      // increase quantity
      state.cart[itemIsInCart].quantity++
      
    }
    // render cart again after updating it and calculate total price again
    updateCart();
    CartTotal();
}

const RemoveFromCart = (item) => {
  // check if item is in cart
  const itemIsInCart = state.cart.findIndex((i) => i.id === item.id)
  if (itemIsInCart === -1) {
    console.log('Nothing to remove')
  } else {
    state.cart[itemIsInCart].quantity--
    if (state.cart[itemIsInCart].quantity <= 0) {
      state.cart.splice(itemIsInCart, 1);
    }
  }
  updateCart();
  CartTotal();
}

const CartTotal = () => {
  let sum = 0.0
  state.cart.forEach((item) => {
    sum += item.price * item.quantity
  })
  document.getElementsByClassName("total-number")[0].innerHTML = `£${sum.toFixed(2)}`
}

CartTotal()