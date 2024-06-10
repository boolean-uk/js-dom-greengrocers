const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      cartQuantity: 0,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      cartQuantity: 0,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      cartQuantity: 0,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      cartQuantity: 0,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      cartQuantity: 0,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      cartQuantity: 0,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      cartQuantity: 0,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      cartQuantity: 0,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      cartQuantity: 0,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      cartQuantity: 0,
    },
  ],
  cart: [],
};

const STORE_ITEMS = document.querySelector(".store--item-list");
const CART_ITEMS = document.querySelector(".cart--item-list");
let totalPrice = 0;

function createItemImg(item) {
  const itemImg = document.createElement("img");
  itemImg.src = `assets/icons/${item.id}.svg`;
  itemImg.alt = item.name;
  return itemImg;
}

function addStoreItems(item) {
  const li = document.createElement("li");
  STORE_ITEMS.appendChild(li);
  const storeItemIconDiv = document.createElement("div");
  storeItemIconDiv.className = "store--item-icon";
  const storeItemImg = createItemImg(item);
  storeItemIconDiv.appendChild(storeItemImg);
  li.appendChild(storeItemIconDiv);
  const storeItemButton = document.createElement("button");
  storeItemButton.id = "id" + item.id;
  storeItemButton.textContent = "Add to cart";
  li.appendChild(storeItemButton);
}

function createCartElement(item) {
  const li = document.createElement("li");
  li.id = "liof" + item.id;
  const cartImage = createItemImg(item);
  cartImage.className = "cart--item-icon";
  const cartP = document.createElement("p");
  cartP.textContent = item.name;
  const minusButton = document.createElement("button");
  minusButton.classList.add("quantity-btn", "remove-btn", "center");
  minusButton.id = `minus-${item.id}`;
  minusButton.textContent = "-";
  const plusButton = document.createElement("button");
  plusButton.classList.add("quantity-btn", "add-btn", "center");
  plusButton.id = `plus${item.id}`;
  plusButton.textContent = "+";
  const quantityTextSpan = document.createElement("span");
  quantityTextSpan.classList.add("quantity-text", "center");
  quantityTextSpan.id = `quantity-${item.id}`;
  li.append(cartImage, cartP, minusButton, quantityTextSpan, plusButton);
  CART_ITEMS.appendChild(li);
  return quantityTextSpan;
}

//janky hack but i had to rush it or i was running out of time.
//I'm sorry

for (let i = 0; i < state.items.length; i++) {
  let item = state.items[i];
  addStoreItems(item);
  const storeItemButton = document.querySelector("#id" + item.id);
  storeItemButton.addEventListener("click", function () {
    item.cartQuantity++;
    if (item.cartQuantity < 2) {
      createCartElement(item);
      state.cart.push(item);
      const cartPlusButton = document.querySelector("#plus" + item.id);
      cartPlusButton.addEventListener("click", function () {
        item.cartQuantity++;
        itemQuantity.textContent = item.cartQuantity;
        totalPrice = totalPrice + item.price;
        totalNumber.textContent = "£" + totalPrice.toFixed(2);
      });
      const cartMinusButton = document.querySelector("#minus-" + item.id);
      cartMinusButton.addEventListener("click", function () {
        item.cartQuantity--;
        itemQuantity.textContent = item.cartQuantity;
        totalPrice = totalPrice - item.price;
        totalNumber.textContent = "£" + totalPrice.toFixed(2);
        const itemToBeDeleted = document.querySelector("#liof" + item.id);
        if (item.cartQuantity < 1) {
          itemToBeDeleted.remove();
        }
      });
    }
    const itemQuantity = document.querySelector(`#quantity-${item.id}`);
    itemQuantity.textContent = item.cartQuantity;
    totalPrice = totalPrice + item.price;
    const totalNumber = document.querySelector(".total-number");
    totalNumber.textContent = "£" + totalPrice.toFixed(2);
  });
}
