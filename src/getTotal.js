import state from "./state.js";

const getTotal = () => {
  const totalNumber = document.querySelector(".total-number");
  const priceArr = state.cart.map((veg) => {
    return veg.price * veg.quantity;
  });

  const totalPrice = priceArr.reduce((veg1, veg2) => {
    return veg1 + veg2;
  }, 0);

  totalNumber.innerText = `£${Number(
    Number.parseFloat(totalPrice).toFixed(3)
  )}`;
  return totalNumber;
};

export default getTotal;
