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

const storeList = document.querySelector('.store--item-list')
const cartList = document.querySelector('.cart--item-list') //aka the ul
const totalDisplayed = document.querySelector('.total-number')


//CREATING STORE UL- STOCK
function renderStoreItems() {
  const groceryItems = state.items

  for (let i = 0; i < groceryItems.length; i++) {
    const groceryItem = groceryItems[i]
    //add li to ul
    const stockList = document.createElement('li')
    stockList.style.listStyle = `none`

    //add div to li 
    const div = document.createElement('div')
    div.setAttribute('class', 'store--item-icon')

    //add svg to div
    const img = document.createElement('img');
    img.setAttribute('src', `assets/icons/${groceryItem.id}.svg`)
    img.setAttribute('alt', `${groceryItem.name}`)

    //create button
    const addToCartButton = document.createElement('button')
    addToCartButton.innerText = 'Add to cart'
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
        cartList.innerHTML = "";
        addCartItem()
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
      renderTotal()
      console.log('check cart length', state.cart.length)
    })

    //Appending
    storeList.append(stockList)
    stockList.append(div)
    div.append(img)
    stockList.append(addToCartButton)

  }
  renderTotal()
}

console.log(state.cart)

//ADD TO SHOPPING CART
function addCartItem() {
  cartList.innerHTML = ''

  //find cart object
  const cartItemsArray = state.cart
  console.log(state.cart)

  for (let i = 0; i < state.cart.length; i++) {

    //li 
    const foodItem = document.createElement('li');

    //image into li
    const foodImg = document.createElement('img');
    foodImg.setAttribute('class', 'cart--item-icon');
    foodImg.setAttribute('src', 'assets/icons/' + cartItemsArray[i].id + '.svg');
    foodImg.setAttribute('alt', cartItemsArray[i].name);

    //create p 
    const foodName = document.createElement('p');
    const food = cartItemsArray[i].name;
    foodName.innerText = food;

    //- button
    let cartItemQuantity = state.cart[i].quantity
    const removeButton = document.createElement('button');
    removeButton.classList.add('quantity-btn', 'remove-btn', 'center');
    removeButton.innerText = '-';
    //add clickevent for - button
    removeButton.addEventListener('click', () => {
      console.log('You clicked - !')
      state.cart[i].quantity -= 1
      addCartItem()
      if (state.cart[i].quantity === 0) {
        console.log('There are 0', state.cart[i].name, 'left')
        const reducedCart = state.cart.filter(item => item.quantity !== 0);
        console.log('cart should not have item with quantity 0', reducedCart)

        return reducedCart
      }
      renderTotal()
    })

    //quantity
    const quantityTracker = document.createElement('span');
    quantityTracker.classList.add('quantity-text', 'center');
    quantityTracker.innerText = cartItemQuantity
    // console.log('updated quantity:',cartItemsArray[i].quantity )

    //add button
    const addButton = document.createElement('button');
    addButton.classList.add('quantity-btn', 'add-btn', 'center');
    addButton.innerText = '+';
    // event listener
    addButton.addEventListener('click', () => {
      state.cart[i].quantity += 1
      console.log('You clicked add button! new quantity:', cartItemQuantity)
      console.log(state.cart[i].quantity)
      addCartItem()
      renderTotal()
      //can remove when everything is working
      const newCartLength = state.cart
      console.log('newCartLength:', newCartLength)
    });

    //appends
    cartList.append(foodItem);
    foodItem.append(foodImg);
    foodItem.append(foodName);
    foodItem.append(removeButton);
    foodItem.append(quantityTracker);
    foodItem.append(addButton);
  }

  renderTotal()
}


function renderTotal() {
  let total = 0;

  state.cart.forEach((item) => {
    const price = item.price
    const quantity = item.quantity
    const totalItemPrice = price * quantity
    total += totalItemPrice
  })
  finalTotal = total.toFixed(2)
  console.log(finalTotal)
  totalDisplayed.innerText = `£${finalTotal}`
}




renderStoreItems()
renderTotal()