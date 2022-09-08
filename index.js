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

let groceryList = document.querySelector(".store--item-list");
const cartItemList = document.querySelector(".cart--item-list");

function createStoreItemList() {
  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i];

    const listItem = document.createElement("li");
    listItem.innerText = item.name;
    groceryList.append(listItem);

    // adding image to listItem//
    const itemImage = document.createElement("div");
    itemImage.setAttribute("class", "store--item-icon");
    itemImage.innerHTML = `<img src="assets/icons/${item.id}.svg" alt="${item.name}" />`;
    listItem.append(itemImage);

    // adding button to listItem//
    const addToCartBtn = document.createElement("button");
    addToCartBtn.innerHTML = "ADD TO CART";
    listItem.append(addToCartBtn);

    //adding event listener to add button - unfinished//
    addToCartBtn.addEventListener("click", () => {
      if (!item.quantity) {
        item.quantity = 0;
      }

      item.quantity++;

      if (!state.cart.find(({id})=> id === item.id) ) {
        state.cart.push(item);
      }
      
      renderCart();
    });
  }
}
createStoreItemList();

//renderCart function//
function renderCart() {
  cartItemList.innerHTML = ''
  let totalPrice = 0
  state.cart.forEach((item) => {
    totalPrice += item.quantity * item.price

    cartItem = document.createElement("li");
    cartItemList.append(cartItem);

    cartItemImg = document.createElement("img");
    cartItemImg.setAttribute("src", `assets/icons/${item.id}.svg`);
    cartItemImg.setAttribute("class", "cart--item-icon");
    cartItemImg.setAttribute("alt", `${item.name}`);
    cartItem.append(cartItemImg);

    //adding <p> to cartItem//
    const pEl = document.createElement("p");
    pEl.innerText = item.name;

    //creating 1st button within cartItem//
    const buttonRemove = document.createElement("button");
    buttonRemove.innerText = "-";
    buttonRemove.setAttribute("class", "quantity-btn remove-btn center");

    //creating span within cartItem //
    const spanEl = document.createElement("span");
    spanEl.setAttribute("class", "quantity-text center");
    spanEl.innerText = item.quantity;

    //creating 2nd button within cartItem//
    const buttonAdd = document.createElement("button");
    buttonAdd.setAttribute("class", "quantity-btn add-btn center");
    buttonAdd.innerText = "+";

    //adding all to cartItem //
    cartItem.append(pEl, buttonRemove, spanEl, buttonAdd);


    //adding event listener to add button
    buttonAdd.addEventListener("click", () => {
      item.quantity++
      renderTotalCart(totalPrice)
      renderCart()
    });

    //adding event listener to remove button - unfinished//

    buttonRemove.addEventListener("click", () => {
      item.quantity--
      if(item.quantity <= 0 ) {
        state.cart = state.cart.filter(thisItem => thisItem.id != item.id)
      }
      renderTotalCart(totalPrice)
      renderCart()

    });
  });
  renderTotalCart(totalPrice)
}

// calculating total sum//

function renderTotalCart(totalPrice) {
  const total = document.querySelector(".total-number");
  

  total.innerText = "£" + totalPrice.toFixed(2)

}
