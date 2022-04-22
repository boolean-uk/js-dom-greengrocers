import state from "./state.js";
import renderCartList from "./renderCartList.js";

const storeItemList = document.querySelector(".store--item-list");

state.items.forEach((veg) => {
  const vegLi = document.createElement("li");
  // img div
  const vegImgWrapper = document.createElement("div");
  vegImgWrapper.setAttribute("class", "store--item-icon");
  // img
  const vegImg = document.createElement("img");
  vegImg.src = `assets/icons/${veg.id}.svg`;
  vegImg.alt = veg.name;
  // button add to cart
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
