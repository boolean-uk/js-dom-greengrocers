const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.65,
      color: "pink"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.10,
      color: "orange"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.15,
      color: "red"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.55,
      color: "orange"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.25,
      color: "green"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      color: "yellow"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.31,
      color: "green"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.52,
      color: "red"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.13,
      color: "blue"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.23,
      color: "purple"
    }
  ],
  cart: []
};


const storeEl = document.getElementsByClassName("item-list store--item-list")[0]
const cartEl = document.getElementsByClassName("item-list cart--item-list")[0]

const totalEl = document.getElementsByClassName("total-number")[0]

const inputFilterEl = document.getElementById("filterInput")

const filterCheckBoxEl = document.getElementById("filterByPriceButton")

const colorContainerEl = document.getElementById("colorContainer")


const allInputs = document.getElementsByTagName("input")

createStore(state)

for (let i = 0; i < allInputs.length; i++) {
  allInputs[i].addEventListener("input", function(e) {
       onStoreFilterOnChanges()
    })
}


function onStoreFilterOnChanges() {
  const newState = {}
  newState.items = []
  let noneChecked = true
  for (let x = 0; x < allInputs.length; x++) {
    if(allInputs[x].id !== "filterInput" && allInputs[x].id !== "filterByPriceButton") {
      if(allInputs[x].checked) {
        noneChecked = false;
      }
    }

  }
  for (let i = 0; i < state.items.length; i++) {
    if (state.items[i].name.includes(inputFilterEl.value.toLowerCase())) {
      const colorCheck = document.getElementById(state.items[i].color)
      
     
      if(noneChecked === true) {
        newState.items.push(state.items[i])
      } else if(colorCheck.checked) {
        newState.items.push(state.items[i])
      }
    }
  }
  createStore(newState)
}








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
  if(filterCheckBoxEl.checked) {
    newState.items.sort(compare)
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


  function compare( a, b ) {
    if ( a.price < b.price ){
      return -1;
    }
    if ( a.price > b.price ){
      return 1;
    }
    return 0;
  }
}

