const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
    },
  ],
  cart: [],
};

const store = document.querySelector(".store--item-list")
const cart = document.querySelector(".cart--item-list")

function renderStoreItems() {
  store.innerHTML= ""

  state.items.forEach((item) => {
    const li = document.createElement("li")
    store.appendChild(li)

    const div = document.createElement("div")
    div.setAttribute("class","store--item-icon")
    li.appendChild(div)

    const image = document.createElement("img")
    image.src = `assets/icons/${item.id}.svg`
    image.alt = `${item.id}`
    div.appendChild(image)

    const button = document.createElement("button")
    button.innerText = "Add to cart";
    li.appendChild(button)

    button.addEventListener("click", (event)=>{
      addItemToCart(item)
      renderCart()
      cartTotal()
    
    }
    )

  })


}

function renderCart (){
  cart.innerHTML= ""

  state.cart.forEach((cartItem) => {
    const cartLi = document.createElement("li")
    cart.appendChild(cartLi)

    const cartImg = document.createElement("img")
    cartImg.src = `assets/icons/${cartItem.id}.svg`
    cartImg.alt = `${cartItem.id}`
    cartLi.appendChild(cartImg)

    const itemName = document.createElement('p')
    itemName.innerText = `${cartItem.name}`
    cartLi.appendChild(itemName)

    const plusButton = document.createElement("button")
    const span = document.createElement("span")
    const minusButton = document.createElement("button")

    minusButton.setAttribute("class","quantity-btn remove-btn center")
    span.setAttribute("class","quantity-text center")
    plusButton.setAttribute("class","quantity-btn add-btn center")

    plusButton.innerText="+"
    span.innerText=`${cartItem.quantity}`
    minusButton.innerText="-"

    cartLi.appendChild(plusButton)
    cartLi.appendChild(span)
    cartLi.appendChild(minusButton)

    plusButton.addEventListener("click",(event)=>{
      cartItem.quantity += 1
      renderCart()
      cartTotal()
    })

    minusButton.addEventListener("click",(event)=>{
      cartItem.quantity -= 1
      if(cartItem.quantity === 0){
        const index = state.cart.indexOf(cartItem)
        state.cart.splice(index, 1)
      }
      renderCart()
      cartTotal()
    })

  })
}

function addItemToCart(item){

   console.log(state.cart)

   if( state.cart.find((produce) => produce.name === item.name ) === undefined){
    item.quantity = 1
    state.cart.push(item)
   } else {
    item.quantity += 1
   }
 
  }

  function cartTotal (){
    const total = document.querySelector(".total-number")

    let totalPrice = 0

    state.cart.forEach((item)=>{
     totalPrice +=  item.price * item.quantity

    })
    const formatCurrency = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
   })
    
    total.innerText= formatCurrency.format(totalPrice)

    // direct coorelation with quantity and times the 
    // state.cart.items.price 
  }
 

renderStoreItems()