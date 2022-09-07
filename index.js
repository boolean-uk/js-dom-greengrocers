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

function renderList() {
  const storeItems = document.querySelector(".item-list");
  state.items.forEach((o) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const button = document.createElement("button");

    div.className = "store--item-icon";
    img.setAttribute("src", "assets/icons/" + o.id + ".svg");
    button.innerText = "Add to cart";

    storeItems.append(li);
    li.append(div, button);
    div.append(img);

    button.addEventListener("click", () => {
      if (state.cart.some((e) => e.id === o.id)) {
        state.cart[state.cart.indexOf(o)].quantity++;
        state.cart[state.cart.indexOf(o)].price =
          state.cart[state.cart.indexOf(o)].price + 0.35;

        renderCart();
        totalCart();
        console.log(state.cart);

        return;
      } else {
        o.quantity = 1;
        state.cart.push(o);
      }
      renderCart();
      totalCart();
    });
  });
}

renderList();

function renderCart() {
  const cartItemLi = document.querySelector(".cart--item-list");
  cartItemLi.innerHTML = "";

  state.cart.forEach((obj) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const removeBtn = document.createElement("button");
    const span = document.createElement("span");
    const addBtn = document.createElement("button");
    let sum = 1;

    img.className = "cart--item-icon";
    img.setAttribute("src", "assets/icons/" + obj.id + ".svg");
    p.innerText = obj.name;
    removeBtn.className = "quantity-btn remove-btn center";
    removeBtn.innerText = "-";
    span.className = "quantity-text center";
    span.innerHTML = obj.quantity;
    addBtn.className = "quantity-btn add-btn center";
    addBtn.innerText = "+";

    cartItemLi.append(li);
    li.append(img, p, removeBtn, span, addBtn);

    removeBtn.addEventListener("click", () => {
      if (span.textContent <= 1) {
        li.remove();
      }

      let removeIndex = state.cart.indexOf(obj);
      state.cart.splice(removeIndex, 1);
      sum--;

      span.textContent = sum;
      totalCart();
    });

    addBtn.addEventListener("click", () => {
      sum++;
      span.textContent = sum;
      state.cart.push(obj);
      totalCart();
    });
  });
}

function totalCart() {
  const total = document.querySelector(".total-number");
  total.innerHTML = "";
  let sumTotal;

  let newCart = state.cart.map((a) => a.price);

  if (newCart.length <= 0) {
    total.textContent = "£0.00";
    return;
  }

  sumTotal = newCart.reduce((pv, cv) => pv + cv);

  total.textContent = "£" + Math.round(sumTotal * 100) / 100;

  console.log(newCart);
}
