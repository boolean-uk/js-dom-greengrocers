const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      img: 'assets/icons/001-beetroot.svg'
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      img: 'assets/icons/002-carrot.svg'
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      img: 'assets/icons/003-apple.svg'
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      img: 'assets/icons/004-apricot.svg'
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      img: 'assets/icons/005-avocado.svg'
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      img: 'assets/icons/006-bananas.svg'
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      img: 'assets/icons/007-bell-pepper.svg'
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      img: 'assets/icons/008-berry.svg'
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      img: 'assets/icons/009-blueberry.svg'
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      img: 'assets/icons/010-eggplant.svg'
    }
  ],
  cart: []
};
//taskList
const list = document.getElementById("itemList");

const btn = document.getElementById("btn");

const cartList = document.getElementById("cartList");

const total = document.getElementById('total');


function runCommand(id) {
  let itemExists = false; 
  console.log("Adding item to cart with id:", id);
  const item = state.items.find(item => item.id === id);
  if (item) {
    state.cart.forEach(itemInCart => {
      if(item.id === itemInCart.id){ 
        itemInCart.quantity++; 
        itemExists = true; 
      }
    });

    if (!itemExists) {
      const inputItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.img,
        quantity: 1 
      };

      state.cart.push(inputItem);
      console.log("Added item:", item.name);
    }

    cartOutput(); 
  }
}

function cartOutput() {
  console.log("itemOutput")
  cartList.innerHTML = ""; 
  state.cart.forEach(item => {
    const listLi = document.createElement('li');

    const newImage = document.createElement('img');
    newImage.setAttribute('class', 'cart--item-icon');
    newImage.setAttribute('alt', item.name);
    newImage.src = item.img;

    const listName = document.createElement('p');
    listName.innerHTML = item.name;

    const listBtnRm = document.createElement('button');
    listBtnRm.setAttribute('class', 'quantity-btn remove-btn center');
    listBtnRm.onclick = function() { deleteItem(item.id); };

    const listSpan = document.createElement('span');
    listSpan.innerHTML = item.quantity;

    const listBtnAdd = document.createElement('button');
    listBtnAdd.setAttribute('class', 'quantity-btn add-btn center');
    listBtnAdd.onclick = function() { runCommand(item.id); };

    listLi.appendChild(newImage);
    listLi.appendChild(listName);
    listLi.appendChild(listBtnRm);
    listLi.appendChild(listSpan);
    listLi.appendChild(listBtnAdd);
    cartList.appendChild(listLi);
  });
  calculateTotal();
}

function deleteItem(id){
  let itemIndex = state.cart.findIndex(itemInCart => id === itemInCart.id)
  console.log("Adding item to cart with id:", id);
  state.cart.forEach(itemInCart => {
      if(id === itemInCart.id){ 
        itemInCart.quantity--; 
        if(itemInCart.quantity <= 0){
          state.cart.splice(itemIndex, 1)
        }
      }
    });
      console.log("deleted item:");
      cartOutput(); 
    }


function itemOutput() {
  list.innerHTML = ""; 
  state.items.forEach(item => {
    const listCard = document.createElement('li');
    listCard.setAttribute('id', item.id);

    const newImage = document.createElement('img');
    newImage.setAttribute('alt', item.name);
    newImage.src = item.img;

    const listPrice = document.createElement('p');
    listPrice.innerHTML = item.price;

    const listBtn = document.createElement('button');
    listBtn.setAttribute('class', 'btn');
    listBtn.onclick = function() { runCommand(item.id); };
    listBtn.innerHTML = 'Buy';

    listCard.appendChild(newImage);
    listCard.appendChild(listPrice);
    listCard.appendChild(listBtn);
    list.appendChild(listCard);
  });
}

function calculateTotal(){
  let sum = 0;
  state.cart.forEach(itemInCart =>{
    sum += itemInCart.price*itemInCart.quantity;
  })
  total.innerHTML = sum.toFixed(2);
}

function main() {
  console.log("Initializing the application...");
  itemOutput(); 
}

main();