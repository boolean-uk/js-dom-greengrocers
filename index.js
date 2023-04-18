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

// Firstly, I will need to render the store items,
// to do this I will need to provide a
// function to render the store items and
// then create a list element

const storeItemList = document.querySelector(".store--item-list");
const cartIItemList = document.querySelector(".cart--item-list");
const totalNumber = document.querySelector(".total-number");

//Following the template of store.html I will render a list element
// I will also be using the images from the asset folder

function renderStoreItems() {
  state.items.forEach((item) => {
    const Storeli = document.createElement("li");
    storeItemList.append(Storeli);

    // ADDING DIV ELEMENT
    const div = document.createElement("div");
    div.setAttribute("class", "store--item-icon");
    Storeli.append(div);

    //I will be getting the images from the assets folder
    const imgItems = document.createElement("img");
    imgItems.src = `assets/icons/${item.id}.svg`;
    imgItems.alt = "${items.id}";
    div.append(imgItems);

    //Now I will be creating the button class, this should be able to be clicked on and would also have its own listener

    const storeAddButton = document.createElement("button");
    storeAddButton.innerText = "Add to cart";
    Storeli.append(storeAddButton);

    //Event Listener, when the button is clicked I want a console log to inform that the button has been clicked.
    storeAddButton.addEventListener("click", (e) => {
      console.log("Item has been selected!");
      item.quantity += 1;
    });
  });
}
//Now I will be focusing on adding the items to their cart
// If the item is already in the cart, increase the quantity, of items in the cart

function placeItems_Cart() {
  cartIItemList.innerHTML = "";

  state.cart.forEach((item) => {
    const cartItemli = document.createElement("li");
    cartIItemList.append(cartItemli);

    const cartItemImg = document.createElement("img");
    cartItemImg.setAttribute("class", "cart--item-icon");
    cartItemImg.src = `assets/icons/${item.id}.svg`;
    cartItemImg.alt = "${items.id}";
    cartItemli.append(cartItemImg);

    //Now I will be creating the names of the Items that will be placed in the Cart

    const itemName = document.createElement("p");
    itemName.innerText = `${item.name}`;
    cartItemli.append(itemName);

    const minusButton = document.createElement("button");
    minusButton.setAttribute("class", "quantity-btn remove-btn center");
    minusButton.innerText("-");
    cartItemli.append(minusButton);

    //The Event Listener will be placed here

    minusButton.addEventListener("click", (e) => {
      item.quantity -= 1;
    });
  });
}

renderStoreItems();
