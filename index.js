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
console.log(state)

// ## Instructions
// - Use the `index.html` file as a starting point.
// - `index.js` contains the initial state - a list of items available to purchase and an empty cart 
// - Images for each item are in the assets folder
// - The HTML required for the items in the list and the cart items are provided in the `templates folder`
// - Implement the following requirements
//   - A user can view a selection of items in the store
//   - From the store, a user can add an item to their cart
//     - If the item is already in the cart, increase the item's quantity in the cart
//   - From the cart, a user can view and adjust the number of items in their cart
//       - If an item's quantity equals zero it is removed from the cart
//   - A user can view the current total in their cart


// - A user can view a selection of items in the store

for (let i = 0; i < state.items.length; i++){
  const produceList = document.createElement('li')
  const storeItem = document.createElement('div')
  const productImage = document.createElement('img')
  const addToCartButton = document.createElement('button')
  addToCartButton.innerText = "Add to Cart"
  storeItem.setAttribute("class", "store--item-icon")
  productImage.setAttribute(`src`, `assets/icons/${state.items[i].id}.svg`)
  productImage.setAttribute(`alt`, `${state.items[i].name}`)
  produceList.append(storeItem)
  storeItem.append(productImage)
  produceList.append(addToCartButton)
  document.querySelector('.item-list.store--item-list').append(produceList)
}

// - From the store, a user can add an item to their cart

