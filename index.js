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
//select existing html elements
// select the store items ul
const storeItem = document.querySelector(".store--item-list");
const cartList = document.querySelector(".cart--item-list");
const totalNum = document.querySelector(".total-number");

function addToCart(item) {
  // const numAlreadyInCart = state.cart.filter((e) => e.id == item.id).length;
  // state.cart.push({ quantity: numAlreadyInCart + 1, ...item });

  const existingItems = state.cart.filter((e) => e.id == item.id);
  // const existingItems = state.cart.filter((e) => e['id'] == item['id']);

  if (existingItems[0]) {
    existingItems[0].quantity++;
  } else {
    state.cart.push({ quantity: 1, ...item });
  }

  // state.cart.push({quantity: 0, id:item.id, name: item.name, price:item.price});

  console.log(">>> your cart had: %o", state.cart);
  renderCart();
}

//write a render item store function

function renderStore() {
  state.items.forEach((element) => {
    // clear items back to default
    //storeItem.innerHTML = "";
    //cartList.innerHTML = "";
    //for each store item in state
    //use the template to create elements and append
    const createElmentLi = document.createElement("li");
    const createElementDiv = document.createElement("div");
    createElementDiv.setAttribute("class", "store--item-icon");
    const createElementImg = document.createElement("img");
    createElementImg.setAttribute("src", `assets/icons/${element.id}.svg`);
    createElementImg.setAttribute("alt", "element.name");
    const button = document.createElement("button");
    button.innerText = "Add to cart";
    button.addEventListener("click", () => {
      addToCart(element);
    });
    //button.addEventListener("click", "quantity" + 1);
    createElementDiv.append(createElementImg);
    createElmentLi.append(createElementDiv);
    createElmentLi.append(button);
    storeItem.append(createElmentLi);
  });
}
//call render item store as soon as page loads
renderStore();

function renderCart() {
  cartList.innerText = "";
  state.cart.forEach((element) => {
    // add items into cart
    // create elelmenrts and append
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("class", ".cart--item-icon");
    img.setAttribute("src", `assets/icons/${element.id}.svg`);
    img.setAttribute("alt", "element.name");
    const p = document.createElement("p");
    p.innerText = element.name;
    const removeButton = document.createElement("button");
    removeButton.class = "remove-btn";
    removeButton.innerText = "-";

    // removeButton.addEventListener("click",  reduceItem);
    removeButton.addEventListener("click", () => {
      element.quantity--;
      renderCart();
    });

    const span = document.createElement("span");
    span.class = "quantity-text center";
    span.innerText = element.quantity;
    const plusButton = document.createElement("button");
    plusButton.class = "add-btn";
    plusButton.innerText = "+";

    plusButton.addEventListener("click", () => {
      element.quantity++;
      renderCart();
    });

    li.append(img);
    li.append(p);
    li.append(removeButton);
    li.append(span);
    li.append(plusButton);
    cartList.append(li);
  });

  //let totalPrice = 0;
  //totalPrice += element.price * elementr.quantity;
  //}

  //function renderTotal() {
  let totalPrice = 0;
  totalPrice += state.cart.price * state.cart.quantity;

  const total = state.cart.reduce((a, b) => a + b.price, 0);
  totalStr = `£${total.toFixed(2)}`;
  totalNum.innerText = totalStr;
}
renderTotal();

function reduceItem(item) {
  item.quantity--;
  renderCart();
}

const currencyConvert = (x) => {
  return Number.parseFloat(x).toFixed(2);
};

const sumOfCart = () => {
  let total = 0;
  state.cart.forEach((cartItem) => {
    total += cartItem.price * cartItem.quantity;
  });
  totalNum.innerText = `£${currencyConvert(total)}`;
};

//call render function

//let btns = document.querySelectorAll(".products button");

/*for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", add);
}

function add(event) {
  let price = Number(element.price);

  let index = cart.indexOf(element.id);
  console.log(cart, index);
  if (index >= 0) {
    cart.splice(index, 1);
    count--;
    sum -= price;
    event.target.className = "";
    event.target.textContent = "Add to cart";
  } else {
    cart.push(element.id);
    count++;
    sum += price;
    event.target.className = "added";
    event.target.textContent = "Remove";
  }
  updateCart();
}

function updateCart() {
  document.getElementById("sum").textContent = sum;
  document.getElementById("count").textContent = count;
}*/
