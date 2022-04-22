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
});
