const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.55,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.25,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.75,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.30,
      type: "fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.60,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.85,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.75,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.15,
      type: "vegetable"
    }
  ],
  cart: [],
  filter: "all",
  sort: "alphabeticall"
};


function showItems(){

  const itemList = document.getElementById("item-list");
  itemList.innerHTML = "";

  sortItems();

  state.items.forEach(item => {
  if(state.filter === "all" || state.filter === item.type){
    const itemShow = showItem(item);
    itemList.appendChild(itemShow);
  } 
})
}

function sortItems(){
  if(state.sort === "alphabeticall"){
    return state.items.sort((a, b) => a.name.localeCompare(b.name));
  } else if(state.sort === "price"){
    return state.items.sort((a, b) => a.price - b.price);
  }
}

function showItem(item){
  const container = document.createElement("li");

  const img  = document.createElement("img");
  img.className =".store--item-icon";
  img.src = "assets/icons/" + item.id + ".svg";
  container.appendChild(img);

  const button = document.createElement("button");
  button.type = "button";
  button.value = "btn-" + item.id;
  button.innerHTML = "Add to cart";
  button.onclick = () => addItem(item, state);
  container.appendChild(button);

  return container;
}

function addItem(item) {
  const itemToAdd = state.cart.find(existing => existing.id === item.id)
  if(itemToAdd){
    itemToAdd.quantity += 1;
    showCart();
    console.log(state.filter);
    return;
  } 
  state.cart.push({...item, quantity: 1});
  console.log(state.cart);
  showCart();
  
}

function removeItem(item) {
  const itemToRemove = state.cart.find(existing => existing.id === item.id);
  itemToRemove.quantity -= 1;
  if(itemToRemove.quantity === 0){
    const index = state.cart.indexOf(itemToRemove);
    state.cart.splice(index, 1);
  }
  showCart();
}

function showItemInCart(item){
  const container = document.createElement("li");
  
  const img = document.createElement("img");
  img.className =".cart--item-icon";
  img.src = "assets/icons/" + item.id + ".svg";
  container.appendChild(img);

  const name = document.createElement("p");
  name.innerText = item.name.charAt(0).toUpperCase() + item.name.slice(1);
  container.appendChild(name);

  const removeButton = document.createElement("button");
  removeButton.className = "remove-btn";
  removeButton.type = "button";
  removeButton.value ="btn-remove-" + item.id;
  removeButton.innerHTML = "-";
  removeButton.onclick = () => removeItem(item);
  container.appendChild(removeButton);

  const quantityButton = document.createElement("span");
  quantityButton.className = "quantity-text"
  quantityButton.innerText = item.quantity;
  container.appendChild(quantityButton);

  const addButton = document.createElement("button");
  addButton.className = "add-btn"
  addButton.type = "button";
  addButton.value = "btn-add-" + item.id;
  addButton.innerHTML = "+";
  addButton.onclick = () => addItem(item);
  container.appendChild(addButton);

  return container;

}

function showCart(){
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  for(let i = 0; i < state.cart.length; i++){
    const itemInCartShow = showItemInCart(state.cart[i]);
    cartList.appendChild(itemInCartShow);
  }
  showCartTotal();
}

function showCartTotal(){
  let sum = 0;
  for(let i = 0; i < state.cart.length; i++){
    const item = state.cart[i];
    sum += item.price * item.quantity;
  }
  const totalPrice = document.getElementsByClassName("total-number")[0];
  totalPrice.innerText = `£${sum.toFixed(2)}`;
}

const itemFilter = document.querySelector(".item-filter");
itemFilter.addEventListener("change", () => {
  const filter = itemFilter.value.toLowerCase();
  state.filter = filter;
  showItems();
})

const sortBy = document.querySelector(".item-sort");
sortBy.addEventListener("change", () => {
  const sort = sortBy.value.toLowerCase();
  state.sort = sort;
  showItems();
})

showItems();


