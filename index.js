const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      type: "berry",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      type: "berry",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      type: "fruit",
      price: 0.35,
    },
  ],
  cart: [],
};

// SELECT EXISTING/FIXED DOM ELEMENTS
const ulGrocersDisplay = document.querySelector(".store--item-list");
const ulCartList = document.querySelector(".cart--item-list");
const totalNumber = document.querySelector(".total-number");
const filterButtons = document.querySelector(".filter-buttons");
const sortButtons = document.querySelector(".sort-buttons");

//
var filterState = "All";
var sortState = "None";

// LOGIC (functions) TO UPDATE APP STATE (controller -> model -> view update)
function AddToCart(event, item) {
  // increment count

  if (state.cart.filter((e) => e.name === item.name).length > 0) {
    var index = state.cart
      .map(function (e) {
        return e.name;
      })
      .indexOf(item.name);

    state.cart[index].itemCount++;
    renderCartData();
  } else {
    const itemObj = {
      img: `${item.id}.svg`,
      name: item.name,
      price: item.price,
      type: item.type,
      itemCount: 1,
    };
    state.cart.push(itemObj);

    renderCartData();
  }
}

// LOGIC (functions) TO HANDLE USER EVENTS (view -> controller interaction)
// LOGIC TO HANDLE USER EVENTS (view -> controller interaction)
function handleAddToCart(event, item) {
  AddToCart(event, item);
  renderTotal();
}

function handleRemoveOneItem(item) {
  item.itemCount = item.itemCount - 1;

  if (item.itemCount < 1) {
    var index = state.cart.indexOf(item);
    state.cart.splice(index, 1);
  }
  renderCartData();
  renderTotal();
}

function handleAddOneItem(item) {
  item.itemCount = item.itemCount + 1;
  renderCartData();
  renderTotal();
}

function handleFilterItems(type) {
  filterState = type;
  renderGroceryData(state.items, filterState, sortState);
}

function handleSortItems(sort) {
  sortState = sort;
  renderGroceryData([...state.items], filterState, sortState);
}

// LOGIC (functions) TO HANDLE RENDERING / DISPLAY / CLEARING OF UI (view)
// LOGIC TO HANDLE RENDERING / DISPLAY / CLEARING OF UI (view)
function createGroceryImage(item) {
  // li: with the name of a teacher + a button to view details
  // <li>1: Carlo <button>View Details</button></li>
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.setAttribute("id", `${item.id}`);
  img.setAttribute("class", "item--img");
  img.setAttribute("alt", "grocery image");
  // create button
  const button = document.createElement("button");
  button.innerText = "ADD TO CART";
  button.addEventListener("click", (event) => handleAddToCart(event, item));
  // place button inside list item
  img.setAttribute("src", `assets/icons/${item.id}.svg`);

  li.appendChild(img);
  li.appendChild(button);

  return li;
}

function renderTotal() {
  totalNumber.innerHTML = "";
  var total = 0;
  state.cart.forEach((item) => {
    total = total + item.price * item.itemCount;
  });

  const p = document.createElement("p");
  var roundTotal = total.toFixed(2);
  p.innerText = `£${roundTotal}`;
  totalNumber.appendChild(p);
}

function renderFilterButtons() {
  filterButtons.innerHTML = "";

  const p = document.createElement("p");
  p.setAttribute("style", "text-align:center");

  var list = [...new Set(state.items.map((item) => item.type))];
  list.push("All");

  list.forEach((type) => {
    const filterButton = document.createElement("button");
    filterButton.innerText = `${type}`;
    filterButton.addEventListener("click", () => handleFilterItems(type));
    p.appendChild(filterButton);
  });

  filterButtons.appendChild(p);
}

function renderSortButtons() {
  sortButtons.innerHTML = "";

  const p = document.createElement("p");
  p.setAttribute("style", "text-align:center");

  var list = ["Alphabetical", "None"];

  list.forEach((sort) => {
    const sortButtons = document.createElement("button");
    sortButtons.innerText = `${sort}`;
    sortButtons.addEventListener("click", () => handleSortItems(sort));
    p.appendChild(sortButtons);
  });

  sortButtons.appendChild(p);
}

function renderCartData() {
  ulCartList.innerHTML = "";

  state.cart.forEach((item) => {
    const li = document.createElement("li");

    // image
    const img = document.createElement("img");
    img.setAttribute("class", "cart--item-icon");
    img.setAttribute("src", `assets/icons/${item.img}`);
    img.setAttribute("alt", `${item.name}`);

    const p = document.createElement("p");
    p.innerText = `${item.name}`;

    const buttonMinus = document.createElement("button");
    buttonMinus.setAttribute("class", "quantity-btn remove-btn center");
    buttonMinus.innerText = "-";
    buttonMinus.addEventListener("click", () => handleRemoveOneItem(item));

    const span = document.createElement("span");
    span.setAttribute("class", "quantity-text center");
    span.innerText = `${item.itemCount}`;

    const buttonPlus = document.createElement("button");
    buttonPlus.setAttribute("class", "quantity-btn add-btn center");
    buttonPlus.innerText = "+";
    buttonPlus.addEventListener("click", () => handleAddOneItem(item));

    li.appendChild(img);
    li.appendChild(p);
    li.appendChild(buttonMinus);
    li.appendChild(span);
    li.appendChild(buttonPlus);

    ulCartList.appendChild(li);
  });
}

function AlphabeticalOrder(data) {
  return data.sort(function (a, b) {
    var textA = a.name;
    var textB = b.name;
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
}

function renderGroceryData(data, type, sort) {
  ulGrocersDisplay.innerHTML = "";

  if (type !== "All" && sort !== "None") {
    data = AlphabeticalOrder(data);
    data
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((e) => e.type === type)
      .forEach((item) => {
        const pel = createGroceryImage(item);
        // add these li for each teacher in the ul
        ulGrocersDisplay.appendChild(pel);
      });
  } else if (type !== "All" && sort === "None") {
    data
      .filter((e) => e.type === type)
      .forEach((item) => {
        const pel = createGroceryImage(item);
        // add these li for each teacher in the ul
        ulGrocersDisplay.appendChild(pel);
      });
  } else if (type === "All" && sort !== "None") {
    data = AlphabeticalOrder(data);
    data.forEach((item) => {
      const pel = createGroceryImage(item);
      // add these li for each teacher in the ul
      ulGrocersDisplay.appendChild(pel);
    });
  } else {
    data.forEach((item) => {
      const pel = createGroceryImage(item);
      // add these li for each teacher in the ul
      ulGrocersDisplay.appendChild(pel);
    });
  }
}

// INITIALISATION LOGIC
// INITIALISATION LOGIC
function initialise() {
  console.log("Initialising...");

  // load the state
  //state.teacherData = teachers.map((teacher) => {
  //  return { ...teacher, ticketCount: 0 };
  //});
  renderFilterButtons();
  renderSortButtons();
  // perfrom initial render
  // obj: render teachers list
  renderGroceryData(state.items, filterState, sortState);
  //const p = document.createElement("p");
  //p.innerText = `Click "View Details" to show teacher info.`;
  //teacherDetailDiv.appendChild(p);

  // setup event handlers

  console.log("Initialisation done.");
}

initialise();
