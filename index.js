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

// Root elements
const cartUL = document.querySelector('.cart--item-list')
const storeUL = document.querySelector('.store--item-list')
const totalPrice = document.querySelector(".total-number")

function renderStore() {
  storeUL.innerHTML = ''

  for (let index = 0; index < state.items.length; index++) {
    
    const item = state.items[index]
    
    //Elements
    const itemLi = document.createElement('li')
    const itemDiv = document.createElement('div')
    const itemImg = document.createElement('img')
    const itemBtn = document.createElement('button')

    //button eventlistener
    itemBtn.addEventListener('click', () => {
      addToCart(item)
    }
  )

    //Attributes to the elements
    itemDiv.setAttribute('class', 'store--item-icon')
    const imagePath = `assets/icons/${item.id}.svg`
    itemImg.setAttribute('src', imagePath)
    itemImg.setAttribute('alt', item.name)

    itemBtn.innerText = 'Add to cart'

    itemDiv.appendChild(itemImg)
    itemLi.appendChild(itemDiv)
    itemLi.appendChild(itemBtn)

    storeUL.appendChild(itemLi)

    updatePrice()

  }
}

function renderCart() {
  cartUL.innerHTML = ''
  updatePrice()


  for (let index = 0; index < state.cart.length; index++) {
    
    const item = state.cart[index]
    
    //Elements
    const itemLi = document.createElement('li')
    const itemImg = document.createElement('img')
    const itemName = document.createElement('p')
    const itemRemoveBtn = document.createElement('button')
    const itemSpan = document.createElement('span')
    const itemAddBtn = document.createElement('button')

    //Attributes to the elements
    itemImg.setAttribute('class', 'cart--item-icon')
    //const imagePath = 
    itemImg.setAttribute('src', `assets/icons/${item.id}.svg`)
    itemImg.setAttribute('alt', item.name)
    itemSpan.setAttribute('class', 'quantity-text')

    //button eventlistener
    itemRemoveBtn.addEventListener('click', () => {
      if(item.count > 1){
        item.count--
      }else{
        item.count--
        state.cart.splice(state.cart.indexOf(item), 1)
      }
      renderCart()
      }
    )

    itemAddBtn.addEventListener('click', () => {
      itemSpan.innerText = item.count++
      renderCart()
      }
    )


    //innertext
    itemName.innerText = item.name
    itemRemoveBtn.innerText = '-'
    itemSpan.innerText = item.count
    itemAddBtn.innerText = '+'

    itemLi.appendChild(itemImg)
    itemLi.appendChild(itemName)
    itemLi.appendChild(itemRemoveBtn)
    itemLi.appendChild(itemSpan)
    itemLi.appendChild(itemAddBtn)

    cartUL.appendChild(itemLi)

    updatePrice()

  }
}

function addToCart(product) {
  if (state.cart.includes(product)) {
    
    itemInCart = state.cart.find(item => item.id === product.id)

    itemInCart.count++
  } else {
    product.count = 1
    state.cart.push(product)
  }

  renderCart()
  updatePrice()
}

function updatePrice() {
  let total = 0

  
  for (let index = 0; index < state.cart.length; index++) {
    total += state.cart[index].price * state.cart[index].count
  }

  totalPrice.innerText = '£' + total.toFixed(2)
}

function main() {
  renderStore()
  renderCart()
}

main()

