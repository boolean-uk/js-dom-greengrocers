const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      quantity: 0,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      quantity: 0,
    },
  ],
  cart: [],
};

// rendering store items
const storeUl = document.querySelector(".store--item-list");
const cartUl = document.querySelector(".cart--item-list");
let totalSum = 0;
let totalNumSpan = document.querySelector(".total-number");
console.log(totalNumSpan.innerText);

function renderAllStoreItems() {
  for (let i = 0; i < state.items.length; i++) {
    let item = state.items[i];

    const storeLi = document.createElement("li");
    storeUl.appendChild(storeLi);

    const storeLiIconDiv = document.createElement("div");
    storeLiIconDiv.setAttribute("class", "store--item-icon");
    storeLi.appendChild(storeLiIconDiv);

    const storeLiImg = document.createElement("img");
    storeLiImg.setAttribute("src", `assets/icons/${state.items[i].id}.svg`);
    storeLiImg.setAttribute("alt", `${state.items[i].name}`);
    storeLiIconDiv.appendChild(storeLiImg);

    const storeLiBtn = document.createElement("button");
    storeLiBtn.innerText = "Add to cart";
    storeLi.append(storeLiBtn);

    // adding event listener to "add to cart button"
    storeLiBtn.addEventListener("click", () => {
      item.quantity++;
      if (state.cart.includes(state.items[i])) {
        renderCart();
      } else state.cart.push(item);
      calculateTotalPrice();
      renderCart();
    });
  }
}

renderAllStoreItems();

// rendering cart
function renderCart() {
  cartUl.innerHTML = "";
  for (let i = 0; i < state.cart.length; i++) {
    let item = state.cart[i];

    const cartLi = document.createElement("li");
    cartUl.appendChild(cartLi);

    const cartLiImg = document.createElement("img");
    cartLiImg.setAttribute("class", "cart--item-icon");
    cartLiImg.setAttribute("src", `assets/icons/${item.id}.svg`);
    cartLiImg.setAttribute("alt", `${item.name}`);
    cartLi.appendChild(cartLiImg);

    const p = document.createElement("p");
    cartLi.appendChild(p);
    p.innerText = `${item.name}`;

    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "remove-btn");
    removeBtn.innerText = "-";
    cartLi.appendChild(removeBtn);

    removeBtn.addEventListener("click", () => {
      item.quantity--;
      if (item.quantity <= 0) {
        state.cart = state.cart.filter((thisItem) => thisItem.id != item.id);
      }
      calculateTotalPrice();
      renderCart();
    });

    const qntSpan = document.createElement("span");
    qntSpan.setAttribute("class", "quantity-text");
    qntSpan.innerText = state.cart[i].quantity;
    cartLi.appendChild(qntSpan);

    const addBtn = document.createElement("button");
    addBtn.setAttribute("class", "add-btn");
    addBtn.innerText = "+";
    cartLi.appendChild(addBtn);

    // adding event listener to +
    addBtn.addEventListener("click", () => {
      state.cart[i].quantity++;
      calculateTotalPrice();
      renderCart();
    });
  }
}

// creating func to calculate total sum of items
function calculateTotalPrice() {
  const totalPrice = document.querySelector(".total-number");
  let totalPriceText = 0;

  for (item in state.cart) {
    totalPriceText += state.cart[item].quantity * state.cart[item].price;
  }
  totalPrice.innerHTML = `£${totalPriceText.toFixed(2)}`;
  return totalPriceText;
}
