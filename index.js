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

// SELECT EXISTING HTML ELEMENTS

// This query selector has a global scope, i.e. it is not defined inside a function
const storeItemsUL = document.querySelector(".item-list.store--item-list");
const cartUL = document.querySelector(".item-list.cart--item-list");

// Render the store items in a for each
function renderStoreItems() {
  state.items.forEach((storeItem) => {
    // Create the necessary HTML elements & set attributes
    const itemLI = document.createElement("li");

    const itemDIV = document.createElement("div");
    itemDIV.setAttribute("class", "store--item-icon");

    const itemImage = document.createElement("img");
    itemImage.setAttribute("src", `assets/icons/${storeItem.id}.svg`);
    itemImage.setAttribute("alt", `${storeItem.name}`);

    const addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Add to cart";

    // Call a function when the button is clicked that will add the item to cart
    addToCartButton.addEventListener("click", (event) => {
      addToCart(storeItem);
    });

    // Append the elements
    storeItemsUL.append(itemLI);
    itemLI.append(itemDIV);
    itemDIV.append(itemImage);
    itemLI.append(addToCartButton);
  });
}

function addToCart(storeItem) {
  // Create the necessary HTML elements & set attributes
  const cartLI = document.createElement("li");

  const cartImage = document.createElement("img");
  cartImage.setAttribute("class", "cart--item-icon");
  cartImage.setAttribute("src", `assets/icons/${storeItem.id}.svg`);
  cartImage.setAttribute("alt", `${storeItem.name}`);

  const cartText = document.createElement("p");
  cartText.innerText = `${storeItem.name}`;

  const decreaseQuantity = document.createElement("button");
  decreaseQuantity.setAttribute("class", "quantity-btn remove-btn center");
  decreaseQuantity.innerText = "-";

  const quantityAmount = document.createElement("span");
  quantityAmount.setAttribute("class", "quantity-text center");
  quantityAmount.innerText = "1"; // Change to the actual quantity amount!

  const increaseQuantity = document.createElement("button");
  increaseQuantity.setAttribute("class", "quantity-btn add-btn center");
  increaseQuantity.innerText = "+";

  // Append the elements
  cartUL.append(cartLI);
  cartLI.append(cartImage);
  cartLI.append(cartText);
  cartLI.append(decreaseQuantity);
  cartLI.append(quantityAmount);
  cartLI.append(increaseQuantity);
}

// Function to call when the page is loaded
renderStoreItems();
