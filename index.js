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

/*----------------------------Imports--------------------------------------*/

const totalNumber = document.querySelector(".total-number");
const cartItems = document.querySelector(".cart--item-list");
const storeItems = document.querySelector(".store--item-list");

/*----------------------------Logic--------------------------------------*/

state.items.forEach((item) => {
  const itemContainer = document.createElement("li");
  const itemImage = document.createElement("img");
  itemImage.src = `assets/icons/${item.id}.svg`;
  itemImage.alt = item.name;
  const itemDiv = document.createElement("div");
  itemDiv.setAttribute("class", "store--item-icon");
  const itemButton = document.createElement("button");
  itemButton.innerText = "Add to cart";
  itemButton.addEventListener("click", () => {
    const itemInCart = state.cart.find((cartItem) => cartItem.id === item.id);

    itemInCart ? ++itemInCart.count : state.cart.push({ ...item, count: 1 });

    renderCart();
  });

  /*----------------------------Configurations--------------------------------------*/

  storeItems.append(itemContainer);
  itemContainer.append(itemDiv, itemButton);
  itemDiv.append(itemImage);
});

/*----------------------------Renders--------------------------------------*/

const renderCart = () => {
  cartItems.querySelectorAll("li").forEach((item) => item.remove());

  state.cart.forEach((item) => {
    const itemContainer = document.createElement("li");

    const itemImage = document.createElement("img");
    itemImage.setAttribute("class", "cart--item-icon");
    itemImage.src = `assets/icons/${item.id}.svg`;
    itemImage.alt = item.name;

    const itemName = document.createElement("p");
    itemName.innerText = item.name;

    const itemRemoveButton = document.createElement("button");
    itemRemoveButton.setAttribute("class", "quantity-btn remove-btn center");
    itemRemoveButton.innerText = "-";
    itemRemoveButton.addEventListener("click", () => {
      const itemInCart = state.cart.find((cartItem) => cartItem.id === item.id);

      itemInCart.count > 1
        ? --itemInCart.count
        : (state.cart = state.cart.filter(
            (cartItem) => cartItem.id !== item.id
          ));

      renderCart();
    });

    const itemCounter = document.createElement("span");
    itemCounter.setAttribute("class", "quantity-text center");
    itemCounter.innerText = item.count;

    const itemAddButton = document.createElement("button");
    itemAddButton.setAttribute("class", "quantity-btn add-btn center");
    itemAddButton.innerText = "+";
    itemAddButton.addEventListener("click", () => {
      const itemInCart = state.cart.find((cartItem) => cartItem.id === item.id);

      ++itemInCart.count;

      renderCart();
    });

    /*----------------------------Configurations--------------------------------------*/

    itemContainer.append(
      itemImage,
      itemName,
      itemRemoveButton,
      itemCounter,
      itemAddButton
    );
    cartItems.append(itemContainer);
  });
  totalNumber.innerText = `£${state.cart
    .map((item) => item.price * item.count)
    .reduce((a, b) => a + b, 0)
    .toFixed(2)}`;
};
