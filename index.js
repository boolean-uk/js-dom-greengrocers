const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.1,
      group: "vegetable",
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.15,
      group: "vegetable",
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.2,
      group: "fruit",
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      group: "fruit",
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.3,
      group: "fruit",
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.5,
      group: "fruit",
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.45,
      group: "vegetable",
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.4,
      group: "berry",
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.05,
      group: "berry",
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 1.35,
      group: "vegetable",
    },
  ],
  cart: [],
  groups: ["fruit", "vegetable", "berry"],
  sorting: ["none", "price", "alphabetically"],
};

const storeUl = document.querySelector(".store--item-list");
const cartUl = document.querySelector(".cart--item-list");

const parent = document.querySelector("#store");
const sibling = parent.querySelector("h1");
const div = document.createElement("div");

// FILTERS
const pFilter = document.createElement("p");
pFilter.textContent = "Filter by: ";
pFilter.classList.add("filter");
div.appendChild(pFilter);

for (const group of state.groups) {
  createFilterCheckbox(group, div);
}

// SORTING
const pSort = document.createElement("p");
pSort.textContent = "Sort by: ";
pSort.classList.add("sort");
div.appendChild(pSort);

for (const sorting of state.sorting) {
  createSortingButton(sorting, div);
}

parent.insertBefore(div, sibling.nextSibling);

// POPULATE STORE
for (const item of state.items) {
  const li = document.createElement("li");
  li.alt = item.group;
  li.id = item.id
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
  li.appendChild(div);
  li.appendChild(button);

  storeUl.appendChild(li);
}

function createFilterCheckbox(group, div) {
  const checkbox = document.createElement("INPUT");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("filter");
  checkbox.alt = group;
  checkbox.setAttribute("id", `${group}-filter`);

  checkbox.addEventListener("change", handleCheckboxChange);

  div.appendChild(checkbox);

  const label = document.createElement("label");
  label.setAttribute("for", `${group}-filter`);
  if (group[group.length - 1] === "y") {
    label.innerHTML = `${
      group[0].toUpperCase() + group.slice(1, group.length - 1)
    }ies`;
  } else {
    label.innerHTML = `${group[0].toUpperCase() + group.slice(1)}s`;
  }

  div.appendChild(label);
}

function createSortingButton(group, div) {
  const radioButton = document.createElement("INPUT");
  radioButton.setAttribute("type", "radio");
  radioButton.name = "sorting";
  radioButton.classList.add("sort");
  radioButton.alt = group;
  radioButton.setAttribute("id", `${group}-sort`);
  if (group === "none") {
    radioButton.checked = true;
  }

  radioButton.addEventListener("change", handleRadiobuttonChange);

  div.appendChild(radioButton);

  const label = document.createElement("label");
  label.setAttribute("for", `${group}-filter`);
  label.innerHTML = group[0].toUpperCase() + group.slice(1);

  div.appendChild(label);
}

function handleRadiobuttonChange(event) {
  if (event.currentTarget.checked) {
    const items = storeUl.querySelectorAll("li");
    const itemsArray = Array.from(items);
    if (event.currentTarget.alt === "price") {
      itemsArray.sort((a, b) => {
        const aPrice = (state.items.find(item => item.id === a.id)).price;
        const bPrice = (state.items.find(item => item.id === b.id)).price;

        return aPrice > bPrice ? 1 : -1;
      });
    } else if (event.currentTarget.alt === "alphabetically") {
      itemsArray.sort((a, b) => {
        const aName = (state.items.find(item => item.id === a.id)).name;
        const bName = (state.items.find(item => item.id === b.id)).name;

        return aName > bName ? 1 : -1;
      });
    } else if (event.currentTarget.alt === "none") {
      itemsArray.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    }
    items.forEach((item) => storeUl.removeChild(item));
    itemsArray.forEach((item) => storeUl.appendChild(item));
  }
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

// CREATE CART LIST OBJECT
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
  li.appendChild(addButton);

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

function handleCheckboxChange() {
  const filters = document.querySelectorAll(".filter");
  const checkedCheckboxes = [];
  const storeItems = document
    .querySelector(".store--item-list")
    .querySelectorAll("li");

  filters.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedCheckboxes.push(checkbox);
    }
  });

  if (checkedCheckboxes.length === 0) {
    for (const item of storeItems) {
      item.style.display = "grid";
    }
  } else {
    const activeFilters = [];
    for (const checkbox of checkedCheckboxes) {
      activeFilters.push(checkbox.alt);
    }

    for (const item of storeItems) {
      if (activeFilters.includes(item.alt)) {
        item.style.display = "grid";
      } else {
        item.style.display = "none";
      }
    }
  }
}
