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

const groceries = document.querySelector('.store--item-list')
const cart = document.querySelector('.cart--item-list')

function displayStore() {
  const storeItems = state.items
  for (let i = 0; i < storeItems.length; i++){
    //Create Vegetable Icon in the Store Section
    const storeItem = document.createElement('li')
    const vegetable = document.createElement('div')
    vegetable.classList.add("store--item-icon")
    const img = document.createElement('img')
    img.src = 'assets/icons/' + storeItems[i].id + '.svg'
    img.alt = storeItems[i].name

    //Create Button below each Vegetable Icon
    const button = document.createElement('button')
    button.innerText = 'Add to cart'
    button.addEventListener('click', function() {
      updateCart(storeItems[i],true)
    })

    //Append Elements to the Store Page section
    vegetable.append(img)
    storeItem.append(vegetable)
    storeItem.append(button)
    groceries.append(storeItem)
  }
  //Create Filter & Sort Buttons
  const utilityArea = document.createElement('div')
  utilityArea.classList.add('utility--grid')
  const filterButton = document.createElement('img')
  filterButton.src = 'https://cdn2.iconfinder.com/data/icons/font-awesome/1792/filter-512.png'
  filterButton.width = 50
  const sortButton = document.createElement('img')
  sortButton.src = 'https://icon-library.com/images/sort-icon-png/sort-icon-png-18.jpg'
  sortButton.width = 50

  //Append Buttons to the Store Page section
  utilityArea.append(sortButton)
  utilityArea.append(filterButton)
  groceries.before(utilityArea)
}

function updateCart(fruit, flag) {
  //If flag = true increase value, if flag = false decrease value
  const increaseValue = flag
  //Check if fruit exists in cart already
  let exists = false
  for (let i = 0; i< state.cart.length; i++) {
    if (state.cart[i].name === fruit.name){
      exists = true
      break
    }
  }
  //If fruit not in cart
  if (!exists && flag) {
    //Add fruit to cart
    state.cart.push({ name: fruit.name, quantity: 1, price: fruit.price })
    addToCart(fruit)
  } else {
    //Find fruit in cart
    const nameCollection = document.getElementsByTagName('p')
    const quantityCollection = document.getElementsByClassName('quantity-text')
    const itemsCollection = document.getElementsByClassName('cart--item-list')
    for (let i = 0; i < nameCollection.length; i++) {
      if (nameCollection[i].innerText === fruit.name){
        //If flag is true increase quantity by 1
        if (increaseValue) {
          state.cart[i].quantity++
          quantityCollection[i].innerText++
          break
        } else {
          //If flag is false decrease quantity by 1
          state.cart[i].quantity--
          quantityCollection[i].innerText--
          //If quantity reaches 0 remove from cart
          if (quantityCollection[i].innerText === '0') {
            state.cart.splice(i,1)
            itemsCollection[0].getElementsByTagName('li')[i].remove()
          }
          break
        }
      }
    }
  }
  //Update the Total Price
  let priceBox = document.getElementsByClassName("total-number")[0]
  let totalPrice = 0.0
  for (let i = 0; i < state.cart.length; i++) {
    totalPrice += state.cart[i].quantity * state.cart[i].price
  }
  priceBox.innerText = priceBox.innerText.slice(0,1) + totalPrice.toFixed(2)
}

function addToCart(fruit) {
  //Create the Entry of selected Vegetable in Cart
  const entry = document.createElement('li')
  const img = document.createElement('img')
  img.classList.add('cart--item-icon')
  img.src = 'assets/icons/' + fruit.id + '.svg'
  img.alt = fruit.name
  const name = document.createElement('p')
  name.innerText = fruit.name
  const rmButton = document.createElement('button')
  rmButton.classList.add('remove-btn')
  rmButton.innerText = '-'
  rmButton.addEventListener('click', function() {
    updateCart(fruit,false)
  })
  const span = document.createElement('span')
  span.classList.add('quantity-text')
  span.innerText = 1
  const addButton = document.createElement('button')
  addButton.classList.add('add-btn')
  addButton.innerText = '+'
  addButton.addEventListener('click', function() {
    updateCart(fruit,true)
  })


  //Append Elements to the Cart Page section
  entry.append(img)
  entry.append(name)
  entry.append(rmButton)
  entry.append(span)
  entry.append(addButton)
  cart.append(entry)
}

displayStore()