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

// hint for cart: make a copy of a store item, add a property called
// quantity

// SELECT EXISTING HTML ELEMENTS

const storeUl = document.querySelector('ul')
const cartUl = document.querySelector('.cart--item-list-container ul')
const totalSection = document.querySelector ('.total-section')

//Items in the shop
function renderStoreItems() {
 state.items.forEach((item) => {
  // Create List Item
  const storeItemli = document.createElement('li')
  // Store list item in UL
  storeUl.append(storeItemli)
  // Create image and save to list item
  const storeItemImage = document.createElement('img')
  storeItemImage.setAttribute("src", "assets/icons/" + item.id + ".svg")
  storeItemli.append(storeItemImage)
  // Create Button w/ click
  const addToCartButton = document.createElement('button')
  addToCartButton.innerText = "Add to cart"
  storeItemli.append(addToCartButton)
  addToCartButton.addEventListener('click', function(event){
    event.preventDefault()
    addingToCartArray(item)
  })
 });
};

// When button is clicked, pass the item object into this function
// Is the item already in the array? If yes, increase quantity
// If not add object into array
function addingToCartArray(item){
  const index = state.cart.findIndex((element) => element.id === item.id)
  // If Element.id (id of the item in the cart array) does not match item.id will return -1 
  if(index === -1){
    const cartObject = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    }
    state.cart.push(cartObject)
    addingItemsToCart()
    return
  }
  state.cart[index].quantity += 1
  addingItemsToCart()

}  


// render Items to Cart from function above
function addingItemsToCart() {
  cartUl.innerHTML = ''
  // Create For Each loop to cycle through array and add them to the list
  // const index = state.cart.find((element) => element.id)
  state.cart.forEach((element) => {
    // console.log(element.name)
    if (element.quantity === 0) {
    } else if (element.quantity >= 1) {
      // If the item hasn't already been rendered - render everything
      // Create List Item  
      const itemsInCart = document.createElement('li')
      cartUl.append(itemsInCart)
      // Create image and save to list item
      const cartItemImage = document.createElement('img')
      cartItemImage.setAttribute ("class", "cart--item-icon")
      cartItemImage.setAttribute("src", "assets/icons/" + element.id + ".svg")
      
      // Create p tag and add to list
      const cartItemName = document.createElement('p')
      cartItemName.innerText = element.name
      itemsInCart.append(cartItemImage, cartItemName,)
      
      // Create - button
      const removeFromCartButton = document.createElement('button')
      removeFromCartButton.setAttribute('class', 'quantity-btn remove-btn center')
      removeFromCartButton.innerText = "-"
      itemsInCart.append(removeFromCartButton)
      // - Button Click
      removeFromCartButton.addEventListener('click', function(event){
        if (element.quantity === 1) {
          element.quantity -= 1
          itemsInCart.remove()
          addingItemsToCart()
          total()
        } else {
          element.quantity -= 1
        quantityInCart.innerText = element.quantity
        total()
        }
    })
      // Create quantity
      let quantityInCart = document.createElement('span')
      quantityInCart.setAttribute('class', 'quantity-text center')
      quantityInCart.innerText = element.quantity
      itemsInCart.append(quantityInCart)
      
      // Create + button
      const addMoreToCartButton = document.createElement('button')
      addMoreToCartButton.setAttribute('class', 'quantity-btn add-btn center')
      addMoreToCartButton.innerText = "+"
      itemsInCart.append(addMoreToCartButton)
      // + Button Click
      addMoreToCartButton.addEventListener('click', function(event){
        element.quantity +=1
        quantityInCart.innerText = element.quantity
        total()
        
      })

  }
  })
  total()

}



function total() {
  console.log("Function running")
  let totalOfCart = 0
  state.cart.forEach((element) => {
    console.log(element.quantity)
    const totalPerItem = element.quantity * element.price
    totalOfCart += totalPerItem
  })
  console.log(totalOfCart)
  totalSection.innerHTML
  totalOfCart = totalOfCart.toFixed(2)

  const displayTotal = document.querySelector('.total-section span')
  displayTotal.innerText = `£${totalOfCart}`
  displayTotal.append()

  // Go through cart items array (for each)
  // item quantity * item price
  // save sum to variable

}

renderStoreItems()

