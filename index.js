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


const storeEl = document.getElementsByClassName("item-list store--item-list")[0]
const cartEl = document.getElementsByClassName("item-list cart--item-list")[0]

const totalEl = document.getElementsByClassName("total-number")[0]

const inputFilterEl = document.getElementById("filterInput")

createStore(state)

inputFilterEl.addEventListener("input", function(e) {
  const newState = {}
  newState.items = []
  for (let i = 0; i < state.items.length; i++) {
    if (state.items[i].name.includes(e.target.value.toLowerCase())) {
      console.log(e.target.value)
      newState.items.push(state.items[i])
    }
  }

  createStore(newState)

})










function addItemToCart(id) {
  for (let i = 0; i < cartEl.children.length; i++) {
    if(cartEl.children[i].id === `liEl${id}`) {
      state.items[id].bought += 1
      const span = document.getElementById(`spanEl${id}`)
      span.innerHTML = state.items[id].bought
      
      calculateTotalCost()
      return
    }

  }



  const liEl = document.createElement("li")

  liEl.id = "liEl" + id
  liEl.value = id


  const imgEl = document.createElement("img")

  const pEl = document.createElement("p")

  const buttonEl = document.createElement("button")

  const spanEl = document.createElement("span")

  const buttonEl2 = document.createElement("button")

  imgEl.className = "cart--item-icon"
  imgEl.alt = state.items[id].name
  imgEl.src = `assets/icons/${state.items[id].id}.svg`



  pEl.innerHTML = state.items[id].name

  buttonEl.className = "quantity-btn remove-btn center"
  buttonEl.innerHTML = "-"

  buttonEl.addEventListener("click", function() {
    const spanEl = document.getElementById(`spanEl${id}`)
    if(state.items[id].bought <= 1) {
      cartEl.removeChild(liEl)
      calculateTotalCost()
      return
    }
    state.items[id].bought -= 1
    const span = document.getElementById(`spanEl${id}`)
    span.innerHTML = state.items[id].bought
    calculateTotalCost()
  });

  spanEl.className = "quantity-text center"
  spanEl.innerHTML = state.items[id].bought
  spanEl.id = `spanEl${id}`

  buttonEl2.className = "quantity-btn add-btn center"
  buttonEl2.innerHTML = "+"

  buttonEl2.addEventListener("click", function() {
    const spanEl = document.getElementById(`spanEl${id}`)

    state.items[id].bought += 1
    const span = document.getElementById(`spanEl${id}`)
    span.innerHTML = state.items[id].bought
    calculateTotalCost()
  });

  liEl.appendChild(imgEl)
  liEl.appendChild(pEl)
  liEl.appendChild(buttonEl)
  liEl.appendChild(spanEl)
  liEl.appendChild(buttonEl2)

  cartEl.appendChild(liEl)
  calculateTotalCost()
}

function calculateTotalCost() {
  let totalCost = 0

  for (let i = 0; i < cartEl.children.length; i++) {
    let id = cartEl.children[i].value
    totalCost += state.items[id].price * state.items[id].bought
  }

  totalEl.innerHTML = "£" + Math.round((totalCost + Number.EPSILON) * 100) / 100


}

function createStore(newState) {
  while(storeEl.firstChild) {
    storeEl.removeChild(storeEl.firstChild)
  }

  for(let i = 0; i < newState.items.length; i++) {

    newState.items[i].bought = 1
  
    const liElStore = document.createElement("li")
    
    const divElStore = document.createElement("div")
  
    divElStore.className = "store--item-icon"
  
    const imgElStore = document.createElement("img")
  
    imgElStore.src = `assets/icons/${newState.items[i].id}.svg`
    imgElStore.alt = newState.items[i].name
    const spanEl = document.createElement("span")
    spanEl.innerHTML = "£" + newState.items[i].price
  
    const buttonElStore = document.createElement("button")
    buttonElStore.id = i
    buttonElStore.innerHTML = "Add to cart"
    buttonElStore.addEventListener("click", function() {
      addItemToCart(i)
    });
    
    divElStore.appendChild(imgElStore)
    liElStore.appendChild(divElStore)
    liElStore.appendChild(spanEl)
    liElStore.appendChild(buttonElStore)
  
    storeEl.appendChild(liElStore)
  
  }
}

