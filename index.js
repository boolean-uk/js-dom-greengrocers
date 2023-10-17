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

const itemDisplay = document.querySelector('.store--item-list')

state.items.forEach(item => {
  const newItem = document.createElement('li')
  const div = document.createElement('div')
  const img = document.createElement('img')
  const addButton = document.createElement('button')

  div.className = 'store--item-icon'
  img.src = `assets/icons/${item.id}.svg`
  img.alt = item.name
  addButton.innerText = 'Add to cart'
  
  cartCount = 0

  addButton.addEventListener('click', listener => {
    updateCart(item)
  })

  div.append(img)
  newItem.append(div, addButton)
  itemDisplay.append(newItem)
})

function updateCart(newItem) {
  if (typeof newItem === 'object') {
    let found = false
    state.cart.forEach(item => {
      if (item.id === newItem.id) {
        item.count++
        found = true
        return
      }
    })

    if (!found) {
      newItem.count = 1
      state.cart.push(newItem)
    }
  }
  

  const cartContainer = document.querySelector('.cart--item-list')
  cartContainer.textContent = ''
  state.cart.forEach(item => {
    const itemContainer = document.createElement('li')
    const image = document.createElement('img')
    const name = document.createElement('p')
    const remove = document.createElement('button')
    const quantity = document.createElement('span')
    const add = document.createElement('button')

    image.className = 'cart--item-icon'
    image.src = `assets/icons/${item.id}.svg`
    image.alt = item.name

    name.innerText = item.name

    

    remove.className = 'quantity-btn remove-btn center'
    remove.innerText = '-'
    
    remove.addEventListener('click', listener => {
      if (item.count <= 0) {
        delete state.cart[state.cart.indexOf(item)]
        updateCart()
      }
      
      item.count--
      quantity.innerText = item.count

    })

    add.className = 'quantity-btn add-btn center'
    add.innerText = '+'

    add.addEventListener('click', listener => {
      item.count++
      quantity.innerText = item.count
    })

    quantity.innerText = item.count

    itemContainer.append(image, name, remove, quantity, add)
    cartContainer.append(itemContainer)
  })
}