const addToCartButton = document.querySelectorAll('button')
const unorderedList = document.querySelector('.item-list.cart--item-list')
for (let i = 0; i < addToCartButton.length; i++){
  let quantity = 0
  addToCartButton[i].addEventListener('click', () => {
      
      
    // - If the item is already in the cart, increase the item's quantity in the cart
    quantity++
      
    function stateUpdate(){
      state.cart.push({
        id: state.items[i].id,
        name: state.items[i].name,
        price: 0.35,
        quantity: quantity
      })
    }
    stateUpdate()
      
    const productIcon = document.createElement('img')
    productIcon.setAttribute("class", "cart--item-icon")
    const productName = document.createElement('p')
    const removeQuantityButton = document.createElement('button')
    removeQuantityButton.setAttribute("class", "quantity-btn remove-btn center")
    removeQuantityButton.innerText = '-'
    const addQuantityButton = document.createElement('button')
    addQuantityButton.setAttribute("class", "quantity-btn add-btn center")
    addQuantityButton.innerText = '+'
    const itemQuantity = document.createElement('span')
    itemQuantity.setAttribute("class", "quantity-text center")
    itemQuantity.innerText = quantity
      
    

      
      
    let name = []
    let indicies = []
    for (let j = 0; j < state.cart.length; j++){
  
      name.push(state.cart[j].id)
      let idx = name.indexOf(state.cart[j].id)
      indicies.push(idx)
      productIcon.setAttribute(`src`, `assets/icons/${state.cart[j].id}.svg`)
      productIcon.setAttribute(`alt`, `${state.cart[j].name}`)
      productName.innerText = `${state.cart[j].name}`
    }
      
    const toFindRepeat = indicies => indicies.filter((item, index) => indicies.indexOf(item) !== index)
    const duplicateElements = toFindRepeat(indicies)
    let replaceIndex = []
    for (let j = 0; j < indicies.length; j++){
      const repeated = indicies.indexOf(duplicateElements[0], j)
      replaceIndex.push(repeated)
    }
      
      
    if (duplicateElements.length === 1){
      state.cart.splice(duplicateElements[0], 1, state.cart[replaceIndex.pop()])
      state.cart.splice(replaceIndex.pop(), 1)
    }
      
  
    
    if (quantity === 1){
      const singleListItem = document.createElement('li')
      unorderedList.append(singleListItem)
      singleListItem.append(productIcon)
      singleListItem.append(productName)
      singleListItem.append(removeQuantityButton)
      singleListItem.append(itemQuantity)
      singleListItem.append(addQuantityButton)
      
    } else if (quantity > 1){
      const singleListItem = document.querySelectorAll('li')
      const forwardListItem = document.createElement('li')
      forwardListItem.id = "forwardList"
      forwardListItem.append(productIcon)
      forwardListItem.append(productName)
      forwardListItem.append(removeQuantityButton)
      forwardListItem.append(itemQuantity)
      forwardListItem.append(addQuantityButton)
      const replaceListItem = `1${duplicateElements}`
      unorderedList.replaceChild(forwardListItem, singleListItem[replaceListItem])
    }


    
    // - From the cart, a user can view and adjust the number of items in their cart
    removeQuantityButton.addEventListener('click', () => {
      quantity = quantity - 1
      itemQuantity.innerText = quantity
      stateUpdate()
      let name = []
      let indicies = []
      
      for (let j = 0; j < state.cart.length; j++){
    
        name.push(state.cart[j].id)
        let idx = name.indexOf(state.cart[j].id)
        indicies.push(idx)
        productIcon.setAttribute(`src`, `assets/icons/${state.cart[j].id}.svg`)
        productIcon.setAttribute(`alt`, `${state.cart[j].name}`)
        productName.innerText = `${state.cart[j].name}`

      }


        
      const toFindRepeat = indicies => indicies.filter((item, index) => indicies.indexOf(item) !== index)
      const duplicateElements = toFindRepeat(indicies)
      let replaceIndex = []
      for (let i = 0; i < indicies.length; i++){
        const repeated = indicies.indexOf(duplicateElements[0], i)
        replaceIndex.push(repeated)
      }
        
        
      if (duplicateElements.length === 1){
        state.cart.splice(duplicateElements[0], 1, state.cart[replaceIndex.pop()])
        state.cart.splice(replaceIndex.pop(), 1)
      }

      if (quantity === 0){
        const index = state.cart.findIndex(object => {
          return object.quantity === 0
        })

        
        state.cart.splice(index, 1)
        const listItem = document.querySelectorAll('li')
        for (let j = 0; j < listItem.length; j++){
          const removeIndex = `1${index}`
          
          listItem[removeIndex].remove()
        }
      }

      totalPrice()
    })

    addQuantityButton.addEventListener('click', () => {
      quantity = quantity + 1
      itemQuantity.innerText = quantity
      stateUpdate()

      let name = []
      let indicies = []
      
      for (let j = 0; j < state.cart.length; j++){
    
        name.push(state.cart[j].id)
        let idx = name.indexOf(state.cart[j].id)
        indicies.push(idx)
        productIcon.setAttribute(`src`, `assets/icons/${state.cart[j].id}.svg`)
        productIcon.setAttribute(`alt`, `${state.cart[j].name}`)
        productName.innerText = `${state.cart[j].name}`

      }


        
      const toFindRepeat = indicies => indicies.filter((item, index) => indicies.indexOf(item) !== index)
      const duplicateElements = toFindRepeat(indicies)
      let replaceIndex = []
      for (let i = 0; i < indicies.length; i++){
        const repeated = indicies.indexOf(duplicateElements[0], i)
        replaceIndex.push(repeated)
      }
        
        
      if (duplicateElements.length === 1){
        state.cart.splice(duplicateElements[0], 1, state.cart[replaceIndex.pop()])
        state.cart.splice(replaceIndex.pop(), 1)
      }
      
      totalPrice()

    })

    function totalPrice(){

      let priceArr = []
      let quantityArr = []
      for (let i = 0; i < state.cart.length; i++){
        priceArr.push(Object.values(state.cart[i])[2])
        quantityArr.push(Object.values(state.cart[i])[3])
      }
  
      
      let product = []
      for (let i = 0; i < priceArr.length; i++){
        product.push(priceArr[i] * quantityArr[i])
      }
      
      const total = document.querySelector('.total-number')
      const listCount = document.querySelectorAll('li')
      
      if (listCount.length === 10){
        product = [0, 0]
      }

      let sum = product.reduce(function(a, b){
        return a + b;
      })
      

      total.innerText = `£${sum.toFixed(2)}`
      

      
    }
    totalPrice()

    
    
    
  })
}


