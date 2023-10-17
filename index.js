const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

const storeItemList = document.querySelector(".store--item-list");
const cartItemList = document.querySelector(".cart--item-list");
const totalAmount = document.querySelector(".total-number");

function renderStoreItems() {
  storeItemList.innerHTML = "";

  state.items.forEach((item) => {
    const Storeli = document.createElement("li");
    storeItemList.appendChild(Storeli);

    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");
    Storeli.appendChild(div);

    const imgItems = document.createElement("img");
    imgItems.src = `assets/icons/${item.id}.svg`;
    imgItems.alt = item.name;
    div.appendChild(imgItems);

    const storeAddButton = document.createElement("button");
    storeAddButton.innerText = "Add to cart";
    Storeli.appendChild(storeAddButton);

    storeAddButton.addEventListener("click", () => {
      item.quantity += 1;
      addItem(item);
      placeItems_Cart();
      productTotal();
    });
  });
}

function addItem(item) {
  if (state.cart.find((produce) => produce.name === item.name) === undefined) {
    item.quantity = 1;
    state.cart.push(item);
    placeItems_Cart();
  } else {
    item.quantity++;
    placeItems_Cart();
  }
}

function placeItems_Cart() {
  cartItemList.innerHTML = "";

  state.cart.forEach((item) => {
    const cartItemli = document.createElement("li");
    cartItemList.appendChild(cartItemli);

    const cartItemImg = document.createElement("img");
    cartItemImg.setAttribute("class", "cart--item-icon");
    cartItemImg.src = `assets/icons/${item.id}.svg`;
    cartItemImg.alt = item.name;
    cartItemli.appendChild(cartItemImg);

    const itemName = document.createElement("p");
    itemName.innerText = `${item.name}`;
    cartItemli.appendChild(itemName);

    const takeAwayButton = document.createElement("button");
    takeAwayButton.setAttribute("class", "quantity-btn remove-btn center");
    takeAwayButton.innerText = "-";
    cartItemli.appendChild(takeAwayButton);

    takeAwayButton.addEventListener("click", () => {
      item.quantity -= 1;

      if (item.quantity === 0) {
        const index = state.cart.indexOf(item);
        state.cart.splice(index, 1);
      }
      placeItems_Cart();
      productTotal();
    });

    const quantityText = document.createElement("span");
    quantityText.setAttribute("class", "quantity-text center");
    quantityText.innerText = `${item.quantity}`;
    cartItemli.appendChild(quantityText);

    const plusButton = document.createElement("button");
    plusButton.setAttribute("class", "quantity-btn add-btn center");
    plusButton.innerText = "+";
    cartItemli.appendChild(plusButton);

    plusButton.addEventListener("click", () => {
      item.quantity++;
      placeItems_Cart();
      productTotal();
    });
  });
}

function productTotal() {
  let total = 0;
  state.cart.forEach((cartItem) => {
    total += cartItem.quantity * cartItem.price;
  });
  totalAmount.innerText = `£${total.toFixed(2)}`;
}

renderStoreItems();
placeItems_Cart();
productTotal();