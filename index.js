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
const shop = document.querySelector(".store--item-list");
const cart = document.querySelector(".cart--item-list");
const addedPrice = document.querySelector(".added-price");

function showShop(){
  shop.innerHTML = ""
  state.items.forEach((item) => {
    // console.log("eachOne", item)
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");
    const img = document.createElement("img");
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = `${item.name}`;
    const addButton = document.createElement("button");
    addButton.innerText = "add to cart";
    addButton.addEventListener("click", function (e) {
      console.log("here is the id", item.id);

    if (!item.quantity) {
      console.log("which boolean", !item.quantity);
      console.log("quantity", item.quantity);
      item.quantity = 0;
      console.log("here", item.quantity)
    }

    item.quantity += 1;

    if (!state.cart.find(({id}) => id === item.id)) {
    
      console.log("it must be from here", !state.cart);
      state.cart.push(item);

    }
  
    cartItem();

  });
  li.append(div, addButton);
  div.append(img);
  shop.append(li);
  });
}
showShop()

function cartItem() {
  let totalPrice = 0;
  cart.innerText = "";
  state.cart.forEach((item) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("class", "cart--item-icon");
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = `${item.name}`;
    const p = document.createElement("p");
    p.innerText = `${item.name}`;
    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "quantity-btn remove-btn center");
    removeButton.innerText = "-";
    totalPrice += item.quantity * 0.35;
    removeButton.addEventListener("click", () => {
      item.quantity--;
      
      
      if (item.quantity <= 0) {
        
        state.cart = state.cart.filter((decreasingItem) => decreasingItem.id !== item.id
          );
        }

        cartItem();
      });
      const span = document.createElement("span");
      span.setAttribute("class", "quantity-text center");
      span.innerText = item.quantity;
      const addButton = document.createElement("button");
      addButton.setAttribute("class", "quantity-btn add-btn center");
      addButton.innerText = "+";
      addButton.addEventListener("click", () => {
        item.quantity++;
        console.log("add button", item.quantity)
        cartItem();
      });
      
      cart.append(li);
      li.append(img, p, removeButton, span, addButton);
      return li;
    });
    
    calculate(totalPrice);
  }
  cartItem();
  
  function calculate(totalPrice) {
    addedPrice.innerText = "£" + totalPrice.toFixed(2);
  }
  // Gonna add filter
  