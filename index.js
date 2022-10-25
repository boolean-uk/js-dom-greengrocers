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
      price: 0.55,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.37,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.75,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.25,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.56,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.15,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.95,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.41,
    },
  ],
  cart: [],
};
const vegetables = [
  "001-beetroot",
  "002-carrot",
  "005-avocado",
  "007-bell-pepper",
  "010-eggplant",
];
//CONSTANT
const type_vegetables = "vegetables";
const type_fruits = "fruits";
const storeItems = document.querySelector(".store--item-list");
const cartItems = document.querySelector(".cart--item-list");
const addToCartButton = document.querySelector(".add");
const h1 = document.querySelector("h1");
const span = document.querySelector(".quantity");

//FILTERS
const allFilter = document.createElement("button");
allFilter.innerText = "All";
h1.appendChild(allFilter);

const vegetablesFilter = document.createElement("button");
vegetablesFilter.innerText = "Vegetables";
h1.appendChild(vegetablesFilter);

const fruitsFilter = document.createElement("button");
fruitsFilter.innerText = "Fruits";
h1.appendChild(fruitsFilter);

const priceFilter = document.createElement("form");

const select = document.createElement("select");
select.setAttribute("name", "Sort by price");
select.setAttribute("value", "Sort by price");
select.setAttribute("id", "sort_by_price");

const option = document.createElement("option");
option.setAttribute("id", "default");
option.setAttribute("value", "default");
option.innerText = "Sort by price";

const increment = document.createElement("option");
increment.setAttribute("id", "incrementing");
increment.setAttribute("value", "incrementing");
increment.innerText = "Lowest first";

const decrement = document.createElement("option");
decrement.setAttribute("id", "decrementing");
decrement.setAttribute("value", "decrementing");
decrement.innerText = "Highest first";

h1.appendChild(priceFilter);
priceFilter.appendChild(select);
select.appendChild(option);
select.appendChild(increment);
select.appendChild(decrement);

function addStoreItem(item) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.setAttribute("class", "store--item-icon");
  const img = document.createElement("img");
  img.setAttribute("src", item.image);
  img.setAttribute("alt", item.name);
  const addToCartButton = document.createElement("button");
  addToCartButton.setAttribute("class", "add");
  addToCartButton.innerText = "ADD TO CART";
  li.appendChild(div);
  div.appendChild(img);
  li.appendChild(addToCartButton);
  storeItems.appendChild(li);
  addToCartButton.addEventListener("click", () => {
    addToCart(item);
  });
}

allFilter.addEventListener("click", () => {
  render(state.items);
});

vegetablesFilter.addEventListener("click", () => {
  const vegetablesFilterArray = state.items.filter((item) => {
    return item.type === "vegetables";
  });
  render(vegetablesFilterArray);
});

fruitsFilter.addEventListener("click", () => {
  const fruitsFilterArray = state.items.filter((item) => {
    return item.type === "fruits";
  });
  render(fruitsFilterArray);
});

select.addEventListener("change", () => {
  console.log(select.value);
  let sortedArray = [...state.items];
  if (select.value === "incrementing") {
    sortedArray.sort(
      (item1, item2) => Number(item1.price) - Number(item2.price)
    );
  } else if (select.value === "decrementing") {
    sortedArray.sort(
      (item1, item2) => Number(item2.price) - Number(item1.price)
    );
  }
  // select.value !== "decrementing" &&
  // select.value !== "decrementing"
  // select.value === "default"
  // else {
  //   console.log("its default");
  //   sortedArray = state.items;
  // }
  render(sortedArray);
});

function render(renderItems) {
  // let renderArray = [];
  // if (renderItems.length > 0) {
  //   renderArray = renderItems;
  // } else {
  //   renderArray = state.items;
  // }
  storeItems.innerHTML = "";
  renderItems.forEach((item) => {
    item.quantity = 1;
    item.image = `assets/icons/${item.id}.svg`;
    if (vegetables.includes(item.id)) {
      item.type = "vegetables";
    } else {
      item.type = "fruits";
    }

    addStoreItem(item);
  });
}
function addToCart(item) {
  if (state.cart.includes(item)) {
    console.log(state.cart);
    item.quantity = item.quantity += 1;
    const li = document.querySelector("#" + `cart-item-${item.id}`);
    const span = li.querySelector(".quantity");
    span.innerText = item.quantity;
    calculateTotal();
    return;
  } else {
    item.quantity = 1;
    const li = document.createElement("li");
    li.setAttribute("id", `cart-item-${item.id}`);
    const img = document.createElement("img");
    img.setAttribute("class", "cart--item-icon");
    img.setAttribute("src", item.image);
    img.setAttribute("alt", item.name);
    const p = document.createElement("p");
    p.innerText = item.name;
    const minusButton = document.createElement("button");
    minusButton.setAttribute("class", "remove-btn");
    minusButton.innerText = "-";

    const span = document.createElement("span");
    span.setAttribute("class", "quantity");
    span.innerText = item.quantity;
    const plusButton = document.createElement("button");
    plusButton.setAttribute("class", "add-btn");
    plusButton.innerText = "+";
    li.appendChild(img);
    li.appendChild(p);
    li.appendChild(minusButton);
    li.appendChild(span);
    li.appendChild(plusButton);
    cartItems.appendChild(li);
    state.cart.push(item);
    console.log(state.cart);
    plusButton.addEventListener("click", () => {
      item.quantity += 1;
      span.innerText = item.quantity;
      calculateTotal();
    });

    minusButton.addEventListener("click", () => {
      item.quantity -= 1;
      // state.cart.find((item) => {
      //   if (item.quantity === 0) {
      //     li.remove();
      //     state.cart.splice(item);
      //   }
      // });
      if (item.quantity < 1) {
        let itemIndex;
        for (let i = 0; i < state.cart.length; i++) {
          if (state.cart[i].id === item.id) {
            itemIndex = i;
          }
        }
        li.remove();
        state.cart.splice(itemIndex);
      }
      span.innerText = item.quantity;
      calculateTotal();
    });
    calculateTotal();
  }
}
function calculateTotal() {
  let total = 0;
  state.cart.forEach((item) => {
    total += item.price * item.quantity;
  });
  const span = document.querySelector(".total-number");
  span.innerText = "£" + Math.round(total * 100) / 100;
}

render(state.items);
