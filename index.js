function populateStore(items) {
  const ul = document.querySelector('.store--item-list')

  for (const item of items) {
    const li = document.createElement('li')
    const div = document.createElement('div')
    div.classList.add('store--item-icon')
  
    const img = document.createElement('img')
    img.src = `assets/icons/${item.id}.svg`
    img.alt = item.name
  
    const button = document.createElement('button')
    button.addEventListener("click", function () {
      addToCart(item)
    })
    button.textContent = 'add to cart'
  
    div.appendChild(img)
    li.appendChild(div)
    li.appendChild(button)
  
    ul.appendChild(li)
  }
}

function refreshCart() {
  const ul = document.querySelector('.cart--item-list')
  ul.innerHTML = ''

  for (const item of state.cart) {
    const existingItem = ul.querySelector(`[data-id="${item.id}"]`);

    if (!existingItem) {
      const li = document.createElement('li')

      // Image
      const img = document.createElement('img')
      img.classList.add('cart--item-icon')
      img.src = `assets/icons/${item.id}.svg`
      img.alt = item.name

      // Paragraph
      const p = document.createElement('p')
      p.textContent = item.name.charAt(0).toUpperCase() + item.name.slice(1)

      // Removebutton
      const button1 = document.createElement('button')
      button1.classList.add('quantity-btn', 'remove-btn', 'center')
      button1.addEventListener("click", function () {
        removeFromCart(item)
      })
      button1.innerText = '-'

      // Count
      const span = document.createElement('span')
      span.classList.add('quantity-text', 'center')
      span.innerText = state.cart.filter(obj => obj.id === item.id).length

      // Add button
      const button2 = document.createElement('button')
      button2.classList.add('quantity-btn', 'add-btn', 'center')
      button2.addEventListener("click", function () {
        addToCart(item)
      })
      button2.innerText = '+'

      li.appendChild(img)
      li.appendChild(p)
      li.appendChild(button1)
      li.appendChild(span)
      li.appendChild(button2)
      li.dataset.id = item.id;

      ul.appendChild(li)
    } else {
      const span = existingItem.querySelector('.quantity-text')
      span.innerText = state.cart.filter(obj => obj.id === item.id).length
    }
  }

  const cost = document.querySelector(".total-number")
  cost.innerText = getCost().toFixed(2)
}

function addToCart(item) {
  console.log('Adding item to cart', item)
  state.cart.push(item)
  refreshCart()
}

function removeFromCart(item) {
  console.log('Removing item from cart', item)
  state.cart.splice(state.cart.indexOf(item), 1)
  refreshCart()
}

function getCost() {
  let sum = 0
  for (const item of state.cart) {
    sum += item.price
  }
  return sum
}

function main() {
  populateStore(state.items)
  refreshCart()
}

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
}

main()