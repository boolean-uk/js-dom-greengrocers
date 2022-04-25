import getTotal from "./getTotal.js";
import removeQuantity0 from "./removeQuantity0.js";

const createCartLi = (veg) => {
  // li
  const cartLi = document.createElement("li");
  // img icon
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
  minusBtn.setAttribute("class", "quantity-btn remove-btn center");
  // span quantity
  const quantityText = document.createElement("span");
  quantityText.innerText = veg.quantity;
  quantityText.setAttribute("class", "quantity-text center");
  // button +
  const plusBtn = document.createElement("button");
  plusBtn.innerText = "+";
  plusBtn.setAttribute("class", "quantity-btn add-btn center");

  minusBtn.addEventListener("click", () => {
    if (veg.quantity > 0) {
      veg.quantity--;
      quantityText.innerText = veg.quantity;
      getTotal();
    }
    if (veg.quantity === 0) {
      removeQuantity0();
      cartLi.remove();
    }
  });

  plusBtn.addEventListener("click", () => {
    veg.quantity++;
    quantityText.innerText = veg.quantity;
    getTotal();
  });

  cartLi.append(cartVegImg, cartVegName, minusBtn, quantityText, plusBtn);
  return cartLi;
};

export default createCartLi;
