import addToCart from "./addToCart.js";
import renderCartList from "./renderCartList.js";
import getTotal from "./getTotal.js";

const createItemLi = (item) => {
  const itemLi = document.createElement("li");
  // img div
  const itemImgWrapper = document.createElement("div");
  itemImgWrapper.setAttribute("class", "store--item-icon");
  // img
  const itemImg = document.createElement("img");
  itemImg.src = `assets/icons/${item.id}.svg`;
  itemImg.alt = item.name;
  // button add to cart
  const addToCartBtn = document.createElement("button");
  addToCartBtn.setAttribute("class", "add-to-cart__btn");
  addToCartBtn.innerText = "Add To Cart";

  itemImgWrapper.append(itemImg);
  itemLi.append(itemImgWrapper, addToCartBtn);

  addToCartBtn.addEventListener("click", () => {
    addToCart(item);
    renderCartList();
    getTotal();
  });

  return itemLi;
};

export default createItemLi;
