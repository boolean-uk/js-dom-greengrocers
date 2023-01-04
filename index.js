// STATE

const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.60,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.20,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 1.00,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.90,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.80,
      type: "fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.70,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.50,
      type: "fruit"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.40,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.30,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.10,
      type: "vegetable"
    }
  ],
  cart: []
};


// EXISTING HTML ELEMENT SELECTORS

const storeUL = document.querySelector(".store--item-list")
const cartUL = document.querySelector(".cart--item-list")
const totalSpan = document.querySelector(".total-number")
const sortDiv = document.querySelector(".filterAndSort")

// PROGRAM LOGIC

function compareNames(a, b) {
    if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name ){
        return 1;
      }
      return 0;
}

function comparePrices(a, b) {
    if ( a.price < b.price ){
        return -1;
      }
      if ( a.price > b.price ){
        return 1;
      }
      return 0;
}

// EVENT HANDLING

function basketChecker(item) {
    
    const basketChecker = state.cart.find(inBasket => inBasket.name === item.name)
    if (basketChecker === undefined) {
        const cartItem = {...item}
        cartItem.quantity = 1
        state.cart.push(cartItem)
        renderCartItems()
    } else {
        basketChecker.quantity++
        renderCartItems()
    }
}

function renderCartItems() {

    cartUL.innerHTML = "";

    state.cart.forEach((item) => {
        const li = document.createElement("li");
        
        const img = document.createElement("img");
        img.setAttribute("class", "cart--item-icon")
        img.setAttribute("src", `assets/icons/${item.id}.svg`)
        img.setAttribute("alt", item.name)
    
        const p = document.createElement("p")
        p.innerText = item.name
    
        const bttnMinus = document.createElement("button")
        bttnMinus.setAttribute("class", "quantity-btn remove-btn center")
        bttnMinus.innerText = "-"
        bttnMinus.addEventListener("click", (event) => {
            item.quantity -= 1
            // If the item quantity is = 0 after the decrement, then filter
            // the cart, keeping only items that have a quantity greater than 0.
            // then re-render the cart items.
            if(item.quantity === 0){
                state.cart = state.cart.filter((cart) => cart.quantity > 0)
                renderCartItems()
            }
            span.innerText = item.quantity
            renderTotalValue()
        })
    
        const span = document.createElement("span")
        span.setAttribute("class", "quantity-text center")
        span.innerText = item.quantity
    
        const bttnAdd = document.createElement("button")
        bttnAdd.setAttribute("class", "quantity-btn add-btn center")
        bttnAdd.innerText = "+"
        bttnAdd.addEventListener("click", () => {
            item.quantity += 1
            span.innerText = item.quantity
            renderTotalValue()
            
        })
    
        li.append(img, p, bttnMinus, span, bttnAdd)
        cartUL.append(li)

    })
    renderTotalValue()
}

function renderButtons() {
    sortDiv.innerHTML = "";

    const fruitButton = document.createElement("button")
    fruitButton.innerText = "Fruit"

    fruitButton.addEventListener("click", () => {
        const fruitArray = state.items.filter((item) => item.type === "fruit")
        renderItems(fruitArray)
    })

    const vegButton = document.createElement("button")
    vegButton.innerText = "Vegetables"

    vegButton.addEventListener("click", () => {
        const vegArray = state.items.filter((item) => item.type === "vegetable")
        renderItems(vegArray)
    })

    const allButton = document.createElement("button")
    allButton.innerText = "All"

    allButton.addEventListener("click", () => {
        // renders all items, from the original state.items array
        renderItems(state.items)
    })

    const sortByPriceButton = document.createElement("button")
    sortByPriceButton.innerText = "Sort By Price"

    sortByPriceButton.addEventListener("click", () => {
        const priceSort = state.items.sort(comparePrices)
        renderItems(priceSort)
    })

    const sortByNameButton = document.createElement("button")
    sortByNameButton.innerText = "Sort by Name"

    sortByNameButton.addEventListener("click", () => {
        const nameSort = state.items.sort(compareNames)
        renderItems(nameSort)
    })

    sortDiv.append(fruitButton, vegButton, allButton, sortByNameButton, sortByPriceButton)
}



// RENDERING


function renderItems(groceries) {
    storeUL.innerHTML = "";

    const foodItemsArray = groceries
    foodItemsArray.forEach((item) => {
        const li = document.createElement("li");
        
        const div = document.createElement("div");
        div.setAttribute("class", "store--item-icon")
        
        const img = document.createElement("img");
        img.setAttribute("src", `assets/icons/${item.id}.svg`)
        img.setAttribute("alt", item.name)
        
        const bttn = document.createElement("button");
        bttn.innerText = "Add to cart"
        bttn.addEventListener("click", () => {
            basketChecker(item)
        })


        li.append(div)
        div.append(img)
        li.append(bttn)
        storeUL.append(li)
    
    })
    renderButtons()
}


function renderTotalValue() {
    let total = 0
    state.cart.forEach((item) => {
        const itemTotal = item.price * item.quantity
        total += itemTotal
    })
    let totalPrice = total.toFixed(2)
    totalSpan.innerText = `£${totalPrice}`
}

renderItems(state.items)