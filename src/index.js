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

const renderCartList = (veg) => {
  const cartUl = document.querySelector(".cart--item-list");
  // li
  const cartLi = document.createElement("li");
  const cartVegImg = document.createElement("img");
  cartVegImg.setAttribute("class", "cart--item-icon");
  cartVegImg.src = `assets/icons/${veg.id}.svg`;
  cartVegImg.alt = veg.name;

  // p name
  const cartVegName = document.createElement("p");
  cartVegName.innerText = veg.name;

  // button -
  const minusBtn = document.createElement("button");
  minusBtn.innerText = "-";
  minusBtn.setAttribute("class", "quantity-btn");
  minusBtn.setAttribute("class", "remove-btn");
  minusBtn.setAttribute("class", "center");

  // span quantity
  const quantityText = document.createElement("span");
  quantityText.innerText = 1;
  quantityText.setAttribute("class", "quantity-text");
  quantityText.setAttribute("class", "center");

  // button +
  const plusBtn = document.createElement("button");
  plusBtn.innerText = "+";
  plusBtn.setAttribute("class", "quantity-btn");
  plusBtn.setAttribute("class", "add-btn");
  plusBtn.setAttribute("class", "center");

  cartLi.append(cartVegImg, cartVegName, minusBtn, quantityText, plusBtn);
  cartUl.append(cartLi);

  minusBtn.addEventListener("click", () => {
    if (quantityText.innerText > 0) quantityText.innerText--;
  });

  plusBtn.addEventListener("click", () => {
    quantityText.innerText++;
  });
};

const storeItemList = document.querySelector(".store--item-list");

state.items.forEach((veg) => {
  const vegLi = document.createElement("li");

  const vegImgWrapper = document.createElement("div");
  vegImgWrapper.setAttribute("class", "store--item-icon");

  const vegImg = document.createElement("img");
  vegImg.src = `assets/icons/${veg.id}.svg`;
  vegImg.alt = veg.name;

  const addToCartBtn = document.createElement("button");
  addToCartBtn.innerText = "Add To Cart";

  vegImgWrapper.append(vegImg);
  vegLi.append(vegImgWrapper, addToCartBtn);
  storeItemList.append(vegLi);

  addToCartBtn.addEventListener("click", () => {
    state.cart.push(veg);
    renderCartList(veg);
  });
});
