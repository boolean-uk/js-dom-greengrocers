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
const groceryItems = state.items
const grocerStock = document.querySelector('.store--item-list')
const groceryItemLi = groceryItems

//CREATING STORE UL- STOCK
function renderStoreItems() {
  for (let i = 0; i < groceryItems.length; i++) {
    const groceryItem = groceryItems[i]

    //add li to ul
    const stockList = document.createElement('li')
    stockList.style.listStyle = `none`
    grocerStock.append(stockList)

    //add div to li 
    const stockDiv = document.createElement('div')
    stockDiv.setAttribute('class', 'store--item-icon')
    stockList.append(stockDiv)

    //add svg to div
    const stockImgSvg = document.createElement('img');
    stockImgSvg.setAttribute('src', `assets/icons/${groceryItems[i].id}.svg`)
    stockImgSvg.setAttribute('alt', `${groceryItems[i].name}`)
    stockDiv.append(stockImgSvg)

    //trying to add buttons through a function so that I can call the button for a click event 
    const addToCartButton = document.createElement('button')
    addToCartButton.innerText = 'Add to cart'
    stockList.append(addToCartButton)

    //add clickevent
    addToCartButton.addEventListener('click', function (event) {
      console.log('You clicked!')
      //Create shopping cart array with added quantity key
      const cartObject = {
        id: state.items[i].id,
        name: state.items[i].name,
        price: state.items[i].price,
        quantity: 1
      }
      state.cart.push(cartObject)
      console.log('new Cart Object', cartObject)

      addGroceryItem()
    })
  }
}
renderStoreItems()

console.log(state.cart)


//ADD TO SHOPPING CART
function addGroceryItem() {
  //SHOPPING CART CONSTS
  const cart = document.querySelector('#cart') //aka "main"
  const shopingBag = document.querySelector('.cart--item-list') //aka the ul
  
  //find cart object either by object or id in the state.cart array: will need somehow to find the item in the array of items (state.cart)
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
  foodImg.setAttribute('alt', '*name');
  foodItem.append(foodImg);

  //create p 
  const foodName = document.createElement('p');
  const food = cartItemsArray[i].name;
  foodName.innerText = food;
  foodItem.append(foodName);

  //- button
  const removeButton = document.createElement('button');
  removeButton.classList.add('quantity-btn', 'remove-btn', 'center');
  removeButton.innerText = '-';
  foodItem.append(removeButton);
  //add clickevent for - button
  removeButton.addEventListener('click', (eventObj) => {
    console.log('You clicked - !')
    quantityTracker.innerText -= 1

    //  //need to somehow make li dissapear at value === 0 --> am i missing a for loop??? #stuck
    //  if (quantityTracker.innerText === 0) {
    //   shopingBag.innerHTML ='' }
  });

  //quantity
  const quantityTracker = document.createElement('span');
  quantityTracker.classList.add('quantity-text', 'center');
  quantityTracker.innerText = 1
  foodItem.append(quantityTracker);

  //add button
  const addButton = document.createElement('button');
  addButton.classList.add('quantity-btn', 'add-btn', 'center');
  addButton.innerText = '+';
  foodItem.append(addButton);

  //add clickevent
  addButton.addEventListener('click', (eventObj) => {
    console.log('You clicked add button!')
    quantityTracker.innerText ++ 
  });
  
}