import createCartLi from "./createCartLi.js";
import state from "./state.js";

const renderCartList = () => {
  const cartUl = document.querySelector(".cart--item-list");
  cartUl.innerHTML = "";
  state.cart.forEach((veg) => {
    if (veg.quantity !== 0) {
      const cartLi = createCartLi(veg);
      cartUl.append(cartLi);
    }
  });
};

export default renderCartList;
