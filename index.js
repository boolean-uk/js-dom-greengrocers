// STATE

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


// EXISTING HTML ELEMENT SELECTORS

const storeUL = document.querySelector(".store--item-list")
const cartUL = document.querySelector(".cart--item-list")
const totalSpan = document.querySelector(".total-number")

// PROGRAM LOGIC


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

// RENDERING

function renderItems() {
    storeUL.innerHTML = "";

    const foodItemsArray = state.items
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

function renderTotalValue() {
    let total = 0
    state.cart.forEach((item) => {
        const price = item.price
        const quantity = item.quantity
        const itemTotal = price * quantity
        total += itemTotal
    })
    let totalPrice = total.toFixed(2)
    totalSpan.innerText = `£${totalPrice}`
}

renderItems()