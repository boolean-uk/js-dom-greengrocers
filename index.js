document.addEventListener("DOMContentLoaded", () => {
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



window.onload = () => {
  renderStoreItems();
};


sortStoreItemsAlphabetically = () => { 
  state.items.sort((a, b) => a.name.localeCompare(b.name));
  document.querySelector(".store--item-list").innerHTML = "";
  console.log(state.items);
  renderStoreItems();
};

const filter = {
  items: [

  ]
}
const storeItemList = document.querySelector(".store--item-list");
const filterByFruitButton = document.createElement("button");
filterByFruitButton.setAttribute("class", "filter-button");
filterByFruitButton.appendChild(document.createTextNode("Filter by fruit"));
filterByFruitButton.addEventListener("click", toggleFilterByFruit);
function renderStoreItems() {
  storeItemList.innerHTML = "";

  // Render the store items
  const imageStoreItemArray = [];
  for (let i = 0; i < 10; i++) {
      if (!filter.items.includes(state.items[i].name)) {
          const image = getItemImageUrls(state.items[i].id.toString());
          image.setAttribute("class", "store--item-icon");
          imageStoreItemArray.push(image);
      }
  }

  for (let i = 0; i < imageStoreItemArray.length; i++) {
      const item = document.createElement("li");
      item.setAttribute("class", "store--item");
      item.appendChild(imageStoreItemArray[i]);
      const button = document.createElement("button");
      button.setAttribute("class", "add-button");
      button.setAttribute("id", state.items[i].id);
      button.addEventListener("click", () => addItemToCart(state.items[i].id));
      button.appendChild(document.createTextNode("Add to cart"));
      item.appendChild(button);
      storeItemList.appendChild(item);
  }
  // Create and append filter and sort buttons once
  const sortStoreItemsAlphabeticallyButton = document.createElement("button");
  sortStoreItemsAlphabeticallyButton.setAttribute("class", "sort-button");
  sortStoreItemsAlphabeticallyButton.appendChild(document.createTextNode("Sort items alphabetically"));
  sortStoreItemsAlphabeticallyButton.addEventListener("click", sortStoreItemsAlphabetically);

  
  
  storeItemList.appendChild(filterByFruitButton);
  storeItemList.appendChild(sortStoreItemsAlphabeticallyButton);


}


function toggleFilterByFruit() {
  const filterByFruitButton = document.querySelector(".filter-button"); 
  filterByFruitButton.classList.toggle("clicked"); 
  const clicked = filterByFruitButton.classList.contains("clicked"); 
  filterByFruitButton.style.backgroundColor = clicked ? "red" : "white"; 
  filter.items = clicked ? ["beetroot", "carrot", "bell pepper", "eggplant", "berry", "blueberry"] : []; 
  renderStoreItems();
}



function addItemToCart(itemId) {
  const item = state.items.find(item => item.id === itemId);
  
  if(state.cart.includes(item)) {
    item.quantity = item.quantity + 1;
  }
  else{
    item.quantity = 1;
    state.cart.push(item);
  }
  renderCart();

  updatePrice();
}

function updatePrice(){
  const total = document.querySelector(".total-number");
  console.log(total);
  total.innerHTML = `Total: $${calculateTotal().toFixed(2)}`;

}

function renderCart() {
  const cart = document.querySelector(".cart--item-list");
  cart.innerHTML = "";
  state.cart.forEach(item => {
      const li = document.createElement("li");
      const image = getItemImageUrls(item.id.toString());
      image.setAttribute("class", "cart--item-icon");
      li.appendChild(image);
      li.appendChild(document.createTextNode(item.name));

      const buttonRemove = document.createElement("button");
      buttonRemove.setAttribute("class", "quantity-btn remove-btn center");
      buttonRemove.setAttribute("id", item.id);
      buttonRemove.addEventListener("click", () => removeItemFromCart(item.id));
      li.appendChild(buttonRemove);

      const quantity = document.createElement("span");
      quantity.setAttribute("class", "quantity-text center");
      quantity.appendChild(document.createTextNode(`${item.quantity}`));
      li.appendChild(quantity);

      buttonAdd = document.createElement("button");
      buttonAdd.setAttribute("class", "quantity-btn add-btn center");
      buttonAdd.setAttribute("id", item.id);
      buttonAdd.addEventListener("click", () => addItemToCart(item.id));

      
      li.appendChild(buttonAdd);

      cart.appendChild(li);
  });
}

function calculateTotal() {
  return state.cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
  }, 0);
}

function removeItemFromCart(itemId) {
  const item = state.cart.find(item => item.id === itemId);
  if (item.quantity > 1) {
      item.quantity = item.quantity - 1;
  } else {
      state.cart = state.cart.filter(item => item.id !== itemId);
  }
  renderCart();
  updatePrice();
}




function getItemImageUrls(itemName) {
  const image = document.createElement("img");
  image.setAttribute("src", `assets/icons/${itemName}.svg`);
  image.setAttribute("alt", itemName);
  return image;
}
});