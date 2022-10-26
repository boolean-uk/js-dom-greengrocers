
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
const itemCartList = document.querySelector('.cart--item-list');
const total = document.querySelector('.total-number');

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
      addItem(item)
      showSelectedItem(item)
      
    })
    
  }); 
}

renderItems();

function showSelectedItem(item){
      const itemCart = document.createElement('li');
      const itemCartImg = document.createElement('img');
      cartList.forEach(element => {
        if(element.name === item.name){
          itemCartImg.setAttribute('src', 'assets/icons/' + item.id + '.svg')
        }
      });

      const itemCartName = document.createElement('p');
      cartList.forEach(element => {
        if(element.name === item.name){
          itemCartName.innerText = item.name;
        }
      });
      const reduceItem = document.createElement('button');

      cartList.forEach(element => {
        if(element.name === item.name){
          reduceItem.innerText = "-";
        }
      });

      const quntityCartItem = document.createElement('span');
      cartList.forEach(element => {
        if(element.name === item.name){
          quntityCartItem.innerText = element.amount;
        }
      });
      
      const increaseCartItem = document.createElement('button');
      cartList.forEach(element => {
        if(element.name === item.name){
          
          increaseCartItem.innerText = "+";
        }
      });
      
      itemCart.appendChild(itemCartImg);
      itemCart.appendChild(itemCartName);
      itemCart.appendChild(reduceItem);
      itemCart.appendChild(quntityCartItem);
      itemCart.appendChild(increaseCartItem);
      itemCartList.appendChild(itemCart);
  
      increaseCartItem.addEventListener('click', () => {
        addItem(item);
        cartList.forEach(element => {
          if(element.name === item.name){
            quntityCartItem.innerText = element.amount;
          }
        });
      })

      reduceItem.addEventListener('click', () => {
        removeItem(item)
        cartList.forEach(element => {
          if(element.name === item.name){
            quntityCartItem.innerText = element.amount;
          }
        });
      })

      calculateTotal(item)
}

 
// adding selected items
const cartList = [];
const cartObj = {};
function addItem(item){
  if(cartList.length ==0){
    cartObj.name = item.name;
    cartObj.price = item.price;
    cartObj.amount = 1; 
    cartList.push(cartObj);
  }

  else {
    cartList.forEach( product => {
      if(product.name === item.name){
        let index = cartList.indexOf(product);
        cartObj.name = item.name;
        cartObj.price = item.price;
        cartObj.amount = product.amount + 1; 
        cartList[index] = cartObj;
      }
      else if(!Object.values(product).includes(item.name)){
        cartObj.name = item.name;
        cartObj.price = item.price;
        cartObj.amount = 1; 
        cartList.push(cartObj);
      }
    });
  }
}
 
 function removeItem(item){
  cartList.forEach(element => {
    if(element.name === item.name && element.amount > 0){
      element.amount -= 1;
    }
  });
 }

 function calculateTotal(item){
  cartList.forEach(element => {
    if(element.name == item.name){
      total.innerText = element.amount* element.price;
    }
  });
 }
