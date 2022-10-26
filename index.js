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

// queries
const shopItems = document.querySelector(".item-list")
const cartList = document.querySelector(".cart--item-list")
const itemData = state.items
const cartData = state.cart
const totalNumber = document.querySelector(".total-number")

itemData.forEach((item) => {
  shopItems.appendChild(createShopItem(item))
})

// function to create shop item
function createShopItem (item) {

  const shopItem = document.createElement('li')
  const shopIconCon = document.createElement('div')
  const shopIcon = document.createElement('img')
  const addToCart = document.createElement('button')

  shopIconCon.setAttribute('class', "store--item-icon" )
  shopIcon.src = `assets/icons/${item.id}.svg`
  shopItem.id = item.id
  shopItem.name = item.name
  shopItem.price = item.price

  addToCart.innerText = 'Add to cart'

let itemCopy = {}
    itemCopy.id = shopItem.id
    itemCopy.name = shopItem.name
    itemCopy.price = shopItem.price
    itemCopy.quantity = 0

  addToCart.addEventListener('click', () => {
    console.log(itemCopy)
    if(itemCopy.quantity === 0){
    itemCopy.quantity += 1
    cartData.push(itemCopy)
// render cart function
    renderCart()
    renderTotal()
// console.log(cartData)
    
  }
  else {
    itemCopy.quantity += 1
  renderCart()
    renderTotal()
  }
  })
  shopItem.appendChild(shopIconCon)
  shopIconCon.appendChild(shopIcon)
  shopItem.appendChild(addToCart)

  return shopItem
}

// function to create shop cart item
function createShopCartItem (item){

  const shopCartItem = document.createElement('li')
  const shopCartItemImg = document.createElement('img')
  const shopCartItemName = document.createElement('p')
  const removeButton = document.createElement('button')
  const quantity = document.createElement('span')
  const addButton = document.createElement('button')

  shopCartItemImg.setAttribute('class', "cart--item-icon")
  shopCartItemImg.src = `assets/icons/${item.id}.svg`
  shopCartItemImg.alt = item.name
  shopCartItemName.innerText = item.name
  removeButton.setAttribute('class', "remove-btn center")
  removeButton.innerText = '-'
  quantity.setAttribute('class', "quantity-text center")
  quantity.innerText = item.quantity
  addButton.setAttribute = ('class', "add-btn center")
  addButton.innerText = '+'
// add button event listeners
  removeButton.addEventListener('click', () =>{
    item.quantity -= 1
    renderTotal()

  
  console.log(cartData)
    if (item.quantity === 0){
      for (i = 0; i < cartData.length; i++){
        if (cartData[i].name === item.name){
          cartData.splice(i, 1)
          renderCart()
        }       
      }
    }
    else {
      // item.quantity -= 1
      renderCart()  
      renderTotal()
    }
    } )

    addButton.addEventListener('click', () => {
      console.log(cartData)

      item.quantity += 1
      renderCart()  
      renderTotal()
    })

  shopCartItem.appendChild(shopCartItemImg)
  shopCartItem.appendChild(shopCartItemName)
  shopCartItem.appendChild(removeButton)
  shopCartItem.appendChild(quantity)
  shopCartItem.appendChild(addButton)
  
  return shopCartItem
}
// function to render cart data
function renderCart(){
  cartList.innerHTML = ''
  cartData.forEach((item) => {
    const li = createShopCartItem(item)
    cartList.appendChild(li)
  })
}
// function for sub totals
function subTotals (){
 return subTotal = cartData.map(item => item.quantity * item.price)
  }
// function for total
function renderTotal(){
  let grandTotal = 0
    subTotals().forEach((item) => {
      totalNumber.innerText = `£${Math.round(grandTotal += item * 100) / 100}`
    })
    }
//
// extensions
//

const filters = document.querySelector(".filters")
const fruits = ['apple', 'apricot', 'bananas', 'berry', 'blueberry']
const veg = ['beetroot', 'carrot', 'avocado', 'bell-pepper', 'eggplant']
const all = fruits.concat(veg)

function createFilter (name, type){
  const newButton = document.createElement('button')
  filters.appendChild(newButton)
  newButton.innerText = name
  newButton.addEventListener('click', () => {
    shopItems.innerHTML = ''
    itemData.forEach((item) => {
      if (type.includes(item.name)){
      shopItems.appendChild(createShopItem(item))
    }})
    // console.log(cartData)
  })
}
createFilter('fruits', fruits)
createFilter('veg', veg)
createFilter('all', all)



