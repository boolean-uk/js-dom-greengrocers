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

console.log('og state', state)
const storeList = document.querySelector('.store--item-list')
const totalNumber = document.querySelector('.total-number')
const shopingBag = document.querySelector('.cart--item-list') //aka the ul

const groceryItems = state.items
const groceryItemLi = groceryItems
//CREATING STORE UL- STOCK
function renderStoreItems() {
  for (let i = 0; i < groceryItems.length; i++) {
    const groceryItem = groceryItems[i]
    //add li to ul
    const stockList = document.createElement('li')
    stockList.style.listStyle = `none`
    storeList.append(stockList)

    //add div to li 
    const stockDiv = document.createElement('div')
    stockDiv.setAttribute('class', 'store--item-icon')
    stockList.append(stockDiv)

    //add svg to div
    const stockImgSvg = document.createElement('img');
    stockImgSvg.setAttribute('src', `assets/icons/${groceryItems[i].id}.svg`)
    stockImgSvg.setAttribute('alt', `${groceryItems[i].name}`)
    stockDiv.append(stockImgSvg)

    //create button
    const addToCartButton = document.createElement('button')
    addToCartButton.innerText = 'Add to cart'
    stockList.append(addToCartButton)

    //add clickevent
    addToCartButton.addEventListener('click', (event) => {
      console.log('You clicked! cart size:', state.cart.length)
      let existingCartItem = undefined
      for (let i = 0; i < state.cart.length; i++) {
        const cartItem = state.cart[i]
        console.log('before if to fill undefined  statement')
        if (cartItem.id === groceryItem.id) {
          existingCartItem = cartItem
          break
        }
      }

      if (existingCartItem !== undefined) {
        console.log('You clicked on existing item! cart size:', state.cart.length)
        // cart already has groceryItem in it!
        // increment
        existingCartItem.quantity += 1
        console.log('You clicked on existing item! item quantity:', existingCartItem.quantity)

        // rerender
        //clear the li befor it so that we don't end up with x3 clicks = bananas(1), bananas(2), bananas (3)
        shopingBag.innerHTML = ""; //not quite right though--> it clears the next item when you click on a new fruit (but the old 
        //friut item stays in the cary array)

        //call up new item and let it +=1
        addCartItem()
        //  state.cart.splice(cartDisplay[i-1]) --> trued this but it also didnt work
      }
      else {
        console.log('test test create object')
        let cartObject = {
          id: state.items[i].id,
          name: state.items[i].name,
          price: state.items[i].price,
          quantity: 1
        }

        state.cart.push(cartObject)
        addCartItem()
        console.log('new Cart Object', cartObject)
      }
      console.log('check cart length', state.cart.length)
    })
  }
}

renderStoreItems()
console.log(state.cart)

//ADD TO SHOPPING CART
function addCartItem() {
  //find cart object
  const cartItemsArray = state.cart
  console.log(cartItemsArray)

  // do the population of the UI with the values from that item  
  let i = cartItemsArray.length - 1

  const foodItem = document.createElement('li');
  shopingBag.append(foodItem);

  // //image into li
  const foodImg = document.createElement('img');
  foodImg.setAttribute('class', 'cart--item-icon');
  foodImg.setAttribute('src', 'assets/icons/' + cartItemsArray[i].id + '.svg');
  foodImg.setAttribute('alt', cartItemsArray[i].name);
  foodItem.append(foodImg);

  //create p 
  const foodName = document.createElement('p');
  const food = cartItemsArray[i].name;
  foodName.innerText = food;
  foodItem.append(foodName);

  let cartItemQuantity = cartItemsArray[i].quantity

  //- button
  const removeButton = document.createElement('button');
  removeButton.classList.add('quantity-btn', 'remove-btn', 'center');
  removeButton.innerText = '-';
  foodItem.append(removeButton);
  //add clickevent for - button
  removeButton.addEventListener('click', (eventObj) => {
    console.log('You clicked - !')
    cartItemQuantity -= 1
    quantityTracker.innerText = cartItemQuantity
    console.log('check cart length', state.cart.length)
    console.log('updated cartquantity:', cartItemQuantity)
    console.log('updated cart length:', state.cart.length)

    //need to somehow make li dissapear at value === 0 --> am i missing a for loop???
    //  if (cartItemQuantity === 0){
    //   delete.cartItem()
    //  }

  })

  //quantity
  const quantityTracker = document.createElement('span');
  quantityTracker.classList.add('quantity-text', 'center');
  quantityTracker.innerText = cartItemQuantity
  // console.log('updated quantity:',cartItemsArray[i].quantity )
  foodItem.append(quantityTracker);

  //add button
  const addButton = document.createElement('button');
  addButton.classList.add('quantity-btn', 'add-btn', 'center');
  addButton.innerText = '+';
  foodItem.append(addButton);
  //add-button's clickevent
  addButton.addEventListener('click', (eventObj) => {
    cartItemQuantity += 1
    console.log('You clicked add button! new quantity:', cartItemQuantity)
    quantityTracker.innerText = cartItemQuantity
  });

  const newCartLength = state.cart

  console.log('newCartLength:', newCartLength)

  // console.log('newCartLength:', newCartLength)
}



// function deleteCartItem() {
// }


// const totalDisplayed = document.querySelector('total-number')
// totalDisplayed.innerText =
// function calculateTotal(cartItemsArray) {
//   let totalValue
//   for (let i = 0; i < newCartLength.length; i++) {
//     let multiples = newCartLength.price * newCartLength.quantity //some  selection issue happening here
//     totalValue = multiples
//   }
// }

