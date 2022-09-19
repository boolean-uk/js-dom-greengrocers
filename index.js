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

function allStoreItemList () {
  const itemList = document.querySelector(".item-list");
  itemList.innerHTML = "";
  listOfItemOnTop(itemList);
};

function listOfItemOnTop (itemList) {
  state.items.forEach((item) => {
    // const storeItemList = document.querySelector('.store--item-list')
    const storeItems = document.createElement("li");
    storeItems.innerText = item.name
    itemList.append(storeItems);
    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");
    // const image = document.createElement('img')
    div.innerHTML = `<img src="assets/icons/${item.id}.svg" alt=${item.name} />`;

    storeItems.append(div);

    const button = document.createElement("button");
    button.innerText = "Add to cart";
    storeItems.append(button);

    button.addEventListener("click", (press) => {
      
      if (!item.quantity) {
        console.log(!item.quantity, 'hhhhehehehehe')
        item.quantity = 0;
      }

      item.quantity++;

      if (!state.cart.find(({id})=> id === item.id) ) {
        state.cart.push(item);
      }

      renderCart();
    });
  });
};



function renderCart () {
  const cartItemList = document.querySelector(".cart--item-list");
  cartItemList.innerHTML = "";
  let totalPrice = 0
  state.cart.forEach((item) => {
    totalPrice += item.quantity * item.price
    console.log(totalPrice, 'here ugo')
    const li = document.createElement("li");
    cartItemList.append(li);
    const cartImage = document.createElement("img");
    cartImage.className = "cart--item-icon";
  
    const imageSrc = `assets/icons/${item.id}.svg`;

    cartImage.setAttribute("src", imageSrc);

    cartImage.setAttribute("alt", `${item.name}`);

    li.append(cartImage);
    const p = document.createElement("p");
    p.innerText = `${item.name}`;
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "-";
    removeBtn.className = "quantity-btn remove-btn center";
    const span = document.createElement("span");
    span.className = "quantity-text center";
    span.innerHTML = item.quantity;
    const addBtn = document.createElement("button");
    addBtn.innerHTML = "+";
    addBtn.className = "quantity-btn add-btn center";
    li.append(p, removeBtn, span, addBtn);


    addBtn.addEventListener("click", function () {
      item.quantity++;
      console.log('here i am at +++++', item.quantity)
      renderCart();
      // updateAllPrice(totalPrice);
    });
    

    removeBtn.addEventListener("click", function () {

      item.quantity--;
      console.log('here i am at _____', item.quantity)
      if (item.quantity <= 0) {
        state.cart = state.cart.filter(thisItem => thisItem.id != item.id)
      }

      renderCart();
      // updateAllPrice(totalPrice);
    });
  });
  updateAllPrice(totalPrice)
};
function updateAllPrice(totalPrice) {
  
  const totalNumber = document.querySelector(".total-number");

  totalNumber.innerText = "£" + totalPrice.toFixed(2);
  
}

allStoreItemList();

