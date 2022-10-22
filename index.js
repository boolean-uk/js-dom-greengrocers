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
const groceries = state.items;

const gorcersList = document.querySelector('.store--item-list');
const itemCartList = document.querySelector('.cart--item-list')

// Rendering items function

function renderItems(){
  groceries.forEach(item => {
    const srcImg = 'assets/icons/' + item.id + '.svg';  
    const gorcersItem = document.createElement('li');
    const div = document.createElement('div');
    const gorceryItemImage = document.createElement('img');
    gorceryItemImage.setAttribute('src', srcImg);
    const addToCart = document.createElement('button'); 
    addToCart.innerText = "Add to cart";
    
    div.appendChild(gorceryItemImage);
    gorcersItem.appendChild(div);
    gorcersItem.appendChild(addToCart);
    gorcersList.appendChild(gorcersItem);

    addToCart.addEventListener('click', () =>{
            showSelectedItem(item);
    })
    
    gorceryItemImage.addEventListener('click', () =>{
      showSelectedItem(item)
    })
    
  }); 
}

renderItems();

function showSelectedItem(item){
  const itemCart = document.createElement('li');
  const itemCartImg = document.createElement('img');
  itemCartImg.setAttribute('src', 'assets/icons/' + item.id + '.svg')
  const itemCartName = document.createElement('p');
  itemCartName.innerText = item.name;
  const reduceItem = document.createElement('button');
  reduceItem.innerText = "-";
  const quntityCartItem = document.createElement('span');
  quntityCartItem.innerText = 1;
  const increaseCartItem = document.createElement('button');
  increaseCartItem.innerText = "+";  
  itemCart.appendChild(itemCartImg);
  itemCart.appendChild(itemCartName);
  itemCart.appendChild(reduceItem);
  itemCart.appendChild(quntityCartItem);
  itemCart.appendChild(increaseCartItem);
  itemCartList.appendChild(itemCart);
}

// js
// first create function to render the image of the item to the header putting it in div as defined in the store.html
// insert button called "add cart" with the image in div, it is clickable, by setting the addEventlistner.
// to add the image to the cart and calculate the total price based on the number of added items.
// Once added to the cart, - and + button should be added along side the image of the item.
// to decrease and increase the number of items in the cart and calculate the amount and price of
// the total added items. 
