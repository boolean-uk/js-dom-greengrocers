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
  minusBtn.setAttribute("class", "quantity-btn remove-btn center");

  // span quantity
  const quantityText = document.createElement("span");
  quantityText.innerText = 1;
  quantityText.setAttribute("class", "quantity-text center");
  // button +
  const plusBtn = document.createElement("button");
  plusBtn.innerText = "+";
  plusBtn.setAttribute("class", "quantity-btn add-btn center");

  cartLi.append(cartVegImg, cartVegName, minusBtn, quantityText, plusBtn);
  cartUl.append(cartLi);

  minusBtn.addEventListener("click", () => {
    if (quantityText.innerText > 0) quantityText.innerText--;
    console.log(cartLi);
  });

  plusBtn.addEventListener("click", () => {
    quantityText.innerText++;
  });
};

export default renderCartList;
