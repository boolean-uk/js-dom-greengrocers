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
///template for ( <ul class="item-list cart--item-list">)
/* <li>
  <img
    class="cart--item-icon"
    src="assets/icons/001-beetroot.svg"
    alt="beetroot"
  />
  <p>beetroot</p>
  <button class="quantity-btn remove-btn center">-</button>
  <span class="quantity-text center">1</span>
  <button class="quantity-btn add-btn center">+</button>
</li> */
//Completed card-item.html

const itemsStore = document.querySelector(".store--item-list");
const itemsinCart = document.querySelector(".cart--item-list");
const total = document.querySelector(".total-number");

function render() {
  itemsStore.innerHTML = "";

  for (let i = 0; i < state.items.length; i++) {
    const item = state.items[i];

    const itemsInStore = document.createElement("li");

    const imageStoreTemplate = document.createElement("div");
    imageStoreTemplate.setAttribute("class", "store--item-icon");

    const image = document.createElement("img");

    image.setAttribute("src", `assets/icons/${item.id}.svg`);

    imageStoreTemplate.appendChild(image);

    itemsInStore.appendChild(imageStoreTemplate);

    const addButton = document.createElement("button");
    addButton.innerText = "Add to cart";
    itemsInStore.appendChild(addButton);

    addButton.addEventListener("click", () => {
      addingtoStore(item);
      const sumOld = parseFloat(
        total.innerText.substring(1, total.innerText.length)
      );
      total.innerText = "£" + (sumOld + item.price);
    });
    itemsStore.appendChild(itemsInStore);
  }
}
function images() {}
function addingtoStore(item) {
  let oldSum = false;

  for (let i = 0; i < state.cart.length; i++) {
    if (state.cart[i].id === item.id) {
      state.cart[i].quantity++;
      oldSum = true;
    }
  }
  if ((oldSum) => !oldSum) {
    item.quantity = 1;
    console.log(item);
    state.cart.push(item);
  }

  createlistinCart();
}

function createlistinCart() {
  itemsinCart.innerHTML = "";

  console.log(state.cart);

  for (let i = 0; i < state.cart.length; i++) {
    const item = state.cart[i];

    let listinCart = document.createElement("li");

    const image = document.createElement("img");

    image.setAttribute("src", `assets/icons/${item.id}.svg`);

    listinCart.appendChild(image);

    const name = document.createElement("p");
    name.innerText = state.items[i].name;
    listinCart.appendChild(name);

    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove-btn");
    removeButton.innerText = "-";
    listinCart.appendChild(removeButton);

    removeButton.addEventListener("click", () => {
      const index = state.cart.findIndex((item) => item.id === item.id);
      state.cart[index].quantity--;

      const span = listinCart.querySelector(".quantity-text");
      const quantity = parseInt(span.innerText);
      span.innerText = quantity - 1;
      const sumOld = parseFloat(
        total.innerText.substring(1, total.innerText.length)
      );
      console.log(sumOld);
      total.innerText = "£" + (sumOld - item.price);

      if (state.cart[index].quantity === 0) {
        delete state.cart[index];
        itemsinCart.remove(listinCart);
      }
    });

    const span = document.createElement("span");
    span.setAttribute("class", "quantity-text");
    span.innerText = 1;
    listinCart.appendChild(span);

    const addingButton = document.createElement("button");
    addingButton.setAttribute("class", "add-btn");
    addingButton.innerText = "+";
    listinCart.appendChild(addingButton);
    addingButton.addEventListener("click", () => {
      const index = state.cart.findIndex((item) => item.id === item.id);
      state.cart[index].quantity++;
      console.log("quantity " + item.quantity);

      const span = listinCart.querySelector(".quantity-text");
      const quantity = parseInt(span.innerText);
      span.innerText = quantity + 1;

      const sumOld = parseFloat(
        total.innerText.substring(1, total.innerText.length)
      );
      console.log(sumOld);
      total.innerText = "£" + (sumOld + item.price);
    });

    itemsinCart.appendChild(listinCart);
  }
}

function overall() {
  render();
}

overall();
