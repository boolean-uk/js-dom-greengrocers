import addToCart from "./addToCart.js";
import renderCartList from "./renderCartList.js";

const createVegLi = (veg) => {
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
  addToCartBtn.setAttribute("class", "add-to-cart__btn");
  addToCartBtn.innerText = "Add To Cart";

  vegImgWrapper.append(vegImg);
  vegLi.append(vegImgWrapper, addToCartBtn);

  addToCartBtn.addEventListener("click", () => {
    addToCart(veg);
    renderCartList();
  });

  return vegLi;
};

export default createVegLi;
