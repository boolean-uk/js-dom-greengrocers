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

const divHeader = document.querySelector(".item-list");
const itemsList = document.querySelector(".cart--item-list");

const renderItems = () => {
  //create a new div for each item
  const divCart = document.querySelector(".cart--item-list");
  const itemsInCart = divCart.querySelectorAll("*");
  //remove all items from the cart
  itemsInCart.forEach((item) => item.remove());
  state.cart.forEach((item) => {
    //create a new div for each item
    const containerCart = document.createElement("li");
    //create an image for each item
    const img = document.createElement("img");
    img.setAttribute("alt", item.name);
    img.setAttribute("src", "assets/icons/" + item.id + ".svg");
    containerCart.append(img);
    //create a name for each item
    const p = document.createElement("p");
    p.innerText = item.name;
    containerCart.append(p);
    divCart.append(containerCart);
    //create a remove button for each item
    const buttonMinus = document.createElement("button");
    buttonMinus.innerText = "-";
    buttonMinus.classList.add("remove-btn");
    containerCart.append(buttonMinus);
    //create an event listener for the remove button for each item
    buttonMinus.addEventListener("click", () => {
      const foundItem = state.cart.find(
        (itemsList) => itemsList.id === item.id
      );
      if (foundItem) {
        if (foundItem.quantity !== 0) {
          foundItem.quantity--;
        }
        //added logic to remove the item from the cart
        if (foundItem.quantity === 0) {
          state.cart = state.cart.filter((item) => item.id !== foundItem.id);
        }
      }
      renderItems();
    });
    //create a quantity for each item
    const inputQuantity = document.createElement("span");
    inputQuantity.innerText = item.quantity;
    inputQuantity.setAttribute("class", "quantity-text");
    containerCart.append(inputQuantity);
    //create an event listener for the plus button for each item
    const buttonPlus = document.createElement("button");
    buttonPlus.innerText = "+";
    buttonPlus.setAttribute("class", "add-btn");
    containerCart.append(buttonPlus);
    buttonPlus.addEventListener("click", () => {
      const foundItem = state.cart.find(
        (itemsList) => itemsList.id === item.id
      );
      if (foundItem) {
        foundItem.quantity++;
      }
      renderItems();
    });
    //create a price for each item in the cart and add it and append it to the span price 
    const spanPrice = document.querySelector(".total-number");
    const totalPrice = state.cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    spanPrice.innerText = "£" + totalPrice.toFixed(2);
  });
};


state.items.forEach((storedItem) => {
  const container = document.createElement("li");
  //create an image for each item in the container
  const img = document.createElement("img");
  img.setAttribute("alt", storedItem.name);
  img.setAttribute("src", "assets/icons/" + storedItem.id + ".svg");
  container.append(img);
  //create a name for each item in the container
  const button = document.createElement("button");
  button.innerText = "Add to cart";
  //append the item to the container
  container.append(button);

  divHeader.append(container);
  //create an event listener for the add button for each item
  button.addEventListener("click", () => {
    const foundItem = state.cart.find((item) => item.id === storedItem.id);
    if (foundItem) {
      foundItem.quantity++;
    } else {
      state.cart.push({
        id: storedItem.id,
        name: storedItem.name,
        price: storedItem.price,
        quantity: 1,
      });
    }
    renderItems();
  });
});
