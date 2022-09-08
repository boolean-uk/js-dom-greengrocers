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
      state.cart.push(item);
      
      cartItemList.innerHTML = "";

      renderCart();
    });
  }
}
createStoreItemList();

//renderCart function//
function renderCart() {
  state.cart.forEach((item) => {
    cartItem = document.createElement("li");
    cartItemList.append(cartItem);

    cartItemImg = document.createElement("img");
    cartItemImg.setAttribute("src", `assets/icons/${item.id}.svg`);
    cartItemImg.setAttribute("class", "cart--item-icon");
    cartItemImg.setAttribute("alt", `${item.name}`);
    cartItem.append(cartItemImg);
    let sum = 1;

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
    spanEl.innerHTML = item.quantity;

    //creating 2nd button within cartItem//
    const buttonAdd = document.createElement("button");
    buttonAdd.setAttribute("class", "quantity-btn add-btn center");
    buttonAdd.innerText = "+";

    //adding all to cartItem //
    cartItem.append(pEl, buttonRemove, spanEl, buttonAdd);

    //adding event listener to remove button - unfinished//

    buttonRemove.addEventListener("click", () => {
      if (spanEl.textContent <= 1) {
        cartItem.remove();
      }

      let removeIndex = state.cart.indexOf(item);
      state.cart.splice(removeIndex, 1);
      sum--;
      spanEl.textContent = sum;
      totalCart();
    });
  });
}

// calculating total sum//

function totalCart() {
  const total = document.querySelector(".total-number");
  total.innerHTML = "";
  let sumTotal;

  let updatedCart = state.cart.map((a) => a.price);

  if (updatedCart.length <= 0) {
    total.textContent = "£0.00";
    return;
  }

  sumTotal = updatedCart.reduce((pv, cv) => pv + cv);

  total.textContent = "£" + Math.round(sumTotal * 100) / 100;

}
