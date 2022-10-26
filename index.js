const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
    },
  ],
  cart: [],
};

/*

Create a function that contains variables for store items

  Create an li element for each item in the store
  Create a div to for the image store--item-icon class
  add image into the div
  add the button into the li
  make an event listener for the click

  Remove store-item--list

Create a function that contains variables for cart item

  Create an li element for each item in the cart
  Add the item img for the li
  Create a p element within each li containing state.cart.name
  Create plus and minus button in the li with 'quantity-btn remove-btn//add-btn center'
  
  Create the amount showing in li with 'quantity-text center'
  
Event listener for plus and minus buttons click

 
  Remove from cart--item-list-container


Create function for the total

  Create sum of the cart item price * cart item quantity
  Append sum into span with class total-number 
  
  */

// const storeitems = document.querySelector(".store--item-list");
// const addButton = document.querySelector('.butt');

// function addItemsToStore(item) {
//   const li = document.createElement("li");
//   const div = document.createElement("div");
//   div.setAttribute("class", "store--item-icon");
//   li.appendChild(div);

//   const addButton = document.createElement('button');
//   addButton.setAttribute('class', '.butt');
//   addButton.innerText = 'Add to Cart';
//   li.appendChild(addButton);

//   const img = document.createElement('img');
//   img.setAttribute('src', item.image);
//   img.setAttribute('alt', item.name);
//   div.appendChild(img);

//   storeitems.appendChild(li);
// }

// function addItemstoCart (item) {
//   if (state.cart.includes(item)) {
//     return;
//   }

//   const li = document.createElement('li');

// }

const ItemsInStore = document.querySelector('.store--item-list');
const ItemsInCart = document.querySelector('.cart--item-list');
const addButton = document.querySelector('.butt');



function addItems(item) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  div.setAttribute('class', 'store--item-icon');
  li.appendChild(div);

  const addButton = document.createElement('button');
  addButton.setAttribute('class', '.butt');
  addButton.innerText = 'Add to Cart';
  li.appendChild(addButton);

  const img = document.createElement('img');
  img.setAttribute('alt', item.name);
  img.setAttribute('src', item.image);
  div.appendChild(img);

  ItemsInStore.appendChild(li);

  addButton.addEventListener('click', () => {
    addItemsToCart(item);
  });
}

function render() {
  state.items.forEach((item) => {
    item.number = 1;
    item.image = `assets/icons/${item.id}.svg`;
    addItems(item);
  });
}

function addItemsToCart(item) {
  if (state.cart.includes(item)) {
    return;
    /* else statement*/
  }

  const li = document.createElement('li');

  const p = document.createElement('p');
  p.innerText = item.name;

  const img = document.createElement('img');
  img.setAttribute('class', 'cart--item-icon');
  img.setAttribute('src', item.image);
  img.setAttribute('alt', item.name);
  li.appendChild(img);
  
  li.appendChild(p);

  const minusButton = document.createElement('button');
  minusButton.setAttribute('class', 'remove-btn');
  minusButton.innerText = '-';
  li.appendChild(minusButton);

  const div = document.createElement('div');
  div.innerText = '1';
  li.appendChild(div);
    
  const plusButton = document.createElement('button');
  plusButton.setAttribute('class', 'add-btn');
  plusButton.innerText = '+';
  li.appendChild(plusButton);

  ItemsInCart.appendChild(li);
  state.cart.push(item);
  plusButton.addEventListener('click', () => {
    item.number += 1;
    div.innerText = item.number;
    

  });
  
  minusButton.addEventListener('click', () => {
    item.number -= 1;
    if (item.number < 1) {
      li.remove();
    }
    div.innerText = item.number;
  });
}

render();
