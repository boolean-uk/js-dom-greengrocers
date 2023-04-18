const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      quantity: 0,
      type: "Veg"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.50,
      quantity: 0,
      type: "Veg"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.65,
      quantity: 0,
      type: "Fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.15,
      quantity: 0,
      type: "Fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 1.35,
      quantity: 0,
      type: "Fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.10,
      quantity: 0,
      type: "Fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.10,
      quantity: 0,
      type: "Fake Fruit"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.05,
      quantity: 0,
      type: "Fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.50,
      quantity: 0,
      type: "Fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.40,
      quantity: 0,
      type: "Fake Fruit"
    }
  ],
  cart: []
};
const store = document.querySelector('.store--item-list')
const total = document.querySelector('.total-number')
const options = document.querySelector('#fruit')
const order = document.querySelector('#order')

order.addEventListener('input', () => {
  if (order.value === "a_z") {
    aToZ()
      if (options.value === "All") {
    storeListRender()
  }
  if (options.value === "Fruit") {
    storeListFruitRender()
  }
  if (options.value === "Veg") {
    storeListVegRender()
  }
  if (options.value === "Fake") {
    storeListFakeRender()
  }
  }
  if (order.value === "z_a") {
    zToA()
      if (options.value === "All") {
    storeListRender()
  }
  if (options.value === "Fruit") {
    storeListFruitRender()
  }
  if (options.value === "Veg") {
    storeListVegRender()
  }
  if (options.value === "Fake") {
    storeListFakeRender()
  }
  }
  if (order.value === "highToLow") {
    highToLow()
      if (options.value === "All") {
    storeListRender()
  }
  if (options.value === "Fruit") {
    storeListFruitRender()
  }
  if (options.value === "Veg") {
    storeListVegRender()
  }
  if (options.value === "Fake") {
    storeListFakeRender()
  }
  }
  if (order.value === "lowToHigh") {
    lowToHigh()
    if (options.value === "All") {
      storeListRender()
    }
    if (options.value === "Fruit") {
      storeListFruitRender()
    }
    if (options.value === "Veg") {
      storeListVegRender()
    }
    if (options.value === "Fake") {
      storeListFakeRender()
    }
  }
})

options.addEventListener('input', () => {
  if (options.value === "All") {
    storeListRender()
  }
  if (options.value === "Fruit") {
    storeListFruitRender()
  }
  if (options.value === "Veg") {
    storeListVegRender()
  }
  if (options.value === "Fake") {
    storeListFakeRender()
  }
})

const totalCost = () => {
  let allAdded = 0
  let totalPence = state.cart.forEach( (obj) => {
    allAdded += obj.price * 100 * obj.quantity
  })
  let pounds = Math.floor(allAdded / 100)
  let pence =  allAdded % 100
  if (pence < 10) {
    pence = '0' + pence
  }
  total.innerText = `£${pounds}.${pence}`
}

const storeListVegRender = () => {
  store.innerHTML = ''
  for (let i = 0; i < state.items.length; i++) {
    const storeItem = state.items[i]
    if (storeItem.type === "Veg") {

      const storeLi = document.createElement('li')
      const storeDiv = document.createElement('div')
      storeDiv.classList.add('store--item-icon')
      
      const storeImg = document.createElement('img')
      const imageSrc = storeItem.id
      storeImg.setAttribute('src', `assets/icons/${imageSrc}.svg`)
      storeImg.setAttribute('alt', `${storeItem.name}`)
      storeDiv.append(storeImg)
      
      const storeBtn = document.createElement('button')
      storeBtn.innerText = 'Add to cart'
      
      storeBtn.addEventListener('click', () => {
        storeItem.quantity += 1
        let finder = state.cart.some ((obj) => {
          if (obj.name === storeItem.name) {
            return true
          }
          else {
            return false
          }
        })
        if (finder === true) {
          cartRender()
          totalCost()
        }
        else {
          state.cart.push(storeItem)
          cartRender()
          totalCost()
        }
      })
      
      storeLi.append(storeDiv, storeBtn)
      store.append(storeLi)
    }
    }
}

const storeListFakeRender = () => {
  store.innerHTML = ''
  for (let i = 0; i < state.items.length; i++) {
    const storeItem = state.items[i]
    if (storeItem.type === "Fake Fruit") {

      const storeLi = document.createElement('li')
      const storeDiv = document.createElement('div')
      storeDiv.classList.add('store--item-icon')
      
      const storeImg = document.createElement('img')
      const imageSrc = storeItem.id
      storeImg.setAttribute('src', `assets/icons/${imageSrc}.svg`)
      storeImg.setAttribute('alt', `${storeItem.name}`)
      storeDiv.append(storeImg)
      
      const storeBtn = document.createElement('button')
      storeBtn.innerText = 'Add to cart'
      
      storeBtn.addEventListener('click', () => {
        storeItem.quantity += 1
        let finder = state.cart.some ((obj) => {
          if (obj.name === storeItem.name) {
            return true
          }
          else {
            return false
          }
        })
        if (finder === true) {
          cartRender()
          totalCost()
        }
        else {
          state.cart.push(storeItem)
          cartRender()
          totalCost()
        }
      })
      
      storeLi.append(storeDiv, storeBtn)
      store.append(storeLi)
    }
    }
}

