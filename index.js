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
// hint for cart: make a copy of a store item, add a property called
// quantity

//CREATING STORE UL- STOCK --> turn into function


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
    stockImgSvg.setAttribute('alt', `${groceryItems[i].name}`) //how to select from here without manually typing
    stockDiv.append(stockImgSvg)
    
    //trying to add buttons through a function so that I can call the button for a click event 
    const addToCartButton = document.createElement('button')
    addToCartButton.innerText = 'Add to cart'
    stockList.append(addToCartButton)
  }
}



renderStoreItems()


//ADD TO SHOPPING CART
//clickevent
const groceryButton = document.querySelector('.add-to-cart') //--> this? 

document.addEventListener('click', function (event) {
  console.log('You clicked!')
})

function addGroceryItem() {
  //  queryselect stock ul in header(grocerStock) --> add click event to the li in the stock ul
  //Maybe can go back and add id to the buttons? 
  addEventListener

}

//then design groceries inside teh click event ? 






// function createAddToCartButton() {
//   const addToCartButton = document.createElement('button')
//   addToCartButton.innerText = 'Add to cart'
//   console.log('button pls')
//   // addToCartButton.setAttribute('class', 'add-to-cart')
// }