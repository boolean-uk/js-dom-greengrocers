// SELECT EXISTING DOM ELEMENTS
const StoreItemsUl = document.querySelector(".store--item-list");

const CartItemUl = document.querySelector(".cart--item-list");

let totalCost = document.querySelector(".total-number");

// DEFINE APPLICATION STATE (model)
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

// LOGIC TO UPDATE APP STATE (controller -> model -> view update)

// LOGIC TO HANDLE USER EVENTS (view -> controller interaction)
function handleStoreButtonToAddItemToCart(storeItem) {
  // implement check to see if cartItemUl already has item
  //console.log("got here");
  const listitems = CartItemUl.getElementsByTagName("li");
  if (listitems.length === 0) {
    createCartItem(storeItem);
  } else {
    //console.log(`list item lenght: ${listitems.length}`);
    for (let i = 0; i < listitems.length; i++) {
      const p = listitems[i].getElementsByTagName("p");
      const span = listitems[i].getElementsByTagName("span");
      //console.log(`p lenght: ${p.length}`);

      /*console.log(
        `p.innertext = ${p[0].innerText} :: storeitem name = ${storeItem.name}`
      );*/
      if (p[0].innerText === storeItem.name) {
        //console.log("innertext = storeitem");

        addToCartItem(span[0]);
        updateAddCartValue(storeItem);
        return;
      }
    }
    // adds one to cart list
    createCartItem(storeItem);
  }
}

// LOGIC TO HANDLE RENDERING / DISPLAY / CLEARING OF UI (view)
function createStoreItems(storeItem) {
  //create li as store item
  const storeItem_li = document.createElement("li");
  //create div for store item
  const storeItem_div = document.createElement("div");
  //create img for store item div
  const item_img = document.createElement("img");
  //add src and alt to img
  item_img.src = `assets/icons/${storeItem.id}.svg`;
  item_img.alt = `${storeItem.name}`;
  //appendChild img to div
  storeItem_div.appendChild(item_img);
  //create button for store item
  const button = document.createElement("button");
  //add inner text to button
  button.innerText = "Add to cart";
  //add event to button
  button.addEventListener("click", () =>
    handleStoreButtonToAddItemToCart(storeItem)
  );
  //appendChild div to store item
  storeItem_li.appendChild(storeItem_div);
  //appendChild button to store item
  storeItem_li.appendChild(button);

  //return store item
  return storeItem_li;
}

function createCartItem(storeItem) {
  // create li as cart item
  const cartItem_li = document.createElement("li");
  // create img for cart item
  const cartItem_img = document.createElement("img");
  // give img class, src and alt
  cartItem_img.className = "cart--item-icon";
  cartItem_img.src = `assets/icons/${storeItem.id}.svg`;
  cartItem_img.alt = `${storeItem.name}`;
  // appendChild img to cart item
  cartItem_li.appendChild(cartItem_img);

  // add p to cart item
  const cartItem_p = document.createElement("p");
  // give p new inner text
  cartItem_p.innerText = `${storeItem.name}`;
  // append p
  cartItem_li.appendChild(cartItem_p);

  // add button1 to cart item
  const cartItemRemoveButton = document.createElement("button");
  // give class,inner text
  cartItemRemoveButton.className = "quantity-btn remove-btn center";
  cartItemRemoveButton.innerText = "-";
  cartItemRemoveButton.addEventListener("click", () =>
    removeFromCounter(cartItem_span, cartItem_li, storeItem)
  );
  // append button1
  cartItem_li.appendChild(cartItemRemoveButton);

  // add span to cart item
  const cartItem_span = document.createElement("span");
  //give span class, inertext
  cartItem_span.className = "quantity-text center";
  cartItem_span.innerText = "1";
  // append span
  cartItem_li.appendChild(cartItem_span);

  // add button2 to cart item
  const cartItemAddButton = document.createElement("button");
  // give class,inner text
  cartItemAddButton.className = "quantity-btn add-btn center";
  cartItemAddButton.innerText = "+";
  cartItemAddButton.addEventListener("click", () =>
    addToCounter(cartItem_span, storeItem)
  );
  // append button2
  cartItem_li.appendChild(cartItemAddButton);

  //append cartItem to cart item list
  CartItemUl.appendChild(cartItem_li);

  //update cart value
  updateAddCartValue(storeItem);
}

function addToCartItem(span) {
  //console.log(`in add to cart function`);
  let temp = Number(span.innerText);
  temp = temp + 1;
  //console.log(`inner text before ${span.innerText}`);

  span.innerText = temp.toString();
  //console.log(`inner text after ${span.innerText}`);
}

function updateAddCartValue(storeItem) {
  //console.log(`trying to do this`);
  let temp = totalCost.innerText.slice(1);
  //console.log(temp);
  let tempNumber = Number(temp);
  //console.log(`${tempNumber}`);
  let tempNumberFixed = tempNumber + storeItem.price;
  //console.log(tempNumberFixed);
  totalCost.innerText = "£" + tempNumberFixed.toFixed(2); //`£${tempNumber + storeItem.price}`;
}
function updateRemoveCartValue(storeItem) {
  console.log(`trying to do this`);
  let temp = totalCost.innerText.slice(1);
  console.log(temp);
  let tempNumber = Number(temp);
  console.log(`${tempNumber}`);
  let tempNumberFixed = tempNumber - storeItem.price;
  console.log(tempNumberFixed);
  totalCost.innerText = "£" + tempNumberFixed.toFixed(2);
}

function addToCounter(span, storeItem) {
  span.innerText++;
  updateAddCartValue(storeItem);
}
function removeFromCounter(span, li, storeItem) {
  if (span.innerText === "1") {
    updateRemoveCartValue(storeItem);
    CartItemUl.removeChild(li);
  } else {
    updateRemoveCartValue(storeItem);
    span.innerText--;
  }
}

// INITIALISATION LOGIC
function initialise() {
  console.log("Initialising...");

  // perform any additional actions to load state

  // perfrom initial render

  state.items.forEach((storeItem) => {
    const li = createStoreItems(storeItem);
    StoreItemsUl.appendChild(li);
  });

  // setup event handlers

  console.log("Initialisation done.");
}

initialise();