const storeListFruitRender = () => {
  store.innerHTML = ''
  for (let i = 0; i < state.items.length; i++) {
    const storeItem = state.items[i]
    if (storeItem.type === "Fruit") {

      const storeLi = document.createElement('li')
      const storeDiv = document.createElement('div')
      storeDiv.classList.add('store--item-icon')
      
      const storeImg = document.createElement('img')
      const imageSrc = storeItem.id
      storeImg.setAttribute('src', `assets/icons/${imageSrc}.svg`)
      storeImg.setAttribute('alt', `${storeItem.name}`)
      storeDiv.append(storeImg)
      
      const storeBtn = document.createElement('button')
      storeBtn.innerText = 'Add to cart'
      
      storeBtn.addEventListener('click', () => {
        storeItem.quantity += 1
        let finder = state.cart.some ((obj) => {
          if (obj.name === storeItem.name) {
            return true
          }
          else {
            return false
          }
        })
        if (finder === true) {
          cartRender()
          totalCost()
        }
        else {
          state.cart.push(storeItem)
          cartRender()
          totalCost()
        }
      })
      
      storeLi.append(storeDiv, storeBtn)
      store.append(storeLi)
    }
    }
}

const storeListRender = () => {
  store.innerHTML = ''
  for (let i = 0; i < state.items.length; i++) {
    const storeItem = state.items[i]

    const storeLi = document.createElement('li')
    const storeDiv = document.createElement('div')
    storeDiv.classList.add('store--item-icon')
    
    const storeImg = document.createElement('img')
    const imageSrc = storeItem.id
    storeImg.setAttribute('src', `assets/icons/${imageSrc}.svg`)
    storeImg.setAttribute('alt', `${storeItem.name}`)
    storeDiv.append(storeImg)
    
    const storeBtn = document.createElement('button')
    storeBtn.innerText = 'Add to cart'

    storeBtn.addEventListener('click', () => {
      storeItem.quantity += 1
      let finder = state.cart.some ((obj) => {
        if (obj.name === storeItem.name) {
          return true
        }
        else {
          return false
        }
      })
      if (finder === true) {
        cartRender()
        totalCost()
      }
      else {
        state.cart.push(storeItem)
        cartRender()
        totalCost()
      }
    })
    
    storeLi.append(storeDiv, storeBtn)
    store.append(storeLi)
  }
}

const cart = document.querySelector('.cart--item-list')

const cartRender = () => {
  cart.innerHTML = ''
  for (let i = 0; i < state.cart.length; i++) {
    const cartLi = document.createElement('li')
    
    const cartImg = document.createElement('img')
    const imageSrc = state.cart[i].id
    cartImg.setAttribute('src', `assets/icons/${imageSrc}.svg`)
    cartImg.setAttribute('alt', `${state.cart[i].name}`)
    cartImg.classList.add('cart--item-icon')
    
    const cartP = document.createElement('p')
    cartP.innerText = `${state.cart[i].name}`
    
    const cartRemoveBtn = document.createElement('button')
    cartRemoveBtn.innerText = '-'
    cartRemoveBtn.classList.add('quantity-btn', 'remove-btn', 'center')

    cartRemoveBtn.addEventListener('click', () => {
      if (state.cart[i].quantity > 0) {  
        state.cart[i].quantity -= 1
        cartRender()
        totalCost()
      }
      if (state.cart[i].quantity === 0) {
        state.cart.splice(i, 1)
        cartRender()
        totalCost()
      }
    })
    
    const cartSpan = document.createElement('span')
    cartSpan.innerText = `${state.cart[i].quantity}`
    cartSpan.classList.add('quantity-text', 'center')
    
    const cartaddBtn = document.createElement('button')
    cartaddBtn.innerText = '+'
    cartaddBtn.classList.add('quantity-btn', 'add-btn', 'center')

    cartaddBtn.addEventListener('click', () => {
      state.cart[i].quantity += 1
      cartRender()
      totalCost()
    })
    
    
    cartLi.append(cartImg, cartP, cartRemoveBtn, cartSpan, cartaddBtn)
    cart.append(cartLi)
  }
}

const highToLow = () => {
  state.items.sort((a, b) => {
    return b.price - a.price
  })
}

const lowToHigh = () => {
  state.items.sort((a, b) => {
    return a.price - b.price
  })
}

const aToZ = () => {
  state.items.sort ((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return -1;
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return 1;
    return 0;
  })
}

const zToA = () => {
  state.items.sort ((a, b) => {
    if (b.name.toLocaleLowerCase() < a.name.toLocaleLowerCase()) return -1;
    if (b.name.toLocaleLowerCase() > a.name.toLocaleLowerCase()) return 1;
    return 0;
  })
}

storeListRender()