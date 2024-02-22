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

const store = document.querySelector('.item-list')
const tempArray = []

const displayItems = () => {
  state.items.forEach(item => {
    const card = document.createElement('li')
    card.classList = 'store--item-list'

    const div = document.createElement('div')
    div.classList = 'store--item-icon'
    card.appendChild(div)
    const img = document.createElement('img')
    div.appendChild(img)
    const button = document.createElement('button')

    button.id = `${item.id}`
    button.textContent = 'Add to cart'
    button.addEventListener('click', e => {
      e.preventDefault();
      tempArray.push(state.items.find(item => item.id === e.target.id))
      addToCart()
    })

    img.src = `/assets/icons/${item.id}.svg`
    // Build HTML together
    card.appendChild(button)
    store.appendChild(card)
  })
}

displayCart = () => {
  // Creating HTML structure for cart
  const cartContainer = document.querySelector('.cart--item-list-container')
  const cart = document.querySelector('.cart--item-list')
  cartContainer.appendChild(cart)
}


const addToCart = () => {
  
  tempArray.forEach(item => { 
    if (!item.hasOwnProperty('quantity')){
      console.log(item)
      item['quantity'] = 1; 
    }
  })

  // Create quantities in objects
  formatCart()
  // To get products with quantity over 2 in same line
  removeCart()

  state.cart.forEach(item => {
      const cartCard = document.createElement('li')
      cartCard.classList = 'cart--item-list li'
      const cart = document.querySelector('.cart--item-list')
      cart.appendChild(cartCard)
      
      // Creating elements for product in cart
      const img = document.createElement('img')
      img.classList = 'cart--item-icon'
      img.src = `/assets/icons/${item.id}.svg`
      const name = document.createElement('p')
      name.textContent = item.name
      const rmBtn = document.createElement('button')
      rmBtn.textContent = '-'
      rmBtn.classList = 'quantity-btn remove-btn center'
      const quantity = document.createElement('span')
      quantity.classList = 'quantity-text center'
      quantity.textContent = item.quantity
      const addBtn = document.createElement('button')
      addBtn.classList = 'quantity-btn add-btn center'
      addBtn.textContent = '+'
      addBtn.addEventListener('click', e => {
        e.preventDefault();
        item.quantity++
        quantity.textContent = item.quantity
      })
      rmBtn.addEventListener('click', e => {
        e.preventDefault();
        item.quantity--
        quantity.textContent = item.quantity
        console.log(item.quantity)
      })
      
      cartCard.id = `cart-item-${item.id}`

      cartCard.appendChild(img)
      cartCard.appendChild(name)
      cartCard.append(rmBtn)
      cartCard.append(quantity)
      cartCard.append(addBtn)

      const containerForItem = document.querySelector('.cart--item-list')
      containerForItem.appendChild(cartCard)
  })
}


const removeItem = (item) => {
  const index = state.cart.indexOf(item);
  if (index !== -1) {
    state.cart.splice(index, 1);
    const cartItem = document.querySelector(`#cart-item-${item.id}`);
    if (cartItem) {
      cartItem.remove();
    }
  }
  console.log(state.cart)
}

const removeCart = () => {
  const containerForItem = document.querySelector('.cart--item-list li')
  if (containerForItem){
    const cartItems = document.querySelectorAll('.cart--item-list li');
    cartItems.forEach(item => {
      item.remove();
    });
  }
}

const formatCart = () => {
  var occurences = {}
  tempArray.forEach(item => {
    const id = item.id;
    if (occurences[id]){
      occurences[id].quantity += item.quantity
    } else {
      occurences[id] = {...item}
    }
    state.cart = Object.values(occurences)
  })
}


displayItems()
displayCart()
