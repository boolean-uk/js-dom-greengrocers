const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: 'veggie',
      img: 'assets/icons/001-beetroot.svg'
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: 'veggie',
      img: 'assets/icons/002-carrot.svg'
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: 'fruit',
      img: 'assets/icons/003-apple.svg'
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: 'fruit',
      img: 'assets/icons/004-apricot.svg'
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: 'veggie',
      img: 'assets/icons/005-avocado.svg'
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: 'fruit',
      img: 'assets/icons/006-bananas.svg'
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: 'veggie',
      img: 'assets/icons/007-bell-pepper.svg'
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: 'berry',
      img: 'assets/icons/008-berry.svg'
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: 'berry',
      img: 'assets/icons/009-blueberry.svg'
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: 'veggie',
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
  cartList.innerHTML = " "; 
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
      const selectedType = document.getElementById("itemFilter").value;
      list.innerHTML = ""; 
    
      const filteredItems = selectedType === "all" ? state.items : state.items.filter(item => item.type === selectedType);
    
      filteredItems.forEach(item => {

        const listCard = document.createElement('li');
        listCard.setAttribute('class', 'item');

        const newImage = document.createElement('img');
        newImage.setAttribute('class', 'item-image');
        newImage.setAttribute('src', item.img);
        newImage.setAttribute('alt', item.name);
        listCard.appendChild(newImage);
    
        const itemName = document.createElement('h3');
        itemName.innerText = item.name;
        listCard.appendChild(itemName);

        const itemPrice = document.createElement('p');
        itemPrice.innerText = `£${item.price.toFixed(2)}`;
        listCard.appendChild(itemPrice);
    
        const buyButton = document.createElement('button');
        buyButton.setAttribute('class', 'buy-btn');
        buyButton.innerText = 'Buy';
        buyButton.onclick = function() { runCommand(item.id); };
        listCard.appendChild(buyButton);

        list.appendChild(listCard);
      });
    }
    

function populateFilterDropdown() {
  const itemFilter = document.getElementById("itemFilter");
  const uniqueTypes = Array.from(new Set(state.items.map(item => item.type)));

  uniqueTypes.forEach(type => {
    const option = document.createElement('option');
    option.value = type;
    option.innerText = type.charAt(0).toUpperCase() + type.slice(1);
    itemFilter.appendChild(option);
  });
}
function setupFilterListener() {
  const itemFilter = document.getElementById("itemFilter");
  itemFilter.addEventListener('change', itemOutput);
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
  populateFilterDropdown();
  setupFilterListener();
  itemOutput(); 
}

main();