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
    addingItemsToCart()
  })
 });
};

// When button is clicked, pass the item object into this function
// Create new Object with all exsisting details + quantity key/value
// Is the item already in the array? If yes, increase quantity
// Add this object into array
function addingToCartArray(item){
  const index = state.cart.findIndex((element) => element.id === item.id)
  if(index === -1){
    const cartObject = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    }
    state.cart.push(cartObject)
    return
  }
  state.cart[index].quantity += 1
}  


// render Items to Cart from function above
function addingItemsToCart() {
  // Create For Each loop to cycle through array and add them to the list
  state.cart.forEach((cart) => {
    // Create List Item  
    const itemsInCart = document.createElement('li')
    // Create list item in UL 
    cartUl.append(itemsInCart)
    // Create image and save to list item
    const cartItemImage = document.createElement('img')
    cartItemImage.setAttribute ("class", "cart--item-icon")
    cartItemImage.setAttribute("src", "assets/icons/" + cart.id + ".svg")
    
    // Create p tag and add to list
    const cartItemName = document.createElement('p')
    cartItemName.innerText = cart.name
    itemsInCart.append(cartItemImage, cartItemName,)
    
    // Create - button
    const removeFromCartButton = document.createElement('button')
    removeFromCartButton.setAttribute('class', 'quantity-btn remove-btn center')
    removeFromCartButton.innerText = "-"
    itemsInCart.append(removeFromCartButton)
    // - Button Click
    removeFromCartButton.addEventListener('click', function(event){
      cart.quantity -= 1
      quantityInCart.innerText = cart.quantity
    })
    
    // Create quantity
    let quantityInCart = document.createElement('span')
    quantityInCart.setAttribute('class', 'quantity-text center')
    quantityInCart.innerText = cart.quantity
    itemsInCart.append(quantityInCart)
    
    // Create + button
    const addMoreToCartButton = document.createElement('button')
    addMoreToCartButton.setAttribute('class', 'quantity-btn add-btn center')
    addMoreToCartButton.innerText = "+"
    itemsInCart.append(addMoreToCartButton)
    // + Button Click
    addMoreToCartButton.addEventListener('click', function(event){
      cart.quantity +=1
      quantityInCart.innerText = cart.quantity
      
  })
  
  })

}

renderStoreItems()

