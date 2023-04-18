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

const storeList = document.querySelector('.store--item-list');
const cartList = document.querySelector('.cart--item-list')
const total = document.querySelector('.total-number')
const cartItems = state.cart

function renderStoreList() {
  const storeItems = state.items

  for (let i = 0; i < storeItems.length; i++) {
    let item = storeItems[i];

    const storeListItem = document.createElement('li');
    storeList.append(storeListItem);

    const storeIconContainer = document.createElement('div');
    storeIconContainer.setAttribute('class', 'store--item-icon');
    storeListItem.append(storeIconContainer)

    const storeIcon = document.createElement('img');
    storeIcon.setAttribute('src', `assets/icons/${item.id}.svg`)
    storeIconContainer.append(storeIcon);

    const storeButton = document.createElement('button');
    storeButton.innerText = 'Add to cart'
    storeButton.addEventListener("click", (e) => {
      e.preventDefault();
      
      const notContainItem = !cartItems.includes(item)
      const doesContainItem = cartItems.includes(item)

      if(notContainItem){
        cartItems.push(item)
        const cartItemIndex = cartItems.length - 1
        cartItems[cartItemIndex].quantity = 1
        renderCartList()
        calcTotal()

        console.log('added cart item!')          
        } else if (doesContainItem){
        for (let j = 0; j < cartItems.length; j++) {
          if (item.id === cartItems[j].id) {
            cartItems[j].quantity += 1
            renderCartList()
            calcTotal()

            }
          }
        }
    })
    
    storeListItem.append(storeButton)
    }
  }


// Render the cart
// Create a function to render the cart similar to the store
// Need an if statement to remove the item from the cart if quantity <= 0

function renderCartList() {
  cartList.innerHTML = ""
  for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i]
      if(item.quantity > 0){
      const cartListItem = document.createElement('li')
      cartList.append(cartListItem)

      const cartIcon = document.createElement('img')
      cartIcon.setAttribute('class', 'cart--item-icon')
      cartIcon.setAttribute('src', `assets/icons/${item.id}.svg`)
      cartListItem.append(cartIcon)

      const name = document.createElement('p')
      name.innerText = item.name
      cartListItem.append(name)

      const removeButton = document.createElement('button')
      removeButton.setAttribute('class', 'quantity-btn remove-btn center')
      removeButton.innerText = '-'
      removeButton.addEventListener("click", () => {
        item.quantity = item.quantity - 1
        if(item.quantity <= 0) {
          item.quantity = 0
        } 
        renderCartList()
        calcTotal()

      })
      cartListItem.append(removeButton)

      const itemQuantity = document.createElement('span')
      itemQuantity.setAttribute('class', 'quantity-text center')
      itemQuantity.innerText = `${item.quantity}`
      cartListItem.append(itemQuantity)
      
      const addButton = document.createElement('button')
      addButton.setAttribute('class', 'quantity-btn add-btn center')
      addButton.innerText = '+'
      addButton.addEventListener("click", () => {
        item.quantity = item.quantity + 1
        renderCartList()
        calcTotal()

      })
      cartListItem.append(addButton)

    }
  }
}

// Now for the easy part
// Render the total 

function calcTotal() {
  let totalCost = 0
  for (let i = 0; i < cartItems.length; i++) {
    const itemPrice = cartItems[i].price
    const itemCount = cartItems[i].quantity
    const sum = itemCount * itemPrice
    totalCost += sum

  }
  totalCost = totalCost.toFixed(2)
  total.innerText = `£${totalCost}`
}

renderStoreList()