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

function renderStore() {
  const store = document.querySelector(".item-list.store--item-list");

  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i];
    const itemLi = document.createElement("li");
    store.append(itemLi);

    const itemIconDiv = document.createElement("div");
    itemIconDiv.className = "store--item-icon";
    itemLi.append(itemIconDiv);

    const itemImg = document.createElement("img");
    itemImg.setAttribute("src", "assets/icons/" + item.id + ".svg");
    itemImg.alt = item.name;
    itemIconDiv.append(itemImg);

    const addCartButton = document.createElement("button");
    addCartButton.textContent = "Add to Cart";
    itemLi.append(addCartButton);

    addCartButton.addEventListener("click", () => {
      inCart = false;
      state.cart.forEach((product) => {
        if (product.name === item.name) {
          inCart = true;
          product.quantity = product.quantity + 1;
        }
      });
      if (inCart === false) {
        const newItem = item;
        newItem.quantity = 1;
        state.cart.push(newItem);
      }
      const updatedCart = state.cart;
      console.log("Updated Cart:", updatedCart);

      renderCart(updatedCart);
    });
  }
}

function renderCart(updatedCart) {
  const cartItemList = document.querySelector(".item-list.cart--item-list");
  cartItemList.innerHTML = "";
  let itemTotal = 0;

  for (let i = 0; i < updatedCart.length; i++) {
    const itemInCart = updatedCart[i];
    const cartLi = document.createElement("li");
    cartItemList.append(cartLi);

    const cartImg = document.createElement("img");
    cartImg.className = "cart--item-icon";
    cartImg.src = "assets/icons/" + itemInCart.id + ".svg";
    cartImg.alt = itemInCart.name;
    cartLi.append(cartImg);

    const cartP = document.createElement("p");
    cartP.innerText = itemInCart.name;
    cartLi.append(cartP);

    const removeButton = document.createElement("button");
    removeButton.className = "quantity-btn remove-btn center";
    removeButton.textContent = "-";
    cartLi.append(removeButton);

    removeButton.addEventListener("click", () => {
      if (itemInCart.quantity > 1) {
        itemInCart.quantity = itemInCart.quantity - 1;
        console.log(itemInCart);
        renderCart(updatedCart);
      } else {
        const itemIndex = updatedCart.indexOf(itemInCart);
        updatedCart.splice(itemIndex, 1);
        renderCart(updatedCart);
      }
    });

    const quantity = document.createElement("span");
    quantity.className = "quantity-text center";
    quantity.id = itemInCart.id;
    quantity.textContent = updatedCart[i].quantity;
    cartLi.append(quantity);

    const addButton = document.createElement("button");
    addButton.className = "quantity-btn add-btn center";
    addButton.textContent = "+";
    cartLi.append(addButton);

    addButton.addEventListener("click", () => {
      itemInCart.quantity += 1;
      renderCart(updatedCart);
    });

    itemTotal += itemInCart.price * itemInCart.quantity;
    console.log("cart-total", itemTotal);
    const cartTotal = document.querySelector(".total-number");
    cartTotal.innerHTML = parseFloat(itemTotal).toFixed(2);
  }
}

renderStore();
