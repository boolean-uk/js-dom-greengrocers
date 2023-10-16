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

const storeItemList = document.querySelector(".store--item-list");
const cartItemList = document.querySelector(".cart--item-list");
const totalNumber = document.querySelector(".total-number");

function renderStoreItems() {
  clearElement(storeItemList);

  state.items.forEach((item) => {
    const storeLi = document.createElement("li");
    storeItemList.appendChild(storeLi);

    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");
    storeLi.appendChild(div);

    const imgItem = document.createElement("img");
    imgItem.src = `assets/icons/${item.id}.svg`;
    imgItem.alt = item.id;
    div.appendChild(imgItem);

    const storeAddButton = document.createElement("button");
    storeAddButton.innerText = "Add to cart";
    storeLi.appendChild(storeAddButton);

    storeAddButton.addEventListener("click", (e) => {
      console.log("Item has been selected!");
      item.quantity += 1;
      addItem(item);
      placeItemsCart();
      productTotal();
    });
  });
}

function addItem(item) {
  if (state.cart.find((produce) => produce.name === item.name) === undefined) {
    item.quantity = 1;
    state.cart.push(item);
    placeItemsCart();
  } else {
    item.quantity++;
    placeItemsCart();
  }
}

function placeItemsCart() {
  clearElement(cartItemList);

  state.cart.forEach((item) => {
    const cartItemLi = document.createElement("li");
    cartItemList.appendChild(cartItemLi);

    const cartItemImg = document.createElement("img");
    cartItemImg.setAttribute("class", "cart--item-icon");
    cartItemImg.src = `assets/icons/${item.id}.svg`;
    cartItemImg.alt = item.id;
    cartItemLi.appendChild(cartItemImg);

    const itemName = document.createElement("p");
    itemName.textContent = item.name;
    cartItemLi.appendChild(itemName);

    const takeAwayButton = document.createElement("button");
    takeAwayButton.setAttribute("class", "quantity-btn remove-btn center");
    takeAwayButton.innerText = "-";
    cartItemLi.appendChild(takeAwayButton);

    takeAwayButton.addEventListener("click", (e) => {
      item.quantity -= 1;

      if (item.quantity === 0) {
        const index = state.cart.indexOf(item);
        state.cart.splice(index, 1);
      }
      placeItemsCart();
      productTotal();
    });

    const quantityText = document.createElement("span");
    quantityText.setAttribute("class", "quantity-text center");
    quantityText.textContent = `${item.quantity}`;
    cartItemLi.appendChild(quantityText);

    const plusButton = document.createElement("button");
    plusButton.setAttribute("class", "quantity-btn add-btn center");
    plusButton.innerText = "+";
    cartItemLi.appendChild(plusButton);

    plusButton.addEventListener("click", (e) => {
      item.quantity++;
      placeItemsCart();
      productTotal();
    });
  });
}

function productTotal() {
  let total = 0;
  state.cart.forEach((cartItem) => {
    total += cartItem.quantity * cartItem.price;
  });
  totalNumber.textContent = `£${total.toFixed(2)}`;
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

renderStoreItems();
placeItemsCart();
productTotal();
