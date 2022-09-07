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

//create DOM selectors
const greenGrocers = document.querySelector('.store--item-list' )
const userCart = document.querySelector('.cart--item-list')

const itemArray = state.items
//console.log('test array ',itemArray )

//const fruitAndVegName = state.items[i].name
//console.log('test fruit ', fruitAndVegName)


const createLi = () => {
  for(let i = 0; i < itemArray.length; i++){
    const myLi = document.createElement('li')
    const theDiv = document.createElement('div')
    const foodButton = document.createElement("button");


    foodButton.textContent = ' add to cart'
    console.log(foodButton)
    theDiv.classList = "store--item-icon"
    // const foodDiv = document.createElement('div')
    greenGrocers.append(myLi)
    myLi.append(theDiv)

    const fruitAndVegId = state.items[i].id
    const imageOfFood = document.createElement('img')
    //console.log(fruitAndVegId)
     imageOfFood.setAttribute('src', "/assets/icons/" + fruitAndVegId + ".svg" )
    // console.log(" the image here is ", imageOfFood)
    theDiv.append(imageOfFood)
    myLi.append(foodButton)
  }

}

createLi()






// function renderCart() {
//   state.cart.forEach( item => {
//     //create cart elements for each item and appent them to the cart ul
//   })  
//  }

//  addToCartBtn.addEventListener('click', function(){
//    userCart.push(item)
//    renderCart()
//  })

