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
      renderCart()
      addItemToCart(item)
    
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
    span.innerText="1"
    minusButton.innerText="-"

    cartLi.appendChild(plusButton)
    cartLi.appendChild(span)
    cartLi.appendChild(minusButton)

  })
}

function addItemToCart(item){
    item.quantity = 1
    state.cart.push(item)
  
}

renderStoreItems()