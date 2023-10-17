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



const storeItemList = document.querySelector(".store--item-list");
const cartIItemList = document.querySelector(".cart--item-list");
const totalNumber = document.querySelector(".total-number");

function renderStoreItems() {
  storeItemList.innerHTML = " ";
  state.items.forEach((item) => {
    const listingTheItems = document.createElement("li");
    storeItemList.append(listingTheItems);
   
    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");
    listingTheItems.append(div);

    const imgItems = document.createElement("img");
    imgItems.src = `assets/icons/${item.id}.svg`;
    imgItems.alt = "${items.id}";
    div.append(imgItems);
    
    const storeAddButton = document.createElement("button");
    storeAddButton.innerText = "Add to cart";
    listingTheItems.append(storeAddButton);
   
    storeAddButton.addEventListener("click", (e) => {
      console.log("Item has been selected!");
      item.quantity += 1;
      addItem(item);
      placeItems_Cart;
      productTotal;
    });
  });
}
function addItem(item) {
  if (state.cart.find((produce) => produce.name === item.name) === undefined) {
    item.quantity = 1;
    state.cart.push(item);
    placeItems_Cart();
  } else {
    item.quantity++;
    placeItems_Cart();
  }
}

function placeItems_Cart() {
  cartIItemList.innerHTML = " ";
  state.cart.forEach((item) => {
  
    const cartItemli = document.createElement("li");
    cartIItemList.append(cartItemli);
   
    const cartItemImg = document.createElement("img");
    cartItemImg.setAttribute("class", "cart--item-icon");
    cartItemImg.src = `assets/icons/${item.id}.svg`;
    cartItemImg.alt = "${items.id}";
    cartItemli.append(cartItemImg);
    
    const itemName = document.createElement("p");
    itemName.innerText = `${item.name}`;
    cartItemli.append(itemName);
    const takeAwayButton = document.createElement("button");
    takeAwayButton.setAttribute("class", "quantity-btn remove-btn center");
    takeAwayButton.innerText = "-";
    cartItemli.append(takeAwayButton);
   
    takeAwayButton.addEventListener("click", (e) => {
      item.quantity -= 1;
      if (item.quantity === 0) {
        const index = state.cart.indexOf(item);
        state.cart.splice(index, 1);
      }
      placeItems_Cart();
      productTotal();
    });
  
    const quantityText = document.createElement("span");
    quantityText.setAttribute("class", "quantity-text center");
    quantityText.innerText = `${item.quantity}`;
    cartItemli.append(quantityText);
    const plusButton = document.createElement("button");
    plusButton.setAttribute("class", "quantity-btn add-btn center");
    plusButton.innerText = "+";
    cartItemli.append(plusButton);
    plusButton.addEventListener("click", (e) => {
      item.quantity++;
      placeItems_Cart();
      productTotal();
    });
  });
}

function productTotal() {
  let total = 0;
  state.cart.forEach((cartItem) => {
    total += cartItem.quantity * cartItem.price;
  });

  totalNumber.innerText = `£${total}`;
  totalNumber.innerText = `£${total.toFixed(2)}`;
}

renderStoreItems();
placeItems_Cart();
productTotal();
