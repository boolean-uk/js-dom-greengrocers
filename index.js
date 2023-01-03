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
      addGroceryItem()
    })
  }
}

renderStoreItems()



//Create shopping cart array with added quantity key
const cartArray = Object.assign(groceryItems)
for (let i = 0; i < cartArray.length; i++) {
  cartArray[i].quantity = 0
}
// console.log('inside new cart arrsat', cartArray)

//SHOPPING CART
const inYourCart = document.querySelector('#cart') //aka "main"
const shopingBag = document.querySelector('.cart--item-list') //aka the ul

//ADD TO SHOPPING CART
function addGroceryItem() {
const foodItem = document.createElement('li')
shopingBag.append(foodItem)

// //image into li
const foodImg = document.createElement('img')
foodImg.setAttribute('class', '.cart--item-icon')
foodImg.setAttribute('src', `assets/icons/${cartArray[i].id}.svg`) //or 'cartArray'
foodImg.setAttribute('alt', `${groceryItems.name}`)
// //maybe do need to give the button an id to link which button is pressed to which list gets created

//create p 
const foodName = document.createElement('p')
foodName.innerText = 'food' //`${cartArray[i].name}`
foodItem.append(foodName)

//- button
const removeButton = document.createElement('button')
removeButton.setAttribute('class', 'quantity-btn')
removeButton.setAttribute('class', 'remove-btn')
removeButton.setAttribute('class', 'center')
removeButton.innerText = '-'
foodName.append(removeButton)

//quantity
const quantityTracker = document.createElement('span')
quantityTracker.setAttribute('class', 'quantity-text')
quantityTracker.setAttribute('class', 'center')
quantityTracker.innerText = '1' //make dynamic later so that quantity= #times clicked or have quantity = let 0.... smth
removeButton.append(quantityTracker)

//add button
const addButton = document.createElement('button')
addButton.setAttribute('class', 'quantity-btn')
addButton.setAttribute('class', 'remove-btn')
addButton.setAttribute('class', 'center')
addButton.innerText ='+'
quantityTracker.append(addButton)
}