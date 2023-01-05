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
const storeItemUL = document.querySelector(".store--item-list");
const cartItemUL = document.querySelector(".cart--item-list");
const totalItem = document.querySelector(".total-number");
let Total = 0;

function greenGrocery() {
  // iterate over the items array in the state
  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i];

    // creat the li,div,img, element
    const li = document.createElement("li");
    let img = document.createElement("img");
    const div = document.createElement("div");

    // set the attribute for img
    img.setAttribute("class", "cart--item-icon");
    img.setAttribute("src", "./assets/icons/" + item.id + ".svg");
    img.setAttribute("class", "store--item-icon");

    //apend to list name
    storeItemUL.appendChild(li);
    div.append(img);
    li.appendChild(div);
    //add the button
    const button = document.createElement("button");
    button.innerText = "Add to cart";
    li.appendChild(button);
    button.addEventListener("click", function () {
      const shoppingItem = state.items.find(({ id }) => id === item.id);
      if (state.cart.find(({ id }) => id === item.id)) {
        shoppingItem.amount += 1;
      } else {
        shoppingItem.amount = 1;
        state.cart = [...state.cart, shoppingItem];
      }

      cartItemUL.innerHTML = "";
      // state.cart.push(shoppingItem);
      console.log("shopping item", shoppingItem);
      renderCart();
    });
  }
}
greenGrocery();

function renderCart() {
  cartItemUL.innerHTML = "";

  // iterate over the items array in the state
  for (let j = 0; j < state.cart.length; j++) {
    const item = state.cart[j];
    console.log("cart item", item);
    // create the element for ul,li,image,p,button1 ,span,button2

    const liCart = document.createElement("li");
    const imgCart = document.createElement("img");
    const pCart = document.createElement("p");
    const subtractCart = document.createElement("button");
    subtractCart.setAttribute("id", "subtract_" + item.id);
    const spanCart = document.createElement("span");
    const addCart = document.createElement("button");
    addCart.setAttribute("id", "add_" + item.id);

    //set the attribute
    imgCart.setAttribute("class", "cart--item-icon");
    const linkImg = "./assets/icons/" + item.id + ".svg";
    console.log("my link", linkImg);
    imgCart.setAttribute("src", linkImg);

    //apend the image
    cartItemUL.appendChild(liCart);
    liCart.appendChild(imgCart);
    //append the txt
    liCart.appendChild(pCart);
    pCart.innerText = item.name;

    // append the button
    liCart.appendChild(subtractCart);
    subtractCart.innerText = "- ";

    //append the span
    liCart.appendChild(spanCart);
    spanCart.innerText = item.amount;
    liCart.appendChild(addCart);
    addCart.innerText = "+";

    subtractCart.addEventListener("click", function () {
      
      const itemToRemove = state.cart.indexOf(item);
       if (item.amount === 1) {
        state.cart.splice(itemToRemove, 1);
        console.log("state cart", state.cart)
      } 
       else{
        item.amount -= 1;
       }
      renderCart();
       
    });

    addCart.addEventListener("click", function () {
      const itemId = this.id.split("_");
      const thisItem = state.cart.find(({ id }) => id === itemId[1]);
      thisItem.amount += 1;
      spanCart.innerText = thisItem.amount;
      renderCart();
    });
    
  }
  const spantotal = document.querySelector(".total-number");
    spantotal.innerText = getCartTotal();
    console.log("get caret", getCartTotal());
}

function getCartTotal() {
  let total = 0;
  console.log("state cart length", state.cart.length)
  for (let i = 0; i < state.cart.length; i++) {
    const item = state.cart[i];
    console.log("item" ,item);
    total = total + item.price * item.amount;
  }
  
  return total.toFixed(2);
}

renderCart();
