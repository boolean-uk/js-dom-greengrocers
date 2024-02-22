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

const storeUl = document.querySelector(".store--item-list");
const cartUl = document.querySelector(".cart--item-list");

for (const item of state.items) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.classList.add("store--item-icon");

  const img = document.createElement("img");
  img.src = `assets/icons/${item.id}.svg`;
  img.alt = item.name;

  const button = document.createElement("button");
  button.addEventListener("click", function () {
    addToCart(item);
  });
  button.textContent = "Add to cart";

  div.appendChild(img);
  li.appendChild(button);
  li.appendChild(div);

  storeUl.appendChild(li);
}

function addToCart(item) {
  if (!document.querySelector(`.item--${item.name.replace(" ", "-")}`)) {
    state.cart.push(item);

    const li = createListObject(item);

    cartUl.appendChild(li);
    const cost = document.querySelector(".total-number");
    cost.textContent = `$${(
      Number(cost.textContent.slice(1)) + item.price
    ).toFixed(2)}`;

  } else {
    const span = document.querySelector(
      `.quantity-text--${item.name.replace(" ", "-")}`
    );
    span.textContent = Number(span.textContent) + 1;
    const cost = document.querySelector(".total-number");
    cost.textContent = `$${(
      Number(cost.textContent.slice(1)) + item.price
    ).toFixed(2)}`;
  }
}

function createListObject(item) {
  const li = document.createElement("li");
  li.classList.add("item", `item--${item.name.replace(" ", "-")}`);

  const img = createImage(item);
  const p = createName(item);
  const removeButton = createRemoveButton(item);
  const span = createQuantitySpan(item);
  const addButton = createAddButton(item);

  li.appendChild(img);
  li.appendChild(p);
  li.appendChild(removeButton);
  li.appendChild(span);
  li.appendChild(addButton)

  return li;
}

function createImage(item) {
  const img = document.createElement("img");
  img.src = `assets/icons/${item.id}.svg`;
  img.alt = item.name;
  return img;
}

function createName(item) {
  const p = document.createElement("p");
  p.textContent = item.name;
  return p;
}

function createRemoveButton(item) {
  const removeButton = document.createElement("button");
  removeButton.classList.add("quantity-btn", "remove-btn", "center");
  removeButton.textContent = "-";
  removeButton.addEventListener("click", function () {
    removeFromCart(item);
  });
  return removeButton;
}

function createQuantitySpan(item) {
  const span = document.createElement("span");
  span.classList.add(
    "quantity-text",
    "center",
    `quantity-text--${item.name.replace(" ", "-")}`
  );
  span.textContent = "1";
  return span;
}

function createAddButton(item) {
  const addButton = document.createElement("button");
  addButton.classList.add("quantity-btn", "add-btn", "center");
  addButton.textContent = "+";
  addButton.addEventListener("click", function () {
    addToCart(item);
  });
  return addButton;
}

function removeFromCart(item) {
  const span = document.querySelector(
    `.quantity-text--${item.name.replace(" ", "-")}`
  );
  const currentQuantity = Number(span.textContent);
  if (currentQuantity === 1) {
    document.querySelector(`.item--${item.name.replace(" ", "-")}`).remove();
  } else {
    span.textContent = currentQuantity - 1;
  }
  const cost = document.querySelector(".total-number");
  cost.textContent = `$${(
    Number(cost.textContent.slice(1)) - item.price
  ).toFixed(2)}`;
}
