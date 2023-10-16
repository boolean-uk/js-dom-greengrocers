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



// -----------------------------------------------------------------------------------------------------------------

const store = document.querySelector('#store')
const storeUl = store.querySelector(".store--item-list");
const mainCart = document.querySelector("#cart");
const cartUl = mainCart.querySelector(".cart--item-list")
const totalSection = document.querySelector(".total-section");
const price = document.querySelector(".total-number");

const items = state.items;
const cart = state.cart;

function renderStoreList() {
  state.items.forEach((item) => {
    const storeList = document.createElement('li')

    const storeDiv = document.createElement('div')
    storeDiv.className = ".store--item-icon"

    const storeListImg = document.createElement('img')
    storeListImg.src = `assets/icons/${item.id}.svg`
    storeListImg.alt = `${item.name}`
    storeDiv.append(storeListImg)

    const storeButton = document.createElement('button')
    storeButton.innerText = "Add to cart"

    storeList.append(storeDiv)
    storeList.append(storeButton)

    storeUl.append(storeList)

    storeButton.addEventListener('click', () => {
      const cartItemMatch = state.cart.find(eachCartItem => eachCartItem.id === item.id)

      if (cartItemMatch) {
        ++cartItemMatch.quantity
      }else {
        cart.push({...item, quantity: 1})
      }
      renderCartItems()
    })

  })
}

function renderCartItems(){
  const cartLists = cartUl.querySelectorAll('li')
  cartLists.forEach(cartList => cartList.remove())

  cart.forEach(item => {
    const cartList = document.createElement('li')
      const cartListImg = document.createElement('img')
      cartListImg.src = `assets/icons/${item.id}.svg`
      cartListImg.alt = `${item.name}`
  
      const p = document.createElement('p')
      p.innerText = item.name
  
      const removeButton = document.createElement("button");
      removeButton.className = "quantity-btn remove-btn center"
      removeButton.innerText = "-"
      const span = document.createElement("span");
      span.className = "quantity-text center"
      span.innerText = item.quantity
      const addButton = document.createElement("button");
      addButton.className = "quantity-btn add-btn center"
      addButton.innerText = "+"

      addButton.addEventListener('click', () => {
        const cartItem = state.cart.find(cartItem => cartItem.id === item.id)
        ++cartItem.quantity
        renderCartItems()
      })

      removeButton.addEventListener('click', () => {
        const cartItem = cart.find(cartItem => cartItem.id === item.id)
        if (cartItem.quantity > 1) {
          --item.quantity
        } else {
          // state.cart = state.cart.filter(cartItem => cartItem.id !== item.id)
          state.cart.splice(cart.item, 1)
          price.innerText = '£0.00'
        }
        renderCartItems()
      })

      const prices = state.cart.map((item) => item.price * item.quantity);
      const total = prices.reduce((sum, item) => sum + item);
      price.innerText = `£${total.toFixed(2)}`;

      cartList.append(cartListImg, p, removeButton, span, addButton)
      cartUl.append(cartList)
  })
}

renderStoreList()
