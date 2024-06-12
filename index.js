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

document.addEventListener("DOMContentLoaded", () => {
  renderStoreItems();
  renderCart();
});

function createElementWithAttributes(tag, attributes) {
  const element = document.createElement(tag);
  for (const key in attributes) {
    if (key === "textContent") {
      element.textContent = attributes[key];
    } else {
      element.setAttribute(key, attributes[key]);
    }
  }
  return element;
}

function addToCart(event) {
  const itemId = event.target.getAttribute("data-id");
  const item = state.items.find((item) => item.id === itemId);

  const cartItem = state.cart.find((cartItem) => cartItem.id === itemId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }

  renderCart();
  updateCartTotal();
}

function renderStoreItems() {
  const itemsContainer = document.querySelector(".store--item-list");
  itemsContainer.innerHTML = "";

  state.items.forEach((item) => {
    const itemLi = document.createElement("li");

    const div = createElementWithAttributes("div", {
      class: "store--item-icon",
    });
    const img = createElementWithAttributes("img", {
      src: `assets/icons/${item.id}.svg`,
      alt: item.name,
    });
    div.appendChild(img);

    const button = createElementWithAttributes("button", {
      "data-id": item.id,
      textContent: "Add to cart",
    });
    button.addEventListener("click", addToCart);

    itemLi.appendChild(div);
    itemLi.appendChild(button);
    itemsContainer.appendChild(itemLi);
  });
}
