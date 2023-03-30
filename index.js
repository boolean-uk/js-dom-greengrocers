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
const cartArray = state.cart

const createLi = () => {
  for(let i = 0; i < itemArray.length; i++){
    const myLi = document.createElement('li')
    const theDiv = document.createElement('div')
    const foodButton = document.createElement("button");
    const imageOfFood = document.createElement('img')
    theDiv.classList = "store--item-icon"
    greenGrocers.append(myLi)
    myLi.append(theDiv)
    const fruitAndVegId = state.items[i].id
    imageOfFood.setAttribute('src', "/assets/icons/" + fruitAndVegId + ".svg" )
    theDiv.append(imageOfFood)
    myLi.append(foodButton)

    foodButton.textContent = ' add to cart'

    foodButton.addEventListener('click', () => {
      const item = itemArray[i];
      if(cartArray.some((x) => x.id === item.id)) {
        cartArray[cartArray.indexOf(item)].quantity++;
        cartArray[cartArray.indexOf(item)].price =
        cartArray[cartArray.indexOf(item)].price ;
        createCartItem()
        console.log(cartArray);
      } else {
        item.quantity = 1;
        cartArray.push(item);
        createCartItem()
        console.log(cartArray);
      }

    })
  }
}

let totalCost = 0;

const createCartItem = () => {
  userCart.innerHTML = "";
  totalCost = 0;
  if(cartArray.length === 0){
    totalCost = 0;
    total.innerHTML = totalCost.toFixed(2);
    return;
  }
  cartArray.forEach((item, index) => {
  const cartLi = document.createElement('li')
  const imageOfFoodInCart = document.createElement('img')
  const foodName = document.createElement('p')
  const removeBtn = document.createElement('button')
  const quantitySpan = document.createElement('span')
  const addBtn = document.createElement('button')
  

  removeBtn.classList = 'quantity-btn remove-btn center'
  
  removeBtn.textContent = '-'


  removeBtn.addEventListener('click', () => {
    item.quantity--;
    totalCost -= item.price * item.quantity;
    total.innerHTML = totalCost.toFixed(2);
    if(item.quantity === 0){
      cartArray.splice(index,1);
      createCartItem(); 
    }
    else{
      quantitySpan.innerHTML = item.quantity;
    }
  });


  addBtn.addEventListener('click', () => {
    item.quantity++;
    totalCost += item.price * item.quantity;
    total.innerHTML = totalCost.toFixed(2);
    quantitySpan.innerHTML = item.quantity;
  });


  
  addBtn.classList = 'quantity-btn add-btn center'
  addBtn.textContent = '+'
  
  quantitySpan.innerHTML= item.quantity
  
  foodName.textContent = state.cart[index].name
  
  
  const foodId = item.id
  
  imageOfFoodInCart.classList = "cart--item-icon"
  imageOfFoodInCart.setAttribute('src', "/assets/icons/" + foodId + ".svg" )
  
  userCart.append(cartLi)
  cartLi.append(imageOfFoodInCart, foodName, removeBtn,quantitySpan,addBtn)

  const total = document.querySelector(".total-number");
  totalCost += item.price * item.quantity; 
  // totalCost += item.price;

  total.innerHTML = totalCost.toFixed(2)
  

  console.log('here is the total ' , total)





  });
  }

const init = () => {
  //cartForLoop()
  createLi()
  createCartItem()
}

init()
