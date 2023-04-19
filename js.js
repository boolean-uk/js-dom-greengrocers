let cart = [];
//copy list items from store to cart & add quantity key value = 0 to start
for (let k = 0; k < state.items.length; k++) {
  cart.push(state.items[k]);
  cart[k].quantity = 0;
}

displayStore();
getTotal();

function displayStore() {
  for (let i = 0; i < state.items.length; i++) {
    let id = state.items[i].id;
    let name = state.items[i].name;
    /* let price = state.items[i].price; */
    let imgpath = `assets/icons/${id}.svg`;

    const itemList_store = document.querySelector(".store--item-list");
    const storeItem = document.createElement("li");
    itemList_store.append(storeItem);
    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");
    storeItem.appendChild(div);
    const img = document.createElement("img");
    img.setAttribute("src", `${imgpath}`);
    img.setAttribute("alt", `${name}`);
    div.append(img);
    const button = document.createElement("button");
    button.innerText = "Add to cart";
    storeItem.append(button);
    button.setAttribute("id", `${id}`);
    button.addEventListener("click", function () {
      addToCart(i);
      resetCart();
      displayCart();
      getTotal();
    });
  }
}

function addToCart(i) {
  cart[i].quantity += 1;
}

function resetCart() {
  const itemList_cart = document.querySelector(".cart--item-list");
  itemList_cart.innerText = "";
}

function displayCart() {
  for (let j = 0; j < cart.length; j++) {
    if (cart[j].quantity > 0) {
      let id = cart[j].id;
      let name = cart[j].name;
      /* let price = cart[j].price; */
      let imgpath = `assets/icons/${id}.svg`;
      let quantity = cart[j].quantity;
      const itemList_cart = document.querySelector(".cart--item-list");
      const cartItem = document.createElement("li");
      itemList_cart.append(cartItem);
      const img = document.createElement("img");
      cartItem.append(img);
      img.setAttribute("class", "cart--item-icon");
      img.setAttribute("src", `${imgpath}`);
      img.setAttribute("alt", `${name}`);
      const p = document.createElement("p");
      cartItem.append(p);
      p.innerText = `${name}`;
      const buttonMinus = document.createElement("button");
      cartItem.append(buttonMinus);
      buttonMinus.innerText = "-";
      buttonMinus.setAttribute("class", "quantity-btn remove-btn center");
      const span = document.createElement("span");
      span.innerText = `${quantity}`;
      span.setAttribute("class", "quantity-text center");
      cartItem.append(span);
      const buttonPlus = document.createElement("button");
      cartItem.append(buttonPlus);
      buttonPlus.innerText = "+";
      buttonPlus.setAttribute("class", "quantity-btn add-btn center");
      buttonPlus.addEventListener("click", function () {
        cart[j].quantity += 1;
        span.innerText = `${cart[j].quantity}`;
        resetCart();
        displayCart();
        getTotal();
      });
      buttonMinus.addEventListener("click", function () {
        cart[j].quantity -= 1;
        span.innerText = `${cart[j].quantity}`;
        resetCart();
        displayCart();
        getTotal();
      });
    }
  }
}

function getTotal() {
  let total = 0;
  for (let l = 0; l < cart.length; l++) {
    let quantity = cart[l].quantity;
    let price = cart[l].price;
    total += quantity * price;
    const totalNum = document.querySelector(".total-number");
    totalNum.innerText = `£${total.toFixed(2)}`;
  }
}
