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

const storeItemUl = document.querySelector(".store--item-list");
const cartItemUl = document.querySelector(".cart--item-list");
const totalNumber = document.querySelector(".total-number");

function renderStoreItems() {
  for (let i = 0; i < state.items.length; i++) {
    // making store item html template

    const storeItemLi = document.createElement("li");

    const storeItemDiv = document.createElement("div");
    storeItemDiv.setAttribute("class", "store--item-icon");
    const storeItemImg = document.createElement("img");
    storeItemImg.setAttribute("src", `assets/icons/${state.items[i].id}.svg`);

    const storeItemButton = document.createElement("button");
    storeItemButton.innerText = "Add to cart";

    storeItemDiv.append(storeItemImg);
    storeItemLi.append(storeItemDiv, storeItemButton);
    storeItemUl.append(storeItemLi);

    // add event listener for add to cart
    storeItemButton.addEventListener("click", () => {
      // making the ID name price for the cart

      const foundItem = state.cart.find(
        (item) => item.id === state.items[i].id
      );
      console.log("found?", foundItem);

      const selectedStoreItem = {
        id: `${state.items[i].id}`,
        name: `${state.items[i].name}`,
        price: `${state.items[i].price}`,
        quantity: 1,
      };

      if (foundItem === undefined) {
        state.cart.push(selectedStoreItem);
        updatePrice();
        console.log(state.cart, "hi if");
      } else {
        increaseQuantity(foundItem);
        updatePrice();
        console.log("hi else", foundItem, state.cart);
      }
      // push the selected item to the cart
      renderCartItems();
    });
  }
}

function renderCartItems() {
  cartItemUl.innerHTML = "";

  for (let i = 0; i < state.cart.length; i++) {
    // console.log("check i", state.cart[i].quantity);
    const cartItemLi = document.createElement("li");

    const cartItemImg = document.createElement("img");
    cartItemImg.setAttribute("class", "cart--item-icon");
    cartItemImg.setAttribute("src", `assets/icons/${state.cart[i].id}.svg`);

    const cartItemName = document.createElement("p");
    cartItemName.innerText = `${state.cart[i].name}`;

    const cartRemoveBtn = document.createElement("button");
    cartRemoveBtn.innerText = "-";
    cartRemoveBtn.setAttribute("class", "remove-btn");

    const cartQuantity = document.createElement("span");
    cartQuantity.setAttribute("class", "quantity-text");
    cartQuantity.innerText = state.cart[i].quantity;

    const cartAddBtn = document.createElement("button");
    cartAddBtn.innerText = "+";
    cartAddBtn.setAttribute("class", "add-btn");

    cartItemUl.append(cartItemLi);
    cartItemLi.append(
      cartItemImg,
      cartItemName,
      cartRemoveBtn,
      cartQuantity,
      cartAddBtn
    );

    cartAddBtn.addEventListener("click", () => {
      increaseQuantity(state.cart[i]);
      updatePrice();
    });

    cartRemoveBtn.addEventListener("click", () => {
      decreaseQuantity(state.cart[i]);
      updatePrice();
    });
  }
}

function increaseQuantity(item) {
  item.quantity++;
  renderCartItems();
}

function decreaseQuantity(item) {
  item.quantity--;
  if (item.quantity === 0) {
    // index of the item that = 0
    const indexOfDeleted = state.cart.indexOf(item);

    // that one will be deleted using splice
    state.cart.splice(indexOfDeleted, 1);
    console.log(indexOfDeleted);
  }

  renderCartItems();
}

function updatePrice() {
  let counter = 0;
  for (let i = 0; i < state.cart.length; i++) {
    counter += state.cart[i].quantity * state.cart[i].price;
    totalNumber.innerHTML = counter.toFixed(2);
  }
  console.log("value of counter", counter, totalNumber);
}

renderStoreItems();
