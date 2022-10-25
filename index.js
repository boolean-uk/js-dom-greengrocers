const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.4,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.3,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.2,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 1.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.3,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.3,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.1,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.2,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.65,
    },
  ],
  cart: [],
};
const storeHeader = document.querySelector(".store--item-list");
const storeCart = document.querySelector(".cart--item-list");
const totalNumber = document.querySelector(".total-number");
//creates item selction in store header
function store_Item(items) {
  storeHeader.innerHTML = " ";
  items.forEach((item) => {
    const storeItem = document.createElement("li");
    const storeItemIcon = document.createElement("div");
    const storeItemIconImg = document.createElement("img");
    storeItemIconImg.setAttribute("class", "store--item-icon");
    storeItemIconImg.setAttribute("src", `assets/icons/${item.id}.svg`);
    storeItemIconImg.setAttribute("alt", item.name);
    const addToCart = document.createElement("button");
    addToCart.innerText = "Add to cart";
    storeHeader.appendChild(storeItem);
    storeItem.appendChild(storeItemIcon);
    storeItemIcon.appendChild(storeItemIconImg);
    storeItem.appendChild(addToCart);
    //click event to add item to cart
    addToCart.addEventListener("click", () => {
      canAddToCart(item);

      addCartItem(state.cart);
      console.log(state.cart);
      calculateTotal();
    });
  });
}
// Checks if item is already in cart
function canAddToCart(item) {
  if (state.cart.find((product) => product === item) === undefined) {
    item.quantity = 1;
    state.cart.push(item);
  } else {
    item.quantity += 1;
  }
}

// creates item in cart
function addCartItem(items) {
  storeCart.innerHTML = " ";
  state.cart.forEach((item) => {
    state.cart.quantity = 1;
    const cartItem = document.createElement("li");
    const cartItemImg = document.createElement("img");
    cartItemImg.setAttribute("class", "cart--item-icon");
    cartItemImg.setAttribute("src", `assets/icons/${item.id}.svg`);
    cartItemImg.setAttribute("alt", `${item.name}`);
    const cartItemName = document.createElement("p");
    cartItemName.innerText = `${item.name}`;
    const lowerButton = document.createElement("button");
    lowerButton.setAttribute("class", "quantity-btn remove-btn center");
    lowerButton.innerText = "-";
    // click event to lower quantity
    lowerButton.addEventListener("click", () => {
      item.quantity--;
      if (item.quantity === 0) {
        const index = state.cart.indexOf(item);
        state.cart.splice(index, 1);

        render();
        calculateTotal();
      } else calculateTotal();
      quantityText.innerText = `${item.quantity}`;
    });
    const quantityText = document.createElement("span");
    quantityText.setAttribute("class", "quantity-text center");
    quantityText.innerText = `${item.quantity}`;
    const raiseButton = document.createElement("button");
    raiseButton.setAttribute("class", "quantity-btn add-btn center");
    raiseButton.innerText = "+";
    // click event to raise quantity
    raiseButton.addEventListener("click", () => {
      item.quantity++;
      calculateTotal();
      quantityText.innerText = `${item.quantity}`;
    });
    storeCart.appendChild(cartItem);
    cartItem.appendChild(cartItemImg);
    cartItem.appendChild(cartItemName);
    cartItem.appendChild(lowerButton);
    cartItem.appendChild(quantityText);
    cartItem.appendChild(raiseButton);
  });
}
// calculate the total price of all items in cart
function calculateTotal(items) {
  totalNumber.innerText = " ";
  let total = 0;
  state.cart.forEach((item) => {
    total += item.quantity * item.price;
  });
  total = total.toFixed(2);
  totalNumber.innerText = "£" + `${total}`;
}
//refreshes page
function render() {
  store_Item(state.items);
  addCartItem(state.cart);
}
store_Item(state.items);
// For all items in const state ,
//- render an li in store header
//- Each li shoud contain appropriate image and a "add to cart" button
//- Pressing the the button should activate an event listener that:
//       -- adds that item to the cart as a li
//       -- renders that item to user
//       -- If item is already in cart, increase quantity
// cart item li contains image, item name and quantity
//
// add event listener to cart li, increasing or decreasing quantity (when quantity is 0 remove from cart)
// in total section create function to calculate total cost of cart:
//       --sum of all items(item price *quantity)
//       -- display that value in span "total-number"
//       -- if cart is empty display "£0.00"
